
// =================================================== 1. Pascal Triangle ====================================================

/**
Leetcode : https://leetcode.com/problems/pascals-triangle/description/

Given an integer numRows, return the first numRows of Pascal's triangle.
In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

Example 1:
Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

Example 2:
Input: numRows = 1
Output: [[1]]
 
 */
var generate = function(numRows) {
    const util = (n)=>{
        if(n == 1) {
            res.push([1]);
            return [1];
        };

        const arr = util(n-1);
        let temp = Array.from({length : n},()=>1);

        for(let i=1 ; i<n ; i++){
            if(i < arr.length){
                temp[i] = arr[i-1] + arr[i];
            } 
        }

        res.push(temp);

        return temp ;
    }

    let res = [];
    util(numRows);
    return res ;
};


// ============================================ Majority Element I ====================================================
/*
Find the element from array which have occurence greater than len/2 . Brute Force You already know by using map 
Optimize Way is Boyer Moore’s Voting Algorithm

Initialize 2 variables:
Count –  for tracking the count of element
Element – for which element we are counting
Traverse through the given array.
If Count is 0 then store the current element of the array as Element.
If the current element and Element are the same increase the Count by 1.
If they are different decrease the Count by 1.
The integer present in Element should be the result we are expecting 
*/

function majorityElement(arr) {
    let n = arr.length;
    let cnt = 0; 
    let el; 

    for (let i = 0; i < n; i++) {
        if (cnt === 0) {
            cnt = 1;
            el = arr[i];
        } else if (el === arr[i]) {
            cnt++;
        } else {
            cnt--;
        }
    }

    let cnt1 = 0;
    for (let i = 0; i < n; i++) {
        if (arr[i] === el) {
            cnt1++;
        }
    }

    if (cnt1 > Math.floor(n / 2)) {
        return el;
    }
    return -1;
}


// =========================================== 2. Majority Element II ===================================================
/**
Leetcode : https://leetcode.com/problems/majority-element-ii/

Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.

Example 1:
Input: nums = [3,2,3]  Output: [3]

Example 2:
Input: nums = [1]  Output: [1]

Example 3:
Input: nums = [1,2] Output: [1,2]

Brute Force : Use Map and store count of each element taking O(n) space and linear time complexity 

 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function(nums) {
    let len = nums.length ;
    let k = Math.floor(len/3);
    let map = new Map();
    nums.forEach((e,i)=>{
        map.set(e , (map.get(e) || 0) + 1 );
    })

    let res = [];

    map.forEach((val , key)=>{
        if(val > k){
            res.push(key);
        }
    })

    return res ;
};


// Optimize Way : Use Extended Moore Algorithm . Very Simple and Easy 
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function(arr) {
    
    let el1 = -Infinity ;
    let el2 = -Infinity ;
    let cnt1 = 0 ;
    let cnt2 = 0 ;
    let res = [] ;
    let len = arr.length ;

    for(let i= 0 ; i < arr.length ; i++){
       
        if(arr[i] === el1){
            cnt1++ ;
        } 
        else if(arr[i] === el2){
            cnt2++ ;
        } 
        else if(cnt1 === 0){ 
            cnt1 = 1 ;
            el1 = arr[i];
        } 
        else if(cnt2 === 0){ 
            cnt2 = 1 ;
            el2 = arr[i];
        } 
        else{
            cnt1-- ;
            cnt2-- ;
        }
    }

    let k = Math.floor(len/3)+1;

    cnt1 = 0 ;
    cnt2 = 0 ;
    for(let i= 0 ; i<len ; i++){
        if(arr[i] == el1) cnt1++ ;
        if(arr[i] == el2) cnt2++ ;
    }

    if(cnt1 >= k)  res.push(el1) ;
    if (cnt2 >= k && el2 !== el1) res.push(el2);

    return res ;

};


// =================================================== 3. Three Sum ==================================================
/**
Leetcode : https://leetcode.com/problems/3sum/ 

Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, 
and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

Example 1:
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.

Example 2:
Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
 * @param {number[]} nums
 * @return {number[][]}
 */

// Extreme Brute Force : Just use 3 loops and then find triplets , For duplicate use set . 
function triplet(n, arr) {
    let st = new Set();
    let ans = []

    // check all possible triplets:
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            for (let k = j + 1; k < n; k++) {
                if (arr[i] + arr[j] + arr[k] === 0) {
                    let temp = [arr[i], arr[j], arr[k]];
                    temp.sort((a, b) => a - b);
                    ans.push(temp);
                }
            }
        }
    }

    //store the set in the answer:
    let set  = new Set(ans.map(JSON.stringify));
    ans = Array.from(set).map(JSON.parse);
    return ans;
}

