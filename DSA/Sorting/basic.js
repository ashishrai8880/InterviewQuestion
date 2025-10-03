
const selectionSort = (arr)=>{
    
    for(let i=0 ; i<arr.length-1 ; i++){
        let min = i ;
        for(let j =i+1 ; j<arr.length ; j++){
            if(arr[j] < arr[min]){
                min = j ;
            }
        }
        const temp = arr[min];
        arr[min] = arr[i];
        arr[i] = temp ;
    }
    return arr ;
    
}

const bubbleSort = (arr)=>{
    for(let i=arr.length-1 ; i>=0 ; i--){
        for(let j=0 ; j <= i-1 ; j++){
            if(arr[j] > arr[j+1]){
                const temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp ;
            }
        }
    }
    return arr ;
}

const insertionSort = (arr)=>{
    for(let i = 0 ; i<arr.length ; i++){
        let j =  i ;
        
        while(i>0 && arr[j] < arr[j-1]){
            const temp = arr[j];
            arr[j] = arr[j-1];
            arr[j-1] = temp ;
            j-- ;
        }
    }
    
    return arr ;
}


// ======================================== Merge Sort =============================================================
/**
Leetcode : https://leetcode.com/problems/sort-an-array/
 */
var sortArray = function(arr) {
    
    const merge = (low , mid , high)=>{
        let left = low ;
        let right = mid+1 ;
        let temp = [];

        while(left <= mid && right <= high){
            if(arr[left] < arr[right]){
                temp.push(arr[left]);
                left++ ;
            }
            else{
                temp.push(arr[right]);
                right++ ;
            }
        }

        while(left <= mid){
            temp.push(arr[left]);
            left++ ;
        }

        while(right <= high){
            temp.push(arr[right]);
            right++ ;
        }
        
        for(let i=low ; i<=high ; i++){
            arr[i] = temp[i-low];
        }

    }

    const mergeSort = (low , high)=>{
        if(low>= high) return ;
        const mid = Math.floor( (low+high)/2 );
        mergeSort(low , mid);
        mergeSort(mid+1 , high);
        merge(low , mid , high);
    }

    mergeSort(0 , arr.length-1)
    return arr ;
};

/**
Time complexity: O(nlogn) 

Reason: At each step, we divide the whole array, for that logn and we assume n steps are taken to get a sorted array, so overall time complexity will be nlogn

Space complexity: O(n)  

Reason: We are using a temporary array to store elements in sorted order.

Auxiliary Space Complexity: O(n)
*/


// ===================================== Quick Sort =========================================================
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(arr) {
    
    const partition = (start , end)=>{

        const pivot = arr[start];
        let left = start ;
        let right = end ;

        while(left < right){

            while( left <= end-1 &&  pivot >= arr[left]){
                left++ ;
            }

            while( right >=start+1 && pivot < arr[right]  ){
                right-- ;
            }

            if(left < right){
                // swap
                const temp = arr[left];
                arr[left] = arr[right];
                arr[right] = temp ;
            }
        }

        const temp = arr[start];
        arr[start] = arr[right] ;
        arr[right] = temp ;
        return right ;

    }

    const quickSort = (start , end)=>{
        if(start < end){
            const pivotIndex = partition(start , end);
            quickSort(start , pivotIndex-1);
            quickSort(pivotIndex + 1 , end);
        }
    }

    quickSort( 0 , arr.length-1 );
    return arr ;

};

/**
Time Complexity: O(N*logN), where N = size of the array.

Reason: At each step, we divide the whole array, for that logN and n steps are taken for partition() function, so overall time complexity will be N*logN.

The following recurrence relation can be written for Quick sort : 

F(n) = F(k) + F(n-1-k) 

Here k is the number of elements smaller or equal to the pivot and n-1-k denotes elements greater than the pivot.

There can be 2 cases :

Worst Case – This case occurs when the pivot is the greatest or smallest element of the array. If the partition is done and the last element is the pivot, then the worst case would be either in the increasing order of the array or in the decreasing order of the array. 

Recurrence:
F(n) = F(0)+F(n-1)  or  F(n) = F(n-1) + F(0) 

Worst Case Time complexity: O(n2) 

Best Case – This case occurs when the pivot is the middle element or near to middle element of the array.
Recurrence :
F(n) = 2F(n/2)

Time Complexity for the best and average case: O(N*logN)

Space Complexity: O(1) + O(N) auxiliary stack space.
*/
