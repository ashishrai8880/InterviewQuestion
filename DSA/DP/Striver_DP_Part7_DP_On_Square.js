
// ========================================== 1. Largest Rectangle Area in Histogram =======================================================
/**
GFG : https://www.geeksforgeeks.org/problems/maximum-rectangular-area-in-a-histogram-1587115620/1
Leetcode : https://leetcode.com/problems/largest-rectangle-in-histogram/

Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, 
return the area of the largest rectangle in the histogram.

Basically ek array de rakha hai jo ki height show kar raha hai , ab isme find karna hai ki largest rectange kaha se ban sakta 
hai , or us largest rectangle ka area kitna hoga . 

LOGIC : Easy hi hai , isme next smaller element nikal lo , and previous smaller element nikal lo . ( inka index nikalna hai ) . 
Ab next smaller and previous smaller k index ka difference hoga wo length of rectangle hoga . 
Or us index k element ka height (breadth of rectangle) hogi . Ab area nikal aayega . 
EDGE CASE : agar next smaller nahi hai to 'N' store karlo where N is length of array . 
Or Agar previous smaller nahi hai to '-1' store karlo 
length nikelega nse - pse - 1 ;
Easy hi hai bas length hai . NSE and PSE nikalene k liye stack ka use hoga . 
 */
class Solution {
    getMaxArea(arr) {
        // code here
        
        const _nse = ()=>{
            let stack = [] ;
            let res = Array.from({length : n} , ()=>n) ;
            stack.push( n-1 ) ;
            
            for(let i = n-1 ; i>=0 ; i--){
                const ele = arr[i] ;
                
                while( stack.length != 0 && ele <= arr[stack.at(-1)] ){
                    stack.pop() ;
                }
                
                res[i] = stack.length == 0 ? n : stack.at(-1) ;
                stack.push( i ) ;
            }
            
            return res ;
        }
        
        const _pse = ()=>{
            let stack = [] ;
            let res = Array.from({length : n} , ()=>-1) ;
            stack.push(0) ;
            
            for(let i = 0 ; i<n ; i++){
                const ele = arr[i] ;
                
                while(stack.length != 0 && ele<= arr[stack.at(-1)]){
                    stack.pop() ;
                }
                
                res[i] = stack.length == 0 ? -1 : stack.at(-1) ;
                stack.push(i) ;
            }
            
            return res ;
        }
        
        const n = arr.length ;
        
        const nse = _nse() ;
        const pse = _pse() ;
        
        // console.log({nse , pse})
        
        let res = 0 ;
        
        for(let i = 0 ; i<n ; i++){
            const ns = nse[i] ;
            const ps = pse[i] ;
            const len = ns-ps-1 ;
            const area = len * arr[i] ;
            res = Math.max(res , area) ;
        }
        return res ;
    }
}


// ========================================= 2. Maximum Rectangle ====================================================
// Leetcode : https://leetcode.com/problems/maximal-rectangle/description/
/**
Isme ek matrix de rakha hai 0 and 1 ka . Isme sabse largest rectangle batana hai 1's ka . 
Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 6
Explanation: The maximal rectangle is shown in the above picture.

Example 2:
Input: matrix = [["0"]]
Output: 0

Example 3:
Input: matrix = [["1"]]
Output: 1

Constraints:
rows == matrix.length
cols == matrix[i].length
1 <= rows, cols <= 200
matrix[i][j] is '0' or '1'.

LOGIC : Same hi hai uper wale question ki tarah , bas isme har ek row k liye largest rectangular area of histogram nikalna hai . 
Ek rowwise array lelo , jo sabse pehle first row store karega . Ab jab wo second row me jayega , to agar 1 hai , it means us bar
ki height badh jayegi . And agar element 0 hai , it means height reset karna hai (this is most important) . 

Time Complexity: O(N*(M+M)), where N = total no. of rows and M = total no. of columns.
Space Complexity: O(M), used for storing heights in array and stack.
 */
