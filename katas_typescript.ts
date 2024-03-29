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
/*
You probably know the "like" system from Facebook and other pages. People can "like" blog posts, pictures or other items. We want to create the text that should be displayed next to such an item.

Implement the function which takes an array containing the names of people that like an item. It must return the display text as shown in the examples:

[]                                -->  "no one likes this"
["Peter"]                         -->  "Peter likes this"
["Jacob", "Alex"]                 -->  "Jacob and Alex like this"
["Max", "John", "Mark"]           -->  "Max, John and Mark like this"
["Alex", "Jacob", "Mark", "Max"]  -->  "Alex, Jacob and 2 others like this"

Note: For 4 or more names, the number in "and 2 others" simply increases.
*/

export const likes = (a: string[]): string => {
  if (a.length === 0) {
    return "no one likes this";
  } else if (a.length === 1) {
    return `${a[0]} likes this`;
  } else if (a.length === 2) {
    return `${a[0]} and ${a[1]} like this`;
  } else if (a.length === 3) {
    return `${a[0]}, ${a[1]} and ${a[2]} like this`;
  } else {
    return `${a[0]}, ${a[1]} and ${a.length - 2} others like this`;
  }
}

// console.log(likes([])) // "no one likes this"
// console.log(likes(["Peter"])) // "Peter likes this"
// console.log(likes(["Jacob", "Alex"])) // "Jacob and Alex like this"
// console.log(likes(["Max", "John", "Mark"])) // "Max, John and Mark like this"
// console.log(likes(["Alex", "Jacob", "Mark", "Max"])) // "Alex, Jacob and 2 others like this"

/****************************************/

/*
Street Fighter 2 - Character Selection

Selection Grid Layout in text:

| Ryu  | E.Honda | Blanka  | Guile   | Balrog | Vega    |
| Ken  | Chun Li | Zangief | Dhalsim | Sagat  | M.Bison |

Input

the list of game characters in a 2x6 grid;
the initial position of the selection cursor (top-left is (0,0));
a list of moves of the selection cursor (which are up, down, left, right);
Output

the list of characters who have been hovered by the selection cursor after all the moves 
(ordered and with repetition, all the ones after a move, whether successful or not, see tests);

Selection cursor is circular horizontally but not vertically!

Example
fighters = [
  ["Ryu", "E.Honda", "Blanka", "Guile", "Balrog", "Vega"],
  ["Ken", "Chun Li", "Zangief", "Dhalsim", "Sagat", "M.Bison"]
]
initial_position = (0,0)
moves = ['up', 'left', 'right', 'left', 'left']
then I should get:

['Ryu', 'Vega', 'Ryu', 'Vega', 'Balrog']

*/
type Move = 'down' | 'up' | 'right' | 'left'

export function streetFighterSelection(fighters: string[][], position: number[], moves: Move[]) {
  const currentPosition = position;
  const result: string[] = [];

  moves.forEach((newMove: Move) => {
    switch (newMove) {
      case 'up':
        currentPosition[0] !== 0 ? currentPosition[0] -= 1 : currentPosition[0] = 0;
        break;
      case 'down':
        currentPosition[0] !== fighters.length - 1 ? currentPosition[0] += 1 : currentPosition[0];
        break;
      case 'left':
        currentPosition[1] -= 1;
        if (currentPosition[1] < 0) {
          currentPosition[1] = fighters[1].length - 1;
        }
        break;
      case 'right':
        currentPosition[1] = ((currentPosition[1] + 1) % fighters[0].length)
        break;
      default:
        break;
    }
    result.push(fighters[currentPosition[0]][currentPosition[1]]);
  });
  return result;
}

// const fighters: string[][] = [
//   ["Ryu", "E.Honda", "Blanka", "Guile", "Balrog", "Vega"],
//   ["Ken", "Chun Li", "Zangief", "Dhalsim", "Sagat", "M.Bison"]
// ];
// let initialPosition = [0, 0]
// let moves = ['up', 'left', 'right', 'left', 'left'] as Move[]

// console.log(streetFighterSelection(fighters, initialPosition, moves), '| expected: ', ['Ryu', 'Vega', 'Ryu', 'Vega', 'Balrog'])
// moves = ["up","left","down","right","up","left","down","right"];
// console.log(streetFighterSelection(fighters, [0,0], moves), '| expected:',['Ryu', 'Vega', 'M.Bison', 'Ken', 'Ryu', 'Vega', 'M.Bison', 'Ken']);

// Solution using reduce
/*
export function streetFighterSelection(fighters: Array<string[]>, position: number[], moves: string[]) {
  const highlights: string[] = []
  
  moves.reduce(([y, x], move) => {
    switch (move) {
      case 'up': y = Math.max(0, y - 1); break
      case 'down': y = Math.min(fighters.length - 1, y + 1); break
      case 'left': x = x == 0 ? fighters[y].length - 1 : x - 1; break
      case 'right': x = x == fighters[y].length - 1 ? 0 : x + 1; break
    }
    highlights.push(fighters[y][x])
    return [y, x]
  }, position);
  
  return highlights
}
*/


/****************************************/
/*
Write a function, which takes a non-negative integer (seconds) as input and returns the time in a human-readable format (HH:MM:SS)

HH = hours, padded to 2 digits, range: 00 - 99
MM = minutes, padded to 2 digits, range: 00 - 59
SS = seconds, padded to 2 digits, range: 00 - 59
The maximum time never exceeds 359999 (99:59:59)

 */

