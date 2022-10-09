// KATAS TYPESRIPT

// Your task is to write a function that takes a string and return a new string with all vowels removed.
// For example, the string "This website is for losers LOL!" would become "Ths wbst s fr lsrs LL!".
// Note: for this kata y isn't considered a vowel.
function disemvowel(str: string): string {
  return str.replace(/[aeiouA]/gi, '');
}

/**********************/
//   Your task is to sort a given string. Each word in the string will contain a single number. This number is the position the word should have in the result.
//   Note: Numbers can be from 1 to 9. So 1 will be the first word (not 0).
//   If the input string is empty, return an empty string. The words in the input String will only contain valid consecutive numbers.
// "is2 Thi1s T4est 3a"  -->  "Thi1s is2 3a T4est"
// "4of Fo1r pe6ople g3ood th5e the2"  -->  "Fo1r the2 g3ood 4of th5e pe6ople"

// My solution
function order(words: string): string {
  const singleWords = words.split(' ');
  const pairs: { [numVal: number]: string } = {};
  for (const w of singleWords) {
    const v = w.replace(/[a-z]/gi, '');
    pairs[Number(v)] = w;
  }
  return Object.values(pairs).join(' ');
}
// console.log(order('is2 Thi1s T4est 3a'));
// console.log(order('4of Fo1r pe6ople g3ood th5e the2'));

// Solution TOP
// export function order(words:String):String{
//     return words.split(' ')
//                 .sort((a,b)=> +a.match(/\d/)-+b.match(/\d/))
//                 .join(' ')
//   }

/**************************/
// In a factory a printer prints labels for boxes. 
// For one kind of boxes the printer has to use colors which, for the sake of simplicity, are named with letters from a to m.
// The colors used by the printer are recorded in a control string. 
// For example a "good" control string would be aaabbbbhaijjjm meaning that the printer used three times color a, 
// four times color b, one time color h then one time color a...
// Sometimes there are problems: lack of colors, technical malfunction and a "bad" control string is produced 
// e.g. aaaxbbbbyyhwawiwjjjwwm with letters not from a to m.
// You have to write a function printer_error which given a string will return the error rate of the printer 
// as a string representing a rational whose numerator is the number of errors and the denominator the length of the control string. 
// Don't reduce this fraction to a simpler expression.
// The string has a length greater or equal to one and contains only letters from ato z.
/*
s="aaabbbbhaijjjm"
printer_error(s) => "0/14"

s="aaaxbbbbyyhwawiwjjjwwm"
printer_error(s) => "8/22"
*/

function printerError(s: string): string {
  return `${s.replace(/[a-m]/gi, '').length}/${s.length}`;
}

// console.log(printerError('aaabbbbhaijjjm'));
// console.log(printerError('aaaxbbbbyyhwawiwjjjwwm'));
/*********************/
/*
An isogram is a word that has no repeating letters, consecutive or non-consecutive. 
Implement a function that determines whether a string that contains only letters is an isogram. 
Assume the empty string is an isogram. Ignore letter case.

Example: (Input --> Output)
"Dermatoglyphics" --> true "aba" --> false "moOse" --> false (ignore letter case)
*/

function isIsogram(str: string): boolean {
  const lowerCasedParam = str.toLowerCase();
  return lowerCasedParam.split('').every(char => lowerCasedParam.indexOf(char) === lowerCasedParam.lastIndexOf(char));

  // Top solution
  // return (new Set(str.toLowerCase())).size === str.length
}

// console.log(isIsogram('hola'))
// console.log(isIsogram('holaaaholaa'))


/****************************************/

/*
You are given an array (which will have a length of at least 3, but could be very large) containing integers. 
The array is either entirely comprised of odd integers or entirely comprised of even integers except for a single integer N. 
Write a method that takes the array as an argument and returns this "outlier" N.

Examples
[2, 4, 0, 100, 4, 11, 2602, 36]
Should return: 11 (the only odd number)

[160, 3, 1719, 19, 11, 13, -21]
Should return: 160 (the only even number)
*/

