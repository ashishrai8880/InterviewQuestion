
// ====================================1. Longest Increasing Subsequence ==================================================
/**
Leetcode : https://leetcode.com/problems/longest-increasing-subsequence/

Given an integer array nums, return the length of the longest strictly increasing subsequence.

Example 1:
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

Example 2:
Input: nums = [0,1,0,3,2,3]
Output: 4

Example 3:
Input: nums = [7,7,7,7,7,7,7]
Output: 1
 
Constraints:
1 <= nums.length <= 2500
-104 <= nums[i] <= 104
 
 */
var lengthOfLIS = function(nums) {

    const n = nums.length;

    const util = (i, prev) => {
        if (i === n) return 0;

        if(prev!=-1 && dp[i][prev] != -1) return dp[i][prev];

        // pick
        let pick = 0;
        if (prev === -1 || nums[i] > nums[prev]) {
            pick = 1 + util(i + 1, i);
        }

        // skip
        let notPick = util(i + 1, prev);

        const ans =  Math.max(pick , notPick)

        if( prev != -1 ){
            dp[i][prev] = ans
        }

        return ans;
    };

    let dp = Array.from({length : n} , ()=>{
        return Array.from({length : n} , ()=>-1)
    })

    return util(0, -1);
};

/**
Tabulation Way - It is more easier than recursive way . Isme bas pichhe k element ko dekho . TC - O(N^2) . 
Agar mai i=4 pe hoon , to j=0 se 3 tak check kro kitne arr[i] se chhote hai , agar hai , to unke dp[i] fill kro .
Very easy thoda dimag lagane ka . 
NOTE : Very Important to understand for further question
 */
