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
// Leetcode : https://leetcode.com/problems/implement-trie-prefix-tree/

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


// ==================================================================3. Count number of distinct substring from a string ===========================================================================================
// GFG : https://www.geeksforgeeks.org/problems/count-of-distinct-substrings/1       Leetcode : https://leetcode.com/problems/count-unique-characters-of-all-substrings-of-a-given-string/description/
// Example : strng : "ababa" , ans : 10 . Substrinig can be :  [ '' ,a ,ab ,aba ,abab ,ababa ,b ,ba ,bab ,baba] 


// Brute Force Method , which will work for each and every case but will throw TLE
class Solution {
    countDistinctSubstring(s) {
        let distinct = {} ;
        let len = s.length ;
        
        for(let i = 0 ; i<len ; i++){
            for(let j=i ; j<=len ; j++){
                const sub = s.slice(i,j);
                if(!distinct[sub]){
                    distinct[sub] = 1 ;
                }
            }
        }
        return Object.keys(distinct).length  ;   
    }
}

// Optimized way . But it will still throw TLE
// Approach : In any string , total substring would be 1. All suffix of all prefix or 2. All prefix of all suffix .  We can find all suffix of string and then will find all prefix of all suffix . We can go with the second approach
// also . Step 2. Insert all suffix of string in a trie . 
// Step 3 . Just count all number of nodes in a trie . NOTE : Number of nodes in a string will be equal to the all number of prefix .

/**
 * @param {string} s
 * @return {number}
 */

class Solution {
    countDistinctSubstring(s) {
        // code here
        let suffix = [];
        let i = -1 ;
        let len = s.length ;
        
        while(len > 0){
            suffix.push(s.slice(i));
            len-- ;
            i-- ;
        }
        
        const t = new Trie();
        suffix.forEach((e)=>t.insert(e));
        return t.countNode();
        
        
    }
}

class Node{
    constructor(){
        this.children = {} ;
        this.eow = false ;
    }
}

class Trie{
    constructor(){
        this.root = new Node();
    }
    
    insert(word){
        let curr = this.root ;
        for(const index in word){
            const ch = word[index];
            if(!curr.children[ch]){
                curr.children[ch] = new Node();
            }
            curr = curr.children[ch];
        }
        curr.eow = true ;
    }
    
    countNode(){
        let obj = {ans : 0 } ;
        
        const countUtil = (curr , obj)=>{
            obj.ans = obj.ans + 1;
            Object.values(curr.children).forEach((node)=>{
                countUtil(node , obj)
            })
        }
        countUtil(this.root , obj);
        return obj.ans ;
    }
}

// Need to change how we are counting nodes , there is tle coming from counting nodes logic . NOTE : Object.values method every time create array in every call stack , which caused TLE or space occupies more . 
class Solution {
    countDistinctSubstring(s) {
        const t = new Trie();
        for (let i = 0; i < s.length; i++) {
            t.insert(s, i);
        }
        return t.countNode(t.root);
    }
}

class Trie{

    countNode(node) {
        let res = 0;
        const countUtil = (curr)=>{
            res = res + 1 ;
            for(let ch in curr.children){
                countUtil(curr.children[ch]);
            }
        }
        countUtil(this.root);
        return res;
    }
    
}


// ==============================================================================4. Longest word with all prefixes ==========================================================================================
// Brute Force Approach . Leetcode : https://leetcode.com/problems/longest-word-in-dictionary/
/* Example 2:
Input: words = ["a","banana","app","appl","ap","apply","apple"]
Output: "apple"
Explanation: Both "apply" and "apple" can be built from other words in the dictionary. However, "apple" is lexicographically smaller than "apply".
*/
//Brute Force Approach Logic : Check all prefix of all word in words array , and store in seperate array which meet all requirement . Javascript sort method sort it in asceneding lexicographical order by default . 
var longestWord = function(words) {

    let wordMap = {};
    words.map((e)=>wordMap[e]= 1);
    
    const len = words.length ;
    let ans = [];

    words.forEach((word)=>{

        //finding all prefix
        let isExists = true ;
        for(let i=0 ; i<word.length ; i++){
            const prefix = word.slice(0 ,i);
            if(prefix != "" && !wordMap[prefix]){
                isExists = false ;
                break ;
            }
        }
        if(isExists){
            ans.push(word);
        }
    })
    if(ans.length == 0){
        return "";
    }

    const sortedAns = ans.sort();
    let maxLen = -1 ;
    let maxString = "";

    sortedAns.forEach((e)=>{
        if(e.length > maxLen){
            maxLen = e.length ;
            maxString = e ;
        }
    })

    return maxString ;

};

// Logic 2 : Use of Trie , Just store all word in a trie , and check its longest word . In a trie , there should be 
// end of word value is true for each node for longest word . Recursively check all such word . Take one temp variable 
// also , every time add 1 character when going to check next child , and after coming remove its last character . 
/**
 * @param {string[]} words
 * @return {string}
 */
var longestWord = function(words) {

    const t = new Trie();
    words.forEach((word)=>t.insert(word));

    return t.longestWord();

};

class Node{
    constructor(){
        this.children = Array.from({length : 26},()=>null);
        this.eow = false ;
    }
}

class Trie{
    constructor(){
        this.root = new Node();
    }
    insert(word){
        let curr = this.root ;
        for(const index in word){
            let idx = word.charCodeAt(index) - 'a'.charCodeAt(0)
            if(!curr.children[idx]){
                curr.children[idx] = new Node();
            }
            curr = curr.children[idx];
        }
        curr.eow = true ;
    }
    
    longestWord(){
        let res = "";
        let temp = "";

        const longestUtil = (curr)=>{
            if(curr.eow == false && curr != this.root){
                return  ;
            }

            curr.children.forEach((next , index)=>{
                if(next != null && next.eow == true){
                    const chCode = 'a'.charCodeAt(0)+index ;
                    const ch = String.fromCharCode(chCode);
                    temp = temp + ch ;
                    if(temp.length > res.length){
                        res = temp ;
                    }
                    longestUtil(next);
                    temp = temp.slice(0 , temp.length-1);
                }
            })

        }

        longestUtil(this.root);
        return res ;
    }
}

// Approach 3 : Super Cool , Super Easy , Super Fast .
//Just sort the words array , and keep checking which one is longest and lexicographical order . In sorting , it will always sort in lexicographical order .
//Like : 'a' , 'ap, 'app' , 'appl' , 'apple' , 'z' , 'zo' , 'zoo' .
//Now just need to check from start . If length of word is 1 , then just store in set , . In second case if prefix from 0-n-1 exists then store . Very Simple Algorithm . 
/**
 * @param {string[]} words
 * @return {string}
 */
var longestWord = function(words) {

    words.sort();
    let set = new Set();
    let res = "";
    words.forEach((word)=>{
        if(word.length == 1 || set.has(word.slice(0,-1))){
            set.add(word);
            if(word.length > res.length){
                res = word ;
            }
        }
    })
    return res ;
};















