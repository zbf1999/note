while True:
    try:
        a = float(input('first number:'))
        b = float(input('second number:'))
        r = a /b
        print("{0} / {1} = {2}".format(a, b, r))
        break
    except (ZeroDivisionError, ValueError):
        print("hahahahaha")
    #except ValueError:
    #    print("lalalalala")
    except:
        break