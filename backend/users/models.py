from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager
from priceOB.models import MailBox
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model


class CustomUser(AbstractUser):
    USERNAME_FIELD = 'email'
    email = models.EmailField(unique=True)
    REQUIRED_FIELDS = []
    # mailbox = models.OneToOneField(to=MailBox, on_delete=models.CASCADE, null=True, blank=True,related_name='mailbox_user')
    objects = CustomUserManager()
    
    

