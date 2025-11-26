
// =========================================== 1. Longest Substring without repeating characters =============================
/**
Leetcode : https://leetcode.com/problems/longest-substring-without-repeating-characters/

Given a string s, find the length of the longest substring without duplicate characters.

Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.

Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {

    if(s.length <= 1){
        return s.length ;
    }

    let res = 1 ;
    let set = new Set();
    let left = 0 ;

    for(let i = 0 ; i<s.length ; i++){
        const ch = s[i];

        if(set.has(ch)){
            while( set.size != 0 && set.has(ch)){
                set.delete(s[left]);
                left++ ;
            }
        }

        set.add(ch);
        res = Math.max(res , set.size );
    }
    return res ;
};


// ============================= 2. Maximum Consecutive 1's by flipping at most k 0's ======================================

/**
Leetcode : https://leetcode.com/problems/max-consecutive-ones-iii/
Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.

Example 1:
Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
 * @param {number[]} nums
 * @param {number} k
 * @return {number}

 Brute Force : Break this question into longest subarray with at most k 0's . 
 */
var longestOnes = function(nums, k) {
    
    let res = 0 ;
    const n = nums.length ;

    for(let i= 0 ; i<n ; i++){
        let zCount = 0 ;

        for(let j = i ; j< n ; j++){
            if(nums[j] == 0 && zCount < k){
                res = Math.max(res , j-i+1);
                zCount++ ;
            }
            else if(nums[j] == 1){
                const len = j-i+1 ;
                res = Math.max(res , len);
            }
            else{
                break ;
            }
        }
    }
    return res ;
};


// Optimized Way
/**
Use 2 Pointer l and r . when zCount increase k then update left l pointer . 
 */
var longestOnes = function(nums, k) {
    
    let res = 0 ;
    let r = 0 ;
    let  l = 0 ;
    const n = nums.length ;
    let zCount = 0 ;

    for( ; r<n ; r++){
        if(nums[r] == 0){
            zCount++ ;
        }
        if(zCount > k){
            while(zCount > k){
                if(nums[l] == 0){
                    zCount-- ;
                }
                l++ ;
            }
        }
        res = Math.max(res , (r-l+1));
    }
    return res ;
};



/**
Best Optimized : Remove inner loop also . If zero count increase by k , just increase left pointer , so that length will 
not increase . 
 */
var longestOnes = function(nums, k) {
    
    let res = 0 ;
    let r = 0 ;
    let  l = 0 ;
    const n = nums.length ;
    let zCount = 0 ;

    for( ; r<n ; r++){
        if(nums[r] == 0){
            zCount++ ;
        }

        if(zCount > k){
            if(nums[l] == 0){
                zCount -- ;
            }
            l++ ;
        }

        res = Math.max(res , (r-l+1));
    }
    return res ;
};



// ============================================== 3. Fuites Into Baskets =================================================
/**
Leetcode : https://leetcode.com/problems/fruit-into-baskets/

You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces.

You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:

- You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
- Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
- Once you reach a tree with fruit that cannot fit in your baskets, you must stop.
Given the integer array fruits, return the maximum number of fruits you can pick.


Example 1:

Input: fruits = [1,2,1]
Output: 3
Explanation: We can pick from all 3 trees.
Example 2:

Input: fruits = [0,1,2,2]
Output: 3
Explanation: We can pick from trees [1,2,2].
If we had started at the first tree, we would only pick from trees [0,1].
Example 3:

Input: fruits = [1,2,3,2,2]
Output: 4
Explanation: We can pick from trees [2,3,2,2].
If we had started at the first tree, we would only pick from trees [1,2].

Brute Force Approach : Calculate maximum length of subarray with at most 2 distinct characters or fruits . 
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function(arr) {
    
    let res = 0 ;
    const n = arr.length ;

    for(let i = 0 ; i < n ; i++){
        let set = new Set();

        for(let j=i ; j<n ; j++){
            set.add(arr[j]);
            if(set.size > 2){
                break ;
            }
            res = Math.max(res , (j-i+1));
        }
    }
    return res ;

};


/**
Better Solution 
 */
