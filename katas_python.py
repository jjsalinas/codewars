# codewars.com katas - bits of knowledge obtained - python
# For the methods in this file we assume the input is always valid

# Narcissistic number: it's value is equal to each figure powered to the number's lenght. For example: 153 = 1**3 + 5**3 + 3**3
def narcissistic(value: int) -> bool:  # Positive integers only
    return value == sum(int(x) ** len(str(value)) for x in str(value))


# Capitalize all words in a given (non-empty) string
def toJadenCase(tweet: str) -> str:
    # return " ".join(w.capitalize() for w in tweet.split())
    # ' '.join([w[0].upper()+w[1:] for w in tweet.split(' ')])

    # top solution
    import string

    return string.capwords(tweet)  # Nice #top


# Gives the number of characters (case insensitive) that appear more than once in a string
def duplicate_count(text: str) -> int:
    # return sum(1 for c in set(text.lower()) if text.lower().count(c) > 1)
    return len(
        [c for c in set(text.lower()) if text.lower().count(c) > 1]
    )  # top solution


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

# Takes in a positive parameter num and returns its multiplicative persistence,
# which is the number of times you must multiply the digits in num until you reach a single digit.
# 39 --> 3 (because 3*9 = 27, 2*7 = 14, 1*4 = 4 and 4 has only one digit)
# 4 --> 0 (because 4 is already a one-digit number)

# My solution
def persistence(n):
    cont = 0
    if n < 10:
        return cont
    else:
        from functools import reduce

        new_value = n
        while new_value > 9:
            digits = [int(d) for d in str(new_value)]
            new_value = reduce(lambda x, y: x * y, digits)
            cont += 1
    return cont


# solution top
# import operator
# from functools import reduce
# def persistence(n):
#     cont = 0
#     while n>=10:
#         n=reduce(operator.mul,[int(x) for x in str(n)],1)
#         cont+=1
#     return cont

# print('persistence(39) =', persistence(39))
# print('persistence(4) = ', persistence(4))
#############################################

"""
Build Tower by the following given argument:
number of floors (integer and always greater than 0).

3 floors looks like
[
  '  *  ', 
  ' *** ', 
  '*****'
]
"""
# My solution
# def n_floor(n, total_floors):
#     return (total_floors - n) * ' ' + (2*n-1) * '*' + (total_floors - n) * ' '

# def tower_builder(n_floors):
#     return [n_floor(i, n_floors) for i in range(1, n_floors+1)]

# top solution
def tower_builder(n):
    return [("*" * (i * 2 - 1)).center(n * 2 - 1) for i in range(1, n + 1)]


# print('tower_builder(3)')
# [print(f) for f in tower_builder(3)]
# print('tower_builder(6)')
# [print(f) for f in tower_builder(6)]

#############################################


"""
Complete the PaginationHelper class, 
which is a utility class helpful for querying paging information related to an array.

The class is designed to take in an array of values 
and an integer indicating how many items will be allowed per each page. 
The types of values contained within the collection/array are not relevant.

The following are some examples of how this class is used:

helper = PaginationHelper(['a','b','c','d','e','f'], 4)
helper.page_count() # should == 2
helper.item_count() # should == 6
helper.page_item_count(0)  # should == 4
helper.page_item_count(1) # last page - should == 2
helper.page_item_count(2) # should == -1 since the page is invalid

# page_index takes an item index and returns the page that it belongs on
helper.page_index(5) # should == 1 (zero based index)
helper.page_index(2) # should == 0
helper.page_index(20) # should == -1

"""
import math


class PaginationHelper:

    # The constructor takes in an array of items and a integer indicating
    # how many items fit within a single page
    def __init__(self, collection, items_per_page):
        self.data = collection
        self.page_size = items_per_page

    # returns the number of items within the entire collection
    def item_count(self):
        return len(self.data)

    # returns the number of pages
    def page_count(self):
        return math.ceil(len(self.data) / self.page_size)

    # returns the number of items on the current page. page_index is zero based
    # this method should return -1 for page_index values that are out of range
    def page_item_count(self, page_index):
        page_count = self.page_count() - 1  # Minus 1 as page_index is zero based
        if len(self.data) == 0 or page_index > page_count or page_index < 0:
            return -1
        elif page_index == page_count:
            left_overs = len(self.data) % self.page_size
            return left_overs if left_overs > 0 else self.page_size
        else:
            return self.page_size

    # determines what page an item is on. Zero based indexes.
    # this method should return -1 for item_index values that are out of range
    def page_index(self, item_index):
        if len(self.data) == 0 or item_index > len(self.data) - 1 or item_index < 0:
            return -1
        else:
            page = math.ceil(item_index / self.page_size)
            # Adjust as page index is zero based
            return page if item_index % self.page_size == 0 else page - 1


###
# helper = PaginationHelper(["a", "b", "c", "d", "e", "f"], 4)
# helper = PaginationHelper(range(1, 21), 10)
# print("page_count", helper.page_count())  # should == 2
# print("item_count", helper.item_count())  # should == 6
# print("helper.page_item_count(0)", helper.page_item_count(0))  # should == 4
# print("helper.page_item_count(1)", helper.page_item_count(1))  # should == 2
# print("helper.page_item_count(2)", helper.page_item_count(2))  # should == -1

# # page_index takes an item index and returns the page that it belongs on
# print("helper.page_index(5)", helper.page_index(5))  # should == 1
# print("helper.page_index(2)", helper.page_index(2))  # should == 0
# print("helper.page_index(20)", helper.page_index(20))  # should == -1
# print("helper.page_index(-10)", helper.page_index(-10))  # should == -1

# print("helper.page_index(3)", helper.page_index(3))
# print("helper.page_index(4)", helper.page_index(4))
# print("helper.page_index(5)", helper.page_index(5))
# print("helper.page_index(19)", helper.page_index(19))  # should == -1

#############################################
