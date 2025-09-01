// =============================================================================== 1. Balanced K Factor Decomposition ===========================================================================

/**
Leetcode : https://leetcode.com/problems/balanced-k-factor-decomposition/description/
Given two integers n and k, split the number n into exactly k positive integers such that the product of these integers is equal to n.
Return any one split in which the maximum difference between any two numbers is minimized. You may return the result in any order.

Example 1:
Input: n = 100, k = 2
Output: [10,10]
Explanation:
The split [10, 10] yields 10 * 10 = 100 and a max-min difference of 0, which is minimal.

Example 2:
Input: n = 44, k = 3
Output: [2,2,11]
Explanation:
Split [1, 1, 44] yields a difference of 43
Split [1, 2, 22] yields a difference of 21
Split [1, 4, 11] yields a difference of 10
Split [2, 2, 11] yields a difference of 9
Therefore, [2, 2, 11] is the optimal split with the smallest difference 9.

 

Constraints:

4 <= n <= 105
2 <= k <= 5
k is strictly less than the total number of positive divisors of n.
 */
var minDifference = function(n, k) {
    
    // find divisor of n 
    let divisor = [];
    for(let i=1 ; i*i<=n ; i++){
        if(n%i==0){
            divisor.push(i);
            if(i*i < n){
                divisor.push(n/i);
            }
        }
    }

    const util = (num , i ,  subset , kLimit)=>{

        if(kLimit == 0){
            if(num == 1){
                subset.sort((a,b)=>a-b);
                const diff = subset[subset.length-1] - subset[0];
                if(diff < maxDiff){
                    maxDiff = diff ;
                    ans = [...subset];
                }
            }
            return ;
        }

        for(let j=i ; j<divisor.length ; j++){
            if(num % divisor[j] == 0){
                util( num/divisor[j] , j , [...subset , divisor[j]]  ,  kLimit-1  );
            }
        }

    }

    let ans = [];
    let maxDiff = Infinity ;
    util(  n , 0 , [] , k )

    return ans ;
};
