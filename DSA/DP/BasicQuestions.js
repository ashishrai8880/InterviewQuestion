 // ========================================================================== 1. Find Factorial of a Number ==========================================================================================================
/* 
  if n is a number , then it can be breaken down into n * factorial(n-1) . 
*/
class Solution {
    factorial(n) {
        if(n == 0 || n ==1){
            return 1;
        }
        return n * this.factorial(n-1);
    }
}

// ========================================================================== 2. Sum of array ==========================================================================================================
/* 
  Base condition would be if n ==0 then return that number . Express like arr[n] + arr[n-1] ;
*/
class Solution {
    arraySum(arr) {
        const sumUtil =(n)=>{
            if(n==0){
                return arr[0];
            }
            return arr[n] + sumUtil(n-1)
        }
        return sumUtil(arr.length-1);
    }
}

// =============================================================3. Power of a Number ==============================================================================
// Leetcode : https://leetcode.com/problems/powx-n/
// Brute force Recursion . It can be little bit optimized by just by modulos by Infinity for a large number .
class Solution {
   power(n , pow)   {
        if(pow == 0){
            return 1 ;
        }
        return n * power(n , pow-1);
    }   
}

// Optimized way , 2^8 will be 2^4 * 2 ^ 4 =>  16*16 = 256 which is 2^8 . So instead of callig stack for every number , just reduced it half , and then call it , multiply 
// answer with answer if power is even , if power is odd then multiply answer with answer with single n also . 
class Solution {
   power(n , pow)   {
      if(pow == 0){
           return 1 ;
       }
       
       if(pow % 2 == 0){
           const ans = power(n , pow/2);
           return ans * ans ;
       }
       else{
           const ans = power(n , (pow-1)/2);
           return ans * ans * n ;
       }
    
	       return x * power( x , n-1 );
   }
}

// If power is in negative number and x can also be in negative . My Sollution . 
var myPow = function(x, p) {

    const powUtil = (x , n) => {
        if(n==0){
            return 1 ;
        }
        if(n == 1){
            return x;
        }
        if(n%2 ==0){
            const r = powUtil(x , n/2);
            return r * r ;
        }
        else{
            const r = powUtil(x , Math.floor((n-1)/2)) ;
            return r*r*x ;
        }
    }
    const n = Math.abs(p);
    const res = powUtil(x , n)
    return p >= 0 ? res : 1/res ;
};

// Shortest code 
var myPow = function(x, n, base) {
    if (n === 0) return 1;
    if (n < 0) return 1 / myPow(x, -n);
    if (n % 2 === 0) return myPow(x * x, n / 2);
    return x * myPow(x, n - 1);
};


// =============================================================4. Print 1 to n using recursion ====================================================================
// GFG : https://www.geeksforgeeks.org/problems/print-1-to-n-without-using-loops-1587115620/1&selectedLang=python3
printNos(n) {
        let arr = [];
        const printUtil = (a) => {
            if(a==0){
                return ;
            }
            printUtil(a-1);
            arr.push(a);
        }
        printUtil(n);
        console.log(arr.join(' '));
    }

// ========================================================5. Print reverse of string using recursion ===============================================================
// GFG : https://www.geeksforgeeks.org/problems/reverse-a-string/1 . 
// Logice : 'Geeks' -> reverse('eeks') + 'G' ->  reverse('eks') + 'e'  -> reverse('ks') + 'e'  ->  reverse('k') + 's'  ->  reverse('s') + '' ;
class Solution {
    reverseString(s) {
        if(s.length == 0){
            return s ;
        }
        return this.reverseString(s.slice(1)) + s[0];
    }
}

// When there is array , Problem statement at : Leetcode : https://leetcode.com/problems/reverse-string/
var reverseString = function(s) {
    const reverseUtil = (i , j)=>{
        if(i >= j){
            return ;
        }
        [s[i] , s[j]] = [s[j],s[i]];
        reverseUtil(i+1 , j-1);
    }
    reverseUtil(0 , s.length-1 );
};


// ===============================================================6. Largest Element in an array ==================================================================

largest(arr) {
	const largestUtil = (n)=>{
		if(n == 1) return arr[0];
		return Math.max( largestUtil(n-1) , arr[n-1]  )
	}
	return largestUtil(arr.length)
}


// ==============================================================7. Nth Fibonacci Number ============================================================================
// Leetcode : https://leetcode.com/problems/fibonacci-number/
var fib = function(num) {
    let dp =  Array.from({length : num}, ()=>null);
    const fibUtil = (n)=>{
        if(n <=1){
            dp[n] = n ;
            return n ;
        }
        if( dp[n] != null){
            return dp[n];
        }
        dp[n] = fibUtil(n-1)  + fibUtil(n-2)  ;
        return dp[n];
    }
    return fibUtil(num);
};

