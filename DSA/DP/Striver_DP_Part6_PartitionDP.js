
// ========================================== 1. Matrix Chain Multiplication ==================================================
/*
GFG : https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1
Given an array arr[] which represents the dimensions of a sequence of matrices where the ith matrix has the dimensions
(arr[i-1] x arr[i]) for i>=1, find the most efficient way to multiply these matrices together. The efficient way is the
one that involves the least number of multiplications.

Examples:
Input: arr[] = [2, 1, 3, 4]
Output: 20
Explanation: There are 3 matrices of dimensions 2 × 1, 1 × 3, and 3 × 4, Let this 3 input matrices be M1, M2, and M3. 
There are two ways to multiply: ((M1 x M2) x M3) and (M1 x (M2 x M3)), note that the result of (M1 x M2) is a 2 x 3 matrix 
and result of (M2 x M3) is a 1 x 4 matrix. 
((M1 x M2) x M3)  requires (2 x 1 x 3) + (2 x 3 x 4) = 30 
(M1 x (M2 x M3))  requires (1 x 3 x 4) + (2 x 1 x 4) = 20. 
The minimum of these two is 20.

Input: arr[] = [1, 2, 3, 4, 3]
Output: 30
Explanation: There are 4 matrices of dimensions 1 × 2, 2 × 3, 3 × 4, 4 × 3. Let this 4 input matrices be M1, M2, M3 and M4. 
The minimum number of multiplications are obtained by ((M1 x M2) x M3) x M4). The minimum number is (1 x 2 x 3) + (1 x 3 x 4) + (1 x 4 x 3) = 30.

Input: arr[] = [3, 4]
Output: 0
Explanation: As there is only one matrix so, there is no cost of multiplication.
Constraints: 
2 ≤ arr.size() ≤ 100
1 ≤ arr[i] ≤ 200

LOGIC : This is basic pattern of PartitionDP Pattern . Are Aasaan hi hai jayada kuch nahi hai . 
Jis bhi problem me lage ki problem 2 part me divide ho rha hai , or uske parts again divide ho rhe or contribute kar rhe udhar 
PartitionDP lagega . 
Uper problem me 3 cheez samjhne ki hai . Pehle array ko divide krte chalo , func(i , j) where i means start of array and j 
means end of array . 

1. arr[i-1] * arr[k] * arr[j] -> iska matlab agar array [1,2,3,4,5] hai and i = 1 and k =2 and j = 4 pe hai , to matrix divide hua
(1,2,3) (4,5) . Matrix (A X B ) X ( C X D ) . Ab agar AB nikelega and CD nikelega to resultant matrix hoga (1 X 3) and CD ( 3 X 5 )
to dono ka multiplication operation hoga 1 X 3 X 5 . to i-1 = 1 and k = 3 and j = 5 . Matlab Matlab ye ek formulae ki tarah ban 
gya . Baanki partition ka result kya hoga usko nahi sochna wo bas recursion se aayega . 
Easy hi hai , jayada mushkil nahi hai . 

Without DP TC
Time Complexity: O(2^n). This is because we try every possible parenthesization, which leads to exponential recursion.
Space Complexity: O(n). This comes from the recursion call stack depth in the worst case.

With DP
Time Complexity: O(n^3). There are O(n^2) subproblems (for each i, j), and for each we try O(n) partitions.
Space Complexity: O(n^2). We use a 2D dp table of size n x n, plus recursion stack O(n).

**/
class Solution {
    
    matrixMultiplication(arr) {
      
        const n = arr.length ;
        
        const util = (i , j)=>{
            if(i == j) return 0 ;
            
            if(dp[i][j] != -1 ) {
                return dp[i][j]
            }
            
            let min = Infinity ;
            
            for(let k=i ; k<j ; k++){
                const leftSideCost = util(i,k) ;
                const rightSideCode = util(k+1 , j) ;
                const bothHalfMultiplyCost = arr[i-1] * arr[k] * arr[j] ;
                const totalCost = leftSideCost + rightSideCode + bothHalfMultiplyCost ;
                min = Math.min(min , totalCost ) ;
                dp[i][j] = Math.min(min , totalCost)
            }
            
            return dp[i][j] = min ;
        }
        
        let dp = Array.from({length : n+1} , ()=>{
            return Array.from({length : n+1 , } , ()=>-1 )
        })
        
        return util(1 , n-1) ;   
    }
}


// =================================== 2. Minimum Cost to cut the stick ====================================================
/**
Leetcode : https://leetcode.com/problems/minimum-cost-to-cut-a-stick/
Problem me 1 'n' de rakha hai jo represent krega stick ki length and ek array de rakha hai , jo represent krta hai kis point 
se cut laga sakte hai . 
Ab Jaise 7 length ki stick hai or cut '3' pe laga dia to 2 stick banega ek len 3 ka or dusra len 4 ka . To kahi bhi cut lagta hai
cost aayegi total length of remaning stick . 
Ab jo array me element de rakha hai , to hume minimum cost late hue , sabhi jagah cut lagana hai . Jo array k element hai 
wo yahi represent krte hai ki kis point pe cut lagana hai . Watch leetcode example once . 

Ab cut array k starting me 0 add kardo and iske end me n add kardo . Aaisa isliye kara kyuki agar cut hua pehle to pta chale
ki cost kya hai . Waise pehle cut me humesha total length of stick ki cost aayegi . 
Isme PartitionDP ka concept lagega . Har case check karna hai . 

Without DP : 
Time Complexity: O(2^C), as we try all possible cuts between the current boundary, the time complexity is exponential.
Space Complexity: O(C), additional space used for recursive stack.

With DP : 
Time Complexity: O(C^3), for every state in our dp table i.e. c^2 states, we try all possible cuts between i and j.
Space Complexity: O(C^2), additional space used for dp array and recursion stack.

 * @param {number} n
 * @param {number[]} cuts
 * @return {number}
 */
