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