//=========================================================8. Delete Middle element of stack ===========================================================================
// GFG : https://www.geeksforgeeks.org/problems/delete-middle-element-of-a-stack/1
class Solution {

    deleteMid(s) {
        let mid = Math.ceil((s.length)/2) ;
        
        const deleteUtil = (i)=>{
            if( i+1 == mid){
                s.pop();
                return ;
            }
            let top = s.pop();
            deleteUtil(i-1);
            s.push(top);
        }
        deleteUtil(s.length-1);
        return s; 
    }
}

//================================================================9. Tower of Hanoi ===========================================================================
// GFG : https://www.geeksforgeeks.org/problems/tower-of-hanoi-1587115621/1
// Logic : Its formulae is 2^n - 1 . It is breaking down into small problem . 
towerOfHanoi(n, from, to, aux) {
        let count = 0 ;
        const toi = (num , source , target , helper)=>{
            if(num == 1 ){
                count = count + 1 ;
                return  ;
            }
            toi(num-1 , source , helper , target )
            count = count + 1 ;
            toi(num-1 , helper , target , source)
        }

        toi(n , from , to , aux);
        return count ;  
}

// More clear and optimized code 
towerOfHanoi(n, from, to, aux) {
        let count = 0 ;
        const toi = (num , source , target , helper)=>{
            if(num > 0 ){
                toi(num-1 , source , helper , target )
	            count = count + 1 ;
	            toi(num-1 , helper , target , source)
            }
        }

        toi(n , from , to , aux);
        return count ;  
}


// ==============================================================10. Climbing Stairs ================================================================================
// Leetcode  :  https://leetcode.com/problems/climbing-stairs/  . TC - O(n)  ans space complexity is also linear O(n)
var climbStairs = function(num) {
    let dp = Array.from({length : num},()=>null);
    const util = (n) => {
        if(n<=2){
            dp[n] = n ;
            return n ;
        }
        if(dp[n] != null){
            return dp[n];
        }
        return dp[n] = util(n-1) + util(n-2);
    }
    return util(num);
};

// Optimized way where space complexity would be O(1) and TC - O(n)
function countWays(n) {
    const dp = new Array(n + 1).fill(0);
    // Base cases
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= n; i++)
        dp[i] = dp[i - 1] + dp[i - 2]; 
  
    return dp[n];
}

// We just need last 2 count , so we can remove dp array too by just maintain last 2 variable . This problem is like fibonacci sequence , but in this fib(0) is 1 instead of 0.
function countWays(n) {
    // Base cases
    let prev1 = 1;  // for 0
    let prev2 = 1;   // for 1

    for (let i = 2; i <= n; i++){
		const t = prev1 + prev2;
		prev2 = prev1 ;
		prev1 = t ;	
	}

	return prev1 ;
}


// =====================================================================11. Stock Buy Sell ============================================================================
// Very Brute force
class Solution {
	// Brute force 
    maximumProfit(prices) {
        
        const len = prices.length ;
        let right = Array.from({length : len+1},()=>0);
        
        for(let i = len-1 ; i>=0 ; i-- ){
            right[i] = Math.max(prices[i] , right[i+1]) ;
        }
        
        let ans = -Infinity ;
        
        for(let i = 0 ; i<len ; i++){
            ans = Math.max(right[i]-prices[i] , ans);
        }
        return ans ;
    }
// By 2 Pointer
	maximumProfitBy2Pointer(prices) {
        const len = prices.length ;
        let ans = -Infinity ;
        let i = 0 ;
        let j = 0 ;
        
        while(j < len){
            if(prices[j] < prices[i]){
                i = j ;
            }
            ans = Math.max(ans , prices[j] - prices[i]);
            j++ ;
        }
        return ans ;
    }
// By Recursion
	maximumProfitByRecursion(arr) {
        const len = arr.length ;
        let ans = 0 ;
        
        const util = (n)=>{
            if(n == len-1){
                return arr[n];
            }
            const largest = util(n+1) ;
            ans = Math.max(ans , largest-arr[n]);
            return Math.max(largest , arr[n]);  
        }
        util(0)
        return ans ;
    }
}


