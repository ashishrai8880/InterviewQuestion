
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


// ==========================================================================6. Combination Sum 3 ============================================================================
/**
Leetcode : https://leetcode.com/problems/combination-sum-iii/description/
 Find all valid combinations of k numbers that sum up to n such that the following conditions are true:
Only numbers 1 through 9 are used.
Each number is used at most once.
Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.

Example 1:

Input: k = 3, n = 7
Output: [[1,2,4]]
Explanation:
1 + 2 + 4 = 7
There are no other valid combinations.

Example 2:
Input: k = 3, n = 9
Output: [[1,2,6],[1,3,5],[2,3,4]]
Explanation:
1 + 2 + 6 = 9
1 + 3 + 5 = 9
2 + 3 + 4 = 9
There are no other valid combinations.

Example 3:
Input: k = 4, n = 1
Output: []
Explanation: There are no valid combinations.
Using 4 different numbers in the range [1,9], the smallest sum we can get is 1+2+3+4 = 10 and since 10 > 1, there are no valid combination.
 
 */
var combinationSum3 = function(k, n) {
    
    const util = (i , sum , subset)=>{

        if(sum ==0 && subset.length == k){
            res.push([...subset]);
            return ;
        }
        if(i >= 9 || subset.length > k || sum < 0) return ;
        
        subset.push(arr[i]);
        const pick = util(i+1 , sum - arr[i] , subset );
        subset.pop();
        const notPick = util(i+1 , sum , subset);

    }

    let arr = [];
    
    arr = [1,2,3,4,5,6,7,8,9];
    let res = [];
    util(0 , n , []);
    return res ;
};

// =======================================================================7. Subset Sum 1 =================================================================================
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


// ====================================================================== 8. Subset Sum 2 ===================================================================================
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


// =======================================================================9. Letter Combination of Phone Number ====================================================================================
/**
Leetcode : https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/
Time Complexity : O(4^n)
Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.
A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

Example 1:

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Example 2:

Input: digits = ""
Output: []
Example 3:

Input: digits = "2"
Output: ["a","b","c"]
 */
var letterCombinations = function(digits) {
    
    const util = (index , combination)=>{
        if(index >= len){
            res.push(combination);
            return ;
        }

        const ch = digits[index];
        const value = mapping[ch];

        for(let i=0 ; i<value.length ; i++){
            util(index+1 ,  combination + value[i]) ;
        }

    }

    if(digits.length == 0){
        return [];
    }

    const mapping = ["","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"] ;
    const len = digits.length ;
    let res = [];
    util(0 , "");
    return res ;

};


// ================================================================10. Palindrome Partitioning ==========================================================================
/** Leetcode : https://leetcode.com/problems/palindrome-partitioning/description/
Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.

Example 1:
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
Example 2:

Input: s = "a"
Output: [["a"]]

First Method : Try To Cut at every place , and then check if first part is palindrome , if it is , then move forward .
 */
var partition = function(s) {
    
    const isPalindrome = (st)=>{
        let i = 0 ; 
        let j = st.length -1 ;
        while(i <= j){
            if(st[i] != st[j]){
                return false ;
            }
            i=i+1 ;
            j = j-1 ;
        }
        return true ;
    }

    const util = (index , path)=>{
        if(index == len){
            res.push([...path]);
            return ;
        }

        for(let i=index ; i<s.length ; i++){
            const firstPart = s.slice(index , i+1)
            if(isPalindrome(firstPart)){
                path.push(firstPart);
                util(i+1 , path);
                path.pop();
            }
        }

    }

    const len = s.length ;
    let res = [];
    util(0 , []);
    return res ;

};

// Second Part : Clean approach , logic is same as first one , but more readable and understandable 
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    
    const isPalindrome = (st)=>{
        let i = 0 ; 
        let j = st.length -1 ;
        while(i <= j){
            if(st[i] != st[j]){
                return false ;
            }
            i=i+1 ;
            j = j-1 ;
        }
        return true ;
    }

    const util = (str , path)=>{
        if(str.length == 0){
            res.push([...path]);
            return ;
        }

        for(let i=0 ; i<str.length ; i++){
            const firstPart = str.slice(0 , i+1);
            const secondPart = str.slice(i+1)
            if(isPalindrome(firstPart)){
                path.push(firstPart);
                util(secondPart , path);
                path.pop();
            }
        }
    }

    let res = [];
    util(s , []);
    return res ;

};


