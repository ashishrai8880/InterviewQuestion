
// =========================== 1. Koko Eating Banana =========================================================
/**
Leetcode : https://leetcode.com/problems/koko-eating-bananas/

Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and 
will come back in h hours.
Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas 
from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during 
this hour.
Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer k such that she can eat all the bananas within h hours.

Example 1:
Input: piles = [3,6,7,11], h = 8
Output: 4

Example 2:
Input: piles = [30,11,23,4,20], h = 5
Output: 30

Example 3:
Input: piles = [30,11,23,4,20], h = 6
Output: 23
 
Brute Force : Just check from 1 to max value in array . 
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function(piles, h) {
    
    let k = 1 ;
    piles.sort((a,b)=>a-b);
    const n = piles.length ;
    const max = piles[n-1];
    let i = 1 ;
    while(i <= max){
        let time = 0;
        for(const x of piles){
            time = time + Math.ceil(x/i)
        }
        if(time <= h){
            return i ;
        }
        i += 1 ;
    }
    return -1 ;
};


/**
Optimize Approach : Use Binary Search . From low =1 to high = max element . Super Super cool 
 */
var minEatingSpeed = function(piles, h) {
    
    const countHours = (t)=>{
        let time = 0 ;
        for(const x of piles){
            time += Math.ceil(x/t);
        }
        return time ;
    }

    
    let max = -Infinity ;
    piles.forEach((e)=>max= Math.max(max , e));

    const n = piles.length ;

    let low = 1 ;
    let high = max;

    while(low <= high){
        const mid = Math.floor((low+high)/2);

        const time = countHours(mid);

        if(time > h){
            low = mid+1 ;
        }
        else{
            high = mid-1 ;
        }
    }
    return low ;

};


// ========================================= 2. Minimum number of days to make m bouquets ==============================
/**
Leetcode : https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/

You are given an integer array bloomDay, an integer m and an integer k.
You want to make m bouquets. To make a bouquet, you need to use k adjacent flowers from the garden.
The garden consists of n flowers, the ith flower will bloom in the bloomDay[i] and then can be used in exactly one bouquet.

Return the minimum number of days you need to wait to be able to make m bouquets from the garden. If it is impossible to 
make m bouquets return -1.

Example 1:
Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
Output: 3
Explanation: Let us see what happened in the first three days. x means flower bloomed and _ means flower did not bloom in the garden.
We need 3 bouquets each should contain 1 flower.
After day 1: [x, _, _, _, _]   // we can only make one bouquet.
After day 2: [x, _, _, _, x]   // we can only make two bouquets.
After day 3: [x, _, x, _, x]   // we can make 3 bouquets. The answer is 3.

Example 2:
Input: bloomDay = [1,10,3,10,2], m = 3, k = 2
Output: -1
Explanation: We need 3 bouquets each has 2 flowers, that means we need 6 flowers. We only have 5 flowers so it is
impossible to get the needed bouquets and we return -1.

Example 3:
Input: bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3
Output: 12
Explanation: We need 2 bouquets each should have 3 flowers.
Here is the garden after the 7 and 12 days:
After day 7: [x, x, x, x, _, x, x]
We can make one bouquet of the first three flowers that bloomed. We cannot make another bouquet from the last three flowers that bloomed because they are not adjacent.
After day 12: [x, x, x, x, x, x, x]
It is obvious that we can make two bouquets in different ways.
 
 * @param {number[]} bloomDay
 * @param {number} m
 * @param {number} k
 * @return {number}
 */

var minDaysOptimized = function(bloomDay, m, k) {
   
    const isPossible = (days)=>{
        let count =0 ;
        let btqCount = 0 ;

        for(const d of bloomDay){
            if(d <= days){
                count++ ;
            }
            else{
                btqCount += Math.floor(count/k);
                count = 0 ;
            }
        }
        btqCount += Math.floor(count/k);
        return btqCount >= m  ;
    }

    let val = m * k;
    let n = arr.length; 
    if (val > n) return -1; // Impossible case
 
    // Find maximum and minimum
    let mini = Infinity, maxi = -Infinity;
    for (let i = 0; i < n; i++) {
        mini = Math.min(mini, arr[i]);
        maxi = Math.max(maxi, arr[i]);
    }

    for (let i = mini; i <= maxi; i++) {
        if (isPossible(i))
            return i;
    }
    return -1;
};