var totalFruit = function(arr) {
    
    let res = 0 ;
    const n = arr.length ;
    let map = new Map();
    let l = 0 ;
    let r = 0 ;

    for( ; r < n ; r++){
        map.set(arr[r] , (map.get(arr[r]) || 0) + 1 )

        while(map.size > 2){
            map.set(arr[l] , map.get(arr[l])-1 );
            if(map.get(arr[l]) == 0){
                map.delete(arr[l]);
            }
            l++ ;
        }

        res = Math.max(res , (r-l+1));       

    }
    return res ;
};


/**
Most Optimized Solution
 */
var totalFruit = function(fruits) {
    
    let maxlen = 0;
    let lastFruit = -1, secondLastFruit = -1;
    let currCount = 0, lastFruitStreak = 0;

    for (let fruit of fruits) {

        if (fruit === lastFruit || fruit === secondLastFruit) {
            currCount++;
        } else {
            currCount = lastFruitStreak + 1;
        }

        if (fruit === lastFruit) {
            lastFruitStreak++;
      
        } else {
            lastFruitStreak = 1;
            secondLastFruit = lastFruit;
            lastFruit = fruit;
        }
        maxlen = Math.max(maxlen, currCount);
    }

    return maxlen;
};



// ================================= 4. Longest Repeating character replacement ===========================================
/**
Leetcode : https://leetcode.com/problems/longest-repeating-character-replacement/description/

You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.
Return the length of the longest substring containing the same letter you can get after performing the above operations.

Example 1:
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.

Example 2:
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.

 */
var characterReplacement = function(s, k) {
    
    let res = 0 ; 
    const n = s.length ;

    for(let i = 0 ; i < n ; i++){
        
        let freq = {};
        let maxFreq = 0 ;

        for(let j = i ; j< n ; j++){
            const ch = s[j];
            const len = j - i + 1 ;

            freq[ch] = freq[ch] ? freq[ch] + 1 : 1 ;
            maxFreq = Math.max(maxFreq , freq[ch] );
            const replace = len - maxFreq ;
            
            if(replace <= k){
                res = Math.max(res , len);
            }else{
                break ;
            }
        }
    }
    return res ;
};


/**
Better Solution
 */
var characterReplacement = function(s, k) {
    
    let res = 0 ; 
    const n = s.length ;
    let l = 0 ;
    let maxFreq = 0 ; 
    let freq = {};

    for(let r = 0 ; r < n ; r++){
        const ch = s[r];

        freq[ch] = ( freq[ch] || 0 ) + 1 ;

        maxFreq = Math.max(maxFreq , freq[ch]);

        while((r-l+1) - maxFreq > k ){
            freq[s[l]]-- ;
            l++ ;
        }

        res = Math.max(res , r-l+1)

    }

    return res ;

};


// ======================================= 5. Binary Subarray with sum ==============================================

/**
Leetcode : https://leetcode.com/problems/binary-subarrays-with-sum/description/

Given a binary array nums and an integer goal, return the number of non-empty subarrays with a sum goal.

A subarray is a contiguous part of the array.

Example 1:
Input: nums = [1,0,1,0,1], goal = 2
Output: 4
Explanation: The 4 subarrays are bolded and underlined below:
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]

Example 2:
Input: nums = [0,0,0,0,0], goal = 0
Output: 15
 */
var numSubarraysWithSum = function(nums, goal) {
    
    let res = 0 ;
    const n = nums.length ;
    let prefSum = 0 ;
    let map = new Map();
    map.set(0 ,1);

    for(const num of nums){
        prefSum += num ;
        const check = prefSum - goal ;

        if( map.has(check) ){
            res = res + map.get(check);
        }

        map.set(prefSum , (map.get(prefSum) || 0) + 1 ) ;
    }

    return res ;

};

/**
Better Solution using prefix sum 
 */
var numSubarraysWithSum = function(nums, goal) {
    
    let res = 0 ;
    const n = nums.length ;
    let prefSum = 0 ;
    let map = new Map();
    map.set(0 ,1);

    for(const num of nums){
        prefSum += num ;
        const check = prefSum - goal ;

        if( map.has(check) ){
            res = res + map.get(check);
        }
        map.set(prefSum , (map.get(prefSum) || 0) + 1 ) ;
    }
    return res ;
};


