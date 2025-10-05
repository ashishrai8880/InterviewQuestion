
// =========================================== 1. Find Largest element of array =========================================================================
// GFG : https://www.geeksforgeeks.org/problems/largest-element-in-array4009/1
// Recursive approach : There are lot of method of doing this . 
largest(arr) {
    // code here
    const util = ( i )=>{
        if(i == len-1){
            return arr[i];
        }
        const e = util(i+1);
        return e > arr[i] ? e : arr[i];
    }
    const len = arr.length ;
    return util(0);
}


// =====================================================2. Second Largest Element ========================================================================
// GFG : https://www.geeksforgeeks.org/problems/second-largest3735/1
class Solution {
    getSecondLargest(arr) {
        
        if(arr.length < 2) return -1 ;
        
        let largest = -Infinity ;
        let secondLargest = -Infinity ;
        
        for(let i = 0 ; i < arr.length ; i++ ){
            if(arr[i] > largest){
                secondLargest = largest ;
                largest = arr[i];
            }
            else if (arr[i] > secondLargest && arr[i] != largest){
                secondLargest = arr[i];
            }
        }
        
        return secondLargest == -Infinity ? -1 : secondLargest ;   
    }
}


// ================================================================ 3. Check if array is sorted ==============================================================
function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1])
      return false;
  }

  return true;
}

// ====================================================================4. Check Array is sorted and rotated =========================================================
// Leetcode : https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/description/
/**
Example 1:

Input: nums = [3,4,5,1,2]
Output: true
Explanation: [1,2,3,4,5] is the original sorted array.
You can rotate the array by x = 2 positions to begin on the element of value 3: [3,4,5,1,2].
Example 2:

Input: nums = [2,1,3,4]
Output: false
Explanation: There is no sorted array once rotated that can make nums.
Example 3:

Input: nums = [1,2,3]
Output: true
Explanation: [1,2,3] is the original sorted array.
You can rotate the array by x = 0 positions (i.e. no rotation) to make nums.

Logic : Just check , how many deviation count is there , if there more than 1 deviation count , it means it is not sorted and rotated , otherwise true .
 */
var check = function(nums) {

    if(nums.length < 2) return true ;
    const len = nums.length ;

    let deviateCount = 0 ;

    for(let i = 0 ; i<nums.length ; i++){
        if(nums[i] > nums[ (i+1)%len ]){
            deviateCount +=1 ;
        }
    }

    return deviateCount <= 1 ;
};


// =========================================================== 5. Removed Duplicates from array ======================================================
/**
Leetcode : https://leetcode.com/problems/remove-duplicates-from-sorted-array/
Brute Force : Using set
 */
var removeDuplicates = function(nums) {
    const set = new Set(nums);
    const uniqueArr = Array.from(set);

    for(let i=0 ; i<uniqueArr.length ; i++){
        nums[i] = uniqueArr[i];
    }

    return uniqueArr.length ;
};

/**
Optimized Solution : Use two pointer . Since it is already sorted . 
 */
var removeDuplicatesOptimized = function(nums) {
    if(nums.length <2) return 1 ;

    let i = 0 ;

    for(let j=1 ; j <nums.length ; j++){
        if(nums[i] != nums[j]){
            i += 1 ;
            nums[i] = nums[j];
        }
    }
    return i+1 ;
};


// ======================================================== 6. Rotate array by one ===========================================================

rotate(arr) {
    // code here
    const temp = arr.pop();
    arr.unshift(temp);
    return arr ;
}

