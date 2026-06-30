# (update.py)
from datetime import datetime
import requests
from bs4 import BeautifulSoup
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.schedulers.asyncio import AsyncIOScheduler
import asyncio
count = 0
def update():
   """
   This function is called by start() below
   """
   global count
   count +=1
   print('Update!',count)
   amazon_tarack_price()




def amazon_tarack_price():
   amazonURL = "https://www.amazon.co.jp/%E7%8B%AC%E7%BF%92Python-%E7%AC%AC2%E7%89%88-%E5%B1%B1%E7%94%B0-%E7%A5%A5%E5%AF%9B/dp/4798189499/ref=sr_1_2_sspa?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=14HN2YME057JE&dib=eyJ2IjoiMSJ9.k9vjhU9qWL_FKiMdVRmMZ8oRwn7Zi3Q6CRggAYCHiZAvCQTRzBXk8_Qr2IjQjEIpfXsKCqOZ9gzb1EKswybDJlTDGruQRq1epClJQkyQQ4eRkHtuDn6sRzSYkss7Qizp0gk1gz3OkRuIlDCS-H_APsKCE4MjMYbE3ZEyrenaI-5q3YMQDGvYs1qKgfoNKxw06gUu5s6PhZZ4GJjCEKIpyPCoBXw9h-ffNJiIQQegPHuvbOHzLlL02lllwZNddPyvpTJffqcJOqHfXHEVIK5A7arXwgq42WdE3o3ZNL9g9Pc.yQl9J4FzAe_j9fZDFQuRBZVA705DZjLgfLS2BqJ4T2c&dib_tag=se&keywords=python&qid=1781896998&sprefix=python%2Caps%2C176&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1"
   amazonPage = requests.get(amazonURL)
    
   soup = BeautifulSoup(amazonPage.content, "html.parser")
    # print(soup)
   title = soup.find(id="productTitle").get_text()
   price = soup.find("span", class_="a-price-whole").get_text()
   price = int(price.replace(",", ""))
   print(price)
   print(title.strip())
    
  
   
   

# new=>
def start():
   """
   Scheduling data update
   Run update function once every 12 seconds
   """
   scheduler = BackgroundScheduler()
   
   scheduler.add_job(update, 'interval', seconds=12) # schedule args=[i]
   
   scheduler.start()