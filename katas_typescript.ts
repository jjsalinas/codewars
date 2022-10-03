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
function order(words:string): string {
    const singleWords = words.split(' ');
    const pairs: {[numVal: number]: string} = {};
    for(const w of singleWords){
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

function isIsogram(str: string): boolean{
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
  return mod0.length === 1 ? mod0[0]: mod1[0]
  // return res;
}
// console.log(findOutlier([2, 4, 0, 100, 4, 11, 2602, 36]))
// console.log(findOutlier([160, 3, 1719, 19, 11, 13, -21]))
// console.log(findOutlier([-79969418,27012428,-24511592,20201370,14913486,-146145910,156991450,165468560,-34003430,-16979696,125590506,-123161908,-2511186,-87639998,23893582,29594342,105273480,-173105944,-24591226,-124726280,146605998,-139514028,162809614,188411438,-42920520,-183301326,-50582017,98154018,12277766,91856362,-1483618,110451128,-39675624,-179795138,-178038722,191892004,97358254,-56760722,12548372,-185148580,-94077456,133763630,114547938,135036936,-127577440,156357294,-98743938,-167286650,-33305348]))

/******************************************************************/


