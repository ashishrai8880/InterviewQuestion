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

