
// =========================================== 1. Find Largest element of array =========================================================================
// GFG : https://www.geeksforgeeks.org/problems/largest-element-in-array4009/1
// Recursive approach : There are lot of method of doing this . 
largest(arr) {
    // code here
    const util = ( i )=>{
        if(i == len-1){
            return arr[i];
        }
        const e = util(i+1);
        return e > arr[i] ? e : arr[i];
    }
    const len = arr.length ;
    return util(0);
}
