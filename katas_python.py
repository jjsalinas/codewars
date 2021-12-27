 # codewars.com katas - bits of knowledge obtained - python
 # For the methods in this file we assume the input is always valid

# Narcissistic number: it's value is equal to each figure powered to the number's lenght. For example: 153 = 1**3 + 5**3 + 3**3
def narcissistic(value: int) -> bool: # Positive integers only
    return value == sum(int(x) ** len(str(value)) for x in str(value))

# Capitalize all words in a given (non-empty) string 
def toJadenCase(tweet: str) -> str:
    #return " ".join(w.capitalize() for w in tweet.split())
    # ' '.join([w[0].upper()+w[1:] for w in tweet.split(' ')])

    # top solution
    import string
    return string.capwords(tweet) # Nice #top

# Gives the number of characters (case insensitive) that appear more than once in a string
def duplicate_count(text: str) -> int:
    # return sum(1 for c in set(text.lower()) if text.lower().count(c) > 1)
    return len([c for c in set(text.lower()) if text.lower().count(c) > 1]) #top solution


# Return a list of items without any elements with the same value next to each other 
# and preserving the original order of elements
def unique_in_order(iterable):
    # result = []
    # for index, value in enumerate(iterable):
    #     if index == 0:
    #         result.append(value)
    #     elif value != iterable[index-1]:
    #         result.append(value)
    # return result

    # top solution
    from itertools import groupby
    return [k for (k, _) in groupby(iterable)]    


###############################
"""
https://www.codewars.com/kata/525f3eda17c7cd9f9e000b39/train/python

We want to write calculations using functions and get the results. Let's have a look at some examples:
    seven(times(five())) # must return 35
    four(plus(nine())) # must return 13

There must be a function for each number from 0 ("zero") to 9 ("nine")
There must be a function for each of the following mathematical operations: plus, minus, times, divided_by
Each calculation consist of exactly one operation and two numbers
The most outer function represents the left operand, the most inner function represents the right operand
Division should be integer division
"""

# My solution
"""
def zero(op=None):
    if op:
        return op(0)
    else:
        return 0
    
def one(op=None): 
    if op:
        return op(1)
    else:
        return 1

def two(op=None): 
    if op:
        return op(2)
    else:
        return 2

def three(op=None):
    if op:
        return op(3)
    else:
        return 3

def four(op=None): 
    if op:
        return op(4)
    else:
        return 4

def five(op=None):
    if op:
        return op(5)
    else:
        return 5

def six(op=None):
    if op:
        return op(6)
    else:
        return 6

def seven(op=None):
    if op:
        return op(7)
    else:
        return 7

def eight(op=None):
    if op:
        return op(8)
    else:
        return 8

def nine(op=None):
    if op:
        return op(9)
    else:
        return 9


def plus(value):
    return lambda x: x + value

def minus(value):
    return lambda x: x - value

def times(value):
    return lambda x: x * value

def divided_by(value):
    return lambda x: int(x/value)
"""
######################
"""Another solution"""
"""
id_ = lambda x: x
number = lambda x: lambda f=id_: f(x)
zero, one, two, three, four, five, six, seven, eight, nine = map(number, range(10))
plus = lambda x: lambda y: y + x
minus = lambda x: lambda y: y - x
times = lambda x: lambda y: y * x
divided_by = lambda x: lambda y: int(y / x)
"""

# print('two(plus(one()) =', two(plus(one())))
# print('three(time(four()) =', three(times(four())))
# print('eight(divided_by(three()) =', eight(divided_by(three())))
# print('seven(minus(five()) =', seven(minus(five())))
###############################
