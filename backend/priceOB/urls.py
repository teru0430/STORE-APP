from rest_framework.routers import DefaultRouter
from django.urls import path, include
import django_eventstream
from .views import URLModelViewSet

router = DefaultRouter()
router.register("urls", URLModelViewSet, basename="urls")

urlpatterns = [
    path("", include(router.urls)),
    path('users/<user_id>/events/', include(django_eventstream.urls),{'format-channels': ['user_{user_id}']})
] 

