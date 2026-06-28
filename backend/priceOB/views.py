from django.shortcuts import render
from django_eventstream import send_event

# send_event(<channel>, <event_type>, <event_data>)
send_event("test", "message", {"text": "hello world"})