// ====================================================== 7. Rotate array by k places ===========================================================
/*
Leetcode : https://leetcode.com/problems/rotate-array/
Brute Force : Recursive Way , In every recursion stack , just replace one element . Take last one and add it at first position and shift other . But this can give TLE .
Time Complexity : O(n * k) . Space Complexity : O (k) .Recursion stack will be k times 
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    if(nums.length == 0 || k == 0) return ;

    const len = nums.length ;
    const temp = nums[len-1];

    for(let i= len-1 ; i>0 ; i-- ){
        nums[i] = nums[i-1];
    }

    nums[0] = temp ;

    rotate(nums , k-1)
};


// Better Solution , using extra space of O(n) 
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(arr , k) {
    if(arr.length == 1 || k==0) return ;
    let res = [];
    const len = arr.length ;
    k = k%len ;
    for(let i=0 ; i<len ; i++){
        
        if(i < k){
            res.push(arr[len-k+i]);
        }
        else{
            res.push(arr[i-k])
        }
    }

    for(let i=0 ; i<len ; i++){
        arr[i] = res[i];
    }
    return ;
};

// Optimized Way : Super cool , super good 
/**
Just reverse first part , second part , and at last entire array 
 */
var rotate = function(arr , k) {
    
    const reverse = (start , end)=>{
        while(start < end){
            const temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp ;
            start++ ;
            end-- ;
        }
    }

    const len = arr.length ;
    if(len < 2 || k == 0) return ;
    k = k%len ;
    reverse(len-k , len-1); 
    reverse(0 , len-k-1);
    reverse(0 , len-1);
    return ;

}; 


// ======================================= 8. Move all zeroes at end ==================================================
/**
 Leetcode : https://leetcode.com/problems/move-zeroes/
 Extremely Brute force 
 */
var moveZeroes = function(nums) {
    let res = [];
    let j=0 ;
    for(let i=0 ; i<nums.length ; i++){
        if(nums[i] != 0){
            res.push(nums[i]);
        }
    }
    
    while(j < nums.length){
        res.push(0);
        j += 1;
    }

    for(let i= 0 ; i<nums.length ; i++){
        nums[i] = res[i];
    }
    return ; 
};


// Optimized Approach

function moveZeros(n, a) {
    let j = -1;
    
    // Place the pointer j
    for (let i = 0; i < n; i++) {
        if (a[i] === 0) {
            j = i;
            break;
        }
    }
    
    // No non-zero elements
    if (j === -1) return a;
    
    // Move the pointers i and j and swap accordingly
    for (let i = j + 1; i < n; i++) {
        if (a[i] !== 0) {
            [a[i], a[j]] = [a[j], a[i]];
            j++;
        }
    }
    
    return a;
}


// =================================================== 9. Count Maximum Consecutive One =======================================================
/**
Leetcode : https://leetcode.com/problems/max-consecutive-ones/description/
 */
var findMaxConsecutiveOnes = function(nums) {
    let max = 0 ;
    let count = 0 ;

    nums.forEach((e)=>{
        if(e == 1){
            count++ ;
        }
        else{
            count = 0 ;
        }
        max = Math.max(max , count );
    })
    return max ;
};


// ====================================================== 10. Largest Subarray with given sum k ====================================================================
// User function Template for javascript
/*
GFG : https://www.geeksforgeeks.org/problems/longest-sub-array-with-sum-k0809/1
Leetcode : https://leetcode.com/problems/subarray-sum-equals-k/description/
LOGIC : just use map , and store sumSoFar .
*/
/**
 * @param {number[]} arr
 * @param {number} k
 * @returns {number}
 */
class Solution {
    longestSubarray(arr, k) {
        // code here
        let map = new Map();
        let sumSoFar = 0 ;
        let len = arr.length ;
        let maxLen = 0 ;
        
        for(let i=0 ; i<len ; i++){
            sumSoFar += arr[i];
            
            if(sumSoFar == k){
                maxLen = Math.max(maxLen , i+1);
            }
            
            if(map.has(sumSoFar - k)){
                maxLen = Math.max(maxLen , i - map.get(sumSoFar-k)  )
            }
            
            if(!map.has(sumSoFar)){
                map.set(sumSoFar , i);
            }
        }
        return maxLen ;
    }
}


// Count Subarray with given sum k . Slight variation of above problem
/**
Leetcode : https://leetcode.com/problems/subarray-sum-equals-k/description/
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






















