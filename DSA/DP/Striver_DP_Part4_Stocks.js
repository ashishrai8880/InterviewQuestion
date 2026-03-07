// ================================== 1. Best Time to Buy and Sell Stock I ==========================================
/**
Leetcode : https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 */
var maxProfit = function(prices) {
    let min = Infinity ;
    let max = -Infinity ;
    let ans = 0 ;
    for(const x of prices){
        min = Math.min(min , x);
        ans = Math.max(ans , x - min);
    }
    return ans ;
};

// ================================= 2.  Best Time to Buy and Sell Stock II ============================================
// Leetcode : https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/
/**
You are given an integer array prices where prices[i] is the price of a given stock on the ith day.
On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time.
However, you can sell and buy the stock multiple times on the same day, ensuring you never hold more than one share of 
the stock.

Find and return the maximum profit you can achieve.

Example 1:
Input: prices = [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
Total profit is 4 + 3 = 7.

Example 2:
Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
Total profit is 4.

Example 3:
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: There is no way to make a positive profit, so we never buy the stock to achieve the maximum profit of 0.
 
Constraints:
1 <= prices.length <= 3 * 104
0 <= prices[i] <= 104
 */
var maxProfit = function(prices) {
    
    const n = prices.length ;

    let dp = Array.from({length : n+1} , ()=>{
        return Array.from({length  : 2 } , ()=> -1)
    })

    // canBuy = 0 means buy and 1 means sell .
    const util = ( i , canBuy ) =>{

        if(i >= n) return 0 ;

        if(dp[i][canBuy] != -1) return dp[i][canBuy]

        // Option 1: skip buying
        // Option 2: buy today (negative price)
        if(canBuy == 0){
            const skip = util(i+1 , 0) ;
            const buy = -prices[i] + util(i+1 , 1) ;
            return dp[i][canBuy] = Math.max(skip , buy)
        }
          // Option 1: skip selling
          // Option 2: sell today (add price)
        else{
            const skip = util(i+1 , 1) ;
            const sell = prices[i] + util(i+1 , 0) ;
            return dp[i][canBuy] = Math.max(skip , sell );
        }
    }
    return util(0 , 0)
};

// ===================================== 3. Best Time to Buy and Sell Stock III ========================================
/**
Leetcode : https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/

You are given an array prices where prices[i] is the price of a given stock on the ith day.
Find the maximum profit you can achieve. You may complete at most two transactions.
Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

Example 1:
Input: prices = [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.

Example 2:
Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.

Example 3:
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
 
Constraints:
1 <= prices.length <= 105
0 <= prices[i] <= 105
 */
var maxProfit = function(prices) {
    
    const n = prices.length ;
    let dp = Array.from({length : n} , ()=>{
        return Array.from({length : 3} , ()=>{
            return Array.from({length : 3} , ()=>-1)
        })
    } )

    const util = (i , canBuy , count) =>{
        if(i >= n) return 0 ;
        if(count >= 2) return 0 ;

        if(dp[i][canBuy][count] !== -1) return dp[i][canBuy][count] ;

        if(canBuy == 0){
            const skip = util(i+1 , 0 , count);
            const buy = -prices[i] + util(i+1 , 1 , count );
            return dp[i][canBuy][count] = Math.max(skip , buy);
        }
        else{
            const skip = util(i+1 , 1 , count);
            const sell = prices[i] + util(i+1 , 0 , count+1);
            return dp[i][canBuy][count] = Math.max(skip , sell);
        }
    }
    return util(0 , 0 , 0);
};

// ===================================4. Best time to Buy and Sell Stock IV ============================================
/**
Leetcode : https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/
You are given an integer array prices where prices[i] is the price of a given stock on the ith day, and an integer k.

Find the maximum profit you can achieve. You may complete at most k transactions: i.e. you may buy at most k times
and sell at most k times.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

Example 1:
Input: k = 2, prices = [2,4,1]
Output: 2
Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.

Example 2:
Input: k = 2, prices = [3,2,6,5,0,3]
Output: 7
Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) 
and sell on day 6 (price = 3), profit = 3-0 = 3.
 
Constraints:
1 <= k <= 100
1 <= prices.length <= 1000
0 <= prices[i] <= 1000
 */
