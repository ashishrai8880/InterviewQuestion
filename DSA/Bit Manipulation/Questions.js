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


// ===================================================== 5. Set rightmost unset bits ================================================================
function setRightmostUnsetBit(n) {
    // OR with n+1 sets the rightmost 0 to 1
    return n | (n + 1);
}

// ====================================================== 6. Swap two number =========================================================================
// GFG : https://www.geeksforgeeks.org/problems/swap-two-numbers3844/1
class Solution {
    get(a, b) {
        // code here
        a= a ^ b ;
        b = a ^ b ;
        a = a ^ b ;
        return [a,b]
    }
}


// ===================================================== Divide two numbers =====================================================================
/**
Leetcode : https://leetcode.com/problems/divide-two-integers/
 */
var divide = function(dividend, divisor) {
    
        if (dividend === divisor) return 1;
        if (dividend === -Math.pow(2, 31) && divisor === -1) return Math.pow(2, 31) - 1;
        if (divisor === 1) return dividend;
        
        let isPositive = true;
        
        if (dividend >= 0 && divisor < 0) 
            isPositive = false;
        else if (dividend < 0 && divisor > 0)
            isPositive = false;
            
        let n = Math.abs(dividend);
        let d = Math.abs(divisor);
        
        let ans = 0, sum = 0;
        
        while (sum + d <= n) {
            ans++;
            sum += d;
        }
        
        if (ans > 2147483647 && isPositive) 
            return 2147483647;
        if (ans > 2147483647 && !isPositive)
            return -2147483648;
        
        return isPositive ? ans : -1 * ans;
};
















