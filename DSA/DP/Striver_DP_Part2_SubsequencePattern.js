// =============================================================================== 1. Partition Equal Subset Sum ========================================================================================

/**
Leetcode : https://leetcode.com/problems/partition-equal-subset-sum/
Time Complexity: O(N*K) + O(N)
Reason: There are N*K states therefore at max ‘N*K’ new problems will be solved and we are running a for loop for ‘N’ times to calculate the total sum

Space Complexity: O(N*K) + O(N)
Reason: We are using a recursion stack space(O(N)) and a 2D array ( O(N*K)).

Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

Example 1:
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].

Example 2:
Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
 */
var canPartition = function(nums) {
    
    const sum = nums.reduce( (prev , curr)=> curr += prev  ) 
    if(sum%2 != 0) return false ;
    const target = sum/2 ;

    const len = nums.length ;

    const util = ( i , s )=>{

        if(s==0) return true ;

        if( s< 0 || i >= len) return false ;

        if(dp[i][s] != -1) return dp[i][s] ;

        const pick = util(i+1 , s-nums[i]);
        const notPick = util(i+1 , s);

        return dp[i][s] = pick || notPick ;
    }
    
    let dp = Array.from({length : len+1} , ()=>{
        return Array.from({length : target+1} , ()=>-1)
    })
    return util(0,target);

};


// ======================================================================== 2. Count of Subarray equal sum target ====================================================================
/**
Leetcode : https://leetcode.com/problems/subarray-sum-equals-k/description/
Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.
A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
Input: nums = [1,1,1], k = 2   Output: 2
Example 2:
Input: nums = [1,2,3], k = 3     Output: 2
 */
var subarraySum = function(nums, k) {
    
    let count = 0 ;
    const map = new Map();
    let sumSoFar = 0 ;

    for(const val of nums){
        sumSoFar += val ;

        if(map.has(sumSoFar - k)){
            count += map.get(sumSoFar-k);
        }

        if(sumSoFar == k){
            count +=1 ;
        }

        map.set(sumSoFar , ( map.get(sumSoFar) || 0) + 1  )
    }

    return count ;


};

// =====================================================================================================
/**
3. Subset Sum Problem 
GFG : https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1

Given an array of positive integers arr[] and a value sum, determine if there is a subset of arr[] with sum equal to given sum. 

Examples:

Input: arr[] = [3, 34, 4, 12, 5, 2], sum = 9
Output: true 
Explanation: Here there exists a subset with target sum = 9, 4+3+2 = 9.

Input: arr[] = [3, 34, 4, 12, 5, 2], sum = 30
Output: false
Explanation: There is no subset with target sum 30.

Input: arr[] = [1, 2, 3], sum = 6
Output: true
Explanation: The entire array can be taken as a subset, giving 1 + 2 + 3 = 6.
 * @param {number[]} arr
 * @param {number} target
 * @return {boolean}

Time Complexity: O(N*K),There are N*K states therefore at max ‘N*K’ new problems will be solved.
Space Complexity: O(N*K) + O(N),We are using a recursion stack space(O(N)) and a 2D array ( O(N*K)).
 */

class Solution {
    isSubsetSum(arr, sum) {
        // code here
        const n = arr.length;
        
        const util = ( i , s)=>{
            if(s == sum) return true ;
            if(i>=n) return false ;
            
            if(dp[i][s] != -1) return dp[i][s];
            
            const notPick = util(i+1 , s);
            let pick = false ;
            if(s+arr[i] <= sum){
                pick = util(i+1 , arr[i]+s);
            }
            
            return dp[i][s] = pick || notPick ;
        }
        
        let dp = Array.from({ length: n }, () => Array(sum + 1).fill(-1));
        
        return util(0 , 0)
    }
}