// ============================================================12. Min Cost Climbing Stairs =========================================================================
// Leetcode : https://leetcode.com/problems/min-cost-climbing-stairs/description/  GFG : https://www.geeksforgeeks.org/problems/min-cost-climbing-stairs/1
class Solution {
	// Recursive Solution with DP
    minCostClimbingStairs(cost) {
        const len = cost.length ;
        let dp = Array.from({length: len+1},()=>null);
        
        const util = (n)=>{
            if(n ==1){
                return 0;
            }
            if(n == 2){
                return Math.min(cost[0] , cost[1]);
            }
            if(dp[n]!=null) return dp[n];
            
            dp[n] = Math.min(util(n-2)+cost[n-2] , util(n-1) + cost[n-1]);
            return dp[n];
        }
        
        return util(len);
    }

	// Iterative Solution 
	minCostClimbingStairsIterative(cost) {
        const len = cost.length ;
        let dp = Array.from({length : len} , ()=>0);
        
        dp[0] = cost[0];
        dp[1] = cost[1];
        
        for(let i=2 ; i<len ; i++){
            dp[i] = Math.min(dp[i-1] , dp[i-2]) + cost[i];
        }
        
        return Math.min(dp[len-1] , dp[len-2]);
    }

	minCostClimbingStairsOptimized(cost) {
        // Write your code here
        const len = cost.length ;
        
        let prev1 = cost[1];
        let prev2 = cost[0];
        
        for(let i=2 ; i<len ; i++){
            const t = Math.min(prev1 , prev2) + cost[i];
            prev2 = prev1 ;
            prev1 = t ;
        }
        
        return Math.min(prev1 , prev2);
    }
}

//======================================================================13. Divisor Game ===================================================================================
// Leetcode : https://leetcode.com/problems/divisor-game/   GFG : https://www.geeksforgeeks.org/problems/divisor-game-1664432414/1
class Solution {
    divisorGame(n) {
        if(n <= 1){
            return false ;
        }
        for(let i = 1 ; i<n ; i++){
            if(n%2 == 0){
                return !this.divisorGame(n-i);
            }
        }
        return false ;
    }

	// Optimized way . Just check whether n is even or odd . If n is even then Alice will win otherwise he will loose . Whoever got even number first will win .
	divisorGame(n) {
        return n%2 == 0 ;
    }
}


// =====================================================================14. Decode ways ==================================================================================
// Leetcode : https://leetcode.com/problems/decode-ways/     GFG : https://www.geeksforgeeks.org/problems/total-decoding-messages1235/1
// Logic : start from 0 location , if it is not 0 then send remaning substring to magical function . For 2 character , need to check whethere it is small than '27' . 
class Solution {
    countWays(digits) {
        const n = digits.length ;
        let dp = Array.from({length : n},()=>null);
        
        const util = (pos)=>{
            
            if(pos >= n){
                return 1 ;
            }
            if(digits[pos] == '0'){
                return 0 ;
            }
            if(dp[pos] != null){
                return dp[pos];
            }
            const count1 = util(pos+1);
            let count2 = 0 ;
            if(pos+2 <= n && digits.slice(pos , pos+2) < '27'){
                count2 = util(pos+2);
            }
            
            dp[pos] = count1 + count2 ;
            return dp[pos];
        }
        
        return util(0);
    }
}

//========================================================================15. House Robber 1 ============================================================================
// Leetcode : https://leetcode.com/problems/house-robber/    GFG : https://www.geeksforgeeks.org/problems/stickler-theif-1587115621/1
// Logic : There can be 2 option , either consider house or not . If consider , then find for n-2 house and add with arr[n] money , otherwise find for n-1 house . And return
// maximum of above 2 . 
class Solution {
    findMaxHouseRobber(arr) {
        // code here
        const len = arr.length ;
        let dp = Array.from({length : len} , ()=>null);
        const util = (n)=>{
            if(dp[n] != null){
                return dp[n];
            }
            if(n == 0){
                return arr[0];
            }
            if(n < 0){
                return 0 ;
            }
            dp[n] = Math.max( util(n-1) ,  util(n-2) + arr[n] );
            return dp[n];
        }
        return util(len-1);
    }

	findMaxHouseRobberTabulation(arr) {
        const n = arr.length;
  
	    const dp = new Array(n + 1).fill(0);
	
	    // Base cases
	    dp[0] = 0;
	    dp[1] = arr[0];
	
	    // Fill the dp array using the bottom-up approach
	    for (let i = 2; i <= n; i++) 
	        dp[i] = Math.max(arr[i - 1] + dp[i - 2], dp[i - 1]);
	
	    return dp[n];
    }
}


// =======================================================================16. Perfect Square ===========================================================================
// Leetcode : https://leetcode.com/problems/perfect-squares/description/     GFG : https://www.geeksforgeeks.org/problems/get-minimum-squares0538/1

/**
 	Just check for each element from i 1 to n ; 
 */

