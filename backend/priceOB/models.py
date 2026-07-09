from django.db import models
from api.settings import AUTH_USER_MODEL
from django.db.models.signals import post_save
# from django.contrib.auth import get_user_model
User = AUTH_USER_MODEL


# Create your models here.
class URLModel(models.Model):
    title = models.CharField(max_length=100)
    url = models.URLField(max_length=1500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    price = models.IntegerField() 
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='urls_user')
    last_scraped_at = models.DateTimeField(blank=True, null=True)
   
    class Meta:
        constraints = [
            
            models.UniqueConstraint(fields=['user', 'url'], name='unique_user_url')
        ]

    def __str__(self):
        return self.title

class MessageURLModel(models.Model):
    message = models.TextField()
    url = models.ForeignKey(to=URLModel, on_delete=models.CASCADE)
    
    
    def __str__(self):
        return f'{self.message}の{self.url}メッセージ'
    
class MailBox(models.Model):
    msg_url = models.ManyToManyField(to=MessageURLModel, blank=True, related_name='mailbox_msg_url')
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='mailbox_user')
    def __str__(self):
        return f'{self.user}のメールボックス' 
    
        
    def post_user_created(sender, instance, created, **kwargs):
        if created:
            profile_obj = MailBox(user=instance)
            profile_obj.save()

    post_save.connect(post_user_created, sender=User)
        