// Better Approach : use concept a + b + c = 0 => c = -(a+b) . So first find a and b , and then check in map whether c exists or not
// if exists ,then it could be a triplet . At last just push nums[j] into set .
/*
Time Complexity: O(N2 * log(no. of unique triplets)), where N = size of the array.
Reason: Here, we are mainly using 3 nested loops. And inserting triplets into the set takes O(log(no. of unique triplets))
time complexity. But we are not considering the time complexity of sorting as we are just sorting 3 elements every time.

Space Complexity: O(2 * no. of the unique triplets) + O(N) as we are using a set data structure and a list to store the 
triplets and extra O(N) for storing the array elements in another set.
*/
var threeSum = function(nums) {
    
    let set = new Set();
    let len = nums.length ;
    res = new Set();

    for(let i = 0 ; i<len-1 ; i++){
        set.clear();
        for(let j= i+1 ; j<len ; j++){
            const third = - (nums[i] + nums[j]);
            if(set.has(third)){
                let triplet = [nums[i] , nums[j] , third].sort((a,b)=>a-b)
                res.add(triplet.toString());
            }
            set.add(nums[j]);
        }
    }

    return [...res].map(str => str.split(',').map(Number));

};

// Most Optimized Approach 
/**
Just Sort it . Take 3 pointer , at i=0 , j=i+1 and k=len-1 . If sum < 0 , then increase j , if sum > 0 then decrease k
since array is sorted now . If sum==0 , then store this triplet , and move j to j+1 till it is not equal to previos element
. We did this , because we don't want duplicates , same we did for k , decrement it to k-1 , till it is not equal to next 
element . 

Time Complexity: O(NlogN)+O(N2), where N = size of the array.
Reason: The pointer i, is running for approximately N times. And both the pointers j and k combined can run for 
approximately N times including the operation of skipping duplicates. So the total time complexity will be O(N2). 

Space Complexity: O(no. of quadruplets), This space is only used to store the answer. We are not using any extra space 
to solve this problem. So, from that perspective, space complexity can be written as O(1).
 */
var threeSum = function(nums) {
    
    let res = [];
    nums.sort((a,b)=>a-b);
    let len = nums.length ;

    for(let i = 0 ; i<len ; i++){
        if(i>0 && nums[i] == nums[i-1]) continue ;

        let j = i+1 ;
        let k = len-1 ;

        while(j < k){
            const sum  = nums[i] + nums[j] + nums[k];

            if(sum < 0){
                j++ ;
            }

            else if(sum > 0){
                k-- ;
            }

            else{
                let triplet = [nums[i] , nums[j] , nums[k]];
                res.push(triplet);
                j++ ;
                k-- ;

                while(j<len && nums[j] == nums[j-1]) j++ ;
                while(k>=0 && nums[k] == nums[k+1]) k-- ;
            }
        }
    }
    return res ;
};


// ================================================= 4. 4 Sum ===================================================
/**
Leetcode : https://leetcode.com/problems/4sum/

Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] 
such that:

0 <= a, b, c, d < n
a, b, c, and d are distinct.
nums[a] + nums[b] + nums[c] + nums[d] == target
You may return the answer in any order.

Example 1:

Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
   
    nums.sort((a, b) => a - b);
    let res = [];
    let len = nums.length;

    for (let i = 0; i < len; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        for (let j = i + 1; j < len; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;

            let k = j + 1;
            let l = len - 1;

            while (k < l) {
                let sum = nums[i] + nums[j] + nums[k] + nums[l];

                if (sum < target) {
                    k++;
                } else if (sum > target) {
                    l--;
                } else {
                    res.push([nums[i], nums[j], nums[k], nums[l]]);
                    k++;
                    l--;

                    // Skip duplicates after moving k and l
                    while (k < l && nums[k] === nums[k - 1]) k++;
                    while (k < l && nums[l] === nums[l + 1]) l--;
                }
            }
        }
    }

    return res;

};



// ===================================================== 5. Longest Subarray with sum equal to 0 ==============================================================
// GFG : https://www.geeksforgeeks.org/problems/largest-subarray-with-0-sum/1
/*
Given an array arr[] containing both positive and negative integers, the task is to find the length of the longest subarray with a sum equals to 0.
Note: A subarray is a contiguous part of an array, formed by selecting one or more consecutive elements while maintaining their original order.

Examples:
Input: arr[] = [15, -2, 2, -8, 1, 7, 10, 23]
Output: 5
Explanation: The longest subarray with sum equals to 0 is [-2, 2, -8, 1, 7].
*/

function maxLen(A, n) {
  let mpp = new Map();
  let maxi = 0;
  let sum = 0;

  for (let i = 0; i < n; i++) {
    sum += A[i];
    if (sum === 0) {
      maxi = i + 1;
    } else {
      if (mpp.has(sum)) {
        maxi = Math.max(maxi, i - mpp.get(sum));
      } else {
        mpp.set(sum, i);
      }
    }
  }
  return maxi;
}