class Solution {
    MinSquares(num) {
        let dp = Array.from({length : num} , ()=>null)
        const util = (n)=>{
            
            if(n<=1){
                return n ;
            }
            if(dp[n]!= null){
                return dp[n];
            }
            let ans = Infinity ;
            for(let i = 1 ; i*i <=n ; i++){
                const square = i*i ;
                const count = 1 + util(n-square);
                ans = Math.min(count , ans);
                dp[n] = ans ;
            }
            return ans ;
        }
        return util(num);
    }
}


// ================================================================ 0/1 Knapsack Problem ==============================================================================
/*
Given n items where each item has some weight and profit associated with it and also given a bag with capacity W, [i.e., the bag can hold at most W weight in it].
The task is to put the items into the bag such that the sum of profits associated with them is the maximum possible. 

Note: The constraint here is we can either put an item completely into the bag or cannot put it at all [It is not possible to put a part of an item into the bag].
Input:  W = 4, profit[] = [1, 2, 3], weight[] = [4, 5, 1]
Output: 3
Explanation: There are two items which have weight less than or equal to 4. If we select the item with weight 4, the possible profit is 1. And if we select the item with weight 1, the possible profit is 3. So the maximum possible profit is 3. Note that we cannot put both the items with weight 4 and 1 together as the capacity of the bag is 4.

Input: W = 3, profit[] = [1, 2, 3], weight[] = [4, 5, 6]
Output: 0

1. [Naive Approach] Using Recursion O(2^n) Time and O(n) Space
A simple solution is to consider all subsets of items and calculate the total weight and value of all subsets. Consider the only subsets whose total weight is smaller than W. From all such subsets, pick the subset with maximum value.

Optimal Substructure: To consider all subsets of items, there can be two cases for every item. 

Case 1: The item is included in the optimal subset.
Case 2: The item is not included in the optimal set.


Follow the below steps to solve the problem:

The maximum value obtained from 'n' items is the max of the following two values. 

Case 1 (pick the nth item): Value of the nth item + maximum value obtained by remaining (n-1) items and  weight i.e. (W + weight of the nth item).
Case 2 (don't pick the nth item): Maximum value obtained by (n-1) items and W weight.
If the weight of the 'nth' item is greater than 'W', then the nth item cannot be included and Case 2 is the only possibility.

*/


class Solution {
    knapsack(W, profit, weight) {
        // code here
        const len = profit.length ;
        let dp = Array.from({length : len+1} , ()=>{
            return Array.from({length : W+1},()=>null)
        })
        
        const util = ( n , currWeight) =>{
           
            if(n <0){
                return 0 ;
            }
            if(dp[n][currWeight] != null){
                return dp[n][currWeight];
            }
            
            let pick =  0 ;
            if(W >=  currWeight + weight[n]){
                pick = profit[n] + util(n-1  , currWeight+weight[n] );
            }
            
            let notPick = util(n-1 , currWeight);
            
            dp[n][currWeight] = Math.max(pick , notPick) ;
            return dp[n][currWeight] ;
            
        }
        
        return util(len-1 , 0);
        
    }

	knapsackTabulation(W, profit, weight) {
        // code here
        const n = profit.length ;
        let dp = Array.from({length : n+1} , ()=>{
            return Array.from({length : W+1},()=>0)
        })
        
        for (let i = 1; i <= n; i++) {
            for (let w = 0; w <= W; w++) {
                let pick = 0;

                if (weight[i - 1] <= w) {
                    pick = profit[i - 1] + dp[i - 1][w - weight[i - 1]];
                }
                
                const notPick = dp[i - 1][w];
                dp[i][w] = Math.max(pick, notPick);
            }
        }

        return dp[n][W];
        
    }
}


// =================================================================== 17. Subset Sum Problem ==================================================================
// Leetcode :         GFG : https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1

class Solution {
    isSubsetSum(arr, sum) {
        // code here
        
        const len = arr.length;
        let dp = Array.from({length: len + 1}, () => Array(sum + 1).fill(undefined));
        
        const util = (n, currSum) => {
            if (currSum === sum) return true;
            if (n < 0 || currSum > sum) return false;
            if (dp[n][currSum] !== undefined) return dp[n][currSum];
            
            const pick = util(n - 1, currSum + arr[n]);
            const notPick = util(n - 1, currSum);
            
            dp[n][currSum] = pick || notPick;
            return dp[n][currSum];
        };
        return util(len - 1, 0);
        
    }

