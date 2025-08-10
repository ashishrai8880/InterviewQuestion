class Trie{
    
    constructor(){
        this.root = new Node();
    }
    
    insert(word){
        let curr = this.root ;
        
        for(let i = 0; i<word.length ; i++){
            const idx = word.charCodeAt(i) - 'a'.charCodeAt(0);
            if(curr.children[idx] == null){
                curr.children[idx] = new Node();
            }
            curr = curr.children[idx];
        }
        curr.eow = true ;
    }
    
    search(word){
        
        let curr = this.root ;
        
        for( const index in word ){
            const idx = word.charCodeAt(index) - 'a'.charCodeAt(0);
            
            if(curr.children[idx] == null){
                return false ;
            }
            
            curr = curr.children[idx];
        }
        return curr.eow ;
        
    }
    
    getData(){
        return this.root ;
    }
    
}


const t = new Trie();
const arr = ["the" , "a" , "their" , "there"] ;

arr.forEach((e)=>{
    t.insert(e);
})

console.log(t.search("a"))
console.log(t.search("the"))
console.log(t.search("theres"))


// ====================================Bit Manipulation Prerequiesite for Trie ============================================
/*
 1. XOR - 0 ^ 1 -> 1     1 ^ 0 -> 1
          0 ^ 0 -> 0     1 ^ 1 -> 0   Exclusive OR

2. Even Number of 1 leads to 0 in XOR operation
   Even number of 0 leads to 0 in XOR operation

   Odd Number of 1 leads to 1 in XOR operation
   Odd Number of 0 leads to 1 in XOR operation

3. Bit Manipulation - if there is number suppose 8 which have binary digit as 1000 . Now if there is right shift by 2 then
    it will lead to binary digit 10 which represent 2 . Logic is , when there is i right shift of any number , it will leads to
     floor_value(n/2^i) . For example : Number 27 and right shift by 3 digit , then it will give number 3 . 27/8 . 8 is 2^3 ;

     Similarily if there is left shift of any number , it will give n * (2^i) . Example , left shift of number 14 . Binary 
     digit is 1110 , left shift by 2 which means 2^2 is 4 , so 14 * 4 gives 56 , 56 have binary digit as 111000 . 

4. Turning any binary digit at any place . For example , i have digit 14 which have binary 1110 , now i have to flip 3rd bit
    from right , so now i want number as 1010 . For this , First step is find 2 left shift of 1 or 0001 which will will 0100 
    now just apply XOR operator between 1110 |  0100  , which will give 1010 . 
*/