var minCost = function(n, cuts) {
    
    cuts.sort((a, b) => a - b);

    const util = ( i , j)=>{
        if(i>j) return 0 ;

        if(dp[i][j] != -1) return dp[i][j] ;

        let min = Infinity ;

        for(let k = i ; k<=j ; k++){

            const currCost = cuts[j+1] - cuts[i-1] ;
            const leftHalf = util(i , k-1) ;
            const rightHalf = util(k+1 , j) ;
            const cost = currCost + leftHalf + rightHalf ;
            min = Math.min(min , cost) ;

        }

        return dp[i][j] = min ;
    }

    cuts.unshift(0) ;
    cuts.push(n) ;
    const len = cuts.length ;

    let dp = Array.from({length : len } , ()=>{
        return Array.from({length : len} , ()=>-1);
    })

    return util(1 , cuts.length-2);
};


// =============================================== 3. Burst Balloons ======================================================
/**
Leetcode : https://leetcode.com/problems/burst-balloons/description/

You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums.
You are asked to burst all the balloons.

If you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out
of bounds of the array, then treat it as if there is a balloon with a 1 painted on it.

Return the maximum coins you can collect by bursting the balloons wisely.

Time and Space Complexity Same as above . 

Example 1:
Input: nums = [3,1,5,8]
Output: 167
Explanation:
nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []
coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167

Example 2:
Input: nums = [1,5]
Output: 10
 
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function(arr) {
    
    const util = ( i , j)=>{
        if(i>j) return 0 ;

        if(dp[i][j] != -1) return dp[i][j] ;

        let max = -Infinity ;

        for(let k = i ; k<=j ; k++){
            const currScore = arr[i-1] * arr[k] * arr[j+1] ;
            const leftPart = util(i , k-1) ;
            const rightPart = util(k+1 , j) ;
            const score = currScore + leftPart + rightPart ;
            max = Math.max(max , score ) ;
        }

        return dp[i][j] = max ;
    }

    arr = [1 , ...arr , 1] ;
    const n = arr.length ; 

    const dp = Array.from({length : n} , ()=>{
        return Array.from({length : n} , ()=>-1)
    })

    return util(1 , n-2) ;

};


// ========================================== 4. Parsing a Boolean Expression ===============================================
/**
Leetcode : https://leetcode.com/problems/parsing-a-boolean-expression/
Are isme bas ek string de rakha hai like : "&(|(f))"  . Ab isme 3 operator ho sakte hai (& , * , | , ^ etc ) . 
 Pure String ko evaluate karna . 

A boolean expression is an expression that evaluates to either true or false. It can be in one of the following shapes:

't' that evaluates to true.
'f' that evaluates to false.
'!(subExpr)' that evaluates to the logical NOT of the inner expression subExpr.
'&(subExpr1, subExpr2, ..., subExprn)' that evaluates to the logical AND of the inner expressions subExpr1, subExpr2, ..., subExprn where n >= 1.
'|(subExpr1, subExpr2, ..., subExprn)' that evaluates to the logical OR of the inner expressions subExpr1, subExpr2, ..., subExprn where n >= 1.
Given a string expression that represents a boolean expression, return the evaluation of that expression.

It is guaranteed that the given expression is valid and follows the given rules . He is from Java role and I was asked . 

Example 1:
Input: expression = "&(|(f))"
Output: false
Explanation: 
First, evaluate |(f) --> f. The expression is now "&(f)".
Then, evaluate &(f) --> f. The expression is now "f".
Finally, return false.

Example 2:
Input: expression = "|(f,f,f,t)"
Output: true
Explanation: The evaluation of (false OR false OR false OR true) is true.

Example 3:
Input: expression = "!(&(f,t))"
Output: true
Explanation: 
First, evaluate &(f,t) --> (false AND true) --> false --> f. The expression is now "!(f)".
Then, evaluate !(f) --> NOT false --> true. We return true.
 
 * @param {string} expression
 * @return {boolean}
 */
var parseBoolExpr = function(exp) {
    
    let stack = [] ;

    for(const ch of exp){

        if(ch == '(' || ch == ',') continue ;

        else if(ch == '|' || ch == '&' || ch == '!' || ch == 't' || ch == 'f' ){
            stack.push(ch) ;
        }

        else{
            let t = 0 ; let f = 0 ; 
            while( stack.at(-1) !== '|' && stack.at(-1) !== '&' && stack.at(-1) !== '!'  ){
                const c = stack.pop() ;
                if( c == 't') t++ ;
                else f++ ;
            }
            
            const op = stack.pop() ;
            let res = "" ;
            if(op == '|'){
                res = t >= 1 ? 't' : 'f' ;
            }
            else if(op == '&'){
                res = f >= 1 ? 'f' : 't' ;
            }
            else {
                res = t > 0 ? 'f' : 't' ;
            }

            stack.push(res) ;
        }
    }

    const n = exp.length ;

    return stack.pop() == 't' ; 
};







