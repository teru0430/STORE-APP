# views.py
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

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
    """
    Cookieからリフレッシュトークンを読み取り、
    新しく生成されたアクセストークンを再びCookieにセットして返すビュー
    """
    def post(self, request, *args, **kwargs):
        # 1. リクエストのCookieからリフレッシュトークンを取り出して、DRFの標準処理に渡す
        raw_refresh = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"])
        if raw_refresh:
            request.data["refresh"] = raw_refresh
            
        # 2. 標準のリフレッシュ処理を実行
        response = super().post(request, *args, **kwargs)
        
        # リフレッシュが成功（200 OK）した場合のみ処理
        if response.status_code == 200:
            access_token = response.data.get("access")
            
            # レスポンスのJSONを綺麗にする
            response.data = {"success": True, "message": "トークンを更新しました。"}
            
            # 新しいアクセストークンをCookieに上書き保存する
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
        return response

