
// ============================================================== 1. Two Sum ======================================================================
/**
Leetcode : https://leetcode.com/problems/two-sum/
 */
var twoSum = function(nums, target) {
    let map = new Map();
    nums.forEach((e,i)=>map.set(e,i));

    let ans = [];
    nums.forEach((e,i)=>{
        if(map.has(target-e) && i != map.get(target-e)){
            ans = [i , map.get(target-e)];
            return ans ;
        }
    })
    return ans ;
};

// Little Optimized

var twoSum = function(nums, target) {
    let map = new Map();

    let ans = [];
    nums.forEach((e,i)=>{
        if(map.has(target-e) && i != map.get(target-e)){
            ans = [i , map.get(target-e)];
            return ans ;
        }
        map.set(e , i);
    })
    return ans ;
};


// =============================================================== 2. Sort array of 0s,1s, 2s ==========================================================
// Leetcode : https://leetcode.com/problems/sort-colors/description/
/**
Brute Force Approach : first place 0 and then place 1 . 
Time Complexity : O (n) . Space is : O (1) .
 */
var sortColors = function(nums) {
    let i = 0 ;
    const n = nums.length ;

    for(let j=0 ; j<n ; j++){
        if(nums[j] == 0){
            [nums[i] , nums[j]] = [nums[j] , nums[i]];
            i += 1 ;
        }
    }

    for(let j=i ; j<n ; j++){
        if(nums[j] == 1){
            [nums[i] , nums[j]] = [nums[j] , nums[i]];
            i += 1 ;
        }
    }
    return ;
};

// Optimized Way : Use three pointer and dutch national flag algorithm
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    let len = nums.length ;
    let low = 0 ;
    let mid = 0 ;
    let high = len-1 ;

    while(mid <= high){
        if(nums[mid] == 0){
            [nums[low] , nums[mid]] = [nums[mid] , nums[low]] ;
            mid++ ;
            low++ ;
        }
        else if(nums[mid] == 1){
            mid++ ;
        }
        else{
            [nums[high] , nums[mid]] = [nums[mid] , nums[high]] ;
            high-- ;
        }
    }
    return ;
};


// 3. =========================================================== 3. Maximum Subarray Sum ==============================================================
/**
Leetcode : https://leetcode.com/problems/maximum-subarray/description/
Brute Force Approach , use two loops .
 */
var sortColors = function(nums) {
    let len = nums.length ;
    let low = 0 ;
    let mid = 0 ;
    let high = len-1 ;

    while(mid <= high){
        if(nums[mid] == 0){
            [nums[low] , nums[mid]] = [nums[mid] , nums[low]] ;
            mid++ ;
            low++ ;
        }
        else if(nums[mid] == 1){
            mid++ ;
        }
        else{
            [nums[high] , nums[mid]] = [nums[mid] , nums[high]] ;
            high-- ;
        }
    }
    return ;
};


// Optimized way : Use Kadanes Algorithm 
/**
Explanation : A subarray with a sum less than 0 will always reduce our answer and so this type of subarray cannot be a part of the subarray with maximum sum.

Example 1:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.

Example 2:
Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
 */
var maxSubArray = function(nums) {
    let max = -Infinity ;
    let len = nums.length ;
    let sum = 0 ;

    for(let i=0 ; i<len ; i++){
        sum = sum + nums[i];
        if(sum > max){
            max = sum ;
        }
        if(sum < 0 ){
            sum = 0 ;
        }
    }

    return max ;
};


// ============================================================ 4. Stock Buy and Sell =================================================================
/**
Leetcode : https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 */
var maxProfit = function(prices) {
    
    let min = Infinity ;
    let max = -Infinity ;
    let len = prices.length ;

    for(let i = 0 ; i<len-1 ; i++){
        min = Math.min(min , prices[i]);
        max = Math.max(max , prices[i] - min);
    }
    return max ;
};


// ============================================================= 5. Rearrange array element by sign ===========================================================
// Leetcode : https://leetcode.com/problems/rearrange-array-elements-by-sign/description/
/**
Very Basic Brute Force
 */
var rearrangeArray = function(nums) {
    let positiveArr = [];
    let negativeArr = [];
    nums.forEach((e)=>{
        if(e > 0){
            positiveArr.push(e);
        }else{
            negativeArr.push(e);
        }
    }) ;

    for(let i= 0 ; i<nums.length ; i++){
        if(i%2==0){
            nums[i] = positiveArr[i/2];
        }else{
            nums[i] = negativeArr[Math.floor(i/2)];
        }
    }
    return nums ;
};


// Optimized way , use two pointer

var rearrangeArray = function(nums) {
    if(nums.length ==2) return nums.sort((a,b)=>b-a) ;

    let p = 0 ;
    let n = 1 ;
    let len = nums.length ;
    let res = Array.from({length : len},()=>0);

    for(let i=0 ; i<len ; i++){
        if(nums[i] > 0){
            res[p] = nums[i]
            p += 2 ;
        }
        else{
            res[n] = nums[i]
            n += 2 ;
        }
    }
    return res ;
};


// ============================================================= 6. Next Permutation =================================================================
/**
Leetcode : https://leetcode.com/problems/next-permutation/

A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

For example, for arr = [1,2,3], the following are all the permutations of arr: [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1],
[3,1,2], [3,2,1].

Example 1:
Input: nums = [1,2,3]
Output: [1,3,2]

Example 2:
Input: nums = [3,2,1]
Output: [1,2,3]

Example 3:
Input: nums = [1,1,5]
Output: [1,5,1]

 Next permutation is always greater than the previous one . It is not difficult question easy one . watch shradha khapra video
 for this . 

 Brute Force : Find all permutation of array , then return next permutation of given array . 

 Optimized way : Step 1 : Find deviation pivot index from last . There would be one point from where array element is changing .
                 Step 2 : Then swap the rightmost element with pivot element . Here rightmost element would be the 
                            next greater number than pivot . 
                 Step 3 : Reverse the last part after pivot element . 
 

 */