// ========================================== 6. Count Number of Nice Subarray =================================================
/**
Leetcode : https://leetcode.com/problems/count-number-of-nice-subarrays/

Given an array of integers nums and an integer k. A continuous subarray is called nice if there are k odd numbers on it.
Return the number of nice sub-arrays.

Example 1:
Input: nums = [1,1,2,1,1], k = 3
Output: 2
Explanation: The only sub-arrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].

Example 2:
Input: nums = [2,4,6], k = 1
Output: 0
Explanation: There are no odd numbers in the array.

Example 3:
Input: nums = [2,2,2,1,2,2,1,2,2,2], k = 2
Output: 16

Logic : Questioin is same as previous one . Just break every number by num%2 . If it is odd , it will give 1 otherwise 0 .
so count of odd number would be like sum of 1 . 

 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numberOfSubarrays = function(nums, k) {
    
    let res = 0 ;
    const n = nums.length ;
    let map = new Map();
    map.set(0 , 1)
    let prefSum = 0 ;  

    for(const num of nums){
        prefSum += num%2 ;

        if(map.has(prefSum - k)){
            res = res + map.get(prefSum - k);
        }

        map.set(prefSum , (map.get(prefSum) || 0)+1 )
    }

    return res ;
};



// ========================================== 7. Number of substring containing all characters ============================
/**
Leetcode : https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/

Given a string s consisting only of characters a, b and c.
Return the number of substrings containing at least one occurrence of all these characters a, b and c.

Example 1:
Input: s = "abcabc"
Output: 10
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again). 

Example 2:
Input: s = "aaacb"
Output: 3
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb". 

Example 3:
Input: s = "abc"
Output: 1
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function(s) {
    
    let res = 0 ;
    const n = s.length ;

    for(let i = 0 ; i< n ; i++){
        let set = new Set();
        for(let j = i ; j<n ; j++){
            set.add(s[j]);
            if(set.size == 3){
                res += (n-j) ;
                break ;
            }
        }
    }

    return res ;

};


// Optimized way
/**
Basically taking last index of each character a , b , c . when we have last index , then simply finding minimum 
last index , it means , before all character behind last minimum index will satisfy condition . 
 */
var numberOfSubstrings = function(s) {
    
    let res = 0 ;
    const n = s.length ;
   
    let arr = [-1 , -1 , -1];
    for(let i = 0 ; i<n  ; i++){
        const ch = s[i];

        const idx = ch.charCodeAt(0) - 'a'.charCodeAt(0);
        arr[idx] = i ;

        if(arr[0]!=-1 && arr[1]!=-1 && arr[2]!=-1  ){
            const minIdx = Math.min(arr[0] , arr[1] , arr[2]);
            res = res + 1 + minIdx ;
        }
    }
    
    return res ;
};


// ====================================== 8. Maximum points can be obtained from cards ====================================
/**

Leetcode : https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/

There are several cards arranged in a row, and each card has an associated number of points. The points are given in the integer array cardPoints.
In one step, you can take one card from the beginning or from the end of the row. You have to take exactly k cards.
Your score is the sum of the points of the cards you have taken.
Given the integer array cardPoints and the integer k, return the maximum score you can obtain.

Example 1:
Input: cardPoints = [1,2,3,4,5,6,1], k = 3
Output: 12
Explanation: After the first step, your score will always be 1. However, choosing the rightmost card first will maximize your total score. The optimal strategy is to take the three cards on the right, giving a final score of 1 + 6 + 5 = 12.

Example 2:
Input: cardPoints = [2,2,2], k = 2
Output: 4
Explanation: Regardless of which two cards you take, your score will always be 4.

Example 3:
Input: cardPoints = [9,7,7,9,7,7,9], k = 7
Output: 55
Explanation: You have to take all the cards. Your score is the sum of points of all cards.
 
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function(arr, k) {
    
    const n = arr.length ;
    let res = 0 ;
    let leftSum = 0 ;
    let rightSum = 0 ;

    for(let i = 0 ; i<k ; i++){
        leftSum += arr[i];
        res = Math.max(res , leftSum);
    }

    let rIndex = n-1 ;
    for(let i=k-1 ; i>=0 ; i--){
        leftSum = leftSum - arr[i];
        rightSum = rightSum + arr[rIndex] ;
        res = Math.max(res , (leftSum+rightSum));
        rIndex-- ;
    }
    return res ;
};







