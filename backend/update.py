# (update.py)
from datetime import datetime

from apscheduler.schedulers.background import BackgroundScheduler
count = 0
def update():
   """
   This function is called by start() below
   """
   global count
   count +=1
   print('Update!',count)
   
   

# new=>
def start():
   """
   Scheduling data update
   Run update function once every 12 seconds
   """
   scheduler = BackgroundScheduler()
   
   scheduler.add_job(update, 'interval', seconds=12) # schedule args=[i]
   
   scheduler.start()