// ============= Optimized way , by using binary search algorithm . Apply between min to max , binary search 
var minDaysOptimized = function(bloomDay, m, k) {
   
    const isPossible = (days)=>{
        let count =0 ;
        let btqCount = 0 ;

        for(const d of bloomDay){
            if(d <= days){
                count++ ;
            }
            else{
                btqCount += Math.floor(count/k);
                count = 0 ;
            }
        }
        btqCount += Math.floor(count/k);
        return btqCount  ;
    }

    let n = bloomDay.length ;
    let totalFlowerNeed = m * k ;
    if(totalFlowerNeed > n){
        return -1 ;
    }

    let max = -Infinity ;
    let min = Infinity ;

    bloomDay.forEach((e)=> {
        max=Math.max(e,max) ; 
        min= Math.min(e,min)
    } );

    let low = min ;
    let high = max ;
    let ans = Infinity ;

    while(low <= high){
        const mid = Math.floor((low+high)/2);
        
        const btqCount = isPossible(mid) ;

        if(btqCount >= m){
            ans = Math.min(ans , mid)
            high = mid-1 ;
        }
        else{
            low = mid+1 ;
        } 
    }

    return ans ;
};



// ======================================== 3. Smallest Divisor Given Threshhold =========================================
/**
Leetcode : https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/description/

Given an array of integers nums and an integer threshold, we will choose a positive integer divisor, divide all the 
array by it, and sum the division's result. Find the smallest divisor such that the result mentioned above is less than
or equal to threshold.
Each result of the division is rounded to the nearest integer greater than or equal to that element.
(For example: 7/3 = 3 and 10/2 = 5).

The test cases are generated so that there will be an answer.

Example 1:
Input: nums = [1,2,5,9], threshold = 6
Output: 5
Explanation: We can get a sum to 17 (1+2+5+9) if the divisor is 1. 
If the divisor is 4 we can get a sum of 7 (1+1+2+3) and if the divisor is 5 the sum will be 5 (1+1+1+2). 

Example 2:
Input: nums = [44,22,33,11,1], threshold = 5
Output: 44
 
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 Brute Force , Just start checking from 1 to max number . 
 */
var smallestDivisor = function(nums, threshold) {
    
    const findSum = (d) =>{
        let sum =  0 ;
        nums.forEach((e)=>{
            sum += Math.ceil(e/d);
        })
        return sum ;
    }

    let max = -Infinity ;

    nums.forEach((e)=>{
        max = Math.max(e,max);
    })

    for(let i =1 ; i<=max ; i++){
        const sum = findSum(i);
        if(sum <= threshold){
            return i ;
        }
    }
    return -1 ;
};


// Apply Binary Search from 1 to max . 
/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
var smallestDivisorOptimized = function(nums, threshold) {
    
    const findSum = (d) =>{
        let sum =  0 ;
        nums.forEach((e)=>{
            sum += Math.ceil(e/d);
        })
        return sum ;
    }

    let max = -Infinity ;

    nums.forEach((e)=>{
        max = Math.max(e,max);
    })

    let low = 1 ;
    let high = max ;
    let ans = Infinity ;

    while(low <= high){
        const mid = Math.floor((low+high)/2);

        const sum = findSum(mid);
        if(sum <= threshold){
            ans = Math.min(ans , mid);
            high = mid-1 ;
        }
        else{
            low = mid+1 ;
        }
    }
    return ans ;
};


