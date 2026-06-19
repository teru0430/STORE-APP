from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
    
    
    
    
    def ready(self):
       """
       This function is called when startup.
       """
       from update import start # <= さっき作った start関数をインポート
       
       start()
