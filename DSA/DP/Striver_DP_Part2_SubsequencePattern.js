// =============================================================================== 1. Partition Equal Subset Sum ========================================================================================

/**
Leetcode : https://leetcode.com/problems/partition-equal-subset-sum/
Time Complexity: O(N*K) + O(N)
Reason: There are N*K states therefore at max ‘N*K’ new problems will be solved and we are running a for loop for ‘N’ times to calculate the total sum

Space Complexity: O(N*K) + O(N)
Reason: We are using a recursion stack space(O(N)) and a 2D array ( O(N*K)).

Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

Example 1:
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].

Example 2:
Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
 */
var canPartition = function(nums) {
    
    const sum = nums.reduce( (prev , curr)=> curr += prev  ) 
    if(sum%2 != 0) return false ;
    const target = sum/2 ;

    const len = nums.length ;

    const util = ( i , s )=>{

        if(s==0) return true ;

        if( s< 0 || i >= len) return false ;

        if(dp[i][s] != -1) return dp[i][s] ;

        const pick = util(i+1 , s-nums[i]);
        const notPick = util(i+1 , s);

        return dp[i][s] = pick || notPick ;
    }
    
    let dp = Array.from({length : len+1} , ()=>{
        return Array.from({length : target+1} , ()=>-1)
    })
    return util(0,target);

};


// ======================================================================== 2. Count of Subarray equal sum target ====================================================================
/**
Leetcode : https://leetcode.com/problems/subarray-sum-equals-k/description/
Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.
A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
Input: nums = [1,1,1], k = 2   Output: 2
Example 2:
Input: nums = [1,2,3], k = 3     Output: 2
 */
var subarraySum = function(nums, k) {
    
    let count = 0 ;
    const map = new Map();
    let sumSoFar = 0 ;

    for(const val of nums){
        sumSoFar += val ;

        if(map.has(sumSoFar - k)){
            count += map.get(sumSoFar-k);
        }

        if(sumSoFar == k){
            count +=1 ;
        }

        map.set(sumSoFar , ( map.get(sumSoFar) || 0) + 1  )
    }

    return count ;


};
