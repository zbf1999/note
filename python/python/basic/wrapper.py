def log(func):
    def wrapper(*arg, **kwarg):
        print('this is a log')
        res = func(*arg, **kwarg)
        return res
    return wrapper

#@log
def func():
    print('this is a function')

#func()
log(func)()