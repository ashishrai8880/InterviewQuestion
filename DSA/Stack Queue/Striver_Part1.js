
// ====================================== 1. Valid Parenthesis =======================================================
/**
Leetcode : https://leetcode.com/problems/valid-parentheses/
 */
var isValid = function(s) {
    let stack = [];

    for(let i = 0 ; i<s.length ; i++){
        const ch = s[i];
        if(ch == '(' || ch == '[' || ch == '{'  ){
            stack.push(ch);
        }
        else{
            if(stack.length == 0) return false ;

            if(ch == ')' && stack.at(-1) != '(') return false ;

            if(ch == '}' && stack.at(-1) != '{') return false ;

            if(ch == ']' && stack.at(-1) != '[') return false ;
            stack.pop();
        }
    }
    if(stack.length > 0) return false ;
    return true ;

};


// ======================================== 2. Next Greater Element ==============================================
/**
Leetcode : https://leetcode.com/problems/next-greater-element-i/
 */
var nextGreaterElement = function(nums1, nums2) {
    
    let ans = [];
    const n2 = nums2.length ;
    const n1 = nums1.length ;
    let map = new Map();
    let stack = [];

    for(let i=n2-1 ; i>=0 ; i--){
        const ele = nums2[i];

        while(stack.length != 0 && ele >= stack.at(-1) ){
            stack.pop();
        }

        if(stack.length == 0){
            map.set(ele , -1);
        }
        else {
            map.set(ele , stack.at(-1));
        }

        stack.push(ele);
    }

    nums1.forEach((e)=>{
        ans.push(map.get(e));
    })

    return ans ;
};


// =========================================== 3. Next Greater Element Part 2 =============================================
/**
Leetcode : https://leetcode.com/problems/next-greater-element-ii/

Given a circular integer array nums (i.e., the next element of nums[nums.length - 1] is nums[0]), return the next
greater number for every element in nums.

The next greater number of a number x is the first greater number to its traversing-order next in the array, which means 
you could search circularly to find its next greater number. If it doesn't exist, return -1 for this number.

 

Example 1:
Input: nums = [1,2,1]
Output: [2,-1,2]
Explanation: The first 1's next greater number is 2; 
The number 2 can't find next greater number. 
The second 1's next greater number needs to search circularly, which is also 2.

Example 2:
Input: nums = [1,2,3,4,3]
Output: [2,3,4,-1,4]

Just use concept of circular array . Hypothetically double the size of array or you can traverse twice just to get reverse
order . Super Easy Don't worry . 

Complexity Analysis
Time Complexity: O(N), since traversing on the array takes O(2N) time and traversing the stack will take overall O(2N) 
time as all the elements are pushed in the stack once. So In worst case time complexity would be O(4N)

Space Complexity: O(N), since the answer array takes O(N) space and the space used by stack will be O(N) in the worst case.

 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function(nums) {
    
    let st = [] ;

    const n = nums.length ;
    let i = (2*n)-1 ;
    let ans = Array.from({length : n},()=>-1);

    for( ; i>=0 ; i--){

        const index = i%n ;
        const ele = nums[index];

        while(st.length > 0 && ele >= st.at(-1)){
            st.pop();
        }

        if(i < n ){
            ans[i] = st.length == 0 ? -1 : st.at(-1);
        }

        st.push(ele);

    }
    return ans ;
};


// ========================================= 4. Tapping Rainwater =====================================================
/**
Leetcode : https://leetcode.com/problems/trapping-rain-water/

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water 
it can trap after raining.

Example 1:
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1].
In this case, 6 units of rain water (blue section) are being trapped.

Example 2:
Input: height = [4,2,0,3,2,5]
Output: 9

Approach : Super Easy Question , just find right and left max of each element . Then from min of right and left , subtract 
height[i] ;
 
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    
    const n = height.length ;
    let leftMax = Array.from({length : n});
    let rightMax = Array.from({length : n});

    leftMax[0] = height[0];
    rightMax[n-1] = height[n-1];

    for(let i = 1 ; i<n ; i++){
        leftMax[i] = Math.max(height[i] , leftMax[i-1]);
    }

    for(let i = n-2 ; i>=0 ; i--){
        rightMax[i] = Math.max(height[i] , rightMax[i+1]);
    }

    let res = 0 ;

    for(let i = 0 ; i<n ; i++){
        res = res + (Math.min(leftMax[i] , rightMax[i]) - height[i]) ;
    }
    return res ;
};


// ===================================== 6. Sum of Subarray Minimums ===================================================
/**
Leetcode : https://leetcode.com/problems/sum-of-subarray-minimums/description/

Given an array of integers arr, find the sum of min(b), where b ranges over every (contiguous) subarray of arr.
Since the answer may be large, return the answer modulo 109 + 7.

Example 1:
Input: arr = [3,1,2,4]
Output: 17
Explanation: 
Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4]. 
Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.
Sum is 17.

Example 2:
Input: arr = [11,81,94,43,3]
Output: 444
 
 * @param {number[]} arr
 * @return {number}

 Approach : Brute Force , just use 2 loops , find all subarray and its minimum and find their sums 
 */
