from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import CSRFCheck
from rest_framework.exceptions import PermissionDenied
from django.conf import settings


class JWTCookieAuthentication(JWTAuthentication):
    """
    リクエストのCookie（クッキー）からJWTトークンを自動で読み取るカスタム認証クラス
    """
    def authenticate(self, request):
        # 1. settings.pyで決めたクッキー名（access_token）を使って、リクエストからトークンを取り出す
        raw_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        
        # クッキーにトークンが入っていない場合は、未ログインとして次の認証処理に回す
        if raw_token is None:
            return None

        # 2. 取り出したトークンが「期限切れでないか」「改ざんされていないか」を検証する
        # （検証ロジックはSimple JWTの親クラスの機能をそのまま再利用します）
        validated_token = self.get_validated_token(raw_token)
        
        # 3. トークンが正しければ、紐づいているユーザーオブジェクトを取得する
        user = self.get_user(validated_token)
        
        # 4. 【超重要】安全のためのCSRFチェックを実行する
        # ※Cookie運用では別のタブからの不正操作（CSRF攻撃）を防ぐためにこれが絶対に必須です
        self.enforce_csrf(request)
        
        # 5. ログイン中の「ユーザー」と「検証済みトークン」をDRFに返す
        return user, validated_token

    def enforce_csrf(self, request):
        """
        Django標準のCSRFチェックを強制的に実行するメソッド
        """
        check = CSRFCheck(request)
        # リクエストのCSRFトークンを検証
        reason = check.process_view(request, None, (), {})
        if reason:
            # CSRFトークンが一致しない、または無い場合はアクセスを拒否する
            raise PermissionDenied(f'CSRF Failed: {reason}')