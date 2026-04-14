
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











