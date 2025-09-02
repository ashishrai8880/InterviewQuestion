// ===============================================================1. Frog Jump ==============================================================================================
// GFG : https://www.geeksforgeeks.org/problems/geek-jump/1
/*
Time Complexity: O(N)
Reason: The overlapping subproblems will return the answer in constant time O(1). Therefore the total number of new subproblems we solve is ‘n’. Hence total time complexity is O(N).

Space Complexity: O(N)
Reason: We are using a recursion stack space(O(N)) and an array (again O(N)). Therefore total space complexity will be O(N) + O(N) ≈ O(N)
*/
class Solution {
    minCost(height) {
        // code here
        
        const util = (n )=>{
            
            if(n >= len-1){
                return 0;
            }
            
            if(dp[n] != -1) return dp[n];
            
            const oneStep = util(n+1) + Math.abs( height[n+1]-height[n] ) ;
          
            let twoStep = Infinity ;
            if(n+2 <= len-1){
                twoStep = util(n+2) + Math.abs( height[n+2]-height[n] ) ;  ;
            }
            
            return dp[n] = Math.min(oneStep , twoStep) ;
       
        }
        
        let len = height.length ;
        let dp = Array.from({length : len+1},()=>-1);
        return util(0);
        
    }

    // Tabulation 
  minCostTabulation(height) {
        
        let len = height.length ;
        let dp = Array.from({length : len+1},()=>-1);
        dp[0] = 0 ;
  
        for(let i=1 ; i<len ; i++){
            const oneStep = dp[i-1] + Math.abs(height[i]-height[i-1]);
            let twoStep = Infinity;
            if(i>=2){
                twoStep = dp[i-2] + Math.abs(height[i] - height[i-2]);
            }
            dp[i] = Math.min(oneStep , twoStep);
        }
        return dp[len-1];
    }

  minCostTabulationSpaceOptimized(height) {
        
        let len = height.length ;
        let prev1 = 0 ;
        let prev2 = 0 ;
        for(let i=1 ; i<len ; i++){
            const oneStep = prev1 + Math.abs(height[i]-height[i-1]);
            let twoStep = Infinity;
            if(i>=2){
                twoStep = prev2 + Math.abs(height[i] - height[i-2]);
            }
            prev2 = prev1 ;
            prev1 = Math.min(oneStep , twoStep);
            
        }
        return prev1;
    }
}


// ===============================================================2. Frog Jump With K Steps==============================================================================================
/*
Problem Statement:  Frog Jump with K Distance/ Learn to write 1D DP
Problem Statement:
This is a follow-up question to “Frog Jump” discussed in the previous article. In the previous question, the frog was allowed to jump either one or two steps at a time.
In this question, the frog is allowed to jump up to ‘K’ steps at a time. If K=4, the frog can jump 1,2,3, or 4 steps at every index.

Time Complexity: O(N *K)
Reason: The overlapping subproblems will return the answer in constant time. Therefore the total number of new subproblems we solve is ‘n’. At every new subproblem,
we are running another loop for K times. Hence total time complexity is O(N * K).

Space Complexity: O(N)
Reason: We are using a recursion stack space(O(N)) and an array (again O(N)). Therefore total space complexity will be O(N) + O(N) ≈ O(N)
*/

function solveUtil(ind, height, dp, k) {
  if (ind === 0) return 0;
  if (dp[ind] !== -1) return dp[ind];

  let mmSteps = Infinity;

  for (let j = 1; j <= k; j++) {
    if (ind - j >= 0) {
      const jump =
        solveUtil(ind - j, height, dp, k) + Math.abs(height[ind] - height[ind - j]);
      mmSteps = Math.min(jump, mmSteps);
    }
  }

  dp[ind] = mmSteps;
  return dp[ind];
}

function solve(n, height, k) {
  const dp = Array(n).fill(-1); 
  return solveUtil(n - 1, height, dp, k); 
}

const height = [30, 10, 60, 10, 60, 50];
const n = height.length;
const k = 2;
const dp = Array(n).fill(-1); 
console.log(solve(n, height, k)); 


// Tabulation Approach
function solveUtilTabulation(n, height, dp, k) {
  dp[0] = 0;

  // Loop through the height array from index 1 to n-1
  for (let i = 1; i < n; i++) {
    let mmSteps = Infinity;

    // Loop through the last k elements (backward jumps)
    for (let j = 1; j <= k; j++) {
      // Check if it's possible to jump to the previous element
      if (i - j >= 0) {
        // Calculate the cost of the jump and update mmSteps with the minimum cost
        const jump = dp[i - j] + Math.abs(height[i] - height[i - j]);
        mmSteps = Math.min(jump, mmSteps);
      }
    }

    dp[i] = mmSteps;
  }

  return dp[n - 1];
}