var maximalRectangle = function(matrix) {
    
    const _nse = (arr)=>{
        const n = arr.length ;
        let res = Array.from({length : n} , ()=>n) ; 
        let stack = [ ] ;

        for(let i=n-1 ; i>=0 ; i--){
            const ele = arr[i] ;

            while(stack.length != 0 && ele <= arr[stack.at(-1)]){
                stack.pop() ;
            }

            res[i] = stack.length == 0 ? n : stack.at(-1) ;
            stack.push(i) ;
        }
        return res ;
    }

    const _pse = (arr)=>{
        const n = arr.length ;
        let res = Array.from({length : n} , ()=>-1) ;
        let stack = [ ] ;

        for(let i = 0 ; i<n ; i++){
            const ele = arr[i] ;

            while(stack.length != 0 && ele <= arr[stack.at(-1)]){
                stack.pop() ;
            }

            res[i] = stack.length == 0 ? -1 : stack.at(-1) ;
            stack.push(i) ;
        }
        return res ;
    }

    const largestAreaInHistogram = (arr)=>{
        let res = 0 ;
        const nse = _nse(arr) ;
        const pse = _pse(arr) ;

        for(let i = 0 ; i<arr.length ; i++){
            const ns = nse[i] ;
            const ps = pse[i] ;
            const len = ns - ps - 1 ;
            const area = arr[i] * len ;
            res = Math.max(res , area) ;
        }

        return res ;
    }

    const col = matrix[0].length ;

    let rowwise = Array.from({length : col} , ()=>0) ;

    let res = 0 ;

    for(const row of matrix){

        for(let i = 0 ; i<col ; i++){
            if(row[i] == '1'){
                rowwise[i] = rowwise[i] + 1 ;
            }
            else{
                rowwise[i] = 0 ;
            }
        }
        const maxArea = largestAreaInHistogram(rowwise) ;
        res = Math.max(res , maxArea) ;
    }
    return res ;
};


// =============================================== 3. Count Square Submatrix with all one's =======================================
// Leetcode : https://leetcode.com/problems/count-square-submatrices-with-all-ones/description/
/**
Bahot hi jayada easy hai . Isme ek matrix de rakha hai , 0 and 1 ka . Ab batana hai 1's ko leke kitne square ban rhe hai . 
Brute force kaafi lengthy hai , iska ek easy way tabulation se hai . 

Given a m * n matrix of ones and zeros, return how many square submatrices have all ones.

Example 1:
Input: matrix =
[
  [0,1,1,1],
  [1,1,1,1],
  [0,1,1,1]
]
Output: 15
Explanation: 
There are 10 squares of side 1.
There are 4 squares of side 2.
There is  1 square of side 3.
Total number of squares = 10 + 4 + 1 = 15.

Example 2:
Input: matrix = 
[
  [1,0,1],
  [1,1,0],
  [1,1,0]
]
Output: 7
Explanation: 
There are 6 squares of side 1.  
There is 1 square of side 2. 
Total number of squares = 6 + 1 = 7.
 
Constraints:
1 <= arr.length <= 300
1 <= arr[0].length <= 300
0 <= arr[i][j] <= 1

LOGIC : Bas ek hi logic hai , ek dp matrix bana lo , or first row and first column , jaha jaha matrix me 1 hai waha 1 store karwa do .
Ab logic ye hai kisi bhi cell jaha pe 1 hai , waha se kitne square ban sakte hai , ek to wo cell khud ek square bana dega . 
Ab uske uper , left me and diagonal cell me jo bhi minimum hai , usme bas +1 kar dene ka . 
Ab minimum hi kyu lia , thoda sa socho diagram banao jab samjh ayega . Agar in tino side me se koi 1 bhi 0 hai to square nahi ban
payega us particular cell se , isiliye minimum liya . Or agar 1 bhi zero nahi hai , lekin jo sabse kam hai wahi to support karega na. 
Thoda Thoda sochne ka jabhi samajh aayega . 
 */
var countSquares = function(matrix) {
    
    const row = matrix.length ;
    const col = matrix[0].length ;

    let dp = Array.from({length : row} , ()=>{
        return Array.from({length : col} , ()=>0) ;
    })

    for(let i = 0 ; i<row ; i++){
        if(matrix[i][0] == 1){
            dp[i][0] = 1 ;
        }
    }

    for(let i=0 ; i<col ; i++){
        if(matrix[0][i] == 1){
            dp[0][i] = 1 ;
        }
    }

    for(let i = 1 ; i<row ; i++){
        for(let j = 1 ; j<col ; j++){
            if(matrix[i][j] == 1){
                dp[i][j] = 1 + Math.min( dp[i][j-1] , dp[i-1][j-1] , dp[i-1][j] ) ;
            }
        }
    }

    let res = 0 ;
    for(let i = 0 ; i<row ; i++){
        for(let j = 0 ; j<col ; j++){
            res = res + dp[i][j] ;
        }
    }

    return res ;
};






