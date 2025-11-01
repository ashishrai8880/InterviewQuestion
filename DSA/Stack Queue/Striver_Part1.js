
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


