from rest_framework.routers import DefaultRouter
from django.urls import path, include
from django_eventstream.urls import urlpatterns as eventstream_urls
from .views import URLModelViewSet

router = DefaultRouter()
router.register("urls", URLModelViewSet, basename="urls")

urlpatterns = [
    path("", include(router.urls)),
] + eventstream_urls