// ==================================================== 6. Merge Intervals =============================================
/**
Leetcode : https://leetcode.com/problems/merge-intervals/

Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

Example 1:
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

Example 2:
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.

Example 3:
Input: intervals = [[4,7],[1,4]]
Output: [[1,7]]
Explanation: Intervals [1,4] and [4,7] are considered overlapping.

Brute Force : Just sort the array based on first element of each interval . And then traverse first loop from i =0 to n
. In second loop just check , when parent End is smaller than internal start . break internal loop there . 
In this way , we also need to maintain maximum 'end' interval . 
When I came to outer loop , there is need to check , ans variable last element end interval also . 
 */
var merge = function(arr) {
    const n = arr.length; // size of the array
    let ans = [];

    arr.sort((a,b)=>a[0]-b[0]);

    for(let i=0 ; i<n ; i++){
        const start = arr[i][0];
        let end = arr[i][1];

        if(ans.length != 0 && ans.at(-1)[1] >= start  ){
            continue ;
        }

        let j=i+1 ;

        for( ; j<n ;j++){
            const intStart = arr[j][0];
            const intEnd= arr[j][1];
            if( intStart > end){
                break ;
            }
            end = Math.max(end , intEnd)
        }

        if(j<=n){
            ans.push( [ start , end ])
        }
    }
    return ans ;
};

// Optimized Ways 
/**
Approach : No need to check for each interval . First time , ans array me first interval daal dene ka , uske baad 
check karte rehne ka , agar ans k last element k last element me har baar maximum store karna hai . 
Or agar , ans ka last element chhota pad jata hai , interval k pehle element se , to wo interval store karne ka . 
 */
var merge = function(arr) {
    const n = arr.length; 
    let ans = [];

    arr.sort((a,b)=>a[0]-b[0]);

    for(const interval of arr){
        if(ans.length == 0 || ans[ans.length-1][1] < interval[0] ){
            ans.push(interval);
        }
        else{
            ans[ans.length-1][1] = Math.max( ans[ans.length-1][1] , interval[1] )
        }
    }
    return ans ;
};


// ========================================= 7. Merge two sorted array without third variable=============================
/**
Leetcode : https://leetcode.com/problems/merge-sorted-array/description/
You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n,
representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, but instead be stored inside the array nums1. 
To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged,
and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

Example 1:
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.

Example 2:
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
Explanation: The arrays we are merging are [1] and [].
The result of the merge is [1].

Example 3:
Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]
Explanation: The arrays we are merging are [] and [1].
The result of the merge is [1].
Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.

 Approach : Just take three pointer , very easy approach . 

 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    
    let i=m-1 ;
    let j=n-1 ;
    let k=m+n-1 ;

    while(i>=0 && j>=0){
        if(nums1[i] >= nums2[j]){
            nums1[k] = nums1[i];
            i-- ;
        }
        else{
            nums1[k] = nums2[j];
            j-- ;
        }
        k-- ;
    }

    while(j>=0){
        nums1[k] = nums2[j];
        k-- ;
        j-- ;
    }

};



// ================================================= 8. Maximum Product Subarray ========================================
/**
Leetcode : https://leetcode.com/problems/maximum-product-subarray/

Given an integer array nums, find a subarray that has the largest product, and return the product.
The test cases are generated so that the answer will fit in a 32-bit integer.

Example 1:
Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.

Example 2:
Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
Brute Force Approach : Just use 2 loop , and check for each subarray .
 */
var maxProduct = function(arr) {
    
    let ans = -Infinity  ;
    let n = arr.length ;

    for(let i=0 ; i<n ; i++){
        let prd = arr[i];
        ans = Math.max(ans , prd);
        for(let j=i+1 ; j<n ; j++){
            prd = prd * arr[j];
            ans = Math.max(ans , prd);
        }
        ans = Math.max(ans , prd);
    }
    return ans ;
};

/**
Optimized way : Front and back se calculate karte jaana hai . agar total number of negative numbers odd hue , it means ya to 
left mai ans hai ya to right me . Agar kahi 0 aa jaye product , to waha se aage badh jao . Very Simple and easy approach .
 */
var maxProduct = function(arr) {
    
    let ans = -Infinity  ;
    let n = arr.length ;

    let pref = 1 ;
    let suff = 1 ;

    for(let i=0 ; i<n ; i++){
        const curr = arr[0];

        if(pref == 0){
            pref = 1 ;
        }

        if(suff == 0){
            suff = 1 ;
        }

        pref = pref * arr[i];
        suff = suff * arr[n-i-1];
        ans = Math.max(ans , pref , suff)
    }
    
    return ans ;
};










