// ==================================================== 1. Deep Flatten Object========================
// ==================================================== 1. Deep Flatten Object========================


//Method 1 : Easy one
function flattenObject(obj, parent) {
    const finalObj = {};

    const generateFlatenObj = (obj, parent) => {
        for (let key in obj) {
            const newParent = parent + key;
            const value = obj[key];
            if (typeof value == 'object') {
                generateFlatenObj(value, newParent + '.')
            } else {
                finalObj[newParent] = value;
            }
        }
    }

    generateFlatenObj(obj, parent);
    return finalObj;
}


//Method 2 . Little difficult
function deepFlattenToObject(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? prefix + '_' : '';
        if (typeof obj[k] === 'object' && obj[k] !== null) {
            Object.assign(acc, deepFlattenToObject(obj[k], pre + k));
        } else {
            acc[pre + k] = obj[k];
        }
        return acc;
    }, {});
}

const obj = {
    a: 1,
    b: [2, 3],
    c: {
        d: 4,
        e: [5, 6],
        f: {
            g: 7
        }
    }
};

//method 1 calling
const flattened = flattenObject(obj, '');

//method 2 calling
// const flattened = deepFlattenToObject(obj);
console.log(flattened);


// 2. ============================ Negative indexing in Arrays (Proxies) ===============================
// 2. ============================ Negative indexing in Arrays (Proxies) ===============================

const letters = ['a', 'b', 'c', 'd', 'e'];
const proxy = new Proxy(letters, {
    get(target, prop) {
        if (!isNaN(prop)) {
            prop = parseInt(prop, 10);
            if (prop < 0) {
                prop += target.length;
            }
        }
        return target[prop];
    }
});

proxy[0]; // => 'a'
proxy[-1]; // => 'e'
proxy[-2]; // => 'd'

// 3. ================================Pipe method implementation ===================================
// 3. ================================Pipe method implementation ===================================

// The concept of pipe is simple — it combines n functions. It’s a pipe flowing left-to-right, calling each function with the output of the last one.

// const pipe = (op1, op2, op3) => {
//     return (arg) => opN(op3(op2(op1(arg))));
// }

// const fun = pip(func1, func2, func3);
// console.log(fun(3))

let data = {name : 'Ashish'} 

getName = (person) => person.name;
uppercase = (string) => string.toUpperCase();
get6Characters = (string) => string.substring(0, 6);
reverse = (string) => string.split('').reverse().join('');

// before pipe method , we can achieve same like this
console.log(reverse(uppercase(getName(data))))

//full description
const pipe = (...fns)=>{
    return (x) => {
        return fns.reduce((acc , val)=>{
            return val(acc) ;
        } , x)
    }
}

//short hand
// pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);


console.log(pipe(getName , uppercase , reverse)(data))


// 4. ======================================================= Quick Sort ===========================================================
// 4. ======================================================= Quick Sort ===========================================================

function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        // If current element is smaller than the pivot
        if (arr[j] < pivot) {
            // Increment index of smaller element
            i++;
            // Swap elements
            [arr[i], arr[j]] = [arr[j], arr[i]]; 
        }
    }
    // Swap pivot to its correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; 
    return i + 1; // Return the partition index
}

function quickSort(arr, low, high) {
    if (low >= high) return;
    let pi = partition(arr, low, high);

    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
}

let arr = [10, 80, 30, 90, 40];
console.log("Original array: " + arr);

quickSort(arr, 0, arr.length - 1);
console.log("Sorted array: " + arr);



// 4. ======================================================= Quick Sort ===========================================================
// 4. ======================================================= Quick Sort ===========================================================



function merge(arr=[] , left , mid , right){
    
    let l1 = mid - left + 1;
    let l2 = right - mid;
    
    let arr1 = new Array(l1);
    let arr2 = new Array(l2);
    
     // Assign values in subarrays
    for (let i = 0; i < l1; ++i) {
        arr1[i] = arr[left + i];
    }
    for (let i = 0; i < l2; ++i) {
        arr2[i] = arr[mid + 1 + i];
    }
    
    
    // To travesrse and modify main array
    let i = 0,
        j = 0,
        k = left;
    
     while (i < l1 && j < l2) {
        if (arr1[i] < arr2[j]) {
            arr[k] = arr1[i];
            ++i;
        } else {
            arr[k] = arr2[j];
            j++;
        }
         k++;
    }
    
    // Update the remaining elements
    while (i < l1) {
        arr[k] = arr1[i];
        i++;
        k++;
    }
    while (j < l2) {
        arr[k] = arr2[j];
        j++;
        k++;
    }
    
    
}

function mergeSort(arr=[] , left , right){
    
    if(left >= right){
        return ;
    }
    
    let mid = left + parseInt((right-left)/2);
    
    mergeSort(arr , left , mid) ;
    mergeSort(arr , mid+1 , right);
    
    merge(arr  , left , mid , right);
}

// Input array
const arr =  [ 38, 27, 43, 10]

// Display input array
console.log("Original array: " + arr);

// Apply merge sort function
mergeSort(arr, 0, arr.length - 1);

// Display output
console.log("After sorting: " + arr);

