 // ==========================================================================================================================
/**
Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence,
return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted 
without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.

Example 1:
Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.

Example 2:
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.

Example 3:
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
 
Constraints:
1 <= text1.length, text2.length <= 1000
text1 and text2 consist of only lowercase English characters.

Brute Force -  Finding all subsequence of both the string and store in array . And then check for longest subsequence
by traversing both the array . 
 */
var longestCommonSubsequence = function(text1, text2) {
    
    const util = (i , str , n , x)=>{

        if( i == n ){
            substr.push(str);
            return ;
        }

        util(i+1 , str , n , x) ;

        util(i+1 , str+x[i] , n , x);
    }

    let substr = [];

    util(0 , "" , text1.length , text1);
    let firstSet = [...substr];

    substr = [];
    util(0 , "" , text2.length , text2);
    let secondSet = [...substr];

    let res = 0 ;

    firstSet.forEach((e)=>{
        if(secondSet.includes(e)){
            res = Math.max(res , e.length )
        }
    })
    
    return res ;
};


/**
Optimized Approach - Take both two string simultaneously , start from back if character match then increase 1 and 
send from i-1 , j-1 . If do not match then send for both case (i-1 , j) and (i , j-1) and return max of it . 
Base case would be if any index became less than 0 it means answer would be 0 because there is no subsequence exists
except blank "" . 

Apply DP in it for optimization because state is going to repeat . 
Example - s1 = abcde and s2 = ace . State (1,0) will repeat . 

TC - Without DP = O(2^(m+n)) . Because going to check for all case
With DP = O(m*n) . 
 */
var longestCommonSubsequence = function(text1, text2) {
    
    const util = ( i , j )=>{

        if(i<0 || j<0) return 0 ;

        if(dp[i][j] != -1) return dp[i][j] ;

        if(text1[i] == text2[j]){
            return dp[i][j] =  1 + util(i-1 , j-1);
        }

        return dp[i][j] = Math.max(util(i-1 , j) , util(i , j-1))
    }

    const m = text1.length ;
    const n = text2.length ;

    let dp = Array.from({length : m } , ()=>{
        return Array.from({length : n} , ()=>-1)
    })

    return util(m-1 , n-1 )

};

/**
With Tabulation
 */
var longestCommonSubsequence = function(text1, text2) {

    const m = text1.length;
    const n = text2.length;
    
    let dp = Array.from({ length: m + 1 }, () =>
        Array.from({ length: n + 1 }, () => 0)
    );

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {

            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(
                    dp[i - 1][j],
                    dp[i][j - 1]
                );
            }
        }
    }
    return dp[m][n];
};


// =================================== Print Longest Common Subsequence =============================================
var longestCommonSubsequence = function(text1, text2) {

    const m = text1.length;
    const n = text2.length;
   
    const util = (i , j)=>{
        if(i<0 || j<0){
            return "" ;
        }

        if(text1[i] == text2[j]){
            return text1[i] + util(i-1 , j-1);
        }

        const first = util(i-1 , j);
        const second = util(i , j-1);

        return first.length > second.length ? first : second ;
    }

    const ans = util(m-1 , n-1)
    return ans.split('').reverse().join('');
};


// ====================================== 3. Longest Common Substring ============================================
/**
GFG : https://www.geeksforgeeks.org/problems/longest-common-substring1452/1

You are given two strings s1 and s2. Your task is to find the length of the longest common substring among the given
strings.

Examples:

Input: s1 = "ABCDGH", s2 = "ACDGHR"
Output: 4
Explanation: The longest common substring is "CDGH" with a length of 4.

Input: s1 = "abc", s2 = "acb"
Output: 1
Explanation: The longest common substrings are "a", "b", "c" all having length 1.

Input: s1 = "YZ", s2 = "yz"
Output: 0

Constraints:
1 <= s1.size(), s2.size() <= 10^3
Both strings may contain upper and lower case alphabets.

Logic - Brute Force - Generate all substring of str2 and store in set . 
Now generate all substring of str1 and check on the fly , if there is same substring exists in Set or not . 
 */

