dic = {'a':39,'b':40,'c':99,'d':100}

def findkv(dct, **kwargs):
    r = {k:v for k,v in kwargs.items() if dct.get(k)==v}
    return r

fr = findkv(dic, a=1, b=40)
print(fr)