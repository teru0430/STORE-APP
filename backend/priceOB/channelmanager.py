from django_eventstream.channelmanager import DefaultChannelManager
from users.authentication import CookieJWTAuthentication
from django.core.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated

class UserChannelManager(DefaultChannelManager):
    
    
    def get_channels_for_request(self, request, view_kwargs):
        # by default, use view keywords, else query params

        if "format-channels" in view_kwargs:
            out = set()
            for format_channel in view_kwargs["format-channels"]:
                out.add(format_channel.format(**view_kwargs))
            return out
        elif "channels" in view_kwargs:
            return set(view_kwargs["channels"])
        elif "channel" in view_kwargs:
            return set([view_kwargs["channel"]])
        else:
            return set(request.GET.getlist("channel"))
    def can_read_channel(self, user, channel):
        # require auth for prefixed channels
        print('self, user, channel:', self, user, channel)
        if channel.startswith('_') and user is None:
            return False
        return True
    