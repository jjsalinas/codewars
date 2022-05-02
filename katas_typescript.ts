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






