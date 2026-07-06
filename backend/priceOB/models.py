from django.db import models
from api.settings import AUTH_USER_MODEL
User = AUTH_USER_MODEL


# Create your models here.
class URLModel(models.Model):
    title = models.CharField(max_length=100)
    url = models.URLField(max_length=1500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    price = models.IntegerField() 
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='urls_user')
   
   
    class Meta:
        constraints = [
            
            models.UniqueConstraint(fields=['user', 'url'], name='unique_user_url')
        ]

    def __str__(self):
        return self.title