// ===================================================================================================
/** Leetcode : https://leetcode.com/problems/partition-equal-subset-sum/description/
4. Partition Equal subset sum

Given an integer array nums, return true if you can partition the array into two subsets such that 
the sum of the elements in both subsets is equal or false otherwise.

Example 1:
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].

Example 2:
Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
 

Constraints:

1 <= nums.length <= 200
1 <= nums[i] <= 100

 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    
    const sum = nums.reduce( (prev , curr)=> curr += prev  ) 
    if(sum%2 != 0) return false ;
    const target = sum/2 ;

    const len = nums.length ;

    const util = ( i , s )=>{

        if(s==0) return true ;

        if( s< 0 || i >= len) return false ;

        if(dp[i][s] != -1) return dp[i][s] ;

        const pick = util(i+1 , s-nums[i]);
        const notPick = util(i+1 , s);

        return dp[i][s] = pick || notPick ;
    }
    
    let dp = Array.from({length : len+1} , ()=>{
        return Array.from({length : target+1} , ()=>-1)
    })
    return util(0,target);
};

// =======================================================================================================================
/**
5. Count Subset which is equal to given sum . 
GFG : https://www.geeksforgeeks.org/problems/perfect-sum-problem5633/1
Given an array arr of non-negative integers and an integer target, the task is to count all subsets of the array 
whose sum is equal to the given target.

Examples:
Input: arr[] = [5, 2, 3, 10, 6, 8], target = 10
Output: 3
Explanation: The subsets {5, 2, 3}, {2, 8}, and {10} sum up to the target 10.

Input: arr[] = [2, 5, 1, 4, 3], target = 10
Output: 3
Explanation: The subsets {2, 1, 4, 3}, {5, 1, 4}, and {2, 5, 3} sum up to the target 10.

Input: arr[] = [5, 7, 8], target = 3
Output: 0
Explanation: There are no subsets of the array that sum up to the target 3.

 */

class Solution {
    perfectSum(arr, target) {
        // code here
        
        const util = (i , sum) => {
            
            if(i == n){
                return sum == target ? 1 : 0 ;
            }
            
            if(dp[i][sum] != -1){
                return dp[i][sum];
            }
            
            return dp[i][sum] = util(i+1 , sum) + util(i+1 , sum+arr[i]);
        }
        
        let res = 0 ;
        const n = arr.length ;
        let sum = arr.reduce((a,b)=>a+b , 0)
        let dp = Array.from({length : n+1} , ()=>{
            return Array.from({length : sum+1} , ()=>-1)
        })
        
        return util(0 , 0);
    }
}

// =======================================================================================================================
/* 6. Count Subsets pair which have difference equal to given diff
GFG : https://www.geeksforgeeks.org/problems/partitions-with-given-difference/1
Given an array arr[] and an integer diff, count the number of ways to partition the array into two subsets such that the
difference between their sums is equal to diff.

Note: A partition in the array means dividing an array into two subsets say S1 and S2 such that the union of S1 and S2 
is equal to the original array and each element is present in only one of the subsets.

Examples :
Input: arr[] = [5, 2, 6, 4], diff = 3
Output: 1
Explanation: There is only one possible partition of this array. Partition : [6, 4], [5, 2]. The subset difference 
between subset sum is: (6 + 4) - (5 + 2) = 3.

Input: arr[] = [1, 1, 1, 1], diff = 0 
Output: 6 
Explanation: We can choose two 1's from indices [0,1], [0,2], [0,3], [1,2], [1,3], [2,3] and put them in sum1 and remaning two 1's in sum2.
Thus there are total 6 ways for partition the array arr. 

Input: arr[] = [3, 2, 7, 1], diff = 4  
Output: 0
Explanation: There is no possible partition of the array that satisfy the given difference. 
*/
class Solution {
    
    countPartitions(arr, d) {
      
        const n = arr.length ;
        const sum = arr.reduce((a,b)=>a+b , 0);
        const target = (d+sum)/2 ;
        
        const util = (i, s)=>{
            if(i==n){
                return s==target ? 1 : 0 ;
            }
            if(dp[i][s] != -1){
                return dp[i][s];
            }
            return dp[i][s] = util(i+1 , s) + util(i+1 , s+arr[i]);
        }
        
        let dp = Array.from({length : n+1},()=>{
            return Array.from({length : sum } , ()=> -1)
        })
        
        return util(0,0) || 0
        
    }
}

