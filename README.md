# Noiseviz

url : [NoiseViz](https://noiseviz.herokuapp.com/)

![Flow gif](https://github.com/jojojoseph94/noiseviz/blob/master/ezgif-1-f265f3943b3c.gif)

A front end application to visualize noise data collected by a mobile application. Written using NodeJS,
Deckgl, Google maps and Bootstrap. The application was deployed on heroku using Github integration. 

The data to be plotted was stored in Mongo Atlas Cloud database. This data was generated using a python script. The data is randomly generated.
## Generating random data
The following python snippet can be used to generate 5000 data samples. This can be imported to a mongo collection using mongo import utility.
````
from datetime import datetime
import random

from random import randrange
from datetime import timedelta

def random_date(start, end):
    """
    This function will return a random datetime between two datetime
    objects.
    """
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = randrange(int_delta)
    return start + timedelta(seconds=random_second)

class measurement:
        def __init__(self,id,date,lat,lon,dec):
                self.id = id
                self.date = date
                self.latitude = lat
                self.longitude = lon
                self.decibel = dec

        def print_(self):
                print "{\n \"id\" : "+str(self.id)+",\n\"date\": \""+self.date+"\",\n\"latitude\": %.4f,\n\"longitude\":%.4f,\n\"decibel\": " % (self.latitude, self.longitude) + str(self.decibel)+"\n},"

id = 0
now = datetime.now()

d1 = datetime.strptime('10/10/2019 1:30 PM', '%m/%d/%Y %I:%M %p')
d2 = datetime.strptime('11/25/2019 4:50 AM', '%m/%d/%Y %I:%M %p')

print "[\n"
for id in xrange(0,5000):
        m = measurement(id,random_date(d1, d2).strftime("%m/%d/%Y %I:%M %p"),random.uniform(37.1501,37.3989),random.uniform(-121.7501,-122.0010),random.randrange(10,140))
        m.print_()
print "{}\n]"
````
## Screenshots
![Landing page](https://github.com/jojojoseph94/noiseviz/blob/master/2019-11-26%20(5).png)
![Scatterplot](https://github.com/jojojoseph94/noiseviz/blob/master/2019-11-26%20(6).png)
![Heatmap](https://github.com/jojojoseph94/noiseviz/blob/master/2019-11-26%20(7).png)
![Filter](https://github.com/jojojoseph94/noiseviz/blob/master/2019-11-26%20(8).png)
