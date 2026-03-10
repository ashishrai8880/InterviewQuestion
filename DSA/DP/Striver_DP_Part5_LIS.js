
// ====================================1. Longest Increasing Subsequence ==================================================
/**
Leetcode : https://leetcode.com/problems/longest-increasing-subsequence/

Given an integer array nums, return the length of the longest strictly increasing subsequence.

Example 1:
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

Example 2:
Input: nums = [0,1,0,3,2,3]
Output: 4

Example 3:
Input: nums = [7,7,7,7,7,7,7]
Output: 1
 
Constraints:
1 <= nums.length <= 2500
-104 <= nums[i] <= 104
 
 */
var lengthOfLIS = function(nums) {

    const n = nums.length;

    const util = (i, prev) => {
        if (i === n) return 0;

        if(prev!=-1 && dp[i][prev] != -1) return dp[i][prev];

        // pick
        let pick = 0;
        if (prev === -1 || nums[i] > nums[prev]) {
            pick = 1 + util(i + 1, i);
        }

        // skip
        let notPick = util(i + 1, prev);

        const ans =  Math.max(pick , notPick)

        if( prev != -1 ){
            dp[i][prev] = ans
        }

        return ans;
    };

    let dp = Array.from({length : n} , ()=>{
        return Array.from({length : n} , ()=>-1)
    })

    return util(0, -1);
};
