var sumSubarrayMins = function(arr) {
    
    let res = 0 ;
    let n = arr.length ;
    const mod = 10**9 + 7 ; ;

    for(let i = 0 ; i<n ; i++ ){
        let min = arr[i];
        for(let j = i+1 ; j<n ; j++){
            res = res + min ;
            min = Math.min(min , arr[j]);
        }
        res = res + min ;
    }
    return res%mod ;

};


/**
Optimized Way :  Just find previous smaller element index and next smaller element index . Idea is to just find , element
which is smaller contributing to how many subarray . if element is in 12 subarray , then sum of minimum will be 12 * n 
where n would be that smaller element . Similarily find for all . 

 * @param {number[]} arr
 * @return {number}
 */
var sumSubarrayMins = function(arr) {
    
    const nextSmaller = ()=>{
        const n = arr.length;
        
        const ans = new Array(n).fill(0);
        
        const st = [];
        
        for (let i = n - 1; i >= 0; i--) {
            
            const currEle = arr[i];
            
            while (st.length > 0 && arr[st[st.length - 1]] >= arr[i]) {
                st.pop();
            }
            
            ans[i] = st.length > 0 ? st[st.length - 1] : n;
            
            st.push(i);
        }
        
        return ans;
    }

    const previousSmaller = ()=>{
        const n = arr.length;
        
        const ans = new Array(n).fill(0);
        
        const st = [];
        
        for (let i = 0; i < n; i++) {
            
            const currEle = arr[i];
            
            while (st.length > 0 && arr[st[st.length - 1]] > arr[i]) {
                st.pop();
            }
            
            ans[i] = st.length > 0 ? st[st.length - 1] : -1;
            
            st.push(i);
        }
        
        return ans;
    }

    const mod = 10**9 + 7 ;
    const n = arr.length ;
    const nse = nextSmaller() ;
    const pse = previousSmaller();
    let ans = 0 ;

    for(let i = 0 ; i<n ; i++){

        const leftSmaller = i - pse[i];
        const rightSmaller = nse[i] - i;

        const freq = (leftSmaller * rightSmaller ) * arr[i] ;
        ans = ans + freq ;
    }
    return ans% mod ;

};


