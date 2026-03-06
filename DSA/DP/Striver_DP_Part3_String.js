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


// =================================== 6. Minimum insertion to make string palindrome =====================================
/**
Leetcode : https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/

Given a string s. In one step you can insert any character at any index of the string.
Return the minimum number of steps to make s palindrome.

A Palindrome String is one that reads the same backward as well as forward.

Example 1:
Input: s = "zzazz"
Output: 0
Explanation: The string "zzazz" is already palindrome we do not need any insertions.

Example 2:
Input: s = "mbadm"
Output: 2
Explanation: String can be "mbdadbm" or "mdbabdm".

Example 3:
Input: s = "leetcode"
Output: 5
Explanation: Inserting 5 characters the string becomes "leetcodocteel".
 
Constraints:
1 <= s.length <= 500
s consists of lowercase English letters.

Logic - Very Easy . Just find longest palindromic subsequence can be made from string . Then simply subtract it from
length of string . 
 */
var minInsertions = function(s) {
    
    const m = s.length ;
    const s2 = s.split('').reverse().join('');

    let dp = Array.from({length : m+1 } , ()=>{
        return Array.from({length : m+1} , ()=>-1)
    })

    const longestPalindromic = ( i , j )=>{
        if(i< 0 || j<0) return 0 ;

        if(dp[i][j] != -1) return dp[i][j] 

        if(s[i] == s2[j]){
            return dp[i][j] = 1 + longestPalindromic(i-1 , j-1);
        }

        return dp[i][j] = Math.max(longestPalindromic(i-1 , j) , longestPalindromic(i,j-1));
    }

    return m - longestPalindromic(m-1 , m-1)
};

// =============================== 7. Minimum Operation to make string1 and string2 similar ==============================
/**
Leetcode : https://leetcode.com/problems/delete-operation-for-two-strings/description/

Given two strings word1 and word2, return the minimum number of steps required to make word1 and word2 the same.

In one step, you can delete exactly one character in either string.

Example 1:
Input: word1 = "sea", word2 = "eat"
Output: 2
Explanation: You need one step to make "sea" to "ea" and another step to make "eat" to "ea".

Example 2:
Input: word1 = "leetcode", word2 = "etco"
Output: 4
 
Constraints:
1 <= word1.length, word2.length <= 500
word1 and word2 consist of only lowercase English letters.

Logic - Find just longest common subsequence , it means remaining digits need to be removed to make both string 
similar . 
 */
var minDistance = function(word1, word2) {
    
    const m = word1.length ;
    const n = word2.length ;

    let dp = Array.from({length : m + 1} , ()=>{
        return Array.from({length : n + 1} , ()=>-1)
    })

    const longestSubsequence = (i , j)=>{
        if(i<0 || j<0) return 0 ;

        if(dp[i][j] != -1) return dp[i][j];

        if(word1[i] == word2[j]){
            return dp[i][j] = 1 + longestSubsequence(i-1 , j-1);
        }

        return dp[i][j] = Math.max(longestSubsequence(i-1 , j) , longestSubsequence(i , j-1));
    }

    const lng = longestSubsequence(m-1 , n-1);

    return (m-lng) + (n-lng) ;
};

// ======================================== 8. Shortest Common Supersequence ==============================================
/**

Given two strings str1 and str2, return the shortest string that has both str1 and str2 as subsequences. 
If there are multiple valid strings, return any of them.

A string s is a subsequence of string t if deleting some number of characters from t (possibly 0) results in the string s.

Example 1:
Input: str1 = "abac", str2 = "cab"
Output: "cabac"
Explanation: 
str1 = "abac" is a subsequence of "cabac" because we can delete the first "c".
str2 = "cab" is a subsequence of "cabac" because we can delete the last "ac".
The answer provided is the shortest such string that satisfies these properties.

Example 2:
Input: str1 = "aaaaaaaa", str2 = "aaaaaaaa"
Output: "aaaaaaaa"

Logic - Just find LCS between both string , and then return lcs + (m-lcs) + (n-lcs) . 
This solution is just to return length of shortest common supersequence . But original problem is of returning string . 
 */
