
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