// =============================== 4. Capacity to ship package within D days ============================================
/**
Leetcode : https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/description/

A conveyor belt has packages that must be shipped from one port to another within days days.
The ith package on the conveyor belt has a weight of weights[i]. Each day, we load the ship with packages on the conveyor
belt (in the order given by weights). We may not load more weight than the maximum weight capacity of the ship.
Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within
days days.

Example 1:
Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
Output: 15
Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
1st day: 1, 2, 3, 4, 5
2nd day: 6, 7
3rd day: 8
4th day: 9
5th day: 10
Note that the cargo must be shipped in the order given, so using a ship of capacity 14 and splitting the packages into 
parts like (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) is not allowed.

Example 2:
Input: weights = [3,2,2,4,1,4], days = 3
Output: 6
Explanation: A ship capacity of 6 is the minimum to ship all the packages in 3 days like this:
1st day: 3, 2
2nd day: 2, 4
3rd day: 1, 4

Example 3:
Input: weights = [1,2,3,1,1], days = 4
Output: 3
Explanation:
1st day: 1
2nd day: 2
3rd day: 3
4th day: 1, 1

 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 Brute Force : Easy One , similar to previos question . Just find maximum weight and sum of all weight , and then try for all 
 weight capacity from max to sum . And at last for optimization apply binary search .
 */
var shipWithinDays = function(weights, days) {
    
    const check = (cap)=>{
        let days = 1; 
        let load = 0;
        let n = weights.length; 

        for (let i = 0; i < n; i++) {
            if (load + weights[i] > cap) {
                days += 1; 
                load = weights[i]; 
            } else {
                load += weights[i];
            }
        }
        return days;
    }

    let sum = 0 ;
    let max = -Infinity ;
    weights.forEach((e)=>{
        sum += e ;
        max = Math.max(max , e);
    })

    for(let i=max ; i<= sum ; i++){
        const dRequire = check(i);
        if(dRequire <= days){
            return i ;
        }
    }
    return -1 ;
};


// Optimized Way : Use Binary Search 
/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function(weights, days) {
    
    const check = (cap)=>{
        let days = 1; 
        let load = 0;
        let n = weights.length; 

        for (let i = 0; i < n; i++) {
            if (load + weights[i] > cap) {
                days += 1; 
                load = weights[i]; 
            } else {
                load += weights[i];
            }
        }
        return days;
    }

    let sum = 0 ;
    let max = -Infinity ;
    weights.forEach((e)=>{
        sum += e ;
        max = Math.max(max , e);
    })

    let low = max ;
    let high = sum ;
    let ans = Infinity ;

    while(low <= high){
        const mid = Math.floor((low+high)/2);

        const requiredDays = check(mid);

        if( requiredDays <= days ){
            ans = Math.min(ans , mid);
            high = mid-1 ;
        }
        else{
            low = mid+1 ;
        }
    }
    return ans ;
};


// ====================================== 5. Kth positive missing integer ==============================================
/**
Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.
Return the kth positive integer that is missing from this array.

Example 1:
Input: arr = [2,3,4,7,11], k = 5
Output: 9
Explanation: The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.

Example 2:
Input: arr = [1,2,3,4], k = 2
Output: 6
Explanation: The missing positive integers are [5,6,7,...]. The 2nd missing positive integer is 6.

Leetcode : https://leetcode.com/problems/kth-missing-positive-number/
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 Very Naive and Brute Force Approach .
 */
var findKthPositive = function(arr, k) {
    let i=1 ;
    while(true){
        if(!arr.includes(i)){
            k=k-1 ;
        }
        if(k==0){
            return i ;
        }
        i+=1 ;
    }
};


// More Better , Above one solution is dump solution 
var findKthPositive = function(arr, k) {
    for(let i=0 ; i < arr.length  ; i++){
        if(arr[i] <= k) {
            k+=1 ;
        }
        else{
            break ;
        }
    }
    return k ;
};

// More Optimized : Using Binary Search . This contains formulae which you need to go to striver you tube video for this
/**
Example
Input: arr = [2,3,4,7,11], k = 5 . Suppose mid is 2 where element is 4 , but it should contain 3 (in serial) . It means till 
index 2 , there is 1 element missing which is 3 . If till 2nd index , 1 element is missing , it means , now need to check from 
2nd index to last index . Similarily moving on . 
At last I am returning high + k + 1 . This formulae comes from derivation . 
condition terminates , where high becomes less than low , and our element will exists just after high and before low . 
so finding , high + missing number . If high is 7 , and at 7 missing number is 2 , it means 8 and 9 are missing . 
So out is 9 . 
=>arr[high] + missing number 
=> arr[high] + k - (arr[high] - high - 1 )
so we will left with k + high + 1 ;
Output: 9
 */
