
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


// ================================ 5. Find Insert Position =================================================
/**
Leetcode : https://leetcode.com/problems/search-insert-position/
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return 
the index where it would be if it were inserted in order.
You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [1,3,5,6], target = 5
Output: 2

Example 2:
Input: nums = [1,3,5,6], target = 2
Output: 1

Example 3:
Input: nums = [1,3,5,6], target = 7
Output: 4
 */
var searchInsert = function(arr, target) {
    
    let n = arr.length ;
    let low = 0 ;
    let high = n-1 ;
    let ans = n ;

    while(low <= high){
        let mid = Math.floor((low+high)/2);

        if(arr[mid] >= target){
            high  = mid-1 ;
            ans = mid ;
        }
        else{
            low = mid+1 ;
        }
    }
    return ans ;
};


// ======================================== 6. Find Floor and Ceil ======================================================
// GFG : https://www.geeksforgeeks.org/problems/ceil-in-a-sorted-array/1
// GFG : https://www.geeksforgeeks.org/problems/floor-in-a-sorted-array-1587115620/1
class Solution {

    findFloor(arr, target) {
        
        let n = arr.length ;
        let low = 0 ;
        let high = n-1 ;
        let ans = -1 ;
        
        while(low <= high){
            let mid = Math.floor((low+high)/2);
            
            if( arr[mid] <= target ){
                low = mid+1 ;
                ans = mid ;
            }
            else{
                high = mid-1 ;
            }
        }
        return ans ;
        
    }
    
    findCeil(arr, target) {
       
        let n = arr.length ;
        let low = 0 ;
        let high = n-1 ;
        let ans = -1 ;
        
        while(low <= high){
            let mid = Math.floor((low+high)/2);
            
            if( arr[mid] >= target ){
                high = mid-1 ;
                ans = mid ;
            }
            else{
                low = mid+1 ; 
            }
        }
        return ans ;
    }
}


// ============================================ 7. Count Frequencies in sorted array =====================================
// GFG : https://www.geeksforgeeks.org/problems/number-of-occurrence2259/1
/*
Examples :
Input: arr[] = [1, 1, 2, 2, 2, 2, 3], target = 2
Output: 4
Explanation: target = 2 occurs 4 times in the given array so the output is 4.
*/
class Solution {
    countFreq(arr, k) {
        const firstOccurence = ()=>{
            let low = 0, high = n - 1;
            let first = -1;
        
            while (low <= high) {
                let mid = Math.floor((low + high) / 2);
                
                if (arr[mid] === k) {
                    first = mid;
                    high = mid - 1;
                }
                else if (arr[mid] < k) {
                    low = mid + 1; 
                }
                else {
                    high = mid - 1; 
                }
            }
            return first;
            
        }
        
        const lastOccurence = ()=>{
            
            let low = 0, high = n - 1;
            let last = -1;
        
            while (low <= high) {
                let mid = Math.floor((low + high) / 2);
                if (arr[mid] === k) {
                    last = mid;
                    low = mid + 1;
                }
                else if (arr[mid] < k) {
                    low = mid + 1; 
                }
                else {
                    high = mid - 1; 
                }
            }
            return last;
        }
        
        let n = arr.length ;
        
        const f = firstOccurence();
        if(f == -1) return 0 ;
        const s = lastOccurence();
        return s-f+1 ;
        
    }
}


// ========================================= 8. Search in a sorted rotated array with distinct value ========================
/**
Leetcode : https://leetcode.com/problems/search-in-rotated-sorted-array/

There is an integer array nums sorted in ascending order (with distinct values).

Example 1:
Input: nums = [4,5,6,7,0,1,2], target = 0  Output: 4

Example 2:
Input: nums = [4,5,6,7,0,1,2], target = 3 Output: -1

Example 3:
Input: nums = [1], target = 0 Output: -1
 */
var search = function(nums, k) {
    
    let low = 0 ;
    let n = nums.length ;
    let high = n-1 ;

    while(low <= high){
        const mid = Math.floor((low+high)/2);

        if(nums[mid] == k){
            return mid ;
        }

        if(nums[low] <= nums[mid]){
            if(nums[low] <= k && k <= nums[mid]){
                high = mid-1 ;
            }
            else{
                low = mid+1 ;
            }
        }
        else{
            if(nums[mid] <= k && k <= nums[high]){
                low = mid+1 ;
            }
            else{
                high = mid-1 ;
            }
        }
    }
    return -1 ;
};


// ================================== 9. Search in sorted rotated array with duplicates values ============================

/**
Leetcode : https://leetcode.com/problems/search-in-rotated-sorted-array-ii/
There is an integer array nums sorted in non-decreasing order (not necessarily with distinct values).

Example 1:
Input: nums = [2,5,6,0,0,1,2], target = 0
Output: true

Example 2:
Input: nums = [2,5,6,0,0,1,2], target = 3
Output: false

Example 3 : 
nums = [1,0,1,1,1] , target = 0 
Output : true
 */
var search = function(nums, k) {
    
    let low = 0 ;
    let n = nums.length ;
    let high = n-1 ;

    while(low <= high){
        const mid = Math.floor((low+high)/2);
        console.log({low , mid , high , x :  nums[mid]})

        if(nums[mid] == k){
            return true ;
        }

        if(nums[mid] == nums[low] && nums[mid] == nums[high]){
            low = low + 1; 
            high = high -1 ;
            continue ;
        }

        if(nums[low] <= nums[mid]){
            if(nums[low] <= k && k <= nums[mid]){
                high = mid-1 ;
            }
            else{
                low = mid+1 ;
            }
        }
        else{
            if(nums[mid] <= k && k <= nums[high]){
                low = mid+1 ;
            }
            else{
                high = mid-1 ;
            }
        }
    }
    return false ;

};


// ====================================== 10. Find Minimum in sorted array ===============================================
/**
Leetcode : https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
 */
var findMin = function(nums) {
    
    let n = nums.length ;
    let low = 0 ;
    let high = n-1 ;

    while(low < high){
        const mid = Math.floor((low+high)/2);
        
        if(nums[mid] > nums[high]){
            low = mid+1 ;
        }
        else{
            high = mid ;
        }
    }

    return nums[low] ;
};


// ========================================= 11. Find Peak Element ================================================
/**
Leetcode : https://leetcode.com/problems/find-peak-element/

A peak element is an element that is strictly greater than its neighbors.
Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.
You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside
the array.

You must write an algorithm that runs in O(log n) time.

Example 1:
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.

Example 2:
Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
 Brute Force 
 */
var findPeakElement = function(nums) {
    const n = nums.length ;

    for(let i=0 ; i<n ; i++){
        if(i == 0 && n>1 && nums[i] > nums[i+1]){
            return i ;
        }
        if(i==n-1 && n>1 && nums[i] > nums[i-1]){
            return i ;
        }
        if( nums[i] > nums[i-1] && nums[i] > nums[i+1]){
            return i ;
        }
    }

    return 0 ;
};




















