import random

num = random.randint(100)
i = 0
while i == 0: 
    user = input("请猜测：")
    if int(user) == num:
        print("good game")
        i = 1
