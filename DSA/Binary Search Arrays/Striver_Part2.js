
// =========================== 1. Koko Eating Banana =========================================================
/**
Leetcode : https://leetcode.com/problems/koko-eating-bananas/

Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and 
will come back in h hours.
Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas 
from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during 
this hour.
Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer k such that she can eat all the bananas within h hours.

Example 1:
Input: piles = [3,6,7,11], h = 8
Output: 4

Example 2:
Input: piles = [30,11,23,4,20], h = 5
Output: 30

Example 3:
Input: piles = [30,11,23,4,20], h = 6
Output: 23
 
Brute Force : Just check from 1 to max value in array . 
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function(piles, h) {
    
    let k = 1 ;
    piles.sort((a,b)=>a-b);
    const n = piles.length ;
    const max = piles[n-1];
    let i = 1 ;
    while(i <= max){
        let time = 0;
        for(const x of piles){
            time = time + Math.ceil(x/i)
        }
        if(time <= h){
            return i ;
        }
        i += 1 ;
    }
    return -1 ;
};


/**
Optimize Approach : Use Binary Search . From low =1 to high = max element . Super Super cool 
 */
var minEatingSpeed = function(piles, h) {
    
    const countHours = (t)=>{
        let time = 0 ;
        for(const x of piles){
            time += Math.ceil(x/t);
        }
        return time ;
    }

    
    let max = -Infinity ;
    piles.forEach((e)=>max= Math.max(max , e));

    const n = piles.length ;

    let low = 1 ;
    let high = max;

    while(low <= high){
        const mid = Math.floor((low+high)/2);

        const time = countHours(mid);

        if(time > h){
            low = mid+1 ;
        }
        else{
            high = mid-1 ;
        }
    }
    return low ;

};



















 
