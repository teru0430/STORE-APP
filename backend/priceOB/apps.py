from django.apps import AppConfig
import os


class PriceobConfig(AppConfig):
    name = 'priceOB'

    
    def ready(self):
        if os.environ.get('RUN_MAIN') == 'true':  # 子プロセスだけ実行するように修正
            from update import start  # <= さっき作った start関数をインポート
            start()