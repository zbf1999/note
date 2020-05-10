lst_eng = ['zero','one','two','three','four','five','six','seven','eight','nine']
lst = []

num = input("请输入0-9:")

for i in num:
    eng = lst_eng[int(i)]
    lst.append(eng)

print(lst)