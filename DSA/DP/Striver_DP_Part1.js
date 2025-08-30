// ===============================================================1. Frog Jump ===================================================================================
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
