def fib():
    prev, curr = 0, 1
    while True:
        yield prev
        prev, curr = curr, prev +curr

import itertools
print(list(itertools.islice(fib(), 10)))