	// Clean Code . TC - O(n*sum)
	isSubsetSumclean(arr, sum) {
        // code here
        
        const len = arr.length;
        let dp = Array.from({length: len + 1}, () => Array(sum + 1).fill(undefined));
        
        const util = (n, s) => {
            if(s===0) return true ;
            if(n < 0 || s<0) return false ;
            
            if(dp[n][s] != undefined) return dp[n][s];
            
            const pick = util(n-1 , s-arr[n]);
            const notPick = util(n-1 , s);
            dp[n][s] = pick || notPick ;
            return dp[n][s];
        };
        return util(len - 1, sum);
        
    }
// Looks good . 2nd one is more clean code
	isSubsetSumAnotherOne(arr, sum) {
        const len = arr.length;
        let dp = Array.from({length: len + 1}, () => Array(sum + 1).fill(undefined));
        
        const util = (n, s) => {
            if(s===0) return true ;
            if(n < 0 || s<0) return false ;
            
            if(dp[n][s] != undefined) return dp[n][s];
            
            if(arr[n] > s){
                return util(n-1 , s);
            }
            else{
                const pick = util(n-1 , s-arr[n]);
                const notPick = util(n-1 , s);
                dp[n][s] = pick || notPick ;
                return dp[n][s];
            }
        };
        return util(len - 1, sum);
    }
}


// ================================================================18. Partition of Equal Subset Sum ====================================================================
// Leetcode : https://leetcode.com/problems/partition-equal-subset-sum/description/    GFG : https://www.geeksforgeeks.org/problems/subset-sum-problem2014/1
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    
    let len = nums.length ;
    let sum = 0 ;
    nums.forEach((e)=>{sum += e}) ;
    if(sum%2 != 0 ) return false ;
    const halfSum = sum/2 ;
    
    let dp = Array.from({length:len+1}, ()=>{
        return Array.from({length : halfSum+1} , ()=>undefined);
    })

    const util = (n , s)=>{
        if(s==0) return true ;
        if(n<0 || s<0) return false ;

        if(dp[n][s] != undefined) return dp[n][s];

        const pick = util(n-1 , s-nums[n]);
        const notPick = util(n-1 , s);
        dp[n][s] = pick || notPick ;
        return dp[n][s];
    }

    return util(len-1 , halfSum);

};


// ===========================================================================================19 . Target Sum =======================================================================================================
// Leetcode : https://leetcode.com/problems/target-sum/
var findTargetSumWays = function(nums, target) {
    
    const util = (n, s) => {
        if (n === 0) return s === 0 ? 1 : 0;

        const idx = s + totalSum;

        if (idx < 0 || idx > 2 * totalSum) return 0;

        if (dp[n][idx] !== -1) return dp[n][idx];

        const add = util(n - 1, s - nums[n - 1]);
        const sub = util(n - 1, s + nums[n - 1]);

        dp[n][idx] = add + sub;
        return dp[n][idx];
    };

    const len = nums.length ;

    const totalSum = nums.reduce((a, b) => a + Math.abs(b), 0);

    const dp = Array.from({ length: len + 1 }, () =>
        Array(2 * totalSum + 1).fill(-1)
    );
    return util(len , target);
};

// Easy approach . Example [1,1,1,1,1] and Targetsum =3 . Now lets take pair 1 P1 (1,1,1,1) of ADD and pair 2 (-1) of subtract . Any random choice . So P1 - P2 = targetSum . bcause +1+1+1+1-1 => +(1+1+1+1) - (1) => P1 - P2 ;
// And also if we add element of both pair , it should be equal to sum of all element of array which is SUM . P1 + P2 = sum. Now solve these 2 linear equation . this will give me 2P1 = sum + targetSum . which can be P1 = (targetSum + sum)/2 ;
// Now above problem is breakdown into find number of subset which have sum equal to (targetSum+sum)/2 . 
var findTargetSumWays = function(nums, target) {
    
    const len = nums.length;
    const totalSum = nums.reduce((a, b) => a + b, 0);

    const sumWithTarget = totalSum + target;
    if (Math.abs(target) > totalSum || sumWithTarget % 2 !== 0) {
        return 0;
    }

    const subsetSum = sumWithTarget / 2;

    const dp = Array.from({ length: len + 1 }, () =>
        Array(subsetSum + 1).fill(-1)
    );

    const util = (n, s) => {
        if (n === 0) {
            if (s === 0 && nums[0] === 0) return 2; // two ways: +0 and -0
            if (s === 0 || s === nums[0]) return 1;
            return 0;
        }

        if (s < 0) return 0;
        if (dp[n][s] !== -1) return dp[n][s];

        const notPick = util(n - 1, s);
        const pick =  util(n - 1, s - nums[n]) ;

        dp[n][s] = pick + notPick;
        return dp[n][s];
    };

    return util(len - 1, subsetSum);
};


















