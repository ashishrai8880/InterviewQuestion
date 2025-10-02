
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
