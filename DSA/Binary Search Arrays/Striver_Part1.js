
// ================================== 1. Binary Search =============================================================
/**
Leetcode : https://leetcode.com/problems/binary-search/
Iterative Approach
 */
var search = function(nums, target) {
    
    let n = nums.length ;
    let left = 0 ;
    let right = n-1 ;
    let mid  ;

    while(left <= right){
        mid = Math.floor((left+right)/2)

        if(nums[mid] == target){
            return mid ;
        }

        if(nums[mid] >= target){
            right = mid-1 ;
        }
        else{
            left = mid+1 ;
        }
    }

    if(nums[mid] == target) return mid ;
    return -1 ;
};


/**
Recursive Approach
 */
var searchRecursive = function(nums, target) {
    
    const util = (low , high)=>{
        let mid = Math.floor((low+high)/2);
        if(low > high) return -1 ;
        if(nums[mid] == target){
            return mid ;
        }
        if(nums[mid] > target){
            return util(low , mid-1);
        }
        else{
            return util(mid+1 , high);
        }
        return -1 ;
    }
    return util(0 , nums.length-1)
};


// =============================================== 2. Implement Lower Bound ==============================================
/**
Geeks For Geeks : https://www.geeksforgeeks.org/problems/implement-lower-bound/1
Leetcode : https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/

Given a sorted array arr[] and a number target, the task is to find the lower bound of the target in this given array. 
The lower bound of a number is defined as the smallest index in the sorted array where the element is greater than or equal 
to the given number.

Note: If all the elements in the given array are smaller than the target, the lower bound will be the length of the array. 

Examples :
Input:  arr[] = [2, 3, 7, 10, 11, 11, 25], target = 9
Output: 3
Explanation: 3 is the smallest index in arr[] where element (arr[3] = 10) is greater than or equal to 9.

Input: arr[] = [2, 3, 7, 10, 11, 11, 25], target = 11
Output: 4
Explanation: 4 is the smallest index in arr[] where element (arr[4] = 11) is greater than or equal to 11.

Brute Force 
 */

class Solution {
    lowerBound(arr, target) {
        let ans = 0 ;
        let n = arr.length ;
        let i = 0 ;
        for( ; i< n ; i++ ){
            
            if(arr[i] < target){
                continue
            }
            else{
                return i;
            }   
        }
        return n ;
    }
}

// Optimized way : using Binary Search 
class Solution {
    lowerBound(arr, target) {
        
        let n = arr.length ;
        let low = 0 ;
        let high = n-1 ;
        let ans = n ;
        
        while(low <= high){
            let mid = Math.floor((low+high)/2);
            if(arr[mid] >= target){
                ans = mid ;
                high = mid-1 ;
            }else{
                low = mid+1 ;
            }
        }
        
        return ans ;
    }
}


// ========================================= 3. Upper Bound ==========================================================
/**
GFG : https://www.geeksforgeeks.org/problems/implement-upper-bound/1
 */

class Solution {
    upperBound(arr, target) {
       
        let n = arr.length ;
        let ans = n ;
        
        let low = 0 ;
        let high = n-1 ;
        
        while(low <= high){
            let mid = Math.floor((low+high)/2);
            
            if(arr[mid] > target){
                ans = mid ;
                high = mid-1 ;
            }
            else{
                low = mid+1 ;
            }
        }
        
        return ans ;
    }
}


// ========================================= 4. Find first and last position of element =================================
/**
Leetcode : https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/

Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given 
target value.

If target is not found in the array, return [-1, -1].
You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]

Example 2:
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]

Example 3:
Input: nums = [], target = 0
Output: [-1,-1]
 */
var searchRange = function(nums, target) {
    
    const n = nums.length;
    
    const findFirst = (arr, target) => {
        let index = -1;
        let low = 0;
        let high = n - 1;

        while (low <= high) {
            let mid = Math.floor((low + high) / 2);

            if (arr[mid] === target) {
                index = mid; 
               
                high = mid - 1; 
            } else if (arr[mid] < target) {
                low = mid + 1; 
            } else { 
                high = mid - 1; 
            }
        }
        return index;
    };

    const findLast = (arr, target) => {
        let index = -1;
        let low = 0;
        let high = n - 1;

        while (low <= high) {
            let mid = Math.floor((low + high) / 2);

            if (arr[mid] === target) {
                index = mid;
                
                low = mid + 1; 
            } else if (arr[mid] < target) {
                low = mid + 1; 
            } else { 
                high = mid - 1; 
            }
        }
        return index;
    };

    const firstPos = findFirst(nums, target);
    const lastPos = findLast(nums, target);

    return [firstPos, lastPos];
};




































