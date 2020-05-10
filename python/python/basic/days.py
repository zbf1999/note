#pip install python-dateutil

import datetime
from dateutil import rrule   

class BetDate:
    def __init__(self, start_date, stop_date):
        self.start = datetime.datetime.strptime(start_date, "%Y, %m, %d")
        self.stop = datetime.datetime.strptime(stop_date, "%Y, %m, %d")
    
    def days(self):
        d = self.stop - self.start
        return d.days if d.days > 0 else False

    def weeks(self):
        weeks = rrule.rrule(rrule.WEEKLY, dtstart = self.start, until = self.stop)
        return weeks.count()

fir_twe = BetDate("2019, 5, 1", "2019, 11, 25")   #实例化对象
d = fir_twe.days()
w = fir_twe.weeks()
print("Between 2019-5-1, 2019-11-25:")
print("Days is:", d)
print("weeks is:", w)