// =======================================================================================================================
/**
7. Assign Cookies : https://leetcode.com/problems/assign-cookies/description/

Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most 
one cookie.

Each child i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with; and 
each cookie j has a size s[j]. If s[j] >= g[i], we can assign the cookie j to the child i, and the child i will be content.
Your goal is to maximize the number of your content children and output the maximum number.

Example 1:
Input: g = [1,2,3], s = [1,1]
Output: 1
Explanation: You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3. 
And even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1
content.
You need to output 1.

Example 2:
Input: g = [1,2], s = [1,2,3]
Output: 2
Explanation: You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2. 
You have 3 cookies and their sizes are big enough to gratify all of the children, 
You need to output 2.
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



// =================================================================================================================
/**
Find the sum of subsequence which is closed to the given target . 
5. Leetcode : https://leetcode.com/problems/closest-subsequence-sum/description/

You are given an integer array nums and an integer goal.

You want to choose a subsequence of nums such that the sum of its elements is the closest possible to goal. 
That is, if the sum of the subsequence's elements is sum, then you want to minimize the absolute difference abs(sum - goal).

Return the minimum possible value of abs(sum - goal).

Note that a subsequence of an array is an array formed by removing some elements (possibly all or none) of the original array.

Example 1:
Input: nums = [5,-7,3,5], goal = 6
Output: 0
Explanation: Choose the whole array as a subsequence, with a sum of 6.
This is equal to the goal, so the absolute difference is 0.

Example 2:
Input: nums = [7,-9,15,-2], goal = -5
Output: 1
Explanation: Choose the subsequence [7,-9,-2], with a sum of -4.
The absolute difference is abs(-4 - (-5)) = abs(1) = 1, which is the minimum.

Example 3:
Input: nums = [1,2,3], goal = -7
Output: 7
 
Constraints:

1 <= nums.length <= 40
-107 <= nums[i] <= 10^7
-109 <= goal <= 10^9

 * @param {number[]} nums
 * @param {number} goal
 * @return {number}

 Brute Force - Check for all subset . TC - 2^N . N can be 40 so 2^40 ~ trillions ~ 10^12 . 
 */
var minAbsDifference = function(nums, goal) {
    
    const util = (i , s)=>{
        if(i >= n){
            return  Math.abs(goal - s);
        }

        const notPick = util(i+1 , s);
        let pick = util(i+1 , s+nums[i]) ;

        return Math.min(pick , notPick)
    }

    const n = nums.length ;
    let res = Infinity ;
    return util(0 , 0);
};


/**
Optimized Approach - Use MITM Algorithm . Meet in the Middle . 
Basically Divide array into two halves . For each half calculate subset sum . so 40/2 is 20 . 2^20 is million ~ 10^6 which works
Now need to check for all subset for both halves . If use normally loop it will again take N^2 TC . where N would be 
2^N/2 . Million X Million give Trillion . 

So need to apply Binary search in inner array . Need to find Lower bound of target in second halves . So logN TC 
So 2^(N/2) X logN can works . 

Now what will be target = s1 + s2 = goal . where s1 will be from first halves and s2 from second halves . 
s2 = goal - s1 . So target will be s2 . So need to find closest upper value from s2 . So need to find upper bound 
of s2 . Agar samajh na aya ho to pehle Binary Search ka upper bound dekhne ka !!! . 
 */
var minAbsDifference = function(nums, goal) {
  
    const n = nums.length ;

    const subsetSum = (i , j , s)=>{
        if(i > j){
            res.push( s );
            return ;
        }

        subsetSum(i+1 , j , s) ;
        subsetSum(i+1 , j , s+nums[i]);
    }

    const mid = n%2 == 0 ? (n/2)-1 : Math.floor(n/2) ;
    let res = [];
    subsetSum( 0 , mid , 0  );
    const left = [...res];
    res = [];
    subsetSum(mid+1 , n-1 , 0);
    const right = [...res];
    right.sort((a,b)=>a-b);

    let ans = Infinity ;

    for(const s1 of left){

        const target = goal - s1 ;
        let l = 0 ;
        let r = right.length ;

        while(l<r){
            const mid = Math.floor((l+r)/2);
            if(right[mid] < target){
                l = mid  +1 ;
            }
            else{
                r = mid ;
            }
        }

        // ye wala element ek jayada hi hoga target k . 
        if(l < right.length){
            ans = Math.min(ans ,  Math.abs( goal - (s1 + right[l]) ) )
        }

        // normal ek piche hat k check kra hai 
        if(l > 0){
            ans = Math.min(ans ,  Math.abs( goal - (s1 + right[l-1]) ) )
        }

    }
    return ans ;
};


// =================================================================================================================
/**
6. Leetcode : https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/

You are given an integer array nums of 2 * n integers. You need to partition nums into two arrays of length n to minimize
the absolute difference of the sums of the arrays. To partition nums, put each element of nums into one of the two arrays.

Return the minimum possible absolute difference.

Input: nums = [3,9,7,3]
Output: 2
Explanation: One optimal partition is: [3,9] and [7,3].
The absolute difference between the sums of the arrays is abs((3 + 9) - (7 + 3)) = 2.

Example 2:
Input: nums = [-36,36]
Output: 72
Explanation: One optimal partition is: [-36] and [36].
The absolute difference between the sums of the arrays is abs((-36) - (36)) = 72.

Input: nums = [2,-1,0,4,-2,-9]
Output: 0
Explanation: One optimal partition is: [2,4,-9] and [-1,0,-2].
The absolute difference between the sums of the arrays is abs((2 + 4 + -9) - (-1 + 0 + -2)) = 0.

 * @param {number[]} nums
 * @return {number}
 Brute Force
 */
