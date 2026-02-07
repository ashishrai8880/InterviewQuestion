//---------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
/**
1. Cookies : Leetcode : https://leetcode.com/problems/assign-cookies/

Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one 
cookie.
Each child i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with; and each 
cookie j has a size s[j]. If s[j] >= g[i], we can assign the cookie j to the child i, and the child i will be content. 
Your goal is to maximize the number of your content children and output the maximum number.

Example 1:

Input: g = [1,2,3], s = [1,1]
Output: 1
Explanation: You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3. 
And even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.
You need to output 1.
Example 2:

Input: g = [1,2], s = [1,2,3]
Output: 2
Explanation: You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2. 
You have 3 cookies and their sizes are big enough to gratify all of the children, 
You need to output 2.
 
Constraints:

1 <= g.length <= 3 * 104
0 <= s.length <= 3 * 104
1 <= g[i], s[j] <= 231 - 1

Time Complexity: O(n*logn + m*logm), Both the arrays are sorted in increasing order.
Space Complexity: O(1), No extra space is used.
 
 */
var findContentChildren = function(greed , cookie) {
    
    greed.sort((a,b)=>a-b);
    cookie.sort((a,b)=>a-b);

    let greedIndex = 0 ;
    let cookieIndex = 0 ;

    while(greedIndex < greed.length && cookieIndex < cookie.length){

        if(greed[greedIndex] <= cookie[cookieIndex]){
            greedIndex++ ;
        }
        cookieIndex++ ;

    }
    return greedIndex ;
};


//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------2. Fractional Knapsack---------------------------------------------------------
/**
GFG : https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1
Leetcode : https://leetcode.com/problems/maximum-units-on-a-truck/description/

Given two arrays, val[] and wt[] , representing the values and weights of items, and an integer capacity representing the 
maximum weight a knapsack can hold, determine the maximum total value that can be achieved by putting items in the knapsack.
You are allowed to break items into fractions if necessary.
Return the maximum value as a double, rounded to 6 decimal places.

Examples :

Input: val[] = [60, 100, 120], wt[] = [10, 20, 30], capacity = 50
Output: 240.000000
Explanation: By taking items of weight 10 and 20 kg and 2/3 fraction of 30 kg. Hence total price will be 60+100+(2/3)(120) = 240
Input: val[] = [500], wt[] = [30], capacity = 10
Output: 166.670000
Explanation: Since the item’s weight exceeds capacity, we take a fraction 10/30 of it, yielding value 166.670000.

 * @param {number[]} val
 * @param {number[]} wt
 * @param {number} capacity
 * @returns {number}
 */

class Solution {
    fractionalKnapsack(val, wt, capacity) {
        // code here
        const n = val.length;

        let items = [];
        for (let i = 0; i < n; i++) {
            items.push({
                value: val[i],
                weight: wt[i],
                ratio: val[i] / wt[i]
            });
        }

        // Sort by value/weight descending
        items.sort((a, b) => b.ratio - a.ratio);

        let totalValue = 0;
        let remainingCapacity = capacity;

        for (let item of items) {
            if (remainingCapacity === 0) break;

            if (item.weight <= remainingCapacity) {
                totalValue += item.value;
                remainingCapacity -= item.weight;
            } else {
                totalValue += item.ratio * remainingCapacity;
                remainingCapacity = 0;
            }
        }

        return Number(totalValue.toFixed(6));
        
    }
}