var findKthPositive = function(arr, k) {
    
    const n= arr.length ;
    let low = 0 ;
    let high = n-1 ;

    while(low <= high){
        const mid = Math.floor((low+high)/2);

        const missing = arr[mid] - (mid + 1) ; // 

        if(missing < k){
            low = mid+1 ;
        }
        else{
            high = mid-1 ;
        }
    }
    return high + k + 1 ;
};



// ===================================== 6. Books Allocation =======================================================
/**
GFG : https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1

Given an array arr[] of integers, where each element arr[i] represents the number of pages in the i-th book. 
You also have an integer k representing the number of students. The task is to allocate books to each student such that:
Each student receives atleast one book.
Each student is assigned a contiguous sequence of books.
No book is assigned to more than one student.
The objective is to minimize the maximum number of pages assigned to any student. In other words, out of all 
possible allocations, find the arrangement where the student who receives the most pages still has the smallest 
possible maximum.

Note: If it is not possible to allocate books to all students, return -1.

Examples:
Input: arr[] = [12, 34, 67, 90], k = 2
Output: 113
Explanation: Allocation can be done in following ways:
=> [12] and [34, 67, 90] Maximum Pages = 191
=> [12, 34] and [67, 90] Maximum Pages = 157
=> [12, 34, 67] and [90] Maximum Pages = 113.
The third combination has the minimum pages assigned to a student which is 113.

Example 2. 
Input: arr[] = [15, 17, 20], k = 5
Output: -1
Explanation: Since there are more students than total books, it's impossible to allocate a book to each student.

 * @param {number[]} arr
 * @param {number} k
 * @returns {number}

 Brute Force : Maximum pages can be sum of all pages , and minimum pages can be max pages in any book . 
 Now just start checking from minimum pages to maximum pages . 
 */

class Solution {
    findPages(arr, k) {
        // code here
        
        const allotBooksToStudent = (maxPages)=>{
            let count = 1 ;
            let pageSum = 0 ;
            
            for(let i=0 ; i<n ; i++){
                if(pageSum + arr[i] <= maxPages){
                    pageSum +=  arr[i];
                }
                else{
                    pageSum = arr[i];
                    count += 1 ;
                }
            }
            return count ;
        }
        
        const n = arr.length ;
        
        if(k > n){
            return -1 ;
        }
        
        let max = Math.max(...arr);
        let sum = arr.reduce((a,b)=>a+b , 0);
        
        let ans = Infinity ;
        for(let i=max ; i<=sum ; i++){
            const count = allotBooksToStudent(i);
            if(count <= k){
                ans = Math.min(ans , i);
            }
        }
        return ans == Infinity ? -1 : ans ;
    }
}

// Optimized Versioin : Just used binary Search ,  super easy super cool 
/**
 * @param {number[]} arr
 * @param {number} k
 * @returns {number}
 */

class Solution {
    findPages(arr, k) {
        // code here
        
        const allotBooksToStudent = (maxPages)=>{
            let count = 1 ;
            let pageSum = 0 ;
            
            for(let i=0 ; i<n ; i++){
                if(pageSum + arr[i] <= maxPages){
                    pageSum +=  arr[i];
                }
                else{
                    pageSum = arr[i];
                    count += 1 ;
                }
            }
            return count ;
        }
        
        const n = arr.length ;
        
        if(k > n){
            return -1 ;
        }
        
        let max = Math.max(...arr);
        let sum = arr.reduce((a,b)=>a+b , 0);
        
        let ans = Infinity ;
        
        let low = max ;
        let high = sum ;
        
        while(low <= high){
            const mid = Math.floor((low+high)/2);
            
            const count = allotBooksToStudent(mid);
            
            if(count <= k){
                ans = Math.min(ans , mid);
                high = mid-1 ;
            }
            else{
                low = mid+1 ;
            }
        }
        return ans == Infinity ? -1 : ans ;
    }
}



