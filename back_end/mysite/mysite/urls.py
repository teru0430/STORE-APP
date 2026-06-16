
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
#from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import CookieTokenObtainPairView, SecretDataView, CookieTokenRefreshView, LogoutView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('goods/', include('goods.urls')),
    path('accounts/', include('accounts.urls')),
   # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/secret/', SecretDataView.as_view(), name='secret_data'),
    path('api/token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
   # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   # path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
