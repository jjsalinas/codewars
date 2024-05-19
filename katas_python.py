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
from xml.etree.ElementInclude import include


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


"""
Create a RomanNumerals class that can convert a roman numeral to and from an integer value. 
It should follow the API demonstrated in the examples below. 
Multiple roman numeral values will be tested for each helper method.

Modern Roman numerals are written by expressing each digit separately starting with the 
left most digit and skipping any digit with a value of zero. 
In Roman numerals 1990 is rendered: 1000=M, 900=CM, 90=XC; resulting in MCMXC. 
2008 is written as 2000=MM, 8=VIII; or MMVIII. 1666 uses each Roman symbol in descending order: MDCLXVI.

Input range : 1 <= n < 4000

In this kata 4 should be represented as IV, NOT as IIII (the "watchmaker's four").

RomanNumerals.to_roman(1000) # should return 'M'
RomanNumerals.from_roman('M') # should return 1000
I	1
IV	4
V	5
X	10
L	50
C	100
D	500
M	1000

https://www.codewars.com/kata/51b66044bce5799a7f000003/train/python
"""


class RomanNumerals:

    def to_roman(val):
        int_as_list = [v for v in str(val)][::-1]

        units = ""
        unit_val = int(int_as_list[0])
        if unit_val < 4:
            units = "I" * unit_val
        elif unit_val == 4:
            units = "IV"
        elif unit_val < 9:
            units = "V" + "I" * (unit_val - 5)
        elif unit_val == 9:
            units = "IX"
        else:
            units = ""

        decs = ""
        if len(int_as_list) > 1:
            dec_val = int(int_as_list[1])
            if dec_val < 4:
                decs = "X" * dec_val
            elif dec_val == 4:
                decs = "XL"
            elif dec_val < 9:
                decs = "L" + "X" * (dec_val - 5)
            elif dec_val == 9:
                decs = "XC"
            else:
                decs = ""

        cents = ""
        if len(int_as_list) > 2:
            cents_val = int(int_as_list[2])
            if cents_val < 4:
                cents = "C" * cents_val
            elif cents_val == 4:
                cents = "CD"
            elif cents_val < 9:
                cents = "D" + "C" * (cents_val - 5)
            elif cents_val == 9:
                cents = "CM"
            else:
                cents = ""

        thousands = ""
        if len(int_as_list) > 3:
            thousands_val = int(int_as_list[3])
            if thousands_val < 4:
                thousands = "M" * thousands_val
            else:
                thousands = ""

        return thousands + cents + decs + units

    def from_roman(roman_num):
        # simbols = ['I', 'V', 'X', 'L', 'C', 'D', 'M']
        # simbols_values = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000 }

        val_as_list = [i for i in str(roman_num)]

        thousands_count = 0
        for i in val_as_list:
            if i == "M":
                thousands_count += 1
            else:
                break

        cents_count = 0
        advance = thousands_count - 1 if thousands_count > 0 else 0
        sub_list = val_as_list[(thousands_count - 1 if thousands_count > 0 else 0) :]
        for id, val in enumerate(sub_list):
            if val == "C" and id > 0 and sub_list[id - 1] == "X":
                break
            elif val == "C" and id < len(sub_list) - 1 and sub_list[id + 1] == "M":
                cents_count = 9
                advance += 2
                break
            elif val == "C" and id < len(sub_list) - 1 and sub_list[id + 1] == "D":
                cents_count = 4
                advance += 2
                break
            elif val == "D":
                cents_count = 5
                advance += 1
            elif val == "C" and id < len(sub_list) - 1 and sub_list[id + 1] == "C":
                cents_count += 1
                advance += 1
            elif val == "C" and (
                (id < len(sub_list) - 1 and sub_list[id + 1] != "C")
                or id == len(sub_list) - 1
            ):
                cents_count += 1
                advance += 1
                break
            else:
                pass

        decs_count = 0
        sub_list = val_as_list[(advance - 1 if advance > 0 else 0) :]
        for id, val in enumerate(sub_list):
            if val == "X" and id > 0 and sub_list[id - 1] == "I":
                break
            elif val == "X" and id < len(sub_list) - 1 and sub_list[id + 1] == "C":
                decs_count = 9
                advance += 2
                break
            elif val == "X" and id < len(sub_list) - 1 and sub_list[id + 1] == "L":
                decs_count = 4
                advance += 2
                break
            elif val == "L":
                decs_count = 5
                advance += 1
            elif val == "X" and id < len(sub_list) - 1 and sub_list[id + 1] == "X":
                decs_count += 1
                advance += 1
            elif val == "X":
                decs_count += 1
                advance += 1
                break
            else:
                pass

        units_count = 0
        sub_list = val_as_list[(advance - 1 if advance > 0 else 0) :]
        if "I" in sub_list or "V" in sub_list:
            for id, val in enumerate(sub_list):
                if val == "I" and id < len(sub_list) - 1 and sub_list[id + 1] == "X":
                    units_count = 9
                    break
                elif val == "I" and id < len(sub_list) - 1 and sub_list[id + 1] == "V":
                    units_count = 4
                    break
                elif val == "V":
                    units_count = 5
                elif val == "I" and id < len(sub_list) - 1 and sub_list[id + 1] == "I":
                    units_count += 1
                elif val == "I" and id == len(sub_list) - 1:
                    units_count += 1
                else:
                    pass

        return (
            thousands_count * 1000 + cents_count * 100 + decs_count * 10 + units_count
        )


