//---------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
/**
1. Cookies : Leetcode : https://leetcode.com/problems/assign-cookies/

Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one 
cookie.
Each child i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with; and each 
cookie j has a size s[j]. If s[j] >= g[i], we can assign the cookie j to the child i, and the child i will be content. 
Your goal is to maximize the number of your content children and output the maximum number.

Example 1:

Input: g = [1,2,3], s = [1,1]
Output: 1
Explanation: You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3. 
And even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.
You need to output 1.
Example 2:

Input: g = [1,2], s = [1,2,3]
Output: 2
Explanation: You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2. 
You have 3 cookies and their sizes are big enough to gratify all of the children, 
You need to output 2.
 
Constraints:

1 <= g.length <= 3 * 104
0 <= s.length <= 3 * 104
1 <= g[i], s[j] <= 231 - 1

Time Complexity: O(n*logn + m*logm), Both the arrays are sorted in increasing order.
Space Complexity: O(1), No extra space is used.
 
 */
var findContentChildren = function(greed , cookie) {
    
    greed.sort((a,b)=>a-b);
    cookie.sort((a,b)=>a-b);

    let greedIndex = 0 ;
    let cookieIndex = 0 ;

    while(greedIndex < greed.length && cookieIndex < cookie.length){

        if(greed[greedIndex] <= cookie[cookieIndex]){
            greedIndex++ ;
        }
        cookieIndex++ ;

    }
    return greedIndex ;
};


//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------2. Fractional Knapsack---------------------------------------------------------
/**
GFG : https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1
Leetcode : https://leetcode.com/problems/maximum-units-on-a-truck/description/

Given two arrays, val[] and wt[] , representing the values and weights of items, and an integer capacity representing the 
maximum weight a knapsack can hold, determine the maximum total value that can be achieved by putting items in the knapsack.
You are allowed to break items into fractions if necessary.
Return the maximum value as a double, rounded to 6 decimal places.

Examples :

Input: val[] = [60, 100, 120], wt[] = [10, 20, 30], capacity = 50
Output: 240.000000
Explanation: By taking items of weight 10 and 20 kg and 2/3 fraction of 30 kg. Hence total price will be 60+100+(2/3)(120) = 240
Input: val[] = [500], wt[] = [30], capacity = 10
Output: 166.670000
Explanation: Since the item’s weight exceeds capacity, we take a fraction 10/30 of it, yielding value 166.670000.

 * @param {number[]} val
 * @param {number[]} wt
 * @param {number} capacity
 * @returns {number}
 */

class Solution {
    fractionalKnapsack(val, wt, capacity) {
        // code here
        const n = val.length;

        let items = [];
        for (let i = 0; i < n; i++) {
            items.push({
                value: val[i],
                weight: wt[i],
                ratio: val[i] / wt[i]
            });
        }

        // Sort by value/weight descending
        items.sort((a, b) => b.ratio - a.ratio);

        let totalValue = 0;
        let remainingCapacity = capacity;

        for (let item of items) {
            if (remainingCapacity === 0) break;

            if (item.weight <= remainingCapacity) {
                totalValue += item.value;
                remainingCapacity -= item.weight;
            } else {
                totalValue += item.ratio * remainingCapacity;
                remainingCapacity = 0;
            }
        }

        return Number(totalValue.toFixed(6));
        
    }
}

//---------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
/**
3. https://www.geeksforgeeks.org/problems/-minimum-number-of-coins4426/1
https://leetcode.com/problems/coin-change/description/
Given an infinite supply of each denomination of Indian currency { 1, 2, 5, 10 } and a target value n. Find the minimum
number of coins and/or notes needed to make the change for Rs n. 
Examples:
Input: n = 39
Output: 6
Explaination: 39 can be formed using 3 coins of 10 rupees, 1 coin of 5 rupees and 2 coins of 2 rupees so minimum coins 
required are 6.
 * @param {number} n
 * @returns {number}
 */
class Solution {
    findMin(n) {
        // code here
        const coin = [1,2,5,10];
        let i = coin.length - 1 ;
        let res = 0 ;
        
        while(n != 0 && i>=0 ){
            res = res + Math.floor(n/coin[i]) ;
            n = n%coin[i];
            i-=1 ;
        }
        
        return res ;
    }
}

