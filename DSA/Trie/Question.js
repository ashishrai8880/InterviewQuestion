// ==============================================================================1. Word Break ============================================================================================================
// Leetcode : https://leetcode.com/problems/word-break/description/
// Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.
//Note that the same word in the dictionary may be reused multiple times in the segmentation.

/*
Example 1:
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
*/
// Logic : Simple , just check every combination of string , use dp for TLE

// First solution using TRIE data structure
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    const t = new Trie();
    
    for(const word of wordDict){
        t.insert(word);
    }

    return t.wordBreak(s);
};

class Node{
    constructor(){
        this.children =  Array.from({length : 26} , ()=>null);
        this.eow = false ;
    }
}

class Trie{
    constructor(){
        this.root = new Node() ;
    }

    insert(word){
        let curr = this.root ;
        for(const index in word){
            const idx = word.charCodeAt(index) - 'a'.charCodeAt(0);

            if(curr.children[idx] == null){
                curr.children[idx] = new Node();
            }
            curr = curr.children[idx];
        }
        curr.eow = true ;
    }

    search(word ){
        
        let curr = this.root ;
        for(const index in word){
            const idx = word.charCodeAt(index) - 'a'.charCodeAt(0);
            if(curr.children[idx] == null){
                return false ;
            }
            curr = curr.children[idx];
        }
        return curr.eow ;
    }

    wordBreak(key , memo={}){
        if(key in memo){
            return memo[key];
        }
        const len = key.length ;
        if(len == 0 ){
            return true ;
        }

        for(let i = 1 ; i<=len ; i++){
            const firstPart = key.slice(0,i);
            const secondPart = key.slice(i);
            if(this.search(firstPart) &&  this.wordBreak(secondPart , memo)  ){
                memo[key] = true ;
                return true ;
            }
        }
        memo[key] = false ;
        return false ;
    }
}

// Second Solution without Trie
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    
    let wordMap = {};
    wordDict.forEach((e)=>{
        wordMap[e] = 1
    });
    let memo = {};

    const check = (s)=>{
        if(s.length == 0){
            return true ;
        }

        if(memo[s] != undefined ){
            return memo[s];
        }

        for(let i = 1 ; i<= s.length ; i++){
            const firstPart = s.slice(0,i);
            const secondPart = s.slice(i);
            if( wordMap[firstPart] && check(secondPart) ){
                memo[s] = true ;
                return true ;
            }
        }
        memo[s] = false ;
        return false ;
    }

    return check(s);

};

// ==========================================================================2. Starswith Prefix ==============================================================================================================

class Node{
    constructor(){
        this.children = Array.from({length : 26} , ()=>null);
        this.eow = false ;
    }
}

class Trie{
    constructor(){
        this.root = new Node();
    }
    
    insert(word){
        
        let curr = this.root ;
        for(let index in word){
            const idx = word.charCodeAt(index) - 'a'.charCodeAt(0);
            if(curr.children[idx] == null){
                curr.children[idx] = new Node();
            }
            curr = curr.children[idx];
        }
        curr.eow = true ;
    }
    
    checkPrefix(prefix){
        let curr = this.root ;
        
        for(let index in prefix){
            const idx = prefix.charCodeAt(index) - 'a'.charCodeAt(0);
            if(curr.children[idx]== null){
                return false ;
            }
            curr = curr.children[idx];
        }
        return true ;
    }
    
}

const t = new Trie();
const arr = ["apple" , "woman" , "mango"];
const prefix = "moon";
arr.forEach((e)=>{
    t.insert(e);
})
const res = t.checkPrefix(prefix);
console.log({res})


