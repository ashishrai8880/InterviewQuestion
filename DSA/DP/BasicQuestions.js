 // ========================================================================== 1. Find Factorial of a Number ==========================================================================================================
/* 
  if n is a number , then it can be breaken down into n * factorial(n-1) . 
*/
class Solution {
    factorial(n) {
        if(n == 0 || n ==1){
            return 1;
        }
        return n * this.factorial(n-1);
    }
}

// ========================================================================== 2. Sum of array ==========================================================================================================
/* 
  Base condition would be if n ==0 then return that number . Express like arr[n] + arr[n-1] ;
*/
class Solution {
    arraySum(arr) {
        const sumUtil =(n)=>{
            if(n==0){
                return arr[0];
            }
            return arr[n] + sumUtil(n-1)
        }
        return sumUtil(arr.length-1);
    }
}

// =============================================================3. Power of a Number ==============================================================================
// Leetcode : https://leetcode.com/problems/powx-n/
// Brute force Recursion . It can be little bit optimized by just by modulos by Infinity for a large number .
class Solution {
   power(n , pow)   {
        if(pow == 0){
            return 1 ;
        }
        return n * power(n , pow-1);
    }   
}

// Optimized way , 2^8 will be 2^4 * 2 ^ 4 =>  16*16 = 256 which is 2^8 . So instead of callig stack for every number , just reduced it half , and then call it , multiply 
// answer with answer if power is even , if power is odd then multiply answer with answer with single n also . 
class Solution {
   power(n , pow)   {
      if(pow == 0){
           return 1 ;
       }
       
       if(pow % 2 == 0){
           const ans = power(n , pow/2);
           return ans * ans ;
       }
       else{
           const ans = power(n , (pow-1)/2);
           return ans * ans * n ;
       }
    
	       return x * power( x , n-1 );
   }
}

// If power is in negative number and x can also be in negative . My Sollution . 
var myPow = function(x, p) {

    const powUtil = (x , n) => {
        if(n==0){
            return 1 ;
        }
        if(n == 1){
            return x;
        }
        if(n%2 ==0){
            const r = powUtil(x , n/2);
            return r * r ;
        }
        else{
            const r = powUtil(x , Math.floor((n-1)/2)) ;
            return r*r*x ;
        }
    }
    const n = Math.abs(p);
    const res = powUtil(x , n)
    return p >= 0 ? res : 1/res ;
};

// Shortest code 
var myPow = function(x, n, base) {
    if (n === 0) return 1;
    if (n < 0) return 1 / myPow(x, -n);
    if (n % 2 === 0) return myPow(x * x, n / 2);
    return x * myPow(x, n - 1);
};
