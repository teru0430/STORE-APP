from django.urls import path
from .views import getMe
urlpatterns = [
    path('me/', getMe, name='me'),
]
