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


// =============================================================4. Print 1 to n using recursion ====================================================================
// GFG : https://www.geeksforgeeks.org/problems/print-1-to-n-without-using-loops-1587115620/1&selectedLang=python3
printNos(n) {
        let arr = [];
        const printUtil = (a) => {
            if(a==0){
                return ;
            }
            printUtil(a-1);
            arr.push(a);
        }
        printUtil(n);
        console.log(arr.join(' '));
    }

// ========================================================5. Print reverse of string using recursion ===============================================================
// GFG : https://www.geeksforgeeks.org/problems/reverse-a-string/1 . 
// Logice : 'Geeks' -> reverse('eeks') + 'G' ->  reverse('eks') + 'e'  -> reverse('ks') + 'e'  ->  reverse('k') + 's'  ->  reverse('s') + '' ;
class Solution {
    reverseString(s) {
        if(s.length == 0){
            return s ;
        }
        return this.reverseString(s.slice(1)) + s[0];
    }
}

// When there is array , Problem statement at : Leetcode : https://leetcode.com/problems/reverse-string/
var reverseString = function(s) {
    const reverseUtil = (i , j)=>{
        if(i >= j){
            return ;
        }
        [s[i] , s[j]] = [s[j],s[i]];
        reverseUtil(i+1 , j-1);
    }
    reverseUtil(0 , s.length-1 );
};


// ===============================================================6. Largest Element in an array ==================================================================

largest(arr) {
	const largestUtil = (n)=>{
		if(n == 1) return arr[0];
		return Math.max( largestUtil(n-1) , arr[n-1]  )
	}
	return largestUtil(arr.length)
}


// ==============================================================7. Nth Fibonacci Number ============================================================================
// Leetcode : https://leetcode.com/problems/fibonacci-number/
var fib = function(num) {
    let dp =  Array.from({length : num}, ()=>null);
    const fibUtil = (n)=>{
        if(n <=1){
            dp[n] = n ;
            return n ;
        }
        if( dp[n] != null){
            return dp[n];
        }
        dp[n] = fibUtil(n-1)  + fibUtil(n-2)  ;
        return dp[n];
    }
    return fibUtil(num);
};

//=========================================================8. Delete Middle element of stack ===========================================================================
// GFG : https://www.geeksforgeeks.org/problems/delete-middle-element-of-a-stack/1
class Solution {

    deleteMid(s) {
        let mid = Math.ceil((s.length)/2) ;
        
        const deleteUtil = (i)=>{
            if( i+1 == mid){
                s.pop();
                return ;
            }
            let top = s.pop();
            deleteUtil(i-1);
            s.push(top);
        }
        deleteUtil(s.length-1);
        return s; 
    }
}

//================================================================9. Tower of Hanoi ===========================================================================
// GFG : https://www.geeksforgeeks.org/problems/tower-of-hanoi-1587115621/1
// Logic : Its formulae is 2^n - 1 . It is breaking down into small problem . 
towerOfHanoi(n, from, to, aux) {
        let count = 0 ;
        const toi = (num , source , target , helper)=>{
            if(num == 1 ){
                count = count + 1 ;
                return  ;
            }
            toi(num-1 , source , helper , target )
            count = count + 1 ;
            toi(num-1 , helper , target , source)
        }

        toi(n , from , to , aux);
        return count ;  
}

// More clear and optimized code 
towerOfHanoi(n, from, to, aux) {
        let count = 0 ;
        const toi = (num , source , target , helper)=>{
            if(num > 0 ){
                toi(num-1 , source , helper , target )
	            count = count + 1 ;
	            toi(num-1 , helper , target , source)
            }
        }

        toi(n , from , to , aux);
        return count ;  
}


// ==============================================================10. Climbing Stairs ================================================================================
// Leetcode  :  https://leetcode.com/problems/climbing-stairs/  . TC - O(n)  ans space complexity is also linear O(n)
var climbStairs = function(num) {
    let dp = Array.from({length : num},()=>null);
    const util = (n) => {
        if(n<=2){
            dp[n] = n ;
            return n ;
        }
        if(dp[n] != null){
            return dp[n];
        }
        return dp[n] = util(n-1) + util(n-2);
    }
    return util(num);
};

// Optimized way where space complexity would be O(1) and TC - O(n)
function countWays(n) {
    const dp = new Array(n + 1).fill(0);
    // Base cases
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= n; i++)
        dp[i] = dp[i - 1] + dp[i - 2]; 
  
    return dp[n];
}

// We just need last 2 count , so we can remove dp array too by just maintain last 2 variable . This problem is like fibonacci sequence , but in this fib(0) is 1 instead of 0.
function countWays(n) {
    // Base cases
    let prev1 = 1;  // for 0
    let prev2 = 1;   // for 1

    for (let i = 2; i <= n; i++){
		const t = prev1 + prev2;
		prev2 = prev1 ;
		prev1 = t ;	
	}

	return prev1 ;
}