var minimumDifference = function(nums) {
    
    const n = nums.length  ;

    const util = (i , cnt , s)=>{
        if(cnt == n/2 ){
            res = Math.min( res , Math.abs(s - (sum-s)) );
            return ;
        }

        if(i >= n) return ;

        const pick = util(i+1 , cnt+1 , nums[i] + s);
        const notPick = util(i+1 , cnt , s);
    }

    let res = Infinity ;
    let sum = 0 ;
    nums.forEach((e)=>{
        sum += e ;
    })

    util(0 , 0 , 0);
    return res ;
};


/**
Optimized One - Use Concept of MITM . Same find subset sum of both two halves . 
s1+s2 = totalSum 
s2 = total - s1 ;
need to minimize abs(s1-s2)
abs(s1 - (total-s1))
abs(2s1 - total)
abs(total - 2s1) 

suppose total is 22 then half is 11 
if s1 = 16 then s2 is 6 , diff is 10 . 
We can also say , how much s1 is greater than half 11 . It is 5 greater , then difference is 10 which calculate earlier
Thoda dimag lagane ka . Jitna s1 aage badhta jayega half se utna hi s2 piche hatata jayega half se . 
dono same speed me opposite direction me jayenge , to difference bhi 2x k hisab se badhta jayega . Jabhi uper diff nikala tha . 

Ab sabse pehle , dono halves ka subset sum nikalna hai . But thoda different . 
[3,9,7,3] first half is [3,9] ab subset sum [0,3,9,12] hoga . 
lekin simple aaise nahi nikalna hai . subset me kitne element hai , unke count k sath nikalna hai jaise
{ 0 : [0] , 1 : [3,9] , 2 : [12]} . same for second half . 

Ab second half ko sort kr lenge taanki lower bound binary search laga sake . 

Ab agar n count ka subset banana hai , to agar ek half se mai '0' count ka subset leta hoon to dusre se '2' count ka lena 
padega . Same agar '1' count ka pehle se leta to dusre se '1' count ka lena hoga . 

Ab loop chalaenge pehle half pe , uske sabhi sum check krenge . har s1 k liye , dusre half me lower bound nikalna hai 
target ka . target hoga total/2 - s1 . 
Koshish yahi hai iske piche ki kaise bhi krke nearest aaye halfSum k , kyuki agar do aaise subset mil jate hai , 
jinka sum same hai and count element equal hai , to difference 0 hoga , or 0 would be the best answer kyuki isse 
kam absolute difference nahi ho sakta . 
 */
var minimumDifference = function(nums) {
    
    const len = nums.length ;
    const n = len/2 ;

    let totalSum = 0 ;
    for(const e of nums){
        totalSum += e ;
    }

    const subsetSum = (i , j , cnt , subset , sum)=>{
        if(i>j){
            subset.get(cnt).push(sum);
            return ;
        }

        if(!subset.get(cnt)){
            subset.set(cnt , []) ;
        }
        if(!subset.get(cnt+1)){
            subset.set(cnt+1 , []) ;
        }
        subsetSum(i+1 , j , cnt , subset , sum) ;
        subsetSum(i+1 , j , cnt+1 , subset , sum+nums[i]) ;
    }

    let m = new Map();
    subsetSum(0 , n-1 , 0 , m , 0 );
    let left = m ; ;
    let nm  = new Map();
    subsetSum( n , len-1 , 0 , nm , 0 );
    let right = nm ;
    

    for(const [key , val] of right){
        val.sort((a,b)=>a-b)
    }

    const util = (arr1 , arr2)=>{
        let minDiff = Infinity ;
        for(const s1 of arr1){
            const target = (totalSum)/2 - s1 ;

            let l = 0 ;
            let r = arr2.length-1 ; 
            while(l<=r){
                const mid = Math.floor((l+r)/2) ;
                if(arr2[mid] < target){
                    l = mid+1 ;
                }
                else{
                    r = mid-1 ;
                }
            }

            if(l < arr2.length){
                minDiff = Math.min(minDiff , 2*Math.abs( (totalSum/2)-(s1+arr2[l]) ) )
            }

            if(l > 0){
                minDiff = Math.min(minDiff , 2*Math.abs( (totalSum/2)-(s1+arr2[l-1]) ) )
            }
            
        }
        return minDiff ;
    }

    let ans = Infinity ;
    for(let i = 0 ; i<=n ; i++){
        ans =  Math.min(ans , util( left.get(i) , right.get(n-i)  ) )
    }

    return ans ;
};