function solveTabulation(n, height, k) {
  const dp = new Array(n).fill(-1);
  return solveUtil(n, height, dp, k);
}

// Main function
function main() {
  const height = [30, 10, 60, 10, 60, 50];
  const n = height.length;
  const k = 2;
  const dp = new Array(n).fill(-1);
  console.log(solve(n, height, k));
}


// ===============================================================3. House Robber ( Sum of non adjacent element ) ==========================================================
/**
Leetcode : https://leetcode.com/problems/house-robber/ 
Time Comlexity : Without Memoization : O(2^n) , SC : O (n) .

Time Complexity: O(N)
Reason: The overlapping subproblems will return the answer in constant time O(1). Therefore the total number of new subproblems we solve is ‘n’. Hence total time complexity is O(N).

Space Complexity: O(N)
Reason: We are using a recursion stack space(O(N)) and an array (again O(N)). Therefore total space complexity will be O(N) + O(N) ≈ O(N)
 */
var rob = function(nums) {
    
    const util = (i )=>{
        if(i >= len) return 0 ;

        if(dp[i]!= -1) return dp[i];

        const pick = nums[i] + util(i+2);
        const notPick = util(i+1);

        return dp[i] = Math.max(pick , notPick) ;
        
    }

    const len = nums.length ;
    let dp = Array.from({length : len},()=>-1);
    return util(0 );
};

// Tabulation
var robTabulation = function(arr) {
    const len = arr.length ;
    let dp = Array.from({length : len},()=>-1);
    dp[0] = arr[0] ;
    
    for(let i=1 ; i<len ; i++){
        
        let pick = arr[i];
        if(i>=2){
            pick = pick + dp[i-2];
        }
        
        const notPick = dp[i-1];
        
        dp[i] = Math.max(pick , notPick);
        
    }
    return dp[len-1];
};

// Tabulation + Space Optimization . O(1) SC .
var robTabulation = function(arr) {
    
    const len = arr.length ;
    let prev1 = arr[0];
    let prev2 = 0;
    
    for(let i=1 ; i<len ; i++){
    
        let pick = arr[i];
        if(i>=2){
            pick = pick + prev2;
        }
        
        const notPick = prev1;
        
        prev2 = prev1 ;
        prev1 = Math.max(pick , notPick);
    }
    return prev1;
};


// ==========================================================4. House Robber 2 ==============================================================================

/**
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. 
That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if
two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.
 */
var rob = function(nums) {
    
    const util = (i , arr)=>{

        if(i >= arr.length) return 0 ;

        if(dp[i] != -1) return dp[i];

        const pick = arr[i] + util(i+2 , arr);
        const notPick = util(i+1 , arr);

        return dp[i] = Math.max(pick , notPick);

    }

    const len = nums.length ;
    if(len==1) return nums[0];
    let dp = Array.from({length : len},()=>-1);
    
    const leaveFirst = util(0 , nums.slice(1) );
    dp.fill(-1);
    const leaveLast = util(0 , nums.slice(0 , len-1));
    return Math.max(leaveFirst , leaveLast) ;

};


// ====================================================================== 5. Ninja Training ================================================================================
/*
Geek is going for a training program for n days. He can perform any of these activities: Running, Fighting, and Learning Practice. Each activity has some point on each day. As Geek wants to improve all his skills, he can't do the same
activity on two consecutive days. Given a 2D array arr[][] of size n where arr[i][0], arr[i][1], and arr[i][2] represent the merit points for Running, Fighting, and Learning on the i-th day, determine the maximum total merit points Geek can achieve .

Example:
Input: arr[]= [[1, 2, 5], [3, 1, 1], [3, 3, 3]]
Output: 11
Explanation: Geek will learn a new move and earn 5 point then on second day he will do running and earn 3 point and on third day he will do fighting and earn 3 points so, maximum merit point will be 11.

Input: arr[]= [[1, 1, 1], [2, 2, 2], [3, 3, 3]]
Output: 6
Explanation: Geek can perform any activity each day while adhering to the constraints, in order to maximize his total merit points as 6.
*/

