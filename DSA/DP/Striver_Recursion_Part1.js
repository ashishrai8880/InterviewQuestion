
// =======================================================================1. String To Integer (ATOI) ==========================================================================
/**
 Leetcode : https://leetcode.com/problems/string-to-integer-atoi/


Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.

The algorithm for myAtoi(string s) is as follows:

Whitespace: Ignore any leading whitespace (" ").
Signedness: Determine the sign by checking if the next character is '-' or '+', assuming positivity if neither present.
Conversion: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string 
is reached. If no digits were read, then the result is 0.
Rounding: If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then round the integer to remain in the
range. Specifically, integers less than -231 should be rounded to -231, and integers greater than 231 - 1 should be rounded
to 231 - 1.
Return the integer as the final result.

Example 1:
Input: s = "42"
Output: 42
Explanation:

The underlined characters are what is read in and the caret is the current reader position.
Step 1: "42" (no characters read because there is no leading whitespace)
         ^
Step 2: "42" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "42" ("42" is read in)
           ^
Example 2:
Input: s = " -042"
Output: -42
Explanation:
Step 1: "   -042" (leading whitespace is read and ignored)
            ^
Step 2: "   -042" ('-' is read, so the result should be negative)
             ^
Step 3: "   -042" ("042" is read in, leading zeros ignored in the result)
               ^
Example 3:
Input: s = "1337c0d3"
Output: 1337
Explanation:
Step 1: "1337c0d3" (no characters read because there is no leading whitespace)
         ^
Step 2: "1337c0d3" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "1337c0d3" ("1337" is read in; reading stops because the next character is a non-digit)
             ^
Example 4:
Input: s = "0-1"
Output: 0
Explanation:
Step 1: "0-1" (no characters read because there is no leading whitespace)
         ^
Step 2: "0-1" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "0-1" ("0" is read in; reading stops because the next character is a non-digit)
          ^
Example 5:
Input: s = "words and 987"
Output: 0
Explanation:

Reading stops at the first non-digit character 'w'.
 
 */
var myAtoi = function(s) {
    
    const trimmed = s.trim();
    const first = trimmed[0];
    if( !['+' , '-'].includes(first) && !Number.isInteger(Number(first)) ){
        return 0 ;
    }

    const util = ( i ) => {
        if( !Number.isInteger(Number(trimmed[i])) ||  i== trimmed.length || trimmed[i] == ' ' ){
            return i ;
        }
        
        return util(i+1) ;
    }

    const idx = util(1);
    const INT_MAX = 2 ** 31 -1 ;
    const INT_MIN = -(2 ** 31) ;

    let parsed ;
    if(first == '+'  ){
        if(!Number.isInteger(Number(trimmed[1])) ||  trimmed[1] == ' '   ){
            return 0 ;
        }
        else if(Number.isInteger(Number(trimmed[1]))){
            parsed = parseInt(trimmed.slice(1,idx));
        }
    }
    
    else if(first == '-' ){
        if(!Number.isInteger(Number(trimmed[1]))  ||  trimmed[1] == ' '  ){
            return 0 ;
        }
        else if(Number.isInteger(Number(trimmed[1]))){
            parsed = -parseInt(trimmed.slice(1,idx));
        }
    }
    
    else{
        parsed = parseInt(trimmed.slice(0,idx));
    }

    if(parsed < 0){
        return Math.max(parsed , INT_MIN);
    }
    return Math.min(parsed , INT_MAX);

};

// Easy Approach , no need of above bhasad 
var myAtoi = function(s) {
    
    const trimmed = s.trim();
    const parsed = parseInt(trimmed);
    if(isNaN(parsed)){
        return 0 ;
    }

    const INT_MAX = 2 ** 31 - 1;
    const INT_MIN = -(2 ** 31) ;

    return parsed < 0 ? Math.max(parsed , INT_MIN) : Math.min(parsed , INT_MAX);
};

// ==============================================================2. Count Good Number =========================================================================
// Leetcode : https://leetcode.com/problems/count-good-numbers/

/*
A digit string is good if the digits (0-indexed) at even indices are even and the digits at odd indices are prime 
(2, 3, 5, or 7).

For example, "2582" is good because the digits (2 and 8) at even positions are even and the digits (5 and 2) at 
odd positions are prime. However, "3245" is not good because 3 is at an even index but is not even.
Given an integer n, return the total number of good digit strings of length n. Since the answer may be large, return 
it modulo 109 + 7.

A digit string is a string consisting of digits 0 through 9 that may contain leading zeros.

Example 1:
Input: n = 1
Output: 5
Explanation: The good numbers of length 1 are "0", "2", "4", "6", "8".

Example 2:
Input: n = 4
Output: 400

Example 3:
Input: n = 50
Output: 564908303
 
*/
var countGoodNumbers = function(n) {
    let MOD = BigInt(1e9 + 7);

    function power(a, b) {
        if (b == 0n) {
            return 1n;
        }
        if(b== 1n){
            return a ;
        }
        a = BigInt(a);
        b = BigInt(b);

        if(b % 2n == 0n){
            const res = power(a , b/2n);
            return (res * res ) % MOD ;
        }
        else{
            const res = power(a , (b-1n)/2n);
            return (res * res * a) % MOD ;
        }
    }

    let even = BigInt(Math.floor((n + 1) / 2));
    let odd = BigInt(Math.floor(n / 2));   
    
    let r = ( power(5n, even) * power(4n, odd) ) % MOD;
    return Number(r);
};




