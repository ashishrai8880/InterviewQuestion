//========================================1. Check ith bit set or not ===========================================================================
/**
GFG : https://www.geeksforgeeks.org/problems/check-whether-k-th-bit-is-set-or-not-1587115620/1
 */
class Solution {
    checkKthBit(n, k) {
        const binary = n.toString(2);
        if(k>= binary.length) return false ;
        return binary[binary.length-1 - k] == '1';
    }
    checkKthBitOptimized(n, k) {
          return ((n & (1<<k)) !== 0) ;
      }
    checkKthBitRightShiftOptimized(n, k) {
          return ( (n>>k) & 1) == 1 ;
      }
}

// ====================================================== 2. Check Number is even or odd ==================================================================
/**
GFG : https://www.geeksforgeeks.org/problems/odd-or-even3618/1
 */

class Solution {
    isEven(n) {
        return (n & 1) == 0 ;
    }
}

// ==========================================================3. Check number is power of 2 or not =================================================================
/**
Leetcode : https://leetcode.com/problems/power-of-two/
Brute Force 
 */
var isPowerOfTwo = function(n) {
    const binary = n.toString(2);
    if(binary[0] != '1') return false ;

    let i=1 ;
    for( ; i<binary.length ; i++){
        if(binary[i] == '1') return false ;
    }
    return true ;
};

// Optimize way : just do AND operator with n-1 , if it is 0 , it means it is power of two otherwise not . Eg n = 8 (1000) n-1 7 (111) . 8 & 7 = 0
var isPowerOfTwoOptimize = function(n) {
    return n > 0 && (n & (n-1)) == 0 ;
};


// =============================================================== 4. Count number of set bits =====================================================================
/**
Leetcode : https://leetcode.com/problems/number-of-1-bits/
Brute Force
 */
var hammingWeight = function(n) {
    const binary = n.toString(2);
    let count = 0 ;
    for(let i=0 ; i<binary.length ; i++){
        if(binary[i] == '1'){
            count++ ;
        }
    }
    return count ;
};

// Thoda optimized
var hammingWeightOptimized = function(n) {
    let count = 0 ;
    while(n>0){
        count = count + (n&1);
        n = n >> 1 ;
    }

    return count ;
};

var hammingWeightMoreOptimized = function(n) {
    let count = 0;  
    while (n > 0) {
        n &= (n - 1); 
        count++; 
    }
    return count;
};



