class Solution {
    // Function to find the maximum points among all the possible ones.
    maximumPoints(arr) {
        // your code here
        const len = arr.length ;
        if(len == 1){
            return Math.max(arr[0][0] , Math.max(arr[0][1] , arr[0][2 ])  )
        }
        
        const util = (row , prev )=>{
            
            if(dp[row][prev] !== -1) return dp[row][prev] ;
            
            if(row == arr.length-1 ){
                let max = -Infinity ;
                arr[len-1].forEach((e , i)=>{
                    if(i != prev){
                        max = Math.max(e , max);
                    }
                })
                
                return max ;
            }
            
            
            
            
            let max = -Infinity ;
            
            for(let i=0 ; i< 3 ;i++){
                if(i != prev){
                    let res = arr[row][i] + util(row+1 , i);
                    
                    max = Math.max(max , res);
                }
            }
            dp[row][prev] = max ;
            return max ;
            
        }
        
        let dp = Array.from({length : len+1} , ()=>{
            return Array.from({length : 4},()=>-1)
        })
        return util(0 , 3);
        
    }
}


// ===============================================================6. Count Unique Path ===========================================================================
/**
Leetcode : https://leetcode.com/problems/unique-paths/ 
Time Complexity : Without DP : 2 ^ (m*n)  . Space Complexity : O(m+n) + recursion stack . 
Time Complexity: O(M*N) : With DP
Reason: At max, there will be M*N calls of recursion.
Space Complexity: O((N-1)+(M-1)) + O(M*N) Reason: We are using a recursion stack space: O((N-1)+(M-1)), here (N-1)+(M-1) is the path length and an external DP Array of size ‘M*N’.

There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). 
The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.
The test cases are generated so that the answer will be less than or equal to 2 * 109.

Example 2:
Input: m = 3, n = 2
Output: 3
Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
 */
var uniquePaths = function(m, n) {

    const util = (i , j)=>{

            if(i==m || j == n) {
                return 1 ;
            };
            
            if(i>m || j>n) return 0 ;
            
            if(dp[i][j] != -1) return dp[i][j] ;
    
            const right = util(i , j+1 )  ;
            const down = util(i+1 , j) ;
            
    
            return dp[i][j] = ( right + down )
        }
    
    
        let dp = Array.from({length : m+1} , ()=>{
            return Array.from({length : n+1} , ()=>-1)
        })
        
        return util(1,1)  ;

};


// ======================================================================== 7. Count Unique Path 2 =============================================================================
/**
You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at 
any point in time.
An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.
Return the number of possible unique paths that the robot can take to reach the bottom-right corner.
The testcases are generated so that the answer will be less than or equal to 2 * 109.
 */
var uniquePathsWithObstacles = function(grid) {
    
    const util = (i , j)=>{

        if(i==row-1 && j==col-1) {
            if(grid[i][j] == 0) return 1 ;
            return 0 ;
        };

        if(i >= row || j>= col || i<0 || j<0 || grid[i][j] ==1) return 0 ;

        if(dp[i][j] != -1) return dp[i][j];

        const right = util(i,j+1);
        const down = util(i+1 , j);

        return dp[i][j] = right + down ;

    }

    const row = grid.length ;
    const col = grid[0].length ;
    let dp = Array.from({length : row+1},()=>{
        return Array.from({length : col+1} , ()=>-1)
    })

    return util(0 , 0);

};


// ========================================================================== 8. Minimum Path Sum ==============================================================================
/**
Leetcode : https://leetcode.com/problems/minimum-path-sum/
Time Complexity: O(N*M) Reason: At max, there will be N*M calls of recursion.
Space Complexity: O((M-1)+(N-1)) + O(N*M) Reason: We are using a recursion stack space: O((M-1)+(N-1)), here (M-1)+(N-1) is the path length and an external DP Array of size ‘N*M’.

Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.
Note: You can only move either down or right at any point in time.

Example 1:
Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.

Example 2:
Input: grid = [[1,2,3],[4,5,6]]
Output: 12
 */
var minPathSum = function(grid) {
    
    const util = (i,j)=>{

        if(i == row-1 && j == col-1){
            return grid[i][j];
        }

        if( i>=row ||  j>=col ) return Infinity ;

        if(dp[i][j] != -1) return dp[i][j];

        const right = grid[i][j] + util(i , j+1);
        const down = grid[i][j] + util(i+1 , j);
        
        return dp[i][j] = Math.min(right , down);
    }

    const row = grid.length ;
    const col = grid[0].length ;
    let dp  = Array.from({length : row+1},()=>{
        return Array.from({length : col+1},()=>-1)
    })

    return util(0,0);

};












