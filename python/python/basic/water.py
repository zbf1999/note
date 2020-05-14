for i in range(100, 1000):
    litter = i % 10
    mid = i // 10%10
    max = i //100
    if litter**3 + mid**3 + max**3 == i:
        print(i)
    