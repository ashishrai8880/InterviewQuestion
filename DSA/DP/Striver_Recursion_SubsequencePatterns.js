
// ==================================================================1. Generate All Binary String =======================================================================
// GFG : https://www.geeksforgeeks.org/problems/generate-all-binary-strings/1        Leetcode : https://leetcode.com/problems/generate-binary-strings-without-adjacent-zeros/
/* 
Problem Statement : Given an integer N , Print all binary strings of size N which do not contain consecutive 1s.
A binary string is that string which contains only 0 and 1.
Example 1:
Input:
N = 3
Output:
000 , 001 , 010 , 100 , 101
Explanation:
None of the above strings contain consecutive 1s. "110" is not an answer as it has '1's occuring consecutively. 
*/
class Solution {
    generateBinaryStrings(n) {
      
        const util = (i , st ) => {
            
            if(i < 0) return  ;
            
            let t = st.slice(0,i) + '1' + st.slice(i+1);
            ans.push(t );
            
            const set = util(i-2 , t);
            
            const unset = util(i-1 , st);
            
        }
        
        let s = "";
        let i = n ;
        while(n > 0){
            s = s + '0' ;
            n-- ;
        }
        let ans = [s];
        util(i-1 , s)
        return ans.sort() ;
        
    }
}


// ==================================================================2. Generate All Valid Parenthesis =====================================================================
/**
Leetcode : https://leetcode.com/problems/generate-parentheses/              GFG : https://www.geeksforgeeks.org/problems/generate-all-possible-parentheses/1
Problem Statement : Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]
 */
var generateParenthesis = function(n) {
    
    const util = (curr , open , close )=>{
        if(curr.length == 2*n){
            ans.push(curr);
            return ;
        }

        if( open < n ){
            util(curr+'(' , open+1 , close);
        }

        if( close < open ){
            util(curr+')' , open , close+1);
        }
    }

    let ans = [];
    util("" , 0 , 0);
    return ans ;
};








