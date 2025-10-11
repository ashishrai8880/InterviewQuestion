
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