// ========================================================================11. Word Search =================================================================================================
O(M∗N∗4 
L
 )
/**
Leetcode : https://leetcode.com/problems/word-search/
Time Complexity : O ( M * N * (4^L))  Space Complexity : O (M * N)
Given an m x n grid of characters board and a string word, return true if word exists in the grid.
The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

Example 1:
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true

Example 2:
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true

Example 3:
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
 */
var exist = function(board, word) {
    
    const isValid = (i , j)=>{
        if(i>=0 && i<row && j>=0 && j<col ){
            return true ;
        }
        return false ;
    }

    const util = (i , j , charIdx)=>{

        if(charIdx >= word.length){
            return true ;
        }

        if(isValid(i+1 ,j) && word[charIdx] == board[i+1][j] ){
            const temp = board[i+1][j];
            board[i+1][j] = '-1' ;
            const res = util(i+1 , j , charIdx+1);
            board[i+1][j] = temp ;
            if(res) return true ;
        }

        if(isValid(i-1 ,j) && word[charIdx] == board[i-1][j] ){
            const temp = board[i-1][j];
            board[i-1][j] = '-1' ;
            const res =  util(i-1 , j , charIdx+1);
            board[i-1][j] = temp ;
            if(res) return true ;
        }

        if(isValid(i ,j+1) && word[charIdx] == board[i][j+1] ){
            const temp = board[i][j+1];
            board[i][j+1] = '-1' ;
            const res =  util(i , j+1 , charIdx+1);
            board[i][j+1] = temp ;
            if(res) return true ;
        }

        if(isValid(i ,j-1) && word[charIdx] == board[i][j-1] ){
            const temp = board[i][j-1];
            board[i][j-1] = '-1' ;
            const res =  util(i , j-1 , charIdx+1);
            board[i][j-1] = temp ;
            if(res) return true ;
        }

        return false ;

    }

    const firstChar = word[0];
    const row = board.length ;
    const col = board[0].length ;
    
    for(let i = 0 ; i<row ; i++){
        for(let j = 0 ; j<col ; j++){
            if(board[i][j] == firstChar){
                const temp = board[i][j];
                board[i][j] = '-1';
                if(util(i,j , 1) ) {
                    return true ;
                };
                board[i][j] = temp ;
                
            }
        }
    }

    return false ;

};

// Easy Approach : Clear and Clean Code
//Time Complexity:  O(m*n*4^k), where “K” is the length of the word. And we are searching for the letter m*n times in the worst case. 
//Here 4 in 4^k is because at each level of our decision tree we are making 4 recursive calls which equal 4^k in the worst case.

Space Complexity: O(K), Where k is the length of the given words.
var exist = function(board, word) {

    const util = (i , j , charIdx)=>{

        if(charIdx >= word.length){
            return true ;
        }

        if(i<0 || j<0 || i>=row || j>=col || board[i][j] == '-1' || board[i][j] != word[charIdx]){
            return false ;
        }

        const temp = board[i][j];
        board[i][j] = '-1';

        const top = util(i+1 , j , charIdx+1);
        const bottom = util(i-1 , j , charIdx+1);
        const right = util(i , j+1 , charIdx+1);
        const left = util(i, j-1 , charIdx+1);

        board[i][j]= temp ;

        return top || bottom || right || left ;
    }

    const firstChar = word[0];
    const row = board.length ;
    const col = board[0].length ;
    
    for(let i = 0 ; i<row ; i++){
        for(let j = 0 ; j<col ; j++){
            if(board[i][j] == firstChar){
                if(util(i,j , 0) ) {
                    return true ;
                };
            }
        }
    }

    return false ;

};


// ======================================================================================== 12. N Queens ===============================================================================================
/**
Leetcode : https://leetcode.com/problems/n-queens/   
The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.
Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.
Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

Example 1:
Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above

Example 2:
Input: n = 1
Output: [["Q"]]
 */
