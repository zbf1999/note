import time
from functools import wraps

def timethis(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        func(*args, **kwargs)
        end = time.time()
        print(func._name_, end -start)
    return wrapper

@timethis
def countdown(n):
    while n>0:
        n -= 1

@timethis
def test_list_append():
    lst = []
    for i in range(1000000):
        lst.append(i)

@timethis
def test_list_compre():
    [i for i in range(1000000)]

countdown(1000000)
countdown(100000000)

test_list_append()
test_list_compre()