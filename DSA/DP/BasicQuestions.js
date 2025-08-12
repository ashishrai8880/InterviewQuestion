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
