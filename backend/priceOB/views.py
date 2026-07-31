from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import URLModel, MailBox, MessageURLModel
from .serializers import URLModelSerializer, MailBoxSerializer
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from users.models import CustomUser
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import BasePermission

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class URLModelViewSet(viewsets.ModelViewSet):
    queryset = URLModel.objects.all()
    serializer_class = URLModelSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        """ユーザーの自分のURLのみを表示"""
        return URLModel.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        """URL作成時にイベント送信"""
        response = super().create(request, *args, **kwargs)
        return response

    def destroy(self, request, *args, **kwargs):
        """URL削除時にイベント送信。本人以外は削除不可。"""

        response = super().destroy(request, *args, **kwargs)
        return response
    
    
class MailBoxViewSet(viewsets.ModelViewSet):
    queryset = MailBox.objects.all()
    serializer_class = MailBoxSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        """ユーザーの自分のMailBoxのみを表示"""
        return MailBox.objects.filter(user=self.request.user)
    
    def perform_update(self, serializer):
        mailbox = serializer.save()
        pk = self.request.data.get('pk')
        mailbox.msg_url.filter(id=pk).update(is_read=True)
        
        
    
    
   