var shortestCommonSupersequence = function(str1, str2) {
    
    const m = str1.length ;
    const n = str2.length ;

    let dp = Array.from({length : m+1} , ()=>{
        return Array.from({length : n+1 } , ()=> -1);
    })

    const longestSubsequence = (i , j)=>{
        if(i<0 || j<0) return 0 ;

        if(dp[i][j] != -1) return dp[i][j];

        if(str1[i] == str2[j]){
            return dp[i][j] = 1 + longestSubsequence(i-1 , j-1);
        }

        return dp[i][j] = Math.max(longestSubsequence(i-1 , j) , longestSubsequence(i,j-1));
    }

    const lng = longestSubsequence(m-1 , n-1);

    return lng + (m-lng) + (n-lng);

};


/**
Optimized Version - So first need to understand LCS tabulation method very very clearly then only can understand this logic . 
Basically Pehle dp table banane ka , and last bottom left index se traversing krne ka . Agar character same hai to
uper i-1 , j-1 pe aao or store krlo wo character ek baar . Agar equal nahi hai , to left and top me se jo bada hai
waha jao , or jisko chhoda hai use store krlo result string me . 
 */
var shortestCommonSupersequence = function(str1, str2) {
    
    const m = str1.length ;
    const n = str2.length ;

    let dp = Array.from({length : m+1} , ()=>{
        return Array.from({length : n+1 } , ()=>  0 );
    })

    for(let i = 1 ; i <= m ; i++){

        for(let j=1 ; j<=n ; j++){

            if(str1[i-1] == str2[j-1]){
                dp[i][j] = 1 + dp[i-1][j-1];
            }
            else{
                dp[i][j] = Math.max(dp[i-1][j] , dp[i][j-1]) ;
            }
        }
    }

    let res = "" ;

    let i = m ;
    let j = n ;

    while( i > 0 && j > 0 ){

        if( str1[i-1] == str2[j-1] ){
            res = res + str1[i-1];
            i = i - 1 ;
            j = j - 1 ;
        }
        
        else if(   dp[i-1][j] > dp[i][j-1] ){
            res = res + str1[i-1];
            i = i - 1 ;
        }

        else {
            res = res + str2[j-1];
            j = j - 1 ;
        }
    }

    while(i>0){
        res = res + str1[i-1];
        i=i-1 ;
    }

    while(j>0){
        res = res + str2[j-1];
        j=j-1 ;
    }

    return res.split('').reverse().join('') ;
};

// ======================================== 9. Distinct Subsequence =====================================================
/**
Leetcode : https://leetcode.com/problems/distinct-subsequences/description/

Given two strings s and t, return the number of distinct subsequences of s which equals t.
The test cases are generated so that the answer fits on a 32-bit signed integer.

Example 1:
Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation:
As shown below, there are 3 ways you can generate "rabbit" from s.
rabbbit
rabbbit
rabbbit

Example 2:
Input: s = "babgbag", t = "bag"
Output: 5
Explanation:
As shown below, there are 5 ways you can generate "bag" from s.
babgbag
babgbag
babgbag
babgbag
babgbag
 
Constraints:
1 <= s.length, t.length <= 1000
s and t consist of English letters.

Brute Force - Generate all subsequence of s and check whether equal to 't' or not . 
 */
var numDistinct = function(s, t) {
    
    const m = s.length ;

    const util = (i , st)=>{

        if (i == m){
            if(st == t){
                res += 1;
            }
            return ;
        }

        if(i>m) return ;

        util(i+1 , st);
        util(i+1 , st + s[i]) ;
    }

    let res = 0 ;
    util(0,"")

    return res ;
};

/*
Optimized Version - Please watch striver video . So logic is , iterate from end of both string . 
CASE 1 : if char at i and j are same , there will be two case , increment j to next index and second is don't increment j
and wait for next matching with i 
CASE 2 : If char at i and j not matching then simply increment i and j will be at same index .

BASE CASE - If j became less than 0 , return 1 it means got 1 situation . If i became less than 0 , it means got no solution .

*/
var numDistinct = function(s, t) {
    
    const m = s.length ;
    const n = t.length ;

    let dp = Array.from({length : m} , ()=>{
        return Array.from({length : n} , ()=>-1)
    })

    const util = (i , j)=>{
        if(j<0) return 1 ;
        if(i<0) return 0 ;

        if(dp[i][j] != -1) return dp[i][j]

        if(s[i] == t[j]){
            const pick = util(i-1 , j-1) ;
            const notPick = util(i-1 , j);
            return dp[i][j] = pick + notPick ;
        }
        else{
            return dp[i][j] = util(i-1 , j);
        }
    }
    return util(m-1 , n-1);
};

