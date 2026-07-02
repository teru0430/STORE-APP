from django_eventstream.channelmanager import DefaultChannelManager
from users.authentication import CookieJWTAuthentication
from django.core.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from django_eventstream.eventstream import get_events
import threading
from django_eventstream.models import Event
class UserChannelManager(DefaultChannelManager):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._thread_local = threading.local()
    
    
    def get_channels_for_request(self, request, view_kwargs):
        # by default, use view keywords, else query params
        auth = CookieJWTAuthentication()
        try:
            token=auth.authenticate(request)
            self._thread_local.current_user = token[0]
        except Exception as e:
            raise PermissionDenied(f"Authentication failed: {str(e)}")    
        print('Authenticated user:', token[1]['user_id'] if token else None)
        request.user = token[0]
        if "format-channels" in view_kwargs:
            out = set()
            for format_channel in view_kwargs["format-channels"]:
                out.add(format_channel.format(**view_kwargs))
                print("format-channels:", out)
                
            return out
        elif "channels" in view_kwargs:
            print("channels")
            return set(view_kwargs["channels"])
            
        elif "channel" in view_kwargs:
            print("channel")
            return set([view_kwargs["channel"]])
        else:
            print("else")
            return set(request.GET.getlist("channel"))
        
    def can_read_channel(self, user, channel):
        # require auth for prefixed channels
        print('self, user, channel:', self, user, channel)
        if user is None:
            user = getattr(self._thread_local, 'current_user', None)
        print('user:', type(user.id),channel.startswith('_'))  
        user_id =  channel.split('-')[-1]
        print(user_id, type(user_id), user.id, type(user.id))
        if channel.startswith('_') or user is None or int(user_id) != user.id:
            print('False')
            return False
        print('True')
        return True
    