var nextPermutation = function(nums) {
    
    let n = nums.length; 

    let ind = -1; 
    for (let i = n - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            
            ind = i;
            break;
        }
    }

    if (ind == -1) {
        nums.reverse();
        return nums;
    }


    for (let i = n - 1; i > ind; i--) {
        if (nums[i] > nums[ind]) {
            [nums[i], nums[ind]] = [nums[ind], nums[i]]; 
            break;
        }
    }

    nums.splice(ind + 1, n - ind - 1, ...nums.slice(ind + 1).reverse());

    return nums;

};


// ================================================= 7. Longest Contiguos Subarray with absolute difference less than limit =============================== 

/**
Leetcode : https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/
Brute Force : Just check all subarray and find difference between maxValue and minValue of subarray . If it is below 
limit and find its length of subarray . 
Time Complexity : O(n2) . 

Given an array of integers nums and an integer limit, return the size of the longest non-empty subarray such that the 
absolute difference between any two elements of this subarray is less than or equal to limit.

Example 1:

Input: nums = [8,2,4,7], limit = 4
Output: 2 
Explanation: All subarrays are: 
[8] with maximum absolute diff |8-8| = 0 <= 4.
[8,2] with maximum absolute diff |8-2| = 6 > 4. 
[8,2,4] with maximum absolute diff |8-2| = 6 > 4.
[8,2,4,7] with maximum absolute diff |8-2| = 6 > 4.
[2] with maximum absolute diff |2-2| = 0 <= 4.
[2,4] with maximum absolute diff |2-4| = 2 <= 4.
[2,4,7] with maximum absolute diff |2-7| = 5 > 4.
[4] with maximum absolute diff |4-4| = 0 <= 4.
[4,7] with maximum absolute diff |4-7| = 3 <= 4.
[7] with maximum absolute diff |7-7| = 0 <= 4. 
Therefore, the size of the longest subarray is 2.

Example 2:
Input: nums = [10,1,2,4,7,2], limit = 5
Output: 4 
Explanation: The subarray [2,4,7,2] is the longest since the maximum absolute diff is |2-7| = 5 <= 5.

Example 3:
Input: nums = [4,2,2,2,4,4,2,2], limit = 0
Output: 3
 */
var longestSubarray = function(nums, limit) {
    
    let minValue = Infinity ;
    let maxValue = -Infinity ;
    let len = nums.length ;
    let ans = 0 ;

    for(let i=0 ; i < len ; i++){
        minValue = Infinity ;
        maxValue = -Infinity ;
        for(let j=i ; j<len ; j++){
            minValue = Math.min(nums[j] , minValue);
            maxValue = Math.max(nums[j] , maxValue);

            if(maxValue - minValue <= limit){
                ans = Math.max(ans , j-i+1);
            }
        }
    }

    return ans ;

};


// Optimized Way : Use two queue : increment queue and decrement queue . inc q will store minimum element from starting
/*
and dec q will store maximum element at starting . 
*/

var longestSubarray = function(nums, limit) {
    
    let ans = 0 ;
    let left = 0 ;
    let right = 0 ;
    let res = -Infinity ;
    let inc = [];
    let dec = [];
    let len = nums.length ;

    for( ; right < len ; right++){
        while(inc.length > 0 && inc[inc.length-1] > nums[right] ){
            inc.pop();
        }

        while(dec.length > 0 && dec[dec.length-1] < nums[right] ){
            dec.pop();
        }

        inc.push(nums[right]);
        dec.push(nums[right]);

        while(dec[0] - inc[0] > limit){
            if(dec[0] == nums[left]){
                dec.shift();
            }
            if(inc[0] == nums[left]){
                inc.shift();
            }
            left++ ;
        }
        res = Math.max(res , (right-left+1));
    }
    return res ;
};



// =================================== 8. Max and Min Sum after removing K elements from array ========================================

/*
In Interview at UAS Aero International
Eg : [1,2,3,4,5] and k = 2 
Max Sum : 3,4,5 = 12   Min Sum 1,2,3 = 6
*/
class MinHeap extends Array {
    push(x) { super.push(x); this.sort((a,b)=>a-b); }
    pop() { return super.shift(); }
}

class MaxHeap extends Array {
    push(x) { super.push(x); this.sort((a,b)=>b-a); }
    pop() { return super.shift(); }
}

function getMaxMinSumOptimized(arr, k) {
    let minHeap = new MinHeap(); // for largest k elements
    let maxHeap = new MaxHeap(); // for smallest k elements

    for (let num of arr) {
        // ---- track k smallest using max heap ----
        if (maxHeap.length < k) maxHeap.push(num);
        else if (num < maxHeap[0]) { 
            maxHeap.pop();
            maxHeap.push(num);
        }

        // ---- track k largest using min heap ----
        if (minHeap.length < k) minHeap.push(num);
        else if (num > minHeap[0]) { 
            minHeap.pop();
            minHeap.push(num);
        }
    }

    let total = arr.reduce((a, b) => a + b, 0);
    let kSmallSum = maxHeap.reduce((a, b) => a + b, 0);
    let kLargeSum = minHeap.reduce((a, b) => a + b, 0);

    return {
        maxSum: total - kSmallSum,
        minSum: total - kLargeSum
    };
}

console.log(getMaxMinSumOptimized([1,2,3,4,5], 2));










