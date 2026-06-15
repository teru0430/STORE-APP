# views.py
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken


class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        # 1. シンプルJWTの標準処理を呼び出して、一度トークンを生成させる
        response = super().post(request, *args, **kwargs)
        
        # ログインが成功（200 OK）した場合のみ処理
        if response.status_code == 200:
            access_token = response.data.get("access")
            refresh_token = response.data.get("refresh")
            
            # 2. 【超重要】レスポンスのJSON（response.data）を空っぽにする！
            # これにより、フロントエンドの画面や通信ログにトークンが見えなくなります
            response.data = {
                "success": True, 
                "message": "ログインに成功しました。クッキーに保存されました。"
            }
            
            # 3. settings.pyで決めたルールに従って、クッキーをブラウザに送りつける
            cookie_settings = settings.SIMPLE_JWT
            
            # アクセストークンをクッキーにセット
            response.set_cookie(
                key=cookie_settings["AUTH_COOKIE"],
                value=access_token,
                expires=cookie_settings["ACCESS_TOKEN_LIFETIME"],
                secure=cookie_settings.get("AUTH_COOKIE_SECURE", False),
                httponly=cookie_settings["AUTH_COOKIE_HTTP_ONLY"],
                samesite=cookie_settings["AUTH_COOKIE_SAMESITE"],
                path=cookie_settings["AUTH_COOKIE_PATH"],
            )
            
            # リフレッシュトークンをクッキーにセット
            response.set_cookie(
                key=cookie_settings["AUTH_COOKIE_REFRESH"],
                value=refresh_token,
                expires=cookie_settings["REFRESH_TOKEN_LIFETIME"],
                secure=cookie_settings.get("AUTH_COOKIE_SECURE", False),
                httponly=cookie_settings["AUTH_COOKIE_HTTP_ONLY"],
                samesite=cookie_settings["AUTH_COOKIE_SAMESITE"],
                path=cookie_settings["AUTH_COOKIE_PATH"],
            )
            
        return response
    

class SecretDataView(APIView):
    # 【重要】このビューは、正しいJWTクッキーを持ってきた人だけアクセスできる
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # 自作した認証クラス（JWTCookieAuthentication）が成功していれば、
        # request.user の中にログイン中のユーザー情報が自動で入っています！
        return Response({
            "success": True,
            "message": "Cookie認証に成功しました！これは秘密のデータです。",
            "username": request.user.username  # ログイン中のユーザー名を表示
        })



class CookieTokenRefreshView(TokenRefreshView):
    
    def post(self, request, *args, **kwargs):
        # 1. 直接 "refresh_token" という名前でブラウザのCookieから取り出す
        
        print("\n=== 🔍 [DEBUG] リフレッシュ通信が届きました ===")
        print("ブラウザから届いたすべてのクッキー:", request.COOKIES)
        raw_refresh = request.COOKIES.get("refresh_token")
       # raw_refresh = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        print(f"取り出した refresh_token の値: {raw_refresh}")
        if raw_refresh:
            # 💡【ここを修正しました！】
            # request.data が上書きできない設定（QueryDict）になっている場合を考慮し、
            # 一時的に上書き可能なコピーを作成するか、辞書に変換してデータを流し込みます
            #if hasattr(request.data, '_mutable'):
             #   request.data._mutable = True # ロックを解除
            
            request.data["refresh"] = raw_refresh
        else:
            print("🚨 警告: Cookieの中に 'refresh_token' が見つかりませんでした！")   
        # 2. 親クラス（Simple JWTの標準処理）を実行する
        try:
            response = super().post(request, *args, **kwargs)
            print("✅ Simple JWT の内部検証: 成功しました！")
        except Exception as e:
            # トークン自体が不正・期限切れの場合は 401 Unauthorized エラーを返す
            print(f"❌ Simple JWT の検証失敗！理由: {str(e)}")
            return Response({"success": False, "error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        
        # 3. リフレッシュが成功（200 OK）した場合のみ、新しいクッキーを配る
        if response.status_code == 200:
            access_token = response.data.get("access")
            refresh_token = response.data.get("refresh")
            
            # フロントエンド用の綺麗なメッセージ（JSONボディ）
            response.data = {
                "success": True, 
                "message": "アクセストークンを新しく更新しました。"
            }
            
            cookie_settings = settings.SIMPLE_JWT
            response.set_cookie(
                key=cookie_settings["AUTH_COOKIE"], 
                value=access_token,
                expires=cookie_settings["ACCESS_TOKEN_LIFETIME"],
                secure=cookie_settings.get("AUTH_COOKIE_SECURE", False),
                httponly=cookie_settings["AUTH_COOKIE_HTTP_ONLY"],
                samesite=cookie_settings["AUTH_COOKIE_SAMESITE"],
                path=cookie_settings["AUTH_COOKIE_PATH"],
            )
            
            response.set_cookie(
                key=cookie_settings["AUTH_COOKIE_REFRESH"],
                value=refresh_token,
                expires=cookie_settings["REFRESH_TOKEN_LIFETIME"],
                secure=cookie_settings.get("AUTH_COOKIE_SECURE", False),
                httponly=cookie_settings["AUTH_COOKIE_HTTP_ONLY"],
                samesite=cookie_settings["AUTH_COOKIE_SAMESITE"],
                path=cookie_settings["AUTH_COOKIE_PATH"],
            )
            
        return response

class LogoutView(APIView):
    authentication_classes = []
    
    
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")
        
        
        if refresh_token:
            try:
                refresh = RefreshToken(refresh_token)
                
            except Exception as e:
                return Response({"error":"Error" + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        response = Response({"message": "Successfully logged out"},status=status.HTTP_200_OK)  
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        
        return response