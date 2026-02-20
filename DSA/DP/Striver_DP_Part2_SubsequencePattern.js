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

// =====================================================================================================
/**
3. Subset Sum Problem 
GFG : https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1

Given an array of positive integers arr[] and a value sum, determine if there is a subset of arr[] with sum equal to given sum. 

Examples:

Input: arr[] = [3, 34, 4, 12, 5, 2], sum = 9
Output: true 
Explanation: Here there exists a subset with target sum = 9, 4+3+2 = 9.

Input: arr[] = [3, 34, 4, 12, 5, 2], sum = 30
Output: false
Explanation: There is no subset with target sum 30.

Input: arr[] = [1, 2, 3], sum = 6
Output: true
Explanation: The entire array can be taken as a subset, giving 1 + 2 + 3 = 6.
 * @param {number[]} arr
 * @param {number} target
 * @return {boolean}

Time Complexity: O(N*K),There are N*K states therefore at max ‘N*K’ new problems will be solved.
Space Complexity: O(N*K) + O(N),We are using a recursion stack space(O(N)) and a 2D array ( O(N*K)).
 */

class Solution {
    isSubsetSum(arr, sum) {
        // code here
        const n = arr.length;
        
        const util = ( i , s)=>{
            if(s == sum) return true ;
            if(i>=n) return false ;
            
            if(dp[i][s] != -1) return dp[i][s];
            
            const notPick = util(i+1 , s);
            let pick = false ;
            if(s+arr[i] <= sum){
                pick = util(i+1 , arr[i]+s);
            }
            
            return dp[i][s] = pick || notPick ;
        }
        
        let dp = Array.from({ length: n }, () => Array(sum + 1).fill(-1));
        
        return util(0 , 0)
    }
}

// ===================================================================================================
/** Leetcode : https://leetcode.com/problems/partition-equal-subset-sum/description/
4. Partition Equal subset sum

Given an integer array nums, return true if you can partition the array into two subsets such that 
the sum of the elements in both subsets is equal or false otherwise.

Example 1:
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].

Example 2:
Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
 

Constraints:

1 <= nums.length <= 200
1 <= nums[i] <= 100

 * @param {number[]} nums
 * @return {boolean}
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

















