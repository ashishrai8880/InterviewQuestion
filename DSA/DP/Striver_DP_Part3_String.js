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
Optimized Approach - Use DP in it . 
 */
var longestCommonSubsequence = function(text1, text2) {
    
    const util = ( i , j )=>{

        if(i<0 || j<0) return 0 ;

        if(dp[i][j] != -1) return dp[i][j] ;

        if(text1[i] == text2[j]){
            return 1 + util(i-1 , j-1);
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








