

class DayCheck(object):
    def __init__(self,year=0, month=0, day=0):
        self.year = year
        self.month = month
        self.day = day
    
    @classmethod
    def from_string(cls, date_as_string):
        year, month, day = map(int, date_as_string.split('-'))
        datel = cls(year, month, day)
        return datel

    @staticmethod
    def is_date_valid(date_as_string):
        year, month, day, = map(int, date_as_string.split('-'))
        return day <= 31 and month <= 12 and year <= 2038

d = DayCheck.from_string('2019-11-33')
is_date = DayCheck.is_date_valid('2019-11-11')

print(is_date)
