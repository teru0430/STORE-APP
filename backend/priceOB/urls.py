from rest_framework.routers import DefaultRouter
from django.urls import path, include
from django_eventstream.viewsets import EventsViewSet, configure_events_view_set

router = DefaultRouter()

# register by function
router.register(
    "events1",
    configure_events_view_set(channels=["channel1", "channel2"],
    messages_types=["message", "info"]),
    basename="events1")

# register by class
router.register(
    "events2",
    configure_events_view_set(channels=["channel1", "channel2"]),
    basename="events2")

urlpatterns = [
    path("", include(router.urls)),
]

