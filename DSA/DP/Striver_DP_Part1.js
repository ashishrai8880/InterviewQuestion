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

