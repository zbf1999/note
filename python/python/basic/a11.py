#笔记
import random
import math

n = random.randint(1,100)
m = math.ceil(10.2)     #11
b = math.floor(10.2)    #10
print(n,m,b)
#列表
#一个列表中含有不同类型的对象   列表的元素可以是列表
x = []
y = list()
n = x.copy()
z = 'capzw'
c = list(z)
a = list(range(1,6,2))
del x   #删除列表x
del y[0]
x.append(4)
y.extend(x)
x.insert(0,'a')
x.remove(1)

d = dict()
for k,v in d.items():
    print(k,v)
d.get("a")
for v in d.values():
    print("a")
for k in d.keys():
    print("a")

if x== 1:
    print('a')
elif x==3:
    print('a')
else:
    print('a')

world = input("请输入一个字符串")
for s in world:
    if s =='T' or 't':
        break
    print(s)
else:
    print("打印正常结束")

