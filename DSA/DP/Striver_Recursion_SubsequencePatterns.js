
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


// ========================================================================3. Find All Subsets ==============================================================================
/**
Given an integer array nums of unique elements, return all possible subsets (the power set).
The solution set must not contain duplicate subsets. Return the solution in any order.

Example 1:

Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 */
var subsets = function(nums) {
    
    const util = (i , subset)=>{
        if(i == nums.length){
            res.push([...subset]);
            return ;
        }

        subset.push(nums[i]);
        util(i+1 , subset);
        subset.pop();
        util(i+1 , subset);
    }

    let res = [];
    let subset = [];
    util(0 , subset );
    return res ;

};

// Easy Approach : By Bit Manipulation . If there is string 'abc' , then it can have total subsequence equal to 8 which is 2^3 (3 is size of string ) . Now when I calculate
// Binary number of 0 to 7 it will give like 
/*
7  :  111  :  abc
6  :  110  :  ab
5  :  101  :  ac
4  :  100  :  a
3  :  011  :  bc
2  :  010  :  b
1  :  001  :  c
0  :  000  :  ""
*/
class Solution {

    AllPossibleStrings(s) {
        
        let res = [];
        const len = s.length ;
        let n = Math.pow(2,len)-1 ;
        
        while(n>=0){
            const b = n.toString(2).padStart(len , '0');
            let subSeq = "";
            for(let i=0 ; i<b.length ; i++){
                if(b[i] == '1'){
                    subSeq = subSeq + s[i] ;
                }
            }
            n = n - 1 ;
            res.push(subSeq); 
        }
        return res.sort() ;
    }
}


// ========================================================================= 4. Combination Sum ============================================================================
/**
Leetcode : https://leetcode.com/problems/combination-sum/description/ 

Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.
The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.
 
Example 1:

Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.

Example 2:
Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
 */
var combinationSum = function(arr, target) {
    
    const util = (n , sum , combo)=>{

        if(sum == 0){
            res.push([...combo]) ;
            return ;
        }

        if(sum < 0 || n < 0) return ;

        combo.push(arr[n]);
        const pick = util(n , sum - arr[n] , combo )

        combo.pop();
        const notPick = util(n-1 , sum , combo);

    }
    let res = [];
    let subset = [] ;
    const len = arr.length ;
    util(len -1 , target , subset);
    return res ;
};


// ======================================================================= 5. Combination Sum 2 ============================================================================
/**
Leetcode : https://leetcode.com/problems/combination-sum-ii/
Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.
Each number in candidates may only be used once in the combination.
Note: The solution set must not contain duplicate combinations.

Example 1:
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: [ [1,1,6], [1,2,5], [1,7], [2,6]]

Example 2:
Input: candidates = [2,5,2,1,2], target = 5
Output: [[1,2,2],[5]]
 */
var combinationSum2 = function(candidates, target) {
    candidates.sort((a, b) => a - b);
    const res = [];

    const backtrack = (start, path, target) => {
        if (target === 0) {
            res.push([...path]);
            return;
        }
        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue;

            if (candidates[i] > target) break;

            path.push(candidates[i]);
            backtrack(i + 1, path, target - candidates[i]); 
            path.pop(); 
        }
    };

    backtrack(0, [], target);
    return res;
};


// =======================================================================6. Subset Sum 1 =================================================================================
/**
GFG : https://www.geeksforgeeks.org/problems/subset-sums2234/1&selectedLang=python3
Given a array arr of integers, return the sums of all subsets in the list.  Return the sums in any order.

Examples:
Input: arr[] = [2, 3]
Output: [0, 2, 3, 5]
Explanation: When no elements are taken then Sum = 0. When only 2 is taken then Sum = 2. When only 3 is taken then Sum = 3. When elements 2 and 3 are
taken then Sum = 2+3 = 5.
 */
class Solution {
    subsetSums(arr) {
        
        const util = (i , sum)=>{
            
            if(i == arr.length){
                res.push(sum);
                return ;
            }
            
            util(i+1 , sum + arr[i]);
            util(i+1 , sum);
            
        }
        
        let res = [];
        util(0 , 0);
        return res ;
        
    }
}


// ====================================================================== 7. Subset Sum 2 ===================================================================================
/**
Leetcode : https://leetcode.com/problems/subsets-ii/
Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

Example 1:
Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
Example 2:

Input: nums = [0]
Output: [[],[0]]
 */  // Naive Approach .
var subsetsWithDup = function(nums) {
    
    const n = nums.length ;
    nums.sort();

    const util = (i , subset)=>{

        if(i == n){
            res.add(JSON.stringify(subset));
            return ;
        }

        subset.push(nums[i]);
        util(i+1 , subset);
        subset.pop();
        util(i+1 , subset);

    }

    let res  = new Set();
    util(0 , []);
    let ans = [...res] ;
    return ans.map((e)=>JSON.parse(e));

};

// Easy Approach : If next number is same as previous number then don't do anything just continue .

var subsetsWithDup = function(nums) {
    
    const n = nums.length ;
    nums.sort();

    const util = (start , subset)=>{

        res.push( [...subset] );
        
        for(let i=start ; i<n ; i++){
            if( i != start && nums[i] == nums[i-1] ){
                continue ;
            }
            subset.push(nums[i]);
            util(i+1 , subset);
            subset.pop();
        }
    }

    let res  = [];
    util(0 , []);
    return res ;

};