class Solution {
    longCommSubstr(s1, s2) {
        
        // finding all substring of s2
        const m = s1.length ;
        const n = s2.length ;
        
        let m2 = new Set();
        
        for(let i = 0 ; i<n ; i++){
            for(let j=i ; j<n ; j++){
                m2.add(s2.slice(i,j+1));
            }
        }
        
        let res = 0 ;
        
        for(let i = 0 ; i<m ; i++){
            for(let j = i ; j<m ; j++){
                const str = s1.slice(i,j+1);
                if(m2.has(str)){
                    res = Math.max(res , str.length )
                }
            }
        }
        return res ;
    }
}


/**
Optimized Approach - Use DP table tabulation . 
Like in Longest common subsequence , in case when character don't match , take it to 0 instead for checking other 
two cases because if we check that will break sequence or order of string . 
Tabulation Method works only because for recursive solution need to check every case which gives TLE even after memoization .
 */

class Solution {
    longCommSubstr(s1, s2) {
        
        // finding all substring of s2
        const m = s1.length ;
        const n = s2.length ;
        
        let dp = Array.from({length : m+1} , ()=>{
            return Array.from({length : n+1} , ()=>0)
        })
        
        let ans = 0 ;
        
        for(let i=1 ; i<=m ; i++){
            
            for(let j = 1 ; j<=n ; j++){
                
                if( s1[i-1] == s2[j-1] ){
                    dp[i][j] = 1 + dp[i-1][j-1];
                }
                else{
                    dp[i][j] = 0 ;
                }
                ans = Math.max(ans , dp[i][j]);
            }
        }
        return ans ;
    }
}


// ======================================== 4. Longest Palindromic Subsequence =========================================
/**
GFG : https://www.geeksforgeeks.org/problems/longest-common-substring1452/1
You are given two strings s1 and s2. Your task is to find the length of the longest common substring among the given strings.

Examples:

Input: s1 = "ABCDGH", s2 = "ACDGHR"
Output: 4
Explanation: The longest common substring is "CDGH" with a length of 4.

Input: s1 = "abc", s2 = "acb"
Output: 1
Explanation: The longest common substrings are "a", "b", "c" all having length 1.

Input: s1 = "YZ", s2 = "yz"
Output: 0
Constraints:
1 <= s1.size(), s2.size() <= 103
Both strings may contain upper and lower case alphabets.

 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function(s) {
    
    const isPalindrome = (str)=>{
        let l = 0 ;
        let r = str.length - 1 ;
        while(l<=r){
            if(str[l] != str[r]){
                return false ;
            }
            l+=1 ;
            r-=1 ;
        }
        return true ;
    }

    const util = (i , str)=>{
        if(i == n){
            if( ans < str.length && isPalindrome(str) ){
                ans = str.length ;
            }
            return ;
        }

        util(i+1 , str) ;
        util(i+1 , str + s[i] ) ;
    }
    const n = s.length ;
    let ans = 0 ;
    util(0 , "") ;
    return ans ;
};


/**
Optimized Version - Just reverse the string and test for longest common subsequence !!!!! . 
Because reverse string and original string , any common sequence means it is palindrome . 
 */
var longestPalindromeSubseq = function(s) {
    
    const s2 = s.split('').reverse().join('');
    const m = s.length ;

    let dp = Array.from({length : m} , ()=>{
        return Array.from({length : m} , ()=> -1)
    })

    const util = (i , j)=>{
        if(i<0 || j<0){
            return 0 ;
        }

        if(dp[i][j] != -1){
            return dp[i][j];
        }

        if(s[i] == s2[j]){
            return dp[i][j] = 1 + util(i-1 , j-1);
        }

        return  dp[i][j] = Math.max(util(i-1 , j) , util(i , j-1))
    }

    return util( m-1 , m-1 )
};












