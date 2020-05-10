import random
import math

num = random.randint(1,10)

if num>math.pi:
    zhouChang = num * math.pi
    mianJI = math.pi * (num/2) ** 2
else:
    zhouChang = 2 * num *math.pi
    mianJI = math.pi* pow(num,2)

print(round(zhouChang,2),round(mianJI,2))
print(num)