// ====================================================== 7. Asteroids Collision ==========================================
/**
Leetcode : https://leetcode.com/problems/asteroid-collision/

We are given an array asteroids of integers representing asteroids in a row. The indices of the asteroid in the array represent their relative position in space.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

Example 1:
Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.

Example 2:
Input: asteroids = [8,-8]
Output: []
Explanation: The 8 and -8 collide exploding each other.

Example 3:
Input: asteroids = [10,2,-5]
Output: [10]
Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.

Example 4:
Input: asteroids = [3,5,-6,2,-1,4]​​​​​​​
Output: [-6,2,4]
Explanation: The asteroid -6 makes the asteroid 3 and 5 explode, and then continues going left. On the other side, the asteroid 2 makes the asteroid -1 explode and then continues going right, without reaching asteroid 4.

 Approach : Just take stack , start pushing positive element in it . 
 When there is negative element , start popping from stack , until abs(ele) is smaller than last stack element . 
 There is 2 edge case , first is when st is empty then store negative element . 
 Second is , when there is same size asteroids , then remove both  .

 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function(arr) {
    
    let st = [];
    const n = arr.length ;

    for(let i = 0 ; i<n ; i++){
        const ele = arr[i];

        if(ele > 0){
            st.push(ele);
        }

        else{
            while(st.length != 0 &&  st.at(-1) > 0 && st.at(-1) < Math.abs(ele)){
                st.pop();
            }

            // case when negative asteroids with same size , then move both
            if( st.length != 0  && st.at(-1) == Math.abs(ele)){
                st.pop();
            }

            // if all element popped or already there is negative asteroids
            else if( st.length == 0 || st.at(-1) < 0 ){
                st.push(ele);
            }
        }
        
    }

    return st ;

};



// =========================================== 8. Sum of Subarray Ranges (Easy) =======================================

/**
Leetcode : https://leetcode.com/problems/sum-of-subarray-ranges/description/
You are given an integer array nums. The range of a subarray of nums is the difference between the largest and smallest element in the subarray.
Return the sum of all subarray ranges of nums.
A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
Input: nums = [1,2,3]
Output: 4
Explanation: The 6 subarrays of nums are the following:
[1], range = largest - smallest = 1 - 1 = 0 
[2], range = 2 - 2 = 0
[3], range = 3 - 3 = 0
[1,2], range = 2 - 1 = 1
[2,3], range = 3 - 2 = 1
[1,2,3], range = 3 - 1 = 2
So the sum of all ranges is 0 + 0 + 0 + 1 + 1 + 2 = 4.

Example 2:
Input: nums = [1,3,3]
Output: 4
Explanation: The 6 subarrays of nums are the following:
[1], range = largest - smallest = 1 - 1 = 0
[3], range = 3 - 3 = 0
[3], range = 3 - 3 = 0
[1,3], range = 3 - 1 = 2
[3,3], range = 3 - 3 = 0
[1,3,3], range = 3 - 1 = 2
So the sum of all ranges is 0 + 0 + 0 + 2 + 0 + 2 = 4.

Example 3:
Input: nums = [4,-2,-3,4,1]
Output: 59
Explanation: The sum of all subarray ranges of nums is 59.

Brute Force Appraoch 
 * @param {number[]} nums
 * @return {number}
 */
var subArrayRanges = function(arr) {
    let res = 0 ;
    const n = arr.length ;

    for(let i = 0 ; i<n ; i++){
        let min = arr[i];
        let max = arr[i];
        for(let j = i+1 ; j<n ; j++){
            max = Math.max(max , arr[j])
            min = Math.min(min , arr[j])
            res += (max-min) ;
        }
    }
    return res ;
};

/**
Optimized Approach : Just take reference from question 6 sum of subarray minimums . 
Concept is , for ranges , we have to find minimum and maximum element of each subarray and then find difference 
So Summation of all (Max - Min) . Which gives (Sum of subarray maximums) - (Sum of subarray minimums) .

 * @param {number[]} arr
 * @returns {number}
 */
class Solution {
    findNSE(arr) {
        const n = arr.length;
        const ans = new Array(n).fill(0);
        const st = [];
        for (let i = n - 1; i >= 0; i--) {
            const currEle = arr[i];
            while (st.length > 0 && arr[st[st.length - 1]] >= currEle) {
                st.pop();
            }
            ans[i] = st.length > 0 ? st[st.length - 1] : n;
            st.push(i);
        }
        return ans;
    }
    
    findNGE(arr) { 
        const n = arr.length;
        const ans = new Array(n).fill(0);
        const st = [];
        for (let i = n - 1; i >= 0; i--) {
            const currEle = arr[i];
            while (st.length > 0 && arr[st[st.length - 1]] <= currEle) {
                st.pop();
            }
            ans[i] = st.length > 0 ? st[st.length - 1] : n;
            st.push(i);
        } 
        return ans;
    }
   
    findPSEE(arr) {
        const n = arr.length;
        const ans = new Array(n).fill(0);
        const st = [];
        for (let i = 0; i < n; i++) {
            const currEle = arr[i];
            while (st.length > 0 && arr[st[st.length - 1]] > currEle) {
                st.pop();
            }
            ans[i] = st.length > 0 ? st[st.length - 1] : -1;
            st.push(i);
        }
        return ans;
    }
    
