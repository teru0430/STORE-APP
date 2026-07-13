# (update.py)
from django.utils import timezone
from datetime import timedelta
import requests
import asyncio
import time
from bs4 import BeautifulSoup
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from priceOB.models import URLModel, MessageURLModel, MailBox
from django_eventstream import send_event
from django_eventstream.models import Event
from channels.db import database_sync_to_async
import random

count = 0
def add_msg(url, msg):
   msgurl = MessageURLModel(message=msg, url=url)
   msgurl.save()
   user = url.user
   print('user_id:',user.id)
   mailbox = MailBox.objects.get(user_id=user.id)
   print('mailbox:',mailbox)
   mailbox.msg_url.add(msgurl)
   
   
def update_pricedb(url, new_price):
   obj = URLModel.objects.get(id=url.id)
   obj.price = new_price
   obj.save()

def update_price():
   """
   This function is called by start() below
   """
   urlmodel = URLModel.objects.order_by('last_scraped_at').first()
   if not urlmodel:
       print("No URLs to update.")
       return

   print('url:',urlmodel.url)
   print('title:',urlmodel.title)
   new_price = amazon_tarack_price(urlmodel.url)
   if new_price is None:
      return
   print('new_price:',new_price)
   if new_price != urlmodel.price:
      if new_price < urlmodel.price:
         msg = f"{urlmodel.title}の価格が下がりました。古い価格は{urlmodel.price}円、新しい価格は{new_price}円です。"
         send_event(
            f"user-{urlmodel.user.id}",
            "price_down",
            {
               "id": urlmodel.id,
               "title": urlmodel.title,
               "url": urlmodel.url,
               "new_price": new_price,
               "message": msg
            }
         )
      else:
         msg = f"{urlmodel.title}の価格が上がりました。古い価格は{urlmodel.price}円、新しい価格は{new_price}円です。"
         send_event(
            f"user-{urlmodel.user.id}",
            "price_updated",
            {
               "id": urlmodel.id,
               "title": urlmodel.title,
               "url": urlmodel.url,
               "new_price": new_price,
               "message": msg
            }
         )
      
      update_pricedb(urlmodel, new_price)
      print('Price updated:', new_price)
   msg ='test2'
   add_msg(urlmodel, msg) 
   send_event(
            f"user-{urlmodel.user.id}",
            "price_updated",
            {
               "id": urlmodel.id,
               "title": urlmodel.title,
               "url": urlmodel.url,
               "new_price": new_price,
               "message": msg
            }
         )  
   global count
   count +=1
   print('Update!',count)
   urlmodel.last_scraped_at = timezone.now()
   urlmodel.save()


def amazon_tarack_price(url):
   # amazonURL = url
   # amazonPage = requests.get(amazonURL)
    
   # soup = BeautifulSoup(amazonPage.content, "html.parser")
   #  # print(soup)
   # title = soup.find(id="productTitle").get_text()
   # price = soup.find("span", class_="a-price-whole").get_text()
   # print('price:',price)
   # price = int(price.replace(",", ""))
   # print(price)
   # print(title.strip())
   
# 2. Botとして弾かれないよう、ブラウザのUser-Agentを設定
   user_agents = [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0"
   ]
   headers = {
      "User-Agent": random.choice(user_agents),
      "Accept-Language": "ja-JP,ja;q=0.9"
   }

# 3. ページにアクセスしてHTMLを取得
   try:
      response = requests.get(url, headers=headers)
      response.raise_for_status() # エラーチェック
   except requests.RequestException as e:
      print(f"エラーが発生しました: {e}")

   # 4. BeautifulSoupでHTMLを解析
   soup = BeautifulSoup(response.text, "html.parser")

   # 5. 商品タイトルの抽出（AmazonのHTML構造によりIDやクラスは変更される場合があります）
   try:
      # `productTitle`はAmazonの一般的な商品タイトル用ID
      title_element = soup.find(id="productTitle")
      title = title_element.get_text(strip=True) if title_element else "タイトルが見つかりません"
      
      # 6. 価格の抽出
      # 価格表示のIDやクラスは時期やページ構成で変わるため、適宜デベロッパーツールで確認が必要です
      price_element = soup.find(class_="a-price-whole")
      price = price_element.get_text(strip=True) if price_element else "価格が見つかりません"
      price = int(price.replace(",", ""))
      
   except Exception as e:
      print(f"データの抽出中にエラーが発生しました: {e}")
      price = None
   return price

def check_event():
   one_week_ago = timezone.now() - timedelta(days=7)
   Event.objects.filter(created__lt=one_week_ago).delete()
    
  
   
   

# new=>
def start():
   """
   Scheduling data update
   Run update function once every 60 seconds
   """
   scheduler = BackgroundScheduler()
   
   scheduler.add_job(update_price, 'interval', seconds=60, max_instances=1, coalesce=True) # schedule args=[i]
   scheduler.add_job(check_event, 'interval', days=1) # schedule args=[i]
   scheduler.start()