export function findOutlier(integers: number[]): number {
  const mod0 = integers.filter(n => Math.abs(n % 2) === 0);
  const mod1 = integers.filter(n => Math.abs(n % 2) === 1);
  return mod0.length === 1 ? mod0[0] : mod1[0]
  // return res;
}
// console.log(findOutlier([2, 4, 0, 100, 4, 11, 2602, 36]))
// console.log(findOutlier([160, 3, 1719, 19, 11, 13, -21]))
// console.log(findOutlier([-79969418,27012428,-24511592,20201370,14913486,-146145910,156991450,165468560,-34003430,-16979696,125590506,-123161908,-2511186,-87639998,23893582,29594342,105273480,-173105944,-24591226,-124726280,146605998,-139514028,162809614,188411438,-42920520,-183301326,-50582017,98154018,12277766,91856362,-1483618,110451128,-39675624,-179795138,-178038722,191892004,97358254,-56760722,12548372,-185148580,-94077456,133763630,114547938,135036936,-127577440,156357294,-98743938,-167286650,-33305348]))

/******************************************************************/

/*
Some numbers have funny properties. For example:

89 --> 8¹ + 9² = 89 * 1

695 --> 6² + 9³ + 5⁴= 1390 = 695 * 2

46288 --> 4³ + 6⁴+ 2⁵ + 8⁶ + 8⁷ = 2360688 = 46288 * 51

Given a positive integer n written as abcd... (a, b, c, d... being digits) and a positive integer p

we want to find a positive integer k, if it exists, 
such that the sum of the digits of n taken to the successive powers of p is equal to k * n.
In other words:

Is there an integer k such as : (a ^ p + b ^ (p+1) + c ^(p+2) + d ^ (p+3) + ...) = n * k
If it is the case we will return k, if not return -1.

Note: n and p will always be given as strictly positive integers.
*/

export class G964 {

  public static digPow = (n: number, p: number) => {
    let found = false;
    const digits = Array.from(n.toString(), Number);
    let poweredVal = 0;
    digits.forEach((val, index) => { poweredVal += Math.pow(val, p + index) });

    let k = 1;
    let currentVal = n;
    while (currentVal <= poweredVal) {
      currentVal = n * k;
      if (currentVal === poweredVal) {
        found = true;
        break;
      } else {
        k += 1;
      }
    }

    return found ? k : -1;
  }

  // Top solution
  // public static digPow = (n, p) => {
  //   var x = n.toString().split("").reduce((s, d, i) => s + Math.pow(d, p + i), 0)
  //   return x % n ? -1 : x / n;
  // }

}

// console.log(G964.digPow(89, 1)) // should return 1 since 8¹ + 9² = 89 = 89 * 1
// console.log(G964.digPow(92, 1)) // should return -1 since there is no k such as 9¹ + 2² equals 92 * k
// console.log(G964.digPow(695, 2)) // should return 2 since 6² + 9³ + 5⁴= 1390 = 695 * 2
// console.log(G964.digPow(46288, 3)) // should return 51 since 4³ + 6⁴+ 2⁵ + 8⁶ + 8⁷ = 2360688 = 46288 * 51

/****************************************/

/* 
In a small town the population is p0 = 1000 at the beginning of a year. 
The population regularly increases by 2 percent per year and moreover 50 new inhabitants per year come to live in the town. 
How many years does the town need to see its population greater or equal to p = 1200 inhabitants?

At the end of the first year there will be: 
1000 + 1000 * 0.02 + 50 => 1070 inhabitants

At the end of the 2nd year there will be: 
1070 + 1070 * 0.02 + 50 => 1141 inhabitants (** number of inhabitants is an integer **)

At the end of the 3rd year there will be:
1141 + 1141 * 0.02 + 50 => 1213

It will need 3 entire years.
More generally given parameters:

p0, percent, aug (inhabitants coming or leaving each year), p (population to equal or surpass)
the function nb_year should return n number of entire years needed to get a population greater or equal to p.
aug is an integer, percent a positive or null floating number, p0 and p are positive integers (> 0)

Examples:
nb_year(1500, 5, 100, 5000) -> 15
nb_year(1500000, 2.5, 10000, 2000000) -> 10
Note:
Don't forget to convert the percent parameter as a percentage in the body of your function: 
if the parameter percent is 2 you have to convert it to 0.02.
*/

export const nbYear = (p0: number, percent: number, aug: number, p: number): number => {
  let currentVal = p0;
  const percentVal = percent / 100;

  let years = 0;
  while (currentVal <= p) {
    currentVal += (Math.trunc(currentVal * percentVal) + aug)
    years += 1;
    if (currentVal >= p) {
      break;
    }
  }

  return years;
}

// console.log(nbYear(1000, 2, 50, 1200)) // -> 3
// console.log(nbYear(1500, 5, 100, 5000)) // -> 15
// console.log(nbYear(1500000, 2.5, 10000, 2000000)) // -> 10

/****************************************/

