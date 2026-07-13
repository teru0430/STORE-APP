from rest_framework.routers import DefaultRouter
from django.urls import path, include
import django_eventstream
from .views import URLModelViewSet, MailBoxViewSet

router = DefaultRouter()
router.register("urls", URLModelViewSet, basename="urls")
router.register("mailbox", MailBoxViewSet, basename="mailbox")

urlpatterns = [
    path("", include(router.urls)),
    path('users/<int:user_id>/events/', include(django_eventstream.urls),{'format-channels': ['user-{user_id}']})
] 