    findPGEE(arr) {
        const n = arr.length;
        const ans = new Array(n).fill(0);
        const st = [];
        for (let i = 0; i < n; i++) {
            const currEle = arr[i];
            while (st.length > 0 && arr[st[st.length - 1]] < currEle) {
                st.pop();
            }
            ans[i] = st.length > 0 ? st[st.length - 1] : -1;
            st.push(i);
        }
        return ans;
    }
    
    sumSubarrayMins(arr) {  
        const nse = this.findNSE(arr);
        const psee = this.findPSEE(arr);
        const n = arr.length;
        let sum = 0;
        
        for (let i = 0; i < n; i++) {
            const left = i - psee[i];
            const right = nse[i] - i;
            const freq = left * right * 1;
            const val = (freq * arr[i] * 1);
            sum += val;
        }
        return sum;
    }
    
    sumSubarrayMaxs(arr) {
        const nge = this.findNGE(arr);
        const pgee = this.findPGEE(arr);
        const n = arr.length;
        let sum = 0;
        
        for (let i = 0; i < n; i++) {
            const left = i - pgee[i];
            const right = nge[i] - i;
            const freq = left * right * 1;
            const val = (freq * arr[i] * 1);
            sum += val;
        }
        return sum;
    }
    
    subarrayRanges(arr) {
        return ( this.sumSubarrayMaxs(arr) - this.sumSubarrayMins(arr) );
    }    
}


// =============================================== 9. Remove K digits ===================================================
/**
Easy One Leetcode : https://leetcode.com/problems/remove-k-digits/

Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.

Approach : Just keep pushing smaller element into a stack . If there is number which is smaller than top of stack
start popping it out . Keep counting k as well . Super Easy Method .

Example 1:
Input: num = "1432219", k = 3
Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.

Example 2:
Input: num = "10200", k = 1
Output: "200"
Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.

Example 3:
Input: num = "10", k = 2
Output: "0"
Explanation: Remove all the digits from the number and it is left with nothing which is 0.

 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function(num, k) {
    
    let st = [];
    let n = num.length ;

    for(let i = 0 ; i<n ; i++){
        const ele = parseInt(num[i]);

        while( k != 0 && st.length != 0 && ele < st.at(-1)){
            k-- ;
            st.pop();
        }
        st.push(parseInt(ele));
    }

    while( st.length != 0 && k > 0){
        st.pop();
        k-- ;
    }

    if(st.length == 0) return "0";

    let res = "";
    for(let i = 0 ; i<st.length ; i++){
        res += st[i];
    }

    const firstIdx = res.split('').findIndex((e)=>e!=='0') ;
    return firstIdx >=0 ? res.slice(firstIdx) : "0" ;
};



// ============================================= 10. Largest Rectangle Area ===============================================
/**
Leetcode : https://leetcode.com/problems/largest-rectangle-in-histogram/description/
Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.
Brute Force : Just check all subarray , and then find maximum area . 
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(arr) {
    
    let res = 0 ;
    const n = arr.length ;

    for(let i = 0 ; i<n ; i++){
        let min = arr[i];
        for(let j = i ; j< n ; j++){
            min = Math.min(min , arr[j]);
            const area = (j-i+1)*min ;
            res = Math.max(res , area);
        }
    }
    return res ;
};


// Better Optimize with TC of O(5N) and space is also there of O(3N) . Just take next smaller and previos smaller 
/**
and store index of it . Very Easy Question 
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(arr) {
    
    const previousSmaller = ()=>{
        let st = [];
        let res = Array.from({length : n});

        for(let i = 0 ; i < n ; i++){
            const ele = arr[i];

            while(st.length != 0 && ele <= arr[st.at(-1)]){
                st.pop();
            }

            res[i] = st.length ? st.at(-1) : -1 ;
            st.push(i);
        }
        return res ;
    }

    const nextSmaller = ()=>{
        let st = [];
        let res = Array.from({length : n});

        for(let i = n-1 ; i>=0 ; i--){
            const ele = arr[i];

            while(st.length != 0 && ele <= arr[st.at(-1)]){
                st.pop();
            }

            res[i] = st.length ? st.at(-1) : n ;
            st.push(i);
        }
        return res ;
    }

    const n = arr.length ;
    let res = 0 ;
    const pes = previousSmaller();
    const nes = nextSmaller();

    for(let i=0 ; i<n ; i++){
        const width = nes[i] - pes[i] -1 ;
        const area = width * arr[i];
        res = Math.max(res , area);
    }
    return res ;
};



// =========================================== 11. Maximal Rectangle =================================================
/**
Leetcode : https://leetcode.com/problems/maximal-rectangle/

Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

Example 1 : 
Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 6
Explanation: The maximal rectangle is shown in the above picture.
Example 2:

Input: matrix = [["0"]]
Output: 0
Example 3:

Input: matrix = [["1"]]
Output: 1

Approach : Easy One , just send each row of matrix to find largest rectangle in histogram . As per above question . 
But for each row , need to calculate height of bar and then send that row . Very Easy Just code is lengthy . 

 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function(matrix) {
    
    const largestAreaInHistogram = (arr)=>{

        const previousSmaller = ()=>{
            let st = [];
            let res = Array.from({length : n});

            for(let i = 0 ; i < n ; i++){
                const ele = arr[i];

                while(st.length != 0 && ele <= arr[st.at(-1)]){
                    st.pop();
                }

                res[i] = st.length ? st.at(-1) : -1 ;
                st.push(i);
            }
            return res ;
        }

        const nextSmaller = ()=>{
            let st = [];
            let res = Array.from({length : n});

            for(let i = n-1 ; i>=0 ; i--){
                const ele = arr[i];

                while(st.length != 0 && ele <= arr[st.at(-1)]){
                    st.pop();
                }

                res[i] = st.length ? st.at(-1) : n ;
                st.push(i);
            }
            return res ;
        }

        const n = arr.length ;
        let res = 0 ;
        const pes = previousSmaller();
        const nes = nextSmaller();

        for(let i=0 ; i<n ; i++){
            const width = nes[i] - pes[i] -1 ;
            const area = width * arr[i];
            res = Math.max(res , area);
        }
        return res ;

    }


    let row = matrix.length ;
    let col = matrix[0].length ;
    let histMat = Array.from({length : row},()=>{
        return Array.from({length : col } , ()=>0)
    })

    for(let i = 0 ; i<col ; i++){
        let sum = 0 ;
        for(let j=0 ; j<row ; j++){
            if(matrix[j][i] == '0'){
                sum = 0 ;
            }
            sum += parseInt(matrix[j][i]);
            histMat[j][i] = sum ;
        }
    }

    let res = 0 ;
    for(let i = 0 ; i<row ; i++){
        const max = largestAreaInHistogram(histMat[i]);
        res = Math.max(res , max);
    }
    return res ;

};


// ========================================= 12 . Sliding Window Maximum ============================================
/**
Leetcode : https://leetcode.com/problems/sliding-window-maximum/

You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

Example 1:
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
 
Example 2:
Input: nums = [1], k = 1
Output: [1]
 

 Brute Force : Just check all subarray and find maximum which could throw TLE 
 */