var maxProfit = function(k, prices) {
    
    const n = prices.length ;
    let dp = Array.from({length : n+1} , ()=>{
        return Array.from({length : 3} , ()=>{
            return Array.from({length : k+1} , ()=> -1)
        })
    })

    const util = (i , canBuy , count)=>{
        if(i>= n) return 0 ;
        if(count >= k) return 0 ;

        if(dp[i][canBuy][count] != -1) return dp[i][canBuy][count] ;

        if(canBuy == 0){
            const skip = util(i+1 , canBuy , count) ;
            const buy = -prices[i] + util(i+1 , 1 , count);
            return dp[i][canBuy][count] = Math.max(skip , buy);
        }
        else{
            const skip = util(i+1 , 1 , count) ;
            const sell = prices[i] + util(i+1 , 0 , count+1) ;
            return dp[i][canBuy][count] = Math.max(skip , sell);
        }
    }
    return util(0 , 0 , 0 );
};

// ==========================5. Best Time to Buy and Sell Stock With Cooldown Period =====================================
/**
Leetcode : https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/
You are given an array prices where prices[i] is the price of a given stock on the ith day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell 
one share of the stock multiple times) with the following restrictions:

After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).
Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

Example 1:
Input: prices = [1,2,3,0,2]
Output: 3
Explanation: transactions = [buy, sell, cooldown, buy, sell]

Example 2:
Input: prices = [1]
Output: 0
 
Constraints:
1 <= prices.length <= 5000
0 <= prices[i] <= 1000
 */
var maxProfit = function(prices) {
    
    const n = prices.length ;
    let dp = Array.from({length : n+1} , ()=>{
        return Array.from({length : 3} , ()=>-1)
    })

    const util = (i , canBuy) => {
        if(i>=n) return 0 ;
        
        if(dp[i][canBuy] != -1) return dp[i][canBuy] ;

        if(canBuy == 0){
            const skip = util(i+1 , canBuy) ;
            const buy = -prices[i] + util(i+1 , 1);
            return dp[i][canBuy] = Math.max(skip , buy);
        }
        else{
            const skip = util(i+1 , canBuy) ;
            const sell = prices[i] + util(i+2 , 0) ;
            return dp[i][canBuy] = Math.max(skip , sell) ;
        }
    }
    return util(0 , 0);
};


// =========================== 6. Best time to Buy and Sell Stock with Transaction Fee =================================
/**
Leetcode : https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
You are given an array prices where prices[i] is the price of a given stock on the ith day, and an integer fee 
representing a transaction fee.

Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the 
transaction fee for each transaction.

Note:
You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).
The transaction fee is only charged once for each stock purchase and sale.
 
Example 1:
Input: prices = [1,3,2,8,4,9], fee = 2
Output: 8
Explanation: The maximum profit can be achieved by:
- Buying at prices[0] = 1
- Selling at prices[3] = 8
- Buying at prices[4] = 4
- Selling at prices[5] = 9
The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.

Example 2:
Input: prices = [1,3,7,5,10,3], fee = 3
Output: 6
 
Constraints:
1 <= prices.length <= 5 * 104
1 <= prices[i] < 5 * 104
0 <= fee < 5 * 104
 */
var maxProfit = function(prices, fee) {
    
    const n = prices.length ;
    let dp = Array.from({length : n+1} , ()=>{
        return Array.from({length : 3} , ()=> -1)
    })

    const util = (i , canBuy)=>{
        if(i>=n) return 0 ;
        if(dp[i][canBuy] != -1) return dp[i][canBuy]

        if(canBuy == 0){
            const skip = util(i+1 , canBuy) ;
            const buy = -prices[i] + util(i+1 , 1) ;
            return dp[i][canBuy] = Math.max(skip , buy)
        }
        else{
            const skip = util(i+1 , canBuy) ;
            const sell = prices[i] - fee + util(i+1 , 0) ;
            return dp[i][canBuy] = Math.max(skip , sell) ;
        }
    }
    
    return util(0 , 0);
};
















