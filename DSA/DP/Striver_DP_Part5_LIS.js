
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