var solveNQueens = function(n) {
   
    const addSolution = ()=>{

        let temp = [];
        let str = "";

        for(let i=0 ; i<n ; i++){ 
            str = "" ;
            for(let j=0 ; j< n ; j++){
                if(mat[i][j] == 'Q'){
                    str += 'Q';
                }else{
                    str += '.';
                }
            }
            temp.push(str);
        }
        res.push([...temp])

    }

    const isSafe = ( row , col ) => {

        // checking column , if already queeen exist or not
        let k = 0 ;
        while(k < n){
            if(mat[k][col] == 'Q'){
                return false ;
            }
            k = k+1 ;
        }

        // diagonal check 
        // top left
        let p = row ;
        let q = col ;
        while(p>=0 && q >= 0){
            if(mat[p][q] == 'Q'){
                return false ;
            }
            p = p -1 ;
            q = q -1 ;
        }

        // top right
        p = row ;
        q = col ;
        while(p >= 0 && q < n){
            if(mat[p][q] == 'Q'){
                return false ;
            }
            p = p - 1 ;
            q = q + 1 ;
        }

        return true ;
    }

    const util = (rowNum)=>{
        
        if(rowNum == n){
            addSolution();
            return ;
        }

        for(let i=0 ; i< n ; i++){

            if( isSafe( rowNum , i )){
                mat[rowNum][i] = 'Q';
                util(rowNum+1);
                mat[rowNum][i] = '0';
            }

        }
        
    }

    let mat = Array.from({length : n},()=>{
        return Array.from({length : n},()=>'0')
    })

    let res = [];
    util(0 , 0);
    return res ;

};

// Optimized Approach . Instead of check at every place O(n) for all diagonal , straight check , we can do the same in O(1) by using hash map . In straigh check , we can store column number in key which tells 
// there is already store some queen at particular column .
// For Diagonal Check there is 2 case , FIRST CASE : if you are checking toward top right , then sum of row and column will be unique for each diagonal . So we can take key as row + col and then store some boolean value which 
// tells that , there might be some queen already stored in that diagonal .  SECOND CASE : formulae is n+(col-row) will always unique when you traverse left top diagonal . Formulae is nothing but , when you do col - row or 
// row - col , it will always give same value in top left diagonal , now value can go into negative number , that's why we are adding n to it , although we can add any number to it , just to make unique and positive .
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
   
    const addSolution = ()=>{

        let temp = [];
        let str = "";

        for(let i=0 ; i<n ; i++){ 
            str = "" ;
            for(let j=0 ; j< n ; j++){
                if(mat[i][j] == 'Q'){
                    str += 'Q';
                }else{
                    str += '.';
                }
            }
            temp.push(str);
        }
        res.push([...temp])

    }

    const isSafe = ( row , col ) => {

        // checking column , if already queeen exist or not
        if( straightCheck[col] == true){
            return false ;
        }

        if(topLeftDiagonal[n+(col-row)] == true){
            return false ;
        }

        if(topRightDiagonal[row+col] == true){
            return false ;
        }

        return true ;
    }

    const util = (rowNum)=>{
        
        if(rowNum == n){
            addSolution();
            return ;
        }

        for(let i=0 ; i< n ; i++){

            if( isSafe( rowNum , i )){
                mat[rowNum][i] = 'Q';
                straightCheck[i] = true ;
                topRightDiagonal[rowNum + i] = true ;
                topLeftDiagonal[ n + (i - rowNum) ] = true ;
                util(rowNum+1);
                mat[rowNum][i] = '0';
                straightCheck[i] = false ;
                topRightDiagonal[rowNum + i] = false ;
                topLeftDiagonal[ n + (i - rowNum) ] = false ;
            }

        }
        
    }

    let mat = Array.from({length : n},()=>{
        return Array.from({length : n},()=>'0')
    })

    let res = [];
    let straightCheck = {} ;
    let topRightDiagonal = {};
    let topLeftDiagonal = {};
    util(0 , 0);
    return res ;

};


// ==========================================================================================13. Rat in a maze ==========================================================================================
/**
GFG : https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1&selectedLang=python3
Consider a rat placed at position (0, 0) in an n x n square matrix mat[][]. The rat's goal is to reach the destination at position (n-1, n-1). The rat can move in four possible directions: 'U'(up), 'D'(down), 'L' (left), 'R' (right).

The matrix contains only two possible values:

0: A blocked cell through which the rat cannot travel.
1: A free cell that the rat can pass through.
Your task is to find all possible paths the rat can take to reach the destination, starting from (0, 0) and ending at (n-1, n-1), under the condition that the rat cannot revisit any cell along the same path. Furthermore, the rat can only move to adjacent cells that are within the bounds of the matrix and not blocked.
If no path exists, return an empty list.

Note: Return the final result vector in lexicographically smallest order.

Examples:
Input: mat[][] = [[1, 0, 0, 0], [1, 1, 0, 1], [1, 1, 0, 0], [0, 1, 1, 1]]
Output: ["DDRDRR", "DRDDRR"]
Explanation: The rat can reach the destination at (3, 3) from (0, 0) by two paths - DRDDRR and DDRDRR, when printed in sorted order we get DDRDRR DRDDRR.

Input: mat[][] = [[1, 0], [1, 0]]
Output: []
Explanation: No path exists as the destination cell is blocked.

Input: mat = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
Output: ["DDRR", "RRDD"]
Explanation: The rat has two possible paths to reach the destination: 1. "DDRR" 2. "RRDD", These are returned in lexicographically sorted order.

Time Complexity: O(4^(m*n)), because on every cell we need to try 4 different directions.

Space Complexity:  O(m*n), Maximum Depth of the recursion tree(auxiliary space).
 */
