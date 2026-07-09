from django.contrib import admin
from .models import URLModel, MailBox, MessageURLModel
# Register your models here.
admin.site.register(URLModel)
@admin.register(MessageURLModel)
class MessageURLModelAdmin(admin.ModelAdmin):
    list_display = ('message', 'url','get_mailbox' )
    
    def get_mailbox(self, obj):
        print('obj:',obj)
        return ", ".join([str(mailbox.user) for mailbox in obj.mailbox_msg_url.all()])
@admin.register(MailBox)
class MailBoxAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_count')
    
    fieldsets = (
        ('基本情報', {
            'fields': ('user',)
        }),
        ('高度な設定', {
            'classes': ('collapse',), # クリックで開閉（折りたたみ）できるようにする
            'fields': ('msg_url',),
            'description': 'ここにはメッセージURLのリストが表示されます。',
        }),
    )
    
    def formfield_for_manytomany(self, db_field, request, **kwargs):
        pk = request.resolver_match.kwargs.get('object_id')
        if db_field.name == 'msg_url':
            kwargs['queryset'] = MessageURLModel.objects.filter(mailbox_msg_url__id=pk)

            return super().formfield_for_manytomany(db_field, request, **kwargs)
    def get_count(self, obj):
        return obj.msg_url.count()
    get_count.short_description = "メッセージ数"