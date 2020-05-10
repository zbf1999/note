def convert(s):
    lst = [i.upper() if i==i.lower() else i.lower() for i in s]
    return "".join(lst)

s = 'hello'
c = convert(s)
print(c)