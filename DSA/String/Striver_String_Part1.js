
// =================================================================================================================
// =================================================================================================================
/**
LONGEST Palindromic Substring
Leetcode : https://leetcode.com/problems/longest-palindromic-substring/
Given a string s, return the longest palindromic substring in s.

Example 1:
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.

Example 2:
Input: s = "cbbd"
Output: "bb"

Constraints:
1 <= s.length <= 1000
s consist of only digits and English letters.

 * @param {string} s
 * @return {string}

 Brute Force : O(n^3) 
 */
var longestPalindrome = function(s) {
    let max = 0 ;
    let res = "" ;

    const check = (l , r) => {
        while(l<r){
            if(s[l] != s[r]){
                return false ;
            }
            l+=1 ;
            r-=1 ;
        }
        return true ;
    }

    const n = s.length ;
    for(let i = 0 ; i<n ; i++){

        for(let j=i ; j<n ; j++){
            if(j-i+1 > max &&  check(i,j) ){
                max = Math.max(max , j-i+1 );
                res = s.substring(i,j+1);
            }
        }
    }

    return res ;
};


/**
Optimized Version : For each character just traverse in each direction left and right . There can be only 2 case
if palindrome is odd length , then 'a' from one character start traverssing left and right . 
if palindrome is even length , then 'ab' from 2 character started traversing in both direction . 
 */
var longestPalindrome = function(s) {
    let max = 0 ;
    let res = "" ;

    const n =s.length ;

    for(let i = 0 ; i<n ; i++){

        for(let j = 0 ; j<=1 ; j++){
            let left = i ; 
            let right = i+j ;

            while(left>=0 && right<n && s[left] == s[right]){

                if( right-left+1 > max ){
                    max = right-left+1 ;
                    res = s.substring(left , right+1);
                }

                left-=1 ;
                right+=1 ;
            } 
        }
    }
    return res ;
};


// =================================================================================================================
// =================================================================================================================
/**
Leetcode : https://leetcode.com/problems/longest-almost-palindromic-substring/description/
2. Longest Almost Palindromic String

You are given a string s consisting of lowercase English letters.

A substring is almost-palindromic if it becomes a palindrome after removing exactly one character from it.

Return an integer denoting the length of the longest almost-palindromic substring in s.

 

Example 1:
Input: s = "abca"
Output: 4
Explanation: Choose the substring "abca".
Remove "abca".
The string becomes "aba", which is a palindrome.
Therefore, "abca" is almost-palindromic.

Example 2:
Input: s = "abba"
Output: 4
Explanation: Choose the substring "abba".
Remove "abba".
The string becomes "aba", which is a palindrome.
Therefore, "abba" is almost-palindromic.

Example 3:
Input: s = "zzabba"
Output: 5
Explanation:Choose the substring "zzabba".
Remove "zabba".
The string becomes "abba", which is a palindrome.
Therefore, "zabba" is almost-palindromic.
 
Constraints:
2 <= s.length <= 2500
s consists of only lowercase English letters.

 * @param {string} s
 * @return {number}
 */
var almostPalindromic = function(s) {

    let max = 2 ;
    const n = s.length ;

    for(let i = 0 ; i<n ; i++){

        // odd length palindrome left skip 
        let j = i-1 ;
        let k = i+1 ;
        let flag = true ;

        while( j>=0 && k<n ){
            if( s[k] != s[j] ){
                if(flag == true){
                    flag = false ;
                    j-- ;
                }
                else{
                    break ;
                }
            }
            else{
                max = Math.max(max , k-j+1);
                if( (j>0 || k<n-1) && flag == true){
                    max = Math.max(max , k-j+2);
                }
                j-- ;
                k++ ;
            }
        }
        
        // odd length palindrome right skip 
        j = i-1 ;
        k = i+1 ;
        flag = true ;

        while( j>=0 && k<n ){
            if( s[k] != s[j] ){
                if(flag == true){
                    flag = false ;
                    k++ ; // right skip
                }
                else{
                    break ;
                }
            }
            else{
                max = Math.max(max , k-j+1);
                if( (j>0 || k<n-1)  && flag == true){
                    max = Math.max(max , k-j+2);
                }
                j-- ;
                k++ ;
            }
        }

        // even length palindrome left skip 
        j = i ;
        k = i+1 ;
        flag = true ;

        while( j>=0 && k<n ){
            if( s[k] != s[j] ){
                if(flag == true){
                    flag = false ;
                    j-- ; // right skip
                }
                else{
                    break ;
                }
            }
            else{
                max = Math.max(max , k-j+1);
                if( (j>0 || k<n-1)  && flag == true){
                    max = Math.max(max , k-j+2);
                }
                j-- ;
                k++ ;
            }
        }

        
        // even length palindrome right skip 
        j = i ;
        k = i+1 ;
        flag = true ;

        while( j>=0 && k<n ){
            if( s[k] != s[j] ){
                if(flag == true){
                    flag = false ;
                    k++ ; // right skip
                }
                else{
                    break ;
                }
            }
            else{
                max = Math.max(max , k-j+1);
                if( (j>0 || k<n-1)  && flag == true){
                    max = Math.max(max , k-j+2);
                }
                j-- ;
                k++ ;
            }
        }
    }
    
    return max ;
    
};








