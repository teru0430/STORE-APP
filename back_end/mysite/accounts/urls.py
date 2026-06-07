from django.urls import path
from .views import getMe, register
urlpatterns = [
    path('me/', getMe, name='me'),
    path('register/', register, name='register'),
]
