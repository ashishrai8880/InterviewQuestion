// ========================================================== 1. Minimum Bit Flips ==========================================================================
// Leetcode : https://leetcode.com/problems/minimum-bit-flips-to-convert-number/
/**
Brute Force
 */
var minBitFlips = function(start, goal) {
    const startBinary = start.toString(2).padStart(32 , '0');
    const goalBinary = goal.toString(2).padStart(32,'0');
    let count = 0 ;
    for(let i=0 ; i<32 ; i++){
        if(startBinary[i] != goalBinary[i]){
            count++ ;
        }
    }
    return count ;
};

// Optimize approach 
/**
Logic : Do XOR of start and goal , after xor , it will give 0 when bits are same , otherwise give 1 when bit is different . 
So at last , just count number of set bits . 
 */
var minBitFlips = function(start, goal) {
    let count = 0 ;
    let num = start ^ goal ;  // xor , because same bit will give 0 and different bit will give 1 .

    while(num > 0){
        if(num & 1 == 1){
            count++ ;
        }
        num = num>>1 ;
    }
    return count ;
};


// ============================================================ 2. Single Number in array ==================================================================================
/**
Leetcode : https://leetcode.com/problems/single-number/
 */
var singleNumber = function(nums) {
    let xor = 0 ;
    for(let x of nums){
        xor = xor ^ x ;
    }
    return xor ;
};


// ============================================================3. Power Set ===========================================================================================
// Leetcode : https://leetcode.com/problems/subsets/description/
// Recursive way to find power set 
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    
    const util = (i , subset)=>{
        if(i == nums.length){
            res.push([...subset]);
            return ;
        }

        subset.push(nums[i]);
        util(i+1 , subset);
        subset.pop();
        util(i+1 , subset);
    }

    let res = [];
    let subset = [];
    util(0 , subset );
    return res ;

};

// Bit Manipulation way to find power set 
function getPowerSet(nums) {
    const n = nums.length;
    
    const subsets = 1 << n;
    const ans = [];
    
    for (let num = 0; num < subsets; num++) {
        const subset = [];
        
        for (let i = 0; i < n; i++) {
            if (num & (1 << i)) {
                subset.push(nums[i]);
            }
        }
        ans.push(subset);
    }
    return ans;
}


// ====================================================== 4. XOR between l and r ==============================================================
// Leetcode : https://www.geeksforgeeks.org/problems/find-xor-of-numbers-from-l-to-r/1
/**
Brute Force 
 */

class Solution {
    // Function to find XOR of two numbers without using XOR operator
    findXOR(l, r) {
        // your code here
        let ans = 0 ;
        for(let i = l ; i<=r ; i++){
            ans = ans ^ i ;
        }
        return ans ;
    }

  /*
  Logic : N = 1 = 1 => 1
          N = 2 = 1 ^ 2 => 3 (N + 1)
          N = 3 = 1 ^ 2 ^ 3 => 0 
          N = 4 = 1 ^ 2 ^ 3 ^ 4 => 4 (N)  .... similary for next 4 block , so this is pattern of getting xor in range from 1 to N .

          At last I am doing xor(l-1) ^ xor(r) -> it means . for example l=4 and r=7 . so xor(3) ^ xor(7) => xor(1^2^3) ^ xor(1^2^3^4^5^6^7) . same number 1 , 2 ,3 
          will cross each other and we will left with 4 , 5 , 6, 7 what we wanted .
  */
  findXOROptimized(l, r) {
        // your code here
        const xortillN = (n)=>{
            if (n % 4 === 1) return 1;
            if (n % 4 === 2) return n + 1;
            if (n % 4 === 3) return 0;
            return n;
        }
        
        return xortillN(l-1) ^ xortillN(r);
    }
}


// ===================================================== 5. Find two number appearing odd number of times ============================================================
/**
Leetcode : https://leetcode.com/problems/single-number-iii/
Brute Force Approach 
 */
var singleNumber = function(nums) {
    let obj = {};
    nums.forEach((e)=>{
        obj[e] = obj[e] ? obj[e] + 1 : 1 ;
    })

    let ans = [];
    Object.entries(obj).forEach(([key , val])=>{
        if(val == 1){
            ans.push(parseInt(key));
        }
    })
    return ans ;
};


// ================================================ 6. All Prime factors of a Number =======================================================================
// GFG : https://www.geeksforgeeks.org/problems/prime-factors5052/1
// Brute Force : 
/*
Time Complexity: O(N*sqrt(N)) where N is the input number. We iterate through numbers from 2 to n and inside the loop, we check if a number's factor is prime or not.
To check that, we iterate up to the square root of it giving it a complexity of sqrt(N).
Space Complexity : O(sqrt(N))as the space used by the algorithm depends upon the size of the list to store the prime factors of N. In the worst case, 
the number of factors if N can be the square root of N.
*/

class Solution {
    primeFac(n) {
        // code here

        const isPrimeOptimzed = (num)=>{
            if(num < 2) return false ;
            
            for(let i = 2 ; i*i <= num ; i++){
                if(num % i == 0) return false ;
            }
            return true ;
        }
      
        const isPrime = (num)=>{
            if(num < 2) return false ;
            
            for(let i = 2 ; i< num ; i++){
                if(num % i == 0) return false ;
            }
            return true ;
        }
        
        let ans = [];
        for(let i=2 ; i<=n ; i++){
            if(n % i == 0){
                if(isPrime(i)){
                    ans.push(i);
                }
            }
        }
        
        return ans ;
    }


  // Super Easy and Super cool . Just find element which is divisible , and keep dividing it until not divisible , store it . 
  primeFacOptimized(n) {
        // code here
        
        let ans = [];
        for(let i=2 ; i<= n ; i++){
            if(n%i == 0){
                ans.push(i);
                
                while(n % i == 0){
                    n = n/i ;
                }
            }
        }
        return ans ;
        
    }
}


// ======================================================== 7. Print All  Divisor of a number ===============================================================
// Brute Force
class Solution {
    // Function to print all the divisors of the given number.
    print_divisors(n) {
        // code here
        let ans = [];
        for(let i = 1 ; i<= n ; i++){
            if(n%i == 0){
                ans.push(i);
            }
        }
        return ans ;
    }
}

// Optimized : Just to check till square root of n ;
print_divisors(n) {
        // code here
        let ans = [];
        for(let i = 1 ; i*i<= n ; i++){
            if(n%i == 0){
                ans.push(i);
                if(n/i != i){
                    ans.push(n/i);
                }
            }
        }
        console.log({ans})
        return ans ;
    }


// ========================================================= 8. Count All Primes ===================================================================================
// Leetcode : https://leetcode.com/problems/count-primes/
// Brute Force : which will throw TLE 
var countPrimes = function(n) {
    const isPrime = (x)=>{
        if(x < 2) return false ;

        for(let i=2 ; i * i <= x ; i++){
            if(x%i == 0) return false
        }
        return true ;
    }

    let ans = 0 ;
    for(let i=2 ; i< n ; i++){
        if(isPrime(i)){
            ans += 1; 
        }
    }
    return ans ;
};


// Optimized way : Sieve of Eratosthenes 
var countPrimesOptimized = function(n) {
    
    let arr = Array.from({length : n },()=> true);
    arr[0] = arr[1] = false ;

    for(let i=2 ; i<= n ; i++){
        if( arr[i] == true ){

            for(let j=i+i ; j <= n ; j=j+i){
                arr[j] = false ;
            }
        }
    }

    let ans = 0 ;
    arr.forEach((e)=>{
        if(e == true){
            ans += 1 ;
        }
    })
    return ans ;

};