class Solution {
    // Function to find all possible paths
    ratInMaze(maze) {
        // code here
        
        const isValid = (i , j)=>{
            if(i>=row || i<0 || j>=col || j<0 || maze[i][j] =='0' ) {
                return false ;
            }
            return true ;
        }   
        
        const util = (i,j , path)=>{
            if( i == row-1 && j == col-1){
                res.push(path)
                return ;
            }
            
            // top going 
            if(isValid(i-1 , j)){
                maze[i][j] = '0' ;
                util(i-1 , j  , path+"U") ;
                maze[i][j] = '1' ;
            }
            
            // bottom going
            if(isValid(i+1 , j)){
                maze[i][j] = '0' ;
                util(i+1 , j  , path+"D") ;
                maze[i][j] = '1' ;
            }
            
            // right going
            if(isValid(i , j+1)){
                maze[i][j] = '0' ;
                util(i , j+1  , path+"R") ;
                maze[i][j] = '1' ;
            }
            
            // left going
            if(isValid(i, j-1)){
                maze[i][j] = '0' ;
                util(i , j-1 , path+"L") ;
                maze[i][j] = '1' ;
            }
            
        }
        
        const row = maze.length ;
        const col = maze[0].length ;
        let res = [];
        util(0,0,"");
        return res.sort() ;
        
    }
}


// =============================================================================14. Word Break =================================================================================================
/**
Leetcode : https://leetcode.com/problems/word-break/ 
Time Complexity : O (N^3) . 
 */
var wordBreak = function(s, wordDict) {
   
    const util = (i ) =>{
        if(i >= len) return true ;

        if(dp[s.slice(i , len)] != undefined) return dp[s.slice(i , len)] ;

        let k = i ;
        for( ; k < len ; k++){

            const leftPart = s.slice(i , k+1) ;
            const secondPart = s.slice(k+1);
            if( obj[leftPart] == true ){
                const res = util(k+1 , s) ;
                dp[secondPart] = res ;
                if(res) return true ;
            }

        }

        if(k>=len) return false ;

    }

    // To Overcome from TLE , little optimization
    let obj = {};
    let dp = {};
    const len = s.length ;
    wordDict.forEach((e)=>obj[e]=true);
    return util(0,s)

};


// =====================================================================15. M Coloring Graph ==================================================================================================
// GFG : https://www.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1
// User function Template for javascript
// Time Complexity: O( N^M) (n raised to m)
// Space Complexity: O(N)
// You are given an undirected graph consisting of V vertices and E edges represented by a list edges[][], along with an integer m. Your task is to determine whether it is possible to color the graph using at most m different colors such that no two adjacent vertices share the same color. Return true if the graph can be colored with at most m colors, otherwise return false.

// Note: The graph is indexed with 0-based indexing.

// Examples:

// Input: V = 4, edges[][] = [[0, 1], [1, 3], [2, 3], [3, 0], [0, 2]], m = 3
// Output: true
// Explanation: It is possible to color the given graph using 3 colors, for example, one of the possible ways vertices can be colored as follows:

// Vertex 0: Color 1
// Vertex 1: Color 2
// Vertex 2: Color 2
// Vertex 3: Color 3
// Input: V = 3, edges[][] = [[0, 1], [1, 2], [0, 2]], m = 2
// Output: false
// Explanation: It is not possible to color the given graph using only 2 colors because vertices 0, 1, and 2 form a triangle.

