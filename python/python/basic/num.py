import random
lst = list(range(100))
lst1 = list(range(10))
dic = {}
for i in lst:
    num = random.randint(1,10)
    for j in lst1:
        if num == j+1:
            if num in dic:
                dic[num] += 1
            else:
                dic[num] = 1
            
            
print(dic)