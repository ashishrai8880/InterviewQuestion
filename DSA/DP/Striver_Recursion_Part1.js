
// =======================================================================1. String To Integer (ATOI) ==========================================================================
/**
 Leetcode : https://leetcode.com/problems/string-to-integer-atoi/
 */
var myAtoi = function(s) {
    
    const trimmed = s.trim();
    const first = trimmed[0];
    if( !['+' , '-'].includes(first) && !Number.isInteger(Number(first)) ){
        return 0 ;
    }

    const util = ( i ) => {
        if( !Number.isInteger(Number(trimmed[i])) ||  i== trimmed.length || trimmed[i] == ' ' ){
            return i ;
        }
        
        return util(i+1) ;
    }

    const idx = util(1);
    const INT_MAX = 2 ** 31 -1 ;
    const INT_MIN = -(2 ** 31) ;

    let parsed ;
    if(first == '+'  ){
        if(!Number.isInteger(Number(trimmed[1])) ||  trimmed[1] == ' '   ){
            return 0 ;
        }
        else if(Number.isInteger(Number(trimmed[1]))){
            parsed = parseInt(trimmed.slice(1,idx));
        }
    }
    
    else if(first == '-' ){
        if(!Number.isInteger(Number(trimmed[1]))  ||  trimmed[1] == ' '  ){
            return 0 ;
        }
        else if(Number.isInteger(Number(trimmed[1]))){
            parsed = -parseInt(trimmed.slice(1,idx));
        }
    }
    
    else{
        parsed = parseInt(trimmed.slice(0,idx));
    }

    if(parsed < 0){
        return Math.max(parsed , INT_MIN);
    }
    return Math.min(parsed , INT_MAX);

};

// Easy Approach , no need of above bhasad 
var myAtoi = function(s) {
    
    const trimmed = s.trim();
    const parsed = parseInt(trimmed);
    if(isNaN(parsed)){
        return 0 ;
    }

    const INT_MAX = 2 ** 31 - 1;
    const INT_MIN = -(2 ** 31) ;

    return parsed < 0 ? Math.max(parsed , INT_MIN) : Math.min(parsed , INT_MAX);
};

// ==============================================================2. Count Good Number =========================================================================
// Leetcode : https://leetcode.com/problems/count-good-numbers/
var countGoodNumbers = function(n) {
    let MOD = BigInt(1e9 + 7);

    function power(a, b) {
        if (b == 0n) {
            return 1n;
        }
        if(b== 1n){
            return a ;
        }
        a = BigInt(a);
        b = BigInt(b);

        if(b % 2n == 0n){
            const res = power(a , b/2n);
            return (res * res ) % MOD ;
        }
        else{
            const res = power(a , (b-1n)/2n);
            return (res * res * a) % MOD ;
        }
    }

    let even = BigInt(Math.floor((n + 1) / 2));
    let odd = BigInt(Math.floor(n / 2));   
    
    let r = ( power(5n, even) * power(4n, odd) ) % MOD;
    return Number(r);
};




