from django.apps import AppConfig
import os



class PriceobConfig(AppConfig):
    name = 'priceOB'

    
    def ready(self):
        
        if os.environ.get('RUN_MAIN') == 'true':  
            from update import start  
            start()