var maxSlidingWindow = function(nums, k) {
    
    let res = [];
    let n = nums.length ;

    for(let i = 0 ; i<=n-k ; i++){
        let max = -Infinity ;

        for(let j = i ; j < i+k ; j++){
            max = Math.max(max , nums[j]);
        }
        res.push(max);
    }
    return res ;

};


// Optimized Way : Using DeQue 
/**
Logic : Take Doubly ended queue . One get bigger element then start removing from back of queue , until it get right place . 
If window size increased in queue , then remove first element . Super Easy Questioin . 
 */
var maxSlidingWindow = function(nums, k) {
    
    let dq = [];
    let res = [];
    const n = nums.length ;

    for(let i = 0 ; i < n ; i++){

        if( dq.length !=0 && i-k >= dq.at(0)){
            dq.shift();
        }

        while(dq.length != 0 && nums[dq.at(-1)] < nums[i] ){
            dq.pop();
        }
        dq.push(i);

        if((i+1)-k >= 0){
            res.push(nums[dq.at(0)]);
        }
    }
    return res ;
};


// ========================================== 13. Stock Span Problem ==================================================

/** 
Leetcode : https://leetcode.com/problems/online-stock-span/
GFG : https://www.geeksforgeeks.org/problems/stock-span-problem-1587115621/1 . 

The stock span problem is a financial problem where we have a series of daily price quotes for a stock and we need to calculate the span of stock price for all days.
You are given an array arr[] representing daily stock prices, the stock span for the i-th day is the number of consecutive days up to day i (including day i itself) for which the price of the stock is less than or equal to the price on day i. Return the span of stock prices for each day in the given sequence.

Example 1 : 
Input: arr[] = [100, 80, 90, 120]
Output: [1, 1, 2, 4]
Explanation: Traversing the given input span 100 is greater than equal to 100 and there are no more days behind it so the span is 1, 80 is greater than equal to 80 and smaller than 100 so the span is 1, 90 is greater than equal to 90 and 80 so the span is 2, 120 is greater than 90, 80 and 100 so the span is 4. So the output will be [1, 1, 2, 4].

Brute Force 
 */
