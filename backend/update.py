# (update.py)
from django.utils import timezone
from datetime import timedelta
import requests
from bs4 import BeautifulSoup
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from priceOB.models import URLModel
from django_eventstream import send_event
from django_eventstream.models import Event
count = 0
def update():
   """
   This function is called by start() below
   """
   urls = URLModel.objects.all()
   event = Event.objects.all()
   # print('urls:',urls)
   # for url in urls:
   #    print('url:',url.url)
   #    print('title:',url.title)
      # amazon_tarack_price(url.url)
   global count
   count +=1
   print('Update!',count)
   one_week_ago = timezone.now() - timedelta(days=7)
   Event.objects.filter(created__lt=one_week_ago).delete()
   # amazon_tarack_price()
   # send_event(
   #          "user-20",
   #          "test_message",
   #          {
   #              "user_id": '20',
   #              "username": "testuser",
   #              "message": "これはテストメッセージです"
   #          }
   #      )



def amazon_tarack_price(url):
   amazonURL = url
   amazonPage = requests.get(amazonURL)
    
   soup = BeautifulSoup(amazonPage.content, "html.parser")
    # print(soup)
   title = soup.find(id="productTitle").get_text()
   price = soup.find("span", class_="a-price-whole").get_text()
   price = int(price.replace(",", ""))
   print(price)
   print(title.strip())
   return price
   
    
  
   
   

# new=>
def start():
   """
   Scheduling data update
   Run update function once every 12 seconds
   """
   scheduler = BackgroundScheduler()
   
   scheduler.add_job(update, 'interval', seconds=12) # schedule args=[i]
   
   scheduler.start()