//---------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
/**
4. Leetcode : https://leetcode.com/problems/lemonade-change/description/

At a lemonade stand, each lemonade costs $5. Customers are standing in a queue to buy from you and order one at a time
(in the order specified by bills). Each customer will only buy one lemonade and pay with either a $5, $10, or $20 bill. 
You must provide the correct change to each customer so that the net transaction is that the customer pays $5.

Note that you do not have any change in hand at first.
Given an integer array bills where bills[i] is the bill the ith customer pays, return true if you can provide every
customer with the correct change, or false otherwise.

Example 1:

Input: bills = [5,5,5,10,20]
Output: true
Explanation: 
From the first 3 customers, we collect three $5 bills in order.
From the fourth customer, we collect a $10 bill and give back a $5.
From the fifth customer, we give a $10 bill and a $5 bill.
Since all customers got correct change, we output true.
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
    
    let five = 0 ;
    let ten = 0 ;

    for(const bill of bills){
        if(bill == 5){
            five++ ;
        }

        if(bill == 10){
            if(five > 0){
                ten++ ;
                five-- ;
            }
            else{
                return false ;
            }
        }

        if(bill == 20){
            if(ten > 0 && five > 0){
                ten-- ;
                five-- ;
            }
            else if(five >= 3){
                five -= 3 ;
            }
            else {
                return false ;
            }
        }
    }
    return true ;
};

//---------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
/**
5. Leetcode : https://leetcode.com/problems/valid-parenthesis-string/description/

Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.

The following rules define a valid string:

Any left parenthesis '(' must have a corresponding right parenthesis ')'.
Any right parenthesis ')' must have a corresponding left parenthesis '('.
Left parenthesis '(' must go before the corresponding right parenthesis ')'.
'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "(*)"
Output: true

Example 3:
Input: s = "(*))"
Output: true

 * @param {string} s
 * @return {boolean}

 Below Approach can throw TLE . Approach : Use Recursion for every '*' try all 3 ways by putting '(' , ')' , '' . 
 Time Complexity: O(3n) the worst case, every '*' can be replaced with '(', ')' or an empty string. For each '*',
 we have 3 choices, so with k '*' characters, we make 3k recursive calls. If the input string has length n, and all are '*', 
 the time complexity becomes exponential.

Space Complexity: O(n) ,This is due to the maximum depth of the recursive call stack. At most, there are n recursive calls 
at any time (one for each character).
 */
var checkValidString = function(s) {
    
    const util = (i , openCount)=>{
        if(openCount < 0) return false ;
        if(i == len) return openCount == 0 ;

        const ch = s[i];
        if(ch == '('){
            return util(i+1 ,openCount+1 ) ; 
        }

        if(ch == ')'){
            return util(i+1 ,openCount-1 ) ; 
        }

        if(ch == '*'){
            return util(i+1 , openCount) || util(i+1 , openCount+1) || util(i+1 , openCount-1)
        }
    }

    const len = s.length ;
    return util(0 , 0 )

};

/**
Optimized Version
 */
var checkValidString = function(s) {
        let minOpen = 0;

        let maxOpen = 0;

        for (let i = 0; i < s.length; i++) {

            let c = s[i];

            if (c === '(') {
                minOpen++;
                maxOpen++;
            }

            else if (c === ')') {
                minOpen--;
                maxOpen--;
            }

            else {
                minOpen--;     
                maxOpen++;      
            }

            if (maxOpen < 0) return false;

            if (minOpen < 0) minOpen = 0;
        }

        return minOpen === 0;

};


//---------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
// 6. N Meetings in a room https://www.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1

/**
You are given timings of n meetings in the form of (start[i], end[i]) where start[i] is the start time of meeting i and end[i] is the finish time of meeting i.
Return the maximum number of meetings that can be accommodated in a single meeting room, when only one meeting can be held in the meeting room at a particular time. 

Note: The start time of one chosen meeting can't be equal to the end time of the other chosen meeting.

Examples :

Input: start[] = [1, 3, 0, 5, 8, 5], end[] =  [2, 4, 6, 7, 9, 9]
Output: 4
Explanation: Maximum four meetings can be held with given start and end timings. The meetings are - (1, 2), (3, 4), (5,7) and (8,9)
Input: start[] = [10, 12, 20], end[] = [20, 25, 30]
Output: 1
Explanation: Only one meetings can be held with given start and end timings.
Input: start[] = [1, 2], end[] = [100, 99]
Output: 1

Approach : Greedy . Just sort by end time , always we will be wanting less time and early ending meeting should be schedule in room . 
 */