class Solution {
    graphColoring(V, edges, m) {
        // code here
        
        let graph = Array.from({length : V} , ()=>[]) ;
        
        edges.forEach(([src,dest])=>{
            graph[src].push(dest);
            graph[dest].push(src);
        })
        
        let color = Array.from({length : m} , ()=>0);
        
        const isSafe = (node , clr)=>{
            
            // adjacent node
            const neighbours = graph[node] ;
            for(let i=0 ; i<neighbours.length ; i++){
                const nbr = neighbours[i];
                if(color[nbr] == clr){
                    return false ;
                } 
            }
            return true ;
        }
        
        const util = (node)=>{
            if(node >= V) return true ;
            
            for(let i=1 ; i<=m ; i++){
                if(isSafe(node , i)){
                    color[node] = i ;
                    if(util(node+1) == true){
                        return true ;
                    }
                    color[node] = 0 ;
                }
            }
            
            return false ;
        }
        
        return util(0);
        
    }
}


// ==============================================================================16. Sudoku Solver ====================================================================================================
/**
 Leetcode : https://leetcode.com/problems/sudoku-solver/
 Time Complexity: O(9^(n ^ 2)), in the worst case, for each cell in the n2 board, we have 9 possible numbers.
 Space Complexity: O(1), since we are refilling the given board itself, there is no extra space required, so constant space complexity.

 Just check every blank cell by putting number from 1 to 9 , and then then move to next cell . If any cell is unable to fit any value from 1 to 9 , then backtrack , and fill +1 or <=9 any suitable value in previous cell . 
 Before filling , check every time , is it safe number to fill , by checking current row and current column . We have to check current grid also , when you divide any row or col , it will give me current grid . After getting multiply
 with 3 to get first cell of current grid . In recursion check , if it is returning false from any cell , then only backtrack , if it is returning true , then just return true . 
 */
var solveSudoku = function(board) {
    
    const isSafe = (i , j , num)=>{

        // row traversal
        let k = 0 ;
        while(k<9){
            if(board[i][k] == num) return false ;
            if(board[k][j] == num) return false ;
            k++ ;
        }

        // 3 X 3 grid traversal

        const boxRow = 3 * Math.floor(i/3);
        const boxCol = 3 * Math.floor(j/3)

        for(let row =0 ; row < 3 ; row++){

            for(let col = 0; col < 3 ; col++){

                const rx = boxRow + row;
                const cx = boxCol + col;
                if (board[rx][cx] == num) return false;

            }
        }
        return true ;
    }

    const util = ( row , col )=>{

        for(let i = row ; i<9 ; i++){
            for( let j = (i === row ? col : 0); j < 9; j++ ){ // for same row , col will be col , but if row is changing then it should start from column 0
                if(board[i][j] == "."){
                    let n = 1
                    for( ; n <=9 ; n++){
                        if(  isSafe( i , j , `${n}` )){

                            let nextRow = i ; 
                            let nextCol = j+1 ;
                            if(nextCol==9){   // if control is at last column of row , then move to next row 
                                nextRow = i + 1 ;
                                nextCol = 0 ;
                            }

                            board[i][j] = `${n}` ;
                            const r = util( nextRow , nextCol );
                            if(r== true) return true ;
                            
                            board[i][j] = "." ; //backtrack
                            
                        }
                    }
                    
                    return false ;  // No Valid number found . Also can check , if n>9 then return false ;
                }
            }
        }
        return true ;
    }

    util(0 , 0);
    return board ;

};

// Easy Approach : Super Cool
var solveSudoku = function(board) {
    
    const isSafe = (i , j , num)=>{
        const boxRow = 3 * Math.floor(i/3);
        const boxCol = 3 * Math.floor(j/3)

        let k = 0 ;
        while(k<9){
            if(board[i][k] == num || board[k][j] == num) return false ;

            const rx = boxRow + Math.floor(k/3);
            const ry = boxCol + (k%3);
            if( board[rx][ry] == num ) return false 

            k++ ;
        }
        return true ;
    }

    const util = (  )=>{

        for(let i = 0 ; i<9 ; i++){
            for( let j = 0 ; j < 9; j++ ){ 
                if(board[i][j] == "."){
                    let n = 1
                    for( ; n <=9 ; n++){
                        if(  isSafe( i , j , `${n}` )){
                            board[i][j] = `${n}` ;
                            const r = util( );
                            if(r== true) return true ;
                            board[i][j] = "." ; 
                        }
                    }
                    return false ; 
                }
            }
        }
        return true ;
    }

    util();
    return board ;
};




