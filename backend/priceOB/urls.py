from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import URLModelViewSet, MailBoxViewSet

router = DefaultRouter()
router.register("urls", URLModelViewSet, basename="urls")
router.register("mailbox", MailBoxViewSet, basename="mailbox")

urlpatterns = [
    path("", include(router.urls)),
    
] 