export function humanReadable(seconds: number): string {
  const s = seconds % 60;
  const m = Math.floor(seconds / 60) % 60;
  const h = Math.floor(seconds / 3600);

  return `${h >= 10 ? h : '0' + h}:${m >= 10 ? m : '0' + m}:${s >= 10 ? s : '0' + s}`;
}

// console.log(humanReadable(0), '00:00:00');
// console.log(humanReadable(5), '00:00:05');
// console.log(humanReadable(60), '00:01:00');
// console.log(humanReadable(86399), '23:59:59');
// console.log(humanReadable(359999), '99:59:59');

/****************************************/

/*
Given two arrays a and b write a function comp(a, b) (orcompSame(a, b)) that checks whether the two arrays have the "same" elements, 
with the same multiplicities (the multiplicity of a member is the number of times it appears). 
"Same" means, here, that the elements in b are the elements in a squared, regardless of the order.

Examples
Valid arrays
a = [121, 144, 19, 161, 19, 144, 19, 11]  
b = [121, 14641, 20736, 361, 25921, 361, 20736, 361]
comp(a, b) returns true because in b 121 is the square of 11, 14641 is the square of 121, 
20736 the square of 144, 361 the square of 19, 25921 the square of 161, and so on. 
It gets obvious if we write b's elements in terms of squares:

a = [121, 144, 19, 161, 19, 144, 19, 11] 
b = [11*11, 121*121, 144*144, 19*19, 161*161, 19*19, 144*144, 19*19]
Invalid arrays
If, for example, we change the first number to something else, comp is not returning true anymore:

a = [121, 144, 19, 161, 19, 144, 19, 11]  
b = [132, 14641, 20736, 361, 25921, 361, 20736, 361]
*/

export function comp(a1: number[] | null, a2: number[] | null): boolean {
  if ((!a1 || !a2) || a1.length !== a2.length) {
    return false;
  }

  const check = a2.map((sqNum: number) => {
    return a1.some((num: number) => {
      return sqNum === num * num
        && a1.filter(a1Value => a1Value === num).length === a2.filter(a2Value => a2Value === sqNum).length
    });
  })

  return check.every((boolCheck: Boolean) => boolCheck === true);
}

// TOP solution
/*
export function comp(a1: number[] | null, a2: number[] | null): boolean {
   if (!(a1 && a2) || a1.length !== a2.length) return false;
   return a1.map(x => x * x).sort().toString() === a2.sort().toString();
}
*/

// let a = [121, 144, 19, 161, 19, 144, 19, 11];
// let b = [11*11, 121*121, 144*144, 19*19, 161*161, 19*19, 144*144, 19*19];
// console.log(comp(a, b)); // expected true

// // a = [123456789, 144, 19, 161, 19, 144, 19, 11];
// // a = [121,144,19,161,19,144,19,11]
// a = [2, 2, 3]
// // b = [11*11, 121*121, 144*144, 19*19, 161*161, 19*19, 144*144, 19*19];
// // b = [121,14641,20736,36100,25921,361,20736,361]
// b = [4, 9, 9]
// console.log(comp(a, b)); // expected false


/****************************************/
/*
https://www.codewars.com/kata/513e08acc600c94f01000001/train/typescript

The rgb function is incomplete. 
Complete it so that passing in RGB decimal values will result in a hexadecimal representation being returned. 
Valid decimal values for RGB are 0 - 255. Any values that fall out of that range must be rounded to the closest valid value.

Note: Your answer should always be 6 characters long, the shorthand with 3 will not work here.

The following are examples of expected output values:
*/

export function rgb(r: number, g: number, b: number): string {
  const rgbSanitazed = [r, g, b].map(v => v < 0 ? v = 0 : v).map(v => v > 255 ? v = 255 : v);
  return rgbSanitazed.map(v => v.toString(16)).map(vs => Number(vs) < 10 ? '0' + vs : vs).join('').toUpperCase();
}

// console.log('rgb(255, 255, 255)', rgb(255, 255, 255)) // returns FFFFFF
// console.log('rgb(0,0,0)', rgb(0,0,0)) // returns 000000
// console.log('rgb(148, 0, 211)', rgb(148, 0, 211)) // returns 9400D3

/****************************************/
/**
 * According to Wikipedia, ROT13 is frequently used to obfuscate jokes on USENET.
 * For this task you're only supposed to substitute characters. 
 * Not spaces, punctuation, numbers, etc.
 * http://en.wikipedia.org/wiki/ROT13
 * 
 * "EBG13 rknzcyr." -> "ROT13 example."
 * "This is my first ROT13 excercise!" -> "Guvf vf zl svefg EBG13 rkprepvfr!"
 * 
 */

function rot13(input: string): string {
  const alphabetRegex = /[a-z]/i;
  const inputArray = Array.from(input);
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));

  inputArray.forEach((letter: string, index: number) => {
    if (alphabetRegex.test(letter)) {
      const letterIndex = alphabet.indexOf(letter.toLocaleLowerCase());
      const rotatedLetter = alphabet[(letterIndex+13) % 26]
      inputArray.splice(index, 1, letter === letter.toUpperCase() ? rotatedLetter.toUpperCase() : rotatedLetter)
    }
  })
  return inputArray.join('');
}


// console.log(rot13('Esto es una prueba'))
// console.log(rot13('Rfgb rf han cehron'))

// TOP Solution
/*
export function rot13(str: string): string {
  return str.replace(/[a-z]/gi, l => String.fromCharCode(l.charCodeAt(0) + (l.toLowerCase() <= 'm' ? 13 : -13)));
}
*/


/****************************************/
