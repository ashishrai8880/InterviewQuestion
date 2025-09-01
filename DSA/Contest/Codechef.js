// ======================================================================1. Valid Palindrome ============================================================================
/**
Leetcode : https://leetcode.com/problems/valid-palindrome-ii/description/
Given a string s, return true if the s can be palindrome after deleting at most one character from it.
Example 1:
Input: s = "aba"
Output: true

Example 2:
Input: s = "abca"
Output: true
Explanation: You could delete the character 'c'.
 */
var validPalindrome = function(s) {
    
    const isPalindrome = (left , right)=>{
        while(left < right){
            if(s[left] != s[right]) return false ;
            left+=1 ;
            right-=1 ;
        }
        return true ;
    }

    let left = 0 ;
    let right = s.length-1 ;

    while(left < right){
        if(s[left] !== s[right]){
            return isPalindrome(left+1,right) || isPalindrome(left,right-1)
        }
        left+=1 ;
        right-=1 ;
    }

    return true ;

};