################
# top solution
import string
from collections import OrderedDict


class RomanNumerals:
    @classmethod
    def to_roman(self, num):
        conversions = OrderedDict(
            [
                ("M", 1000),
                ("CM", 900),
                ("D", 500),
                ("CD", 400),
                ("C", 100),
                ("XC", 90),
                ("L", 50),
                ("XL", 40),
                ("X", 10),
                ("IX", 9),
                ("V", 5),
                ("IV", 4),
                ("I", 1),
            ]
        )
        out = ""
        for key, value in conversions.iteritems():
            while num >= value:
                out += key
                num -= value
        return out

    @classmethod
    def from_roman(self, roman):
        conversions = OrderedDict(
            [
                ("CM", 900),
                ("CD", 400),
                ("XC", 90),
                ("XL", 40),
                ("IX", 9),
                ("IV", 4),
                ("M", 1000),
                ("D", 500),
                ("C", 100),
                ("L", 50),
                ("X", 10),
                ("V", 5),
                ("I", 1),
            ]
        )
        out = 0
        for key, value in conversions.iteritems():
            out += value * roman.count(key)
            roman = string.replace(roman, key, "")
        return out


################################################
# print('XXI -->:', from_roman('XXI'))
# print('IV -->:', from_roman('IV'))
# print('MMVIII -->:', from_roman('MMVIII'))
# print('MDCLXVI -->:', from_roman('MDCLXVI'))
# print('----------------')
# print('2567 -->:', to_roman(2567))
# print('734 -->:', to_roman(734))
# print('3851 -->:', to_roman(3851))
# print('CCCXVII -->:', from_roman('CCCXVII'))
# print('DCXIX -->:', from_roman('DCXIX'))
# print('XCVIII -->:', from_roman('XCVIII'))
# print('MMCCC -->:', from_roman('MMCCC'))

# --------------------------------------------------------#
# --------------------------------------------------------#

"""
In this kata you have to create all permutations of a non empty input string and remove duplicates, if present. This means, you have to shuffle all letters from the input in all possible orders.

Examples:

* With input 'a'
* Your function should return: ['a']
* With input 'ab'
* Your function should return ['ab', 'ba']
* With input 'aabb'
* Your function should return ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']

"""
from itertools import permutations as iter_permutations


def permutations(s):
    if len(s) == 1:
        return [s]
    else:
        return list(set(["".join(p) for p in iter_permutations(s)]))


# print(permutations('a')) # [a]
# print(permutations('ab')) # [ab], [ba]
# print(permutations('aabb')) # ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']

# --------------------------------------------------------#
# --------------------------------------------------------#

"""
write a function that returns the positions and the values of the "peaks" (or local maxima) of a numeric array.

For example, the array arr = [0, 1, 2, 5, 1, 0] has a peak at position 3 with a value of 5 (since arr[3] equals 5).

The output will be returned as an object with two properties: pos and peaks. Both of these properties should be arrays. 
If there is no peak in the given array, then the output should be {pos: [], peaks: []}.

Example: pickPeaks([3, 2, 3, 6, 4, 1, 2, 3, 2, 1, 2, 3]) should return {pos: [3, 7], peaks: [6, 3]} (or equivalent in other languages)

All input arrays will be valid integer arrays (although it could still be empty), so you won't need to validate the input.

The first and last elements of the array will not be considered as peaks 
(in the context of a mathematical function, we don't know what is after and before and therefore, we don't know if it is a peak or not).

Also, beware of plateaus !!! [1, 2, 2, 2, 1] has a peak while [1, 2, 2, 2, 3] and [1, 2, 2, 2, 2] do not. 
In case of a plateau-peak, please only return the position and value of the beginning of the plateau. 

For example: pickPeaks([1, 2, 2, 2, 1]) returns {pos: [1], peaks: [2]} (or equivalent in other languages)
"""


def pick_peaks(arr):
    result = {"pos": [], "peaks": []}
    if len(arr) == 0:
        return result

    local_max = (2, arr[2])
    for id, val in enumerate(arr):
        if id > 0 and id < len(arr) - 1:
            if arr[id - 1] < val and arr[id + 1] < val:
                result["pos"].append(id)
                result["peaks"].append(val)

            if arr[id - 1] < val and arr[id + 1] <= val:
                local_max = (id, val)

            if arr[id - 1] == val and arr[id + 1] < val and local_max[1] == val:
                result["pos"].append(local_max[0])
                result["peaks"].append(local_max[1])
    return result


