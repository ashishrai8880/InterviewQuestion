
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



