class Solution {
    maxMeetings(start, end) {
        // code here
        
        let meetings = [] ;
        const len = start.length ;
        
        for(let i =0 ; i<len ; i++){
            meetings.push([end[i] , start[i] , i]);
        }
        
        meetings.sort((a,b)=>a[0]-b[0]);
        
        let lastEnd = -1 ;
        let res = [];
        for(const meet of meetings){
            // const [e , s] = meet ;
            if(meet[1] > lastEnd){
                res.push(meet);
                lastEnd = meet[0] ;
            }
        }
        return res.length ;
        
    }
} 


//---------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
/** JUMP GAME
7. Leetcode : https://leetcode.com/problems/jump-game/
Problem Statement: Given an array where each element represents the maximum number of steps you can jump forward from that element, return true
if we can reach the last index starting from the first index. Otherwise, return false.

Example 1:
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

Example 2:
Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.

Time Complexity : Without DP would be 2^n and with DP it will become n ^ 2 ;

 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    
    const util = (i)=>{
        if(i >= len-1){
            return true ;
        }

        if(dp[i] != -1) return dp[i];

        const n = nums[i];
        for(let j = 1 ; j<= n ; j++){
            if(util(i+j) == true) return true ;
        }

        dp[i] = false ;
        return dp[i];
    }

    const len = nums.length ;
    let dp = Array.from({length : len } , ()=>-1)
    return util(0)
};


/**
Optimized Way : Very simple , just check maximum index it can reach from each index . There can be only one breaking , if anywhere there is 0  , it will be 
stopping to reaching at end . Suppose if every number is positive then it will definitely reach . So need to find maximum index it can reach from any index 
and if at any point if maxReach is smaller than index , it means there would be some stoppage or breaker which making answer false . 
 */
var canJump = function(nums) {
    
    let maxReach = 0 ;

    for(let i = 0  ; i<nums.length ; i++){
        const e = nums[i];

        if(maxReach < i){
            return false ;
        }
        maxReach = Math.max( maxReach , e+i );
    }

    return true ;
};


//---------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
/**
JUMP GAME 2
Leetcode : https://leetcode.com/problems/jump-game-ii/

You are given a 0-indexed array of integers nums of length n. You are initially positioned at index 0.

Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at index i,
you can jump to any index (i + j) where:

0 <= j <= nums[i] and
i + j < n
Return the minimum number of jumps to reach index n - 1. The test cases are generated such that you can reach index n - 1.

Example 1:
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.

Example 2:
Input: nums = [2,3,0,1,4]
Output: 2
 
 * @param {number[]} nums
 * @return {number}

 Brute Force : Use Recursioin and DP . Check all possible ways . 
 
 Time Complexity:O(2^N), where N is the number of elements in the array. This is because, from each index, the function recursively explores all possible
 jump lengths, leading to an exponential number of recursive calls.
Space Complexity:O(N), due to the maximum depth of the recursion stack in the worst case. No extra data structures are used except the recursive call stack.

With DP : Time Complexity: O(N2) ,We use two nested loops where outer loop runs for N elements and inner can go up to N in worst case.
Space Complexity:O(N) ,We use an extra DP array of size N to store the minimum jumps to reach each index.
 */
var jump = function(nums) {
    
    const util = (i)=>{
        if(i >= len-1){
            return 0 ;
        }

        if(dp[i] != -1) return dp[i];

        const n = nums[i];
        let moves = Infinity ;
        for(let j = 1 ; j<=n ; j++){
           moves = Math.min(moves , 1 + util(i+j)) ;
        }
        return dp[i] = moves ;
    }

    const len = nums.length ;
    let dp = Array.from({length : len },()=>-1)
    return util(0)
};

/**
Optimized Approach : Visit Striver sheet once . It is easy one . Basically it is finding range of index from where it can jump optimally . For example from index 0 it can 
jump from 1 to nums[0] . So for each range it is increasing moves variable . 
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    
    let moves = 0 ; 
    let maxRange = 0 ;
    let currEnd = 0 ;

    for(let i = 0 ; i<nums.length - 1 ;i++){
        maxRange = Math.max(maxRange , i+nums[i]);

        if(currEnd == i){
            currEnd = maxRange ;
            moves += 1;
        }
    }
    return moves ;

};