// ======================================== 10. Edit Distance ========================================================
/**
Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.
You have the following three operations permitted on a word:
Insert a character
Delete a character
Replace a character
 
Example 1:
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')

Example 2:
Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')
 
Constraints:
0 <= word1.length, word2.length <= 500
word1 and word2 consist of lowercase English letters.

LOGIC - Watch Striver Video once . Just need to create recurrence relation and Base CAse . Don't think much . 
CASE 1 - If character matches no need of any operation , send for next index . 
CASE 2 - If character don't matches , apply all three operation of add , delete and replace and return minimum of them . 
NOTE - Hypothetically asume that you have deleted , inserted and replaced by moving index . 
 */
var minDistance = function(word1, word2) {
    
    let m = word1.length ;
    let n = word2.length ;

    let dp = Array.from({length : m} , ()=>{
        return Array.from({length : n} , ()=> -1 );
    })

    const util = (i , j)=>{
         // If the second string is empty, the only option is to delete all characters from the first string
        if(j<0) return i+1 ;

         // If the first string is empty, the only option is to insert all characters from the second string
        if(i<0) return j+1 ;

        // Check if the result for the current indices is already calculated
        if(dp[i][j] != -1) return dp[i][j]

        // If the characters at the current positions are the same, no operation is needed
        if(word1[i] == word2[j]){
            return dp[i][j] = util(i-1 , j-1);
        }

        // Minimum of three choices:
        // 1. Substitute a character in the first string with a character in the second string
        // 2. Delete a character from the first string
        // 3. Insert a character into the first string
        return dp[i][j] = 1 + Math.min( util(i-1 , j) , util(i , j-1) , util(i-1 , j-1) )
    }

    return util(m-1 , n-1)
};

// ============================================ 11. Wildcard Matching ==============================================
/**
Leetcode : https://leetcode.com/problems/wildcard-matching/description/
Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*' where:

'?' Matches any single character.
'*' Matches any sequence of characters (including the empty sequence).
The matching should cover the entire input string (not partial).

Example 1:
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".

Example 2:
Input: s = "aa", p = "*"
Output: true
Explanation: '*' matches any sequence.

Example 3:
Input: s = "cb", p = "?a"
Output: false
Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.
 
Constraints:
0 <= s.length, p.length <= 2000
s contains only lowercase English letters.
p contains only lowercase English letters, '?' or '*'.
 */
var isMatch = function(s, p) {
    
    let m = s.length ;
    let n = p.length ;

    let dp = Array.from({length : m+1} , ()=>{
        return Array.from({length : n+1} , ()=>-1);
    })

    const isRemainingAreAsterisk = (idx)=>{
        for(let i=idx ; i>=0 ; i--){
            if(p[i] != '*'){
                return false ;
            }
        }
        return true ;
    }

    const util = (i , j)=>{

        // Base Case 1: Both pattern and text matched
        if(i<0 && j<0) return true ;

        // Base Case 2: Pattern exhausted but text remains
        if(i>=0 && j<0) return false ;

        // Base Case 3: Text exhausted but pattern may have '*'
        if(i<0 && j>=0) return isRemainingAreAsterisk(j);

        // If already computed, return stored value
        if(dp[i][j] != -1) return dp[i][j]

        // If characters match or pattern has '?'
        if(s[i] == p[j] || p[j] == '?' ){
            return dp[i][j] = util(i-1 , j-1);
        }

        // If pattern has '*', try both options
        else if( p[j] == "*" ){
            const pickAsBlank = util(i , j-1) ;
            const pickAsCharacter = util(i-1 , j);
            return  dp[i][j] = pickAsBlank || pickAsCharacter ;
        }
        // If characters don't match
        else{
            return  dp[i][j] = false ;
        }
    }
    return util(m-1 , n-1);
};















