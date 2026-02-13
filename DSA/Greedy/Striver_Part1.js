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
8. JUMP GAME 2
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


//---------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
// User function Template for javascript
/**
9. Shortest Job First : https://www.geeksforgeeks.org/problems/shortest-job-first/1

Geek is a software engineer. He is assigned with the task of calculating average waiting time of all the processes
by following shortest job first policy.

The shortest job first (SJF) or shortest job next, is a scheduling policy that selects the waiting process with the
smallest execution time to execute next.

Given an array of integers bt of size n. Array bt denotes the burst time of each process. Calculate the average
waiting time of all the processes and return the nearest integer which is smaller or equal to the output.

Note: Consider all process are available at time 0.

Example 1:

Input:
n = 5
bt = [4,3,7,1,2]
Output: 4
Explanation: After sorting burst times by shortest job policy, calculated average waiting time is 4.
Example 2:

Input:
n = 4
arr = [1,2,3,4]
Output: 2
Explanation: After sorting burst times by shortest job policy, calculated average waiting time is 2.

 * @param {TreeNode} bt
 * @returns {number}
 */

class Solution {
    // Function to solve the given problem.
    solve(bt) {
        // your code here
        
        let waitTime = 0 ;
        let totalTime = 0 ;
        const len = bt.length ;
        bt.sort((a,b)=>a-b);
        
        for(let i = 0 ; i<len ; i++){
            waitTime += totalTime ;
            totalTime += bt[i];
        }
        
        return Math.floor(waitTime/len)
        
    }
}



//---------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
/**
10. Leetcode : https://leetcode.com/problems/merge-intervals/
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the
non-overlapping intervals that cover all the intervals in the input.

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

 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    
    intervals.sort((a,b)=>a[0]-b[0]);
    let res = [];
    let i = 0 ;
    const n = intervals.length ;

    while(i<n){
        const start = intervals[i][0];
        let end = intervals[i][1];

        let j = i+1 ;

        while(j<n && intervals[j][0]  <= end ){
            end = Math.max(end , intervals[j][1]);
            j+=1 ;
        }
        res.push([start,end]);
        i=j;
    }
    return res ;
};


//---------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
/** Minimum Removal of interval to make it non overlapping . 
12 : Leetcode : https://leetcode.com/problems/non-overlapping-intervals/description/
Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need
to remove to make the rest of the intervals non-overlapping.

Note that intervals which only touch at a point are non-overlapping. For example, [1, 2] and [2, 3] are non-overlapping.

Example 1:
Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.

Example 2:
Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.

Example 3:
Input: intervals = [[1,2],[2,3]]
Output: 0
Explanation: You don't need to remove any of the intervals since they're already non-overlapping.

 Logic : Easy one , use greedy , no overthinking . As last one , just keep minimum 'end' value . Because minimum 'end' value 
 or short range will remove minimum interval . If range is big , then will need to remove maximum interval . 
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    
    intervals.sort((a,b)=>a[0]-b[0]);

    let i = 0 ;
    const n = intervals.length ;
    let res = 0 ;

    while(i < n){
        const start = intervals[i][0];
        let end = intervals[i][1];

        let j = i+1 ;

        while(j < n && end > intervals[j][0]){
            res += 1 ;
            end = Math.min(end , intervals[j][1]);
            j += 1 ;
        }
        i = j ;
    }
    return res ;
};


//---------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
/** Insert Interval
13. Leetcode : https://leetcode.com/problems/insert-interval/description/
You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and
the end of the ith interval and intervals is sorted in ascending order by starti. You are also given
an interval newInterval = [start, end] that represents the start and end of another interval.

Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals
still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return intervals after the insertion.

Note that you don't need to modify intervals in-place. You can make a new array and return it.

Example 1:

Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
Example 2:

Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
 
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    
    intervals.push(newInterval);
    intervals.sort((a,b)=>a[0]-b[0]);

    // now merge intervals
    const n = intervals.length ;

    let i = 0 ;
    let res = [];

    while(i<n){
        const start = intervals[i][0];
        let end = intervals[i][1];

        let j = i ;

        while(j < n && end >= intervals[j][0]){
            end = Math.max(end , intervals[j][1]);
            j+=1 ;
        }
        i = j ;
        res.push([start , end]);
    }

    return res ;
};


//---------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
/** Candy
14. Leetcode :  https://leetcode.com/problems/candy/

There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.

You are giving candies to these children subjected to the following requirements:

Each child must have at least one candy.
Children with a higher rating get more candies than their neighbors.
Return the minimum number of candies you need to have to distribute the candies to the children.

Example 1:
Input: ratings = [1,0,2]
Output: 5
Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.

Example 2:
Input: ratings = [1,2,2]
Output: 4
Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
The third child gets 1 candy because it satisfies the above two conditions.
 

Constraints:

n == ratings.length
1 <= n <= 2 * 104
0 <= ratings[i] <= 2 * 104

Logic : Easy question . First just consider from left side and then from right side candy . 
Then at any point just check ,, what is maximum candy can be assigned at that point . That would be the answer . 

 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
    
    let res = 0 ;
    const n = ratings.length ;
    let left = Array.from({length : n} , ()=>0);
    let right = Array.from({length : n} , ()=>0);
    left[0] = 1 ;
    right[n-1] = 1 ;
    
    let i = 1 ;
    for( ; i<n ; i++){
        if(ratings[i-1] < ratings[i]){
            left[i] = left[i-1] + 1 ;
        }
        else{
            left[i] = 1 ;
        }

        const j = n-i-1  ;

        if(ratings[j] > ratings[j+1]){
            right[j] = right[j+1] + 1 ;
        }
        else{
            right[j] =  1; 
        }
    }

    for(i = 0 ; i<n ; i++){
        res = res + Math.max(left[i] , right[i]);
    }

    return res ;

};

// Optimized Approach : Just watch striver video once . Very good explanation 
/*
https://www.youtube.com/watch?v=IIqVFvKE6RY
Use Slope concept . When it is increasing , start allocating values in ascending order . 
When it is decreasing , then instead of decrease allocation value , we should start increasing value from 1 . 
Because at the end we just want sum of all candy . Like 1,2,3,4,5 sum would be equal to 5,4,3,2,1 . 
But But But , there can be edge case also . Suppose till increase value is 4 (1,2,3,4) but while decreasing
value can be -3 or (1,2,3,4,5,6,7,8) . So Ideally at peak , value should have been 8 but we took 4 only while previous
increasing slope . 
*/

var candy = function(ratings) {
    
    const n = ratings.length ;
    let res = n ;
    let i = 1 ;

    while(i < n){

        while(i<n && ratings[i] == ratings[i-1]){
            i+=1 ; 
            continue ;
        }

        let up = 0 ;

        while(i<n && ratings[i] > ratings[i-1]){
            i+=1 ;
            up += 1;
            res += up ;
        }

        let down = 0 ;

        while(i<n && ratings[i] < ratings[i-1]){
            i+=1 ;
            down += 1 ;
            res += down ;
        }

        res = res - Math.min(up , down)
    }

    return res ;
};
















