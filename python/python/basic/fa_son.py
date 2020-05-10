class WuLi:
    def __init__(self, name):
        self.name = name

class LiLun(WuLi):
    def sea(self, str):
            print("i am ", str)

class ShiYan(WuLi):
    def flyy(self, str1):
        print("i am ",str1)

zw = LiLun('zw')
yj = ShiYan('fly')

aaa = zw.sea('zzzzz')
bbb = yj.flyy('dddddd')

print(aaa)
print('----------------')
print(bbb)