class Solution {
    calculateSpan(arr) {
        // code here
        let res = [];
        const n = arr.length ;
        
        for(let i = 0 ; i<n ; i++){
            let count = 0 ; 
            
            for(let j = i ; j>=0 ; j--){
                if(arr[j] <= arr[i]){
                    count+=1 ;
                }else{
                    break ;
                }
            }
            res.push(count);
        }
        return res ;
    }
}


// Optimized Way : Super Easy Super logical questioin 
/**
Just calculate previous greater element and then find difference between index of (curr element and prev greater element index) . 
 */

class Solution {
    calculateSpan(arr) {
        // code here
        
        const findPGE = ()=>{
            let st = [];
            let ans = [];
            
            for(let i = 0 ; i< n ; i++){
                
                while(st.length != 0 && arr[i] >= arr[st.at(-1)]){
                    st.pop();
                }
                
                if(st.length == 0){
                    ans.push(-1);
                }
                else{
                    ans.push(st.at(-1));
                }
                
                st.push(i);
                
            }
            return ans ;
        }
        
        const n = arr.length ;
        const pge = findPGE();
        
        // console.log({pge})
        
        for(let i = 0 ; i<n ; i++){
            arr[i] = i - pge[i];
        }
        
        return arr ;
    }
}


// More Optimized . Extremely Good Solution
/**
Just store value and span in stack . for each element , pop from stack until number at top of stack is greater . 
parallely count span variable . 
 */

class Solution {
    calculateSpan(arr) {
        // code here
        
        let st = [] ;
        let ans = [] ; 
        const n = arr.length ;
        
        for(let i = 0 ; i < n ; i++){
            let span = 1 ; 
            
            while(st.length != 0 && arr[i] >= st.at(-1)[0] ){
                span += st.pop()[1];
            }
            
            ans.push(span);
            
            st.push([arr[i] , span]);
        }
        
        return ans ;
        
    }
}


// ========================================== 14. Celebrity Problem ====================================================
/**
GFG : https://www.geeksforgeeks.org/problems/the-celebrity-problem/1

A celebrity is a person who is known to all but does not know anyone at a party. A party is being organized by some people. A square matrix mat[][] of size n*n is used to represent people at the party such that if an element of row i and column j is set to 1 it means ith person knows jth person. You need to return the index of the celebrity in the party, if the celebrity does not exist, return -1.

Note: Follow 0-based indexing.

Examples:
Input: mat[][] = [[1, 1, 0],
                [0, 1, 0],
                [0, 1, 1]]
Output: 1
Explanation: 0th and 2nd person both know 1st person and 1st person does not know anyone. Therefore, 1 is the celebrity person.

Input: mat[][] = [[1, 1], 
                [1, 1]]
Output: -1
Explanation: Since both the people at the party know each other. Hence none of them is a celebrity person.

Input: mat[][] = [[1]]
Output: 0
 */
class Solution {
    celebrity(mat) {
        // code here
        
        let flag = true ;
        const n = mat.length ;
        let celb = -1 ;
        for(let i = 0 ; i<n ; i++){
            flag = true ;
            for(let j = 0 ; j< n ; j++){
                if( j!=i && mat[i][j] == 1){
                    flag = false ;
                    break ;
                }
            }
            if(flag){
                celb = i ;
                break ;
            } 
        }
        
        if(celb == -1) return celb ;
        
        for(let i = 0 ; i<n ; i++){
            if( celb != i && mat[i][celb] == 0 ){
                return -1 ;
            }
        }
        return celb ;
    }
}











