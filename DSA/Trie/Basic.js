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