// ==============================================7 . Painter's Partition =================================================
/**
GFG : https://www.geeksforgeeks.org/problems/the-painters-partition-problem1535/1

Given an array arr[] where each element denotes the length of a board, and an integer k representing the number of 
painters available. Each painter takes 1 unit of time to paint 1 unit length of a board.

Determine the minimum amount of time required to paint all the boards, under the constraint that each painter can 
paint only a contiguous sequence of boards (no skipping or splitting allowed).

Example 1:
Input: arr[] = [5, 10, 30, 20, 15], k = 3
Output: 35
Explanation: The optimal allocation of boards among 3 painters is - 
Painter 1 → [5, 10] → time = 15
Painter 2 → [30] → time = 30
Painter 3 → [20, 15] → time = 35
Job will be done when all painters finish i.e. at time = max(15, 30, 35) = 35

Example 2 : 
Input: arr[] = [10, 20, 30, 40], k = 2
Output: 60
Explanation: A valid optimal partition is - 
Painter 1 → [10, 20, 30] → time = 60
Painter 2 → [40] → time = 40
Job will be complete at time = max(60, 40) = 60

Example 3: 
Input: arr[] = [100, 200, 300, 400], k = 1
Output: 1000
Explanation: There is only one painter, so the painter must paint all boards sequentially. The total time taken will be the sum of all board lengths, i.e., 100 + 200 + 300 + 400 = 1000.

Super Super Easy , Exactly Same as previous one . 
 * @param {number[]} arr
 * @param {number} k
 * @returns {number}
 */

class Solution {
    minTime(arr, k) {
        const painterRequiredInGivenTime = (maxTime)=>{
            let count = 1 ;
            let timeSum = 0 ;
            
            for(let i=0 ; i<n ; i++){
                if(timeSum + arr[i] <= maxTime){
                    timeSum +=  arr[i];
                }
                else{
                    timeSum = arr[i];
                    count += 1 ;
                }
            }
            return count ;
        }
        
        const n = arr.length ;
        
        if(k > n){
            return -1 ;
        }
        
        let max = Math.max(...arr);
        let sum = arr.reduce((a,b)=>a+b , 0);
        
        let ans = Infinity ;
        
        let low = max ;
        let high = sum ;
        
        while(low <= high){
            const mid = Math.floor((low+high)/2);
            
            const count = painterRequiredInGivenTime(mid);
            
            if(count <= k){
                ans = Math.min(ans , mid);
                high = mid-1 ;
            }
            else{
                low = mid+1 ;
            }
        }
        return ans == Infinity ? -1 : ans ;
    }
}


// =========================================== 8. Split Array Largest Sum ===============================================

/**
Leetcode : https://leetcode.com/problems/split-array-largest-sum/description/
GFG : https://www.geeksforgeeks.org/problems/split-array-largest-sum--141634/1

Exactly same as previous one problem 

Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of 
any subarray is minimized.
Return the minimized largest sum of the split.
A subarray is a contiguous part of the array.

Example 1:
Input: nums = [7,2,5,10,8], k = 2
Output: 18
Explanation: There are four ways to split nums into two subarrays.
The best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.

Example 2:
Input: nums = [1,2,3,4,5], k = 2
Output: 9
Explanation: There are four ways to split nums into two subarrays.
The best way is to split it into [1,2,3] and [4,5], where the largest sum among the two subarrays is only 9.
 
 * @param {number[]} arr
 * @param {number} k
 * @returns {number}
 */
class Solution {
    splitArray(arr, k) {
        const maxSubarrayInGivenSum = (maxSum)=>{
            let count = 1 ;
            let subArrSum = 0 ;
            
            for(let i=0 ; i<n ; i++){
                if(subArrSum + arr[i] <= maxSum){
                    subArrSum +=  arr[i];
                }
                else{
                    subArrSum = arr[i];
                    count += 1 ;
                }
            }
            return count ;
        }
        
        const n = arr.length ;
        
        if(k > n){
            return -1 ;
        }
        
        let max = Math.max(...arr);
        let sum = arr.reduce((a,b)=>a+b , 0);
        
        let ans = Infinity ;
        
        let low = max ;
        let high = sum ;
        
        while(low <= high){
            const mid = Math.floor((low+high)/2);
            
            const count = maxSubarrayInGivenSum(mid);
            
            if(count <= k){
                ans = Math.min(ans , mid);
                high = mid-1 ;
            }
            else{
                low = mid+1 ;
            }
        }
        return ans == Infinity ? -1 : ans ;
    }
}





 