var lengthOfLIS = function(nums) {
    
    const n = nums.length;
    const dp = new Array(n).fill(1);

    let ans = 1;

    for(let i = 1; i < n; i++){
        for(let j = 0; j < i; j++){
            if(nums[j] < nums[i]){
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }

        ans = Math.max(ans, dp[i]);
    }

    return ans;
};

// Binary Search With DP 
/**
NOTE : IMPORTANT for next question
Just think like . If I have [1,3,5,4,7 , 2] , now LIS can be from [1,3,5...] , [1,3,4...] , [2...]
If getting value greater than last element of stack it means we can easily put there , BUt if element is lesser than
last element of stack , it means there is possibility of getting LIS starting from that index . 

So instead of storing all possibility , we can use binary search lower bound to fit that element at right index .
It is not going to give LIS but can give length . 
 */
var lengthOfLIS = function(nums) {

    const lowerBound = (arr , k )=>{

        let l = 0 ;
        let r = arr.length-1 ;

        while(l<r){
            const mid = Math.floor((l+r)/2);
            if(arr[mid] >= k){
                r = mid ;
            }
            else{
                l = mid+1 ;
            }
        }
        return l ;
    }

    const n = nums.length ;
    if(n<=1) return 1 ;

    let dp = Array.from({length : n+1} , ()=>{
        return Array.from({length : n+1} , ()=>-1)
    })

    let res = 0 ;
    let st = [nums[0]]
    for(let i=1 ; i<n ; i++){
        // console.log({st , i , x : nums[i]  })
        if( st.at(-1) < nums[i] ){
            st.push(nums[i]);
        }
        else {
            const idx = lowerBound(st , nums[i]);
            st[idx] = nums[i];
        }
    }

    // return util(0, -1);
    return st.length ;
};

// ======================================== 2. Russian Doll =========================================

/**
Leetcode : https://leetcode.com/problems/russian-doll-envelopes/

You are given a 2D array of integers envelopes where envelopes[i] = [wi, hi] represents the width and the height
of an envelope.

One envelope can fit into another if and only if both the width and height of one envelope are greater than the 
other envelope's width and height.

Return the maximum number of envelopes you can Russian doll (i.e., put one inside the other).

Note: You cannot rotate an envelope.

Example 1:
Input: envelopes = [[5,4],[6,4],[6,7],[2,3]]
Output: 3
Explanation: The maximum number of envelopes you can Russian doll is 3 ([2,3] => [5,4] => [6,7]).

Example 2:
Input: envelopes = [[1,1],[1,1],[1,1]]
Output: 1
 
Constraints:
1 <= envelopes.length <= 105
envelopes[i].length == 2
1 <= wi, hi <= 105

LOGIC : Just implementation question on LIS . Same sort krdo envelopes ko , or fir LIS apply krdo .
 */
var maxEnvelopes = function(envelopes) {
    
    envelopes.sort(( a,b ) => {
        if(a[0]!=b[0]){
            return a[0] - b[0];
        }
        else{
            return b[1] - a[1] ;
        }
    } )

    const lowerBound = ( arr , envp ) =>{
        let l = 0 ;
        let r = arr.length-1 ;

        while(l<r){
            const mid = Math.floor((l+r)/2);

            if( arr[mid][1] >= envp[1] ){
                r = mid ;
            }
            else{
                l = mid+1 ;
            }
        }
        return l ;
    }

    let res = [ envelopes[0] ] ;
    const n = envelopes.length ;

    for(let i =1 ; i  < n ; i++){
        const envp = envelopes[i] ;
        const last = res.at(-1)

        if(envp[0] > last[0] && envp[1] > last[1] ){
            res.push(envp);
        }
        else{
            const idx = lowerBound(res , envp);
            res[idx] = envp ;
        }
        
    }

    return res.length ;
};


// =============================== 3. Print LIS ==========================================
/**
GFG : https://www.geeksforgeeks.org/problems/printing-longest-increasing-subsequence/1

Print krne me Tabulation way hi use krna padega  . Ek prev array maintain krna hai , jiska kaam ye hoga ki 
us index pe agar value increase hui hai to piche kiski wajah se hui hai . 
 */

class Solution {
    getLIS(arr) {
        // code here
        
        const n = arr.length;

        let dp = new Array(n).fill(1);
        let prev = new Array(n).fill(-1);

        let maxLen = 1;
        let indexOfMaxLen = 0;

        for(let i = 1; i < n; i++){

            for(let j = 0; j < i; j++){

                if(arr[i] > arr[j] && dp[j] + 1 > dp[i]){
                    dp[i] = dp[j] + 1;
                    prev[i] = j;
                }

            }

            if(dp[i] > maxLen){
                maxLen = dp[i];
                indexOfMaxLen = i;
            }
        }

        let ans = [];
        let curr = indexOfMaxLen;

        while(curr !== -1){
            ans.push(arr[curr]);
            curr = prev[curr];
        }

        return ans.reverse();
    }
}


// ============================================ 4. Largest Divisible Subset ===================================
/*
Leetcode : https://leetcode.com/problems/largest-divisible-subset/

Given a set of distinct positive integers nums, return the largest subset answer such that every pair (answer[i], answer[j])
of elements in this subset satisfies:

answer[i] % answer[j] == 0, or
answer[j] % answer[i] == 0
If there are multiple solutions, return any of them.

Example 1:
Input: nums = [1,2,3]
Output: [1,2]
Explanation: [1,3] is also accepted.

Example 2:
Input: nums = [1,2,4,8]
Output: [1,2,4,8]
 
Constraints:

1 <= nums.length <= 1000
1 <= nums[i] <= 2 * 109
All the integers in nums are unique.
*/

/**
Logic : Subset me order change ho sakt hai . Ye question uper wale LIS me breakdown ho jayega , ek baar sort krdo
or condition greater than ki jagah divisible by wali condtion add krdo . Easy Way . Just slight modification part of 
above LIS question . 
 */
var largestDivisibleSubset = function(nums) {
    
    const n = nums.length ;
    let dp = Array.from({length : n} , ()=> 1);
    let prev = Array.from({length : n} , ()=>-1);

    nums.sort((a,b)=>a-b);

    let maxLen = 1 ;
    let maxLenIndex = 0 ;

    for(let i=1 ; i<n ; i++){

        for(let j =0 ; j<i ; j++){

            if( 1+dp[j] > dp[i] && nums[i] % nums[j] == 0){
                dp[i] = Math.max(dp[i] , 1 + dp[j]) ;
                prev[i] = j ;
            }
        }
        if(dp[i] > maxLen){
            maxLen = Math.max(maxLen , dp[i]) ;
            maxLenIndex = i ;
        }
    }

    let ans = [] ;

    let curr = maxLenIndex ;
    
    while(curr != -1){
        ans.push(nums[curr]);
        curr = prev[curr];
    }

    return ans.reverse();
};


// ========================================== 5. LOngest String Chain ===================================
/**
Leetcode : https://leetcode.com/problems/longest-string-chain/description/

You are given an array of words where each word consists of lowercase English letters.

wordA is a predecessor of wordB if and only if we can insert exactly one letter anywhere in wordA without changing
the order of the other characters to make it equal to wordB.

For example, "abc" is a predecessor of "abac", while "cba" is not a predecessor of "bcad".
A word chain is a sequence of words [word1, word2, ..., wordk] with k >= 1, where word1 is a predecessor of word2, 
word2 is a predecessor of word3, and so on. A single word is trivially a word chain with k == 1.

Return the length of the longest possible word chain with words chosen from the given list of words.

Example 1:
Input: words = ["a","b","ba","bca","bda","bdca"]
Output: 4
Explanation: One of the longest word chains is ["a","ba","bda","bdca"].

Example 2:
Input: words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
Output: 5
Explanation: All the words can be put in a word chain ["xb", "xbc", "cxbc", "pcxbc", "pcxbcf"].

Example 3:
Input: words = ["abcd","dbqca"]
Output: 1
Explanation: The trivial word chain ["abcd"] is one of the longest word chains.
["abcd","dbqca"] is not a valid word chain because the ordering of the letters is changed.
 
Constraints:
1 <= words.length <= 1000
1 <= words[i].length <= 16
words[i] only consists of lowercase English letters.

 */
var longestStrChain = function(arr) {
    
    const check = (str1 , str2) =>{
        
        if(str1.length !== str2.length + 1) return false ;

        let i = 0 ; 
        let j = 0 ;

        while(i < str1.length){
            if( j < str2.length && str1[i] == str2[j]){
                i+=1 ;
                j+=1 ;
            }
            else{
                i+=1 ;
            }
        }

        return i == str1.length && j == str2.length ? true : false ;
    }
    
    const n = arr.length ;

    arr.sort((a,b)=>a.length - b.length ) ;

    let dp = Array.from({length : n} , ()=>1);
    let ans = 1 ;

    for(let i = 1 ; i<n ; i++){

        for(let j=0 ; j<i ; j++){

            if(check(arr[i] , arr[j] ) && 1+dp[j] > dp[i] ){
                dp[i] = 1 + dp[j];
            }
        }
        ans = Math.max(ans , dp[i]);
    }

    return ans ;
};


// ========================================= 6. Longest Bitonic Subsequence ==========================================
/**
GFG : https://www.geeksforgeeks.org/problems/longest-bitonic-subsequence0824/1

Given an array of positive integers. Find the maximum length of Bitonic subsequence. 
A subsequence of array is called Bitonic if it is first strictly increasing, then strictly decreasing.
Return the maximum length of bitonic subsequence.
 
Note : A strictly increasing or a strictly decreasing sequence should not be considered as a bitonic sequence

Examples :
Input: n = 5, nums[] = [1, 2, 5, 3, 2]
Output: 5
Explanation: The sequence [1, 2, 5] is increasing and the sequence [3, 2] is decreasing so merging both we will get length 5.

Input: n = 8, nums[] = [1, 11, 2, 10, 4, 5, 2, 1]
Output: 6
Explanation: The bitonic sequence [1, 2, 10, 4, 2, 1] has length 6.

Input: n = 3, nums[] = [10, 20, 30]
Output: 0
Explanation: The decreasing or increasing part cannot be empty.

Input: n = 3, nums[] = [10, 10, 10]
Output: 0
Explanation: No strictly increasing or decreasing sequence exists.


LOGIC : Pehle aage se LIS nikalo fir pichee se LIS nikalao or Answer nikal jayega 
*/
class Solution {
    longestBitonicSequence(n, arr) {
        
        let lis = Array.from({length : n} , ()=>1) ;
        
        for(let i = 1 ; i<n ; i++){
            for(let j=0 ; j<i ; j++){
                if( arr[i] > arr[j] ){
                    lis[i] = Math.max(lis[i] , lis[j] + 1 ) 
                }
            }
        }
        
        let dis = Array.from({length : n} , ()=>1) ;
        
        for(let i = n-2 ; i>=0 ; i--){
            for(let j = n-1 ; j> i ; j--){
                if(dis[j] + 1 > dis[i] &&  arr[i] > arr[j] ){
                    dis[i] = dis[j] + 1 ;
                }
            }
        }
        
        let ans = 0 ;
        for(let i = 0 ; i<n ; i++){
            if(lis[i] != 1 && dis[i] != 1){
                ans = Math.max(ans , lis[i] + dis[i] ) 
            } 
        }
        return ans == 0 ? ans : ans-1 ;
    }
}


// ======================================= 7. NUmber of longest increasing subsequence ================================
/**
Leetcode : https://leetcode.com/problems/number-of-longest-increasing-subsequence/

Given an integer array nums, return the number of longest increasing subsequences.
Notice that the sequence has to be strictly increasing.

Example 1:
Input: nums = [1,3,5,4,7]
Output: 2
Explanation: The two longest increasing subsequences are [1, 3, 4, 7] and [1, 3, 5, 7].

Example 2:
Input: nums = [2,2,2,2,2]
Output: 5
Explanation: The length of the longest increasing subsequence is 1, and there are 5 increasing subsequences of length 1,
so output 5.
 
Constraints:
1 <= nums.length <= 2000
-106 <= nums[i] <= 106
The answer is guaranteed to fit inside a 32-bit integer.


LOGIC : Isme dp[j] + 1 == dp[i]  agar ye conditioin true hoti hai , iska matlab pehle bhi kisi ne itne length ki LIS
bana di thi , ek count array bhi maintain krna padega , jisme ye store hoga ki kisi point tak kitne repeated LIS hai .  
 */
var findNumberOfLIS = function(arr) {
    
    const n = arr.length ;

    let dp = Array.from({length : n} , ()=>1);
    let count = Array.from({length : n} , ()=>1);

    let maxLen = 1 ;

    for(let i = 1 ; i< n ; i++){

        for(let j = 0 ; j<i ; j++){
            
            if(dp[j] + 1 > dp[i]  && arr[i] > arr[j] ){
                dp[i] = dp[j] + 1 ;
                count[i] = count[j] ;
            }

            else if(dp[j] + 1 == dp[i] && arr[i] > arr[j]){
                count[i] = count[j] + count[i];
            }
        }

        maxLen = Math.max(maxLen , dp[i]);
    }

    let ans = 0 ;
    
    for(let i = 0 ; i< n ; i++){
        if(dp[i] == maxLen){
            ans = ans + count[i];
        }
    }
    return ans ;
};










