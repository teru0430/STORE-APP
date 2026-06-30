from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django_eventstream import send_event
from .models import URLModel
from .serializers import URLModelSerializer
from django_eventstream.views import events
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from users.models import CustomUser
from rest_framework.authentication import SessionAuthentication


class URLModelViewSet(viewsets.ModelViewSet):
    queryset = URLModel.objects.all()
    serializer_class = URLModelSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """ユーザーの自分のURLのみを表示"""
        return URLModel.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        """URL作成時にイベント送信"""
        response = super().create(request, *args, **kwargs)
        
        if response.status_code == 201:
            user_channel = f"user-{request.user.id}"
            print("send_event called", user_channel, "event_type=", "url_created")
            send_event(
                user_channel,
                "url_created",
                {
                    "id": response.data['id'],
                    "title": response.data['title'],
                    "url": response.data['url'],
                    "message": "新しいURLが追加されました"
                }
            )
        
        return response

    def destroy(self, request, *args, **kwargs):
        """URL削除時にイベント送信"""
        instance = self.get_object()
        url_id = instance.id
        url_title = instance.title
        
        response = super().destroy(request, *args, **kwargs)
        
        if response.status_code == 204:
            user_channel = f"user-{request.user.id}"
            print("send_event called", user_channel, "event_type=", "url_deleted")
            send_event(
                user_channel,
                "url_deleted",
                {
                    "id": url_id,
                    "title": url_title,
                    "message": "URLが削除されました"
                }
            )
        
        return response

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def test_event(self, request):
        """テスト用エンドポイント：イベント送信テスト"""
        user_channel = f"user-{request.user.id}"
        print("send_event called", user_channel, "event_type=", "test_message")
        send_event(
            user_channel,
            "test_message",
            {
                "user-id": request.user.id,
                "username": request.user.username,
                "message": "これはテストメッセージです"
            }
        )
        
        return Response(
            {"status": "success", "message": "テストイベントを送信しました"},
            status=status.HTTP_200_OK
        )

send_event(
    "user-20",
    "test_message",
    {"message": "SSE受信テスト", "time": "2026-06-30T12:00:00Z"}
)