# print(pick_peaks([3, 2, 3, 6, 4, 1, 2, 3, 2, 1, 2, 3])) # {pos: [3, 7], peaks: [6, 3]}
# print(pick_peaks([3,2,3,6,4,1,2,3,2,1,2,2,2,1]), {"pos":[3,7,10], "peaks":[6,3,2]})
# print(pick_peaks([2,1,3,1,2,2,2,2,1]), {"pos":[2,4], "peaks":[3,2]})

# --------------------------------------------------------#
# --------------------------------------------------------#

"""
https://www.codewars.com/kata/546d15cebed2e10334000ed9/train/python

[number][op][number]=[number]
He has converted all of the runes he knows into digits. 
The only operators he knows are addition (+),subtraction(-), and multiplication (*), so those are the only ones that will appear. 
Each number will be in the range from -1000000 to 1000000, and will consist of only the digits 0-9, possibly a leading -, and maybe a few ?s. 
If there are ?s in an expression, they represent a digit rune that the professor doesn't know (never an operator, and never a leading -). 
All of the ?s in an expression will represent the same digit (0-9), and it won't be one of the other given digits in the expression. 
No number will begin with a 0 unless the number itself is 0, therefore 00 would not be a valid number.

Given an expression, figure out the value of the rune represented by the question mark. 
If more than one digit works, give the lowest one. 
If no digit works, well, that's bad news for the professor - it means that he's got some of his runes wrong. output -1 in that case.

Complete the method to solve the expression to find the value of the unknown rune. 
The method takes a string as a paramater repressenting the expression and will return an int value representing the unknown rune or -1 if no such rune exists.


"""
import re


def solve_runes(runes: str) -> int:
    operations = ["+", "-", "*"]
    operator_index = -1
    result_operator_index = runes.index("=")
    current_operation = None
    missing_digit = -1
    question_marks_pattern = r"^\?{2,}$"

    
    runes_to_find_op = runes
    initial_negative_char = False
    if runes[0] == '-':
        initial_negative_char = True
        runes_to_find_op = runes[1:]

    for operator in operations:
        if operator in runes_to_find_op:
            operator_index = runes_to_find_op.index(operator)
            current_operation = operator

    first_value = runes[0:operator_index]
    second_value = runes[operator_index + 1 : result_operator_index]
    result_value = runes[result_operator_index + 1 :]

    possible_digits = [digit for digit in range(0, 10) if not str(digit) in runes]

    print('##############')
    print('##############')
    print('##############')
    print('runes', runes)
    print('runes_to_find_op', runes_to_find_op)
    print('current_operation', current_operation)
    print('first_value', first_value)
    print('second_value', second_value)
    print('result_value', result_value)

    for digit in possible_digits:
        # Skip 0 as a value if any part in the runes is only questions marks (plural, >1)
        if digit == 0 and (
            bool(re.match(question_marks_pattern, first_value))
            or bool(re.match(question_marks_pattern, second_value))
            or bool(re.match(question_marks_pattern, result_value))
        ):
            continue

        if missing_digit != -1:
            break
        str_digit = str(digit)
        temp_first = int(first_value.replace("?", str_digit))
        temp_second = int(second_value.replace("?", str_digit))
        temp_result = int(result_value.replace("?", str_digit))

        if current_operation == "+":
            result_to_check_against = temp_first + temp_second
        if current_operation == "-":
            result_to_check_against = temp_first - temp_second
        if current_operation == "*":
            result_to_check_against = temp_first * temp_second

        if temp_result == result_to_check_against:
            missing_digit = digit
            break

    return missing_digit


# solve_runes_inputs = [
#     "1+1=?",
#     "123*45?=5?088",
#     "-5?*-1=5?",
#     "19--45=5?",
#     "??*??=302?",
#     "?*11=??",
#     "??*1=??",
# ]
solve_runes_inputs = [
    # "123?45*?=?",
    # "?*123?45=?",
    # "123?45+?=123?45",
    # "123?45-?=123?45",
    "-7715?5--484?00=-28?9?5",
]
for solve_runes_input in solve_runes_inputs:
    print(solve_runes_input, "--:", solve_runes(solve_runes_input))
# print("?*11=??", "--:", solve_runes("?*11=??"))
# print("??*1=??", "--:", solve_runes("??*1=??"))

# '123?45*?=?' : -1 should equal 0
# '?*123?45=?' : -1 should equal 0
# '123?45+?=123?45' : -1 should equal 0
# '123?45-?=123?45' : -1 should equal 0