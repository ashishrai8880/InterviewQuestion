// ==================================== 1. Topological Sort ====================================================
/*
Basically Need to find sequence of all vertices from 0 to V where in sequence 0 , V1 , V2 , V3 ... V , 
V2 should comes first before V3 . Every vertex which is coming first in sequence , it should be in graph also . 
Topological Sort can only be applied in Directed Acyclic Graph only , which is obviously . 
It this would have been directed cyclic , then there will be conflict in putting any vertex earlier before another vertex 
because both will be dependent on each other . 
It can't be Acyclic also , because in acyclic how you find vertex order . 

Second Definition : In Topo sort , vertex which has no dependency will come firs , then vertex with least dependency 
then at last vertex with highest dependency . 
Example : 1 -> 2 -> 4 . Now 4 don't have dependency 4 will come first and 1 will come at last . 

GFG : https://www.geeksforgeeks.org/problems/topological-sort/1
Below is the technique to find Topo Sort in DFS manner . Very Very simple approach . 
Just after doing all traversal of neighbours of any vertex at last push that vertex into stack . Iska kya matlab hua
pura krne k baad jo last me hai , jiske aage kuch bhi nahi hai , usko stack me daal do . 
Last me stack reverse krke return kardo . 
**/
class Solution {
    topoSort(V, edges) {
       
        let graph = Array.from( {length : V} , ()=>[]);
        edges.forEach((e)=>{
            const sc = e[0] ;
            const dst = e[1] ;
            graph[sc].push(dst) ;
        })
        
        const dfs = (i)=>{
            vis[i] = true ;
            const vertex = graph[i] ;
            
            for(const n of vertex){
                if(vis[n] == false){
                    dfs(n) ;
                }
            }
            st.push(i) ;
        }
        
        let st = [] ;
        let vis = Array.from({length : V} , ()=>false) ;
        
        for(let i = 0 ; i<V ; i++){
            if(vis[i] == false){
                dfs(i) ;
            }
        }
        return st.reverse();
    }
}

// ============================================ 2. Topo Sort BFS Way ====================================================
/**
Kanh's Algorithm . Are basically pehle sabki indegree calculate kar leni hai .  Uske baad jiski indeg zero hogi 
usko queue me store karna hai . 0 indegree matlab , uski dependency kisipe nahi hai , koi bhi node uski taraf
nahi aa rha hai . Iska matlab topo sort me wo last element hoga . 

Uske baad queue se ek ek karke vertex nikalna hai , or uske neighbours ki indeg-- karte rahe , agar is waqt kisi or
ki bhi indeg 0 ho jati hai to usko bhi queue me store karlo . 
 */

class Solution {
    topoSort(V, edges) {
        
        let graph = Array.from( {length : V} , ()=>[]);
        edges.forEach((e)=>{
            const sc = e[0] ;
            const dst = e[1] ;
            graph[sc].push(dst) ;
        })
        
        const indeg = Array.from({length : V} , ()=>0) ;
        
        for(const v of graph){
            for(const n of v){
                indeg[n]++ ;
            }
        }
        
        let q = [] ;
        for(let i = 0 ; i<V ; i++){
            if( indeg[i] == 0){
                q.push(i)
            }
        }
        
        let topo = [] ;
        
        while(q.length != 0){
            const curr = q.shift() ;
            topo.push(curr) ;
            
            for(const n of graph[curr]){
                indeg[n]-- ;
                if(indeg[n] == 0){
                    q.push(n) ;
                }
            }      
        }     
        return topo ;
    }
}

// ==============================================3. Course Schedule 2 ===================================================
/**
Leetcode : https://leetcode.com/problems/course-schedule-ii/
In this we have to tell series of course a person should start learning so that he is able to complete all course . 
Are bas topological sort nikalna hai , bas ek or condition check karna hai sath sath , ki cyclic directed graph to nahi 
hai . To bas Wo condition check + topo sort dfs way ka logic laga rakha hai . Bas . 
 */
var findOrder = function(numCourses, pre) {
    
    const n = numCourses ;
    let graph = Array.from({length : n} , ()=>[]);

    pre.forEach((e)=>{
        const src = e[1] ;
        const dest = e[0] ;
        graph[src].push(dest);
    })

    const dfs = (i)=>{
        vis[i] = true ;
        callStack[i] = true ;
        const vertex = graph[i] ;

        for(const n of vertex){
            if(vis[n] == false){
                vis[n] = true ;
                callStack[n] = true ;
                dfs(n) ;
                callStack[n] = false ;
            }
            else if(vis[n] == true && callStack[n] == true){
                ans = false ;
            }
        }

        callStack[i] = false ;
        stack.push(i);
    }

    let stack = [] ;
    let vis = Array.from({length : n }, ()=>false) ;
    let callStack = Array.from({length : n }, ()=>false) ;
    let ans = true ;

    for(let i = 0 ; i<n ; i++){
        if(vis[i] == false){
            dfs(i);
        }
    }    

    return ans == true ? stack.reverse() : [];
};

// =========================================== 4. Eventual Safe State ================================================
/**
Leetcode : https://leetcode.com/problems/find-eventual-safe-states/

There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented by a 0-indexed 2D 
integer array graph where graph[i] is an integer array of nodes adjacent to node i, meaning there is an edge from node i
to each node in graph[i].

A node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from 
that node leads to a terminal node (or another safe node).

Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.

LOGIC : Basically 2 tarike hai solve karne k , bfs way me intuition easily nahi lagta , just ek small technique hai 
pehle graph ko reverse karlo , or fir uska topo sort nikal do . Wahi answer hoga . 
 */
var eventualSafeNodes = function(graph) {
    
    const V = graph.length ;
    // reverse graph first
    let reversedGraph = Array.from({length : V} , ()=>[]) ;
    
    for(let i = 0 ; i<V ; i++){
        for(const n of graph[i]){
            reversedGraph[n].push(i) ;
        }
    }
    
    let q = [] ;
    let indeg = Array.from({length : V } , ()=>0) ;
    for(let i = 0 ; i<V ; i++){
        const vertex = reversedGraph[i] ;
        for(const n of vertex){
            indeg[n]++ ;
        }
    }
    
    for(let i = 0 ; i<V ; i++){
        if(indeg[i] == 0){
            q.push(i) ;
        }
    }
    
    let topo = [] ;
    
    while(q.length > 0){
        const curr = q.shift();
        topo.push(curr) ;
        
        for(const n of reversedGraph[curr]){
            indeg[n]-- ;
            if(indeg[n] == 0){
                q.push(n) ;
            }
        }
    }
    return topo.sort((a,b)=>a-b) ;
};

/**
DFS Way , sabhi vertex se check kar lia , cycle hai ya nahi . 
 */
var eventualSafeNodes = function(graph) {

    
        let vis = Array.from({length : V } , ()=>false) ;
        let path = Array.from({length : V} , ()=>false) ;
        
        const dfs = (i) => {
            if(vis[i] == true) {
                if(path[i] == true) return true ;
                return false ;
            }
            
            vis[i] = true ;
            path[i] = true ;
            
            for(const n of graph[i]){
                if(dfs(n) == true) return true ;
            }
            
            path[i] = false ;
            return false ;
        }
        
        let ans = [] ;
        
        for(let i = 0 ; i<V ; i++){
            if(dfs(i) == false) {
                ans.push(i);
            }
        }    
        return ans ;
};


// ======================================== 5. Alien Dictionary ====================================================
/**
GFG : https://www.geeksforgeeks.org/problems/alien-dictionary/1

Basically ek list of words dia hua hai or wo sorted hai ( lekin Alien k Alphabets k according ) . Ab ye batana hai 
ki Albhapets k order kya honge . 

Input: words[] = ["baa", "abcd", "abca", "cab", "cad"]
Output: true
Explanation: A possible corrct order of letters in the alien dictionary is "bdac".
The pair "baa" and "abcd" suggests 'b' appears before 'a' in the alien dictionary.
The pair "abcd" and "abca" suggests 'd' appears before 'a' in the alien dictionary.
The pair "abca" and "cab" suggests 'a' appears before 'c' in the alien dictionary.
The pair "cab" and "cad" suggests 'b' appears before 'd' in the alien dictionary.
So, 'b' → 'd' → 'a' → 'c' is a valid ordering.

Input: words[] = ["caa", "aaa", "aab"]
Output: true
Explanation: A possible corrct order of letters in the alien dictionary is "cab".
The pair "caa" and "aaa" suggests 'c' appears before 'a'.
The pair "aaa" and "aab" suggests 'a' appear before 'b' in the alien dictionary. 
So, 'c' → 'a' → 'b' is a valid ordering.

Input: words[] = ["ab", "cd", "ef", "ad"]
Output: ""
Explanation: No valid ordering of letters is possible.
The pair "ab" and "ef" suggests "a" appears before "e".
The pair "ef" and "ad" suggests "e" appears before "a", which contradicts the ordering rules.

LOGIC : Very Easy Solution - Agar sorted hai words , to 2-2 words leke every character ka pata chal sakta hai . 
jaise "ab" and "cd" it means ki 'a' pehle aa rha hoga 'c' k . To sabhi 2 words leke check krte rehna hai ki 
kaha se change ho rha hai . Matlab directed graph bana do characters ka . 

Fir bas topo sort nikalna hai . Agar koi cycle ban rahi hai to return "" krdo warna return topo sort of it . 

 */

class Solution {
    findOrder(words) {
        // code here
        
        let set = new Set() ;
        for(const wrd of words){
            for(const ch of wrd){
                set.add( ch ) ;
            }
        }
        
        let graph = Array.from({length : 26} , ()=>[]) ;
        const n = words.length ;
        
        for(let i = 0 ; i<n-1 ; i++){
            const str1 = words[i] ;
            const str2 = words[i+1] ;
            const len = Math.min(str1.length , str2.length)
            
            if( str1.length > str2.length && str1.startsWith(str2) ) return "" ;
            
            for(let j = 0 ; j<len ; j++){
                if (str1[j] !== str2[j]) {
                    const u = str1.charCodeAt(j) - 'a'.charCodeAt(0);
                    const v = str2.charCodeAt(j) - 'a'.charCodeAt(0);
                    graph[u].push(v);
                    break; 
                }
                
            }
            
        }
        
        // detect cycle in graph 
        const dfs = (i) =>{
            vis[i] = true ;
            path[i] = true ;
            
            const vertex = graph[i] ;
            
            for(const n of vertex){
                if(path[n] == true ) return true ;
                if(vis[n] == false){
                    const r = dfs(n) ;
                    if(r == true) return true ;
                }
            }
            path[i] = false ;
            const ascii = 97 + i ;
            topo.push( String.fromCharCode(ascii) ) ;
            return false ;
        }
        
        let vis = Array.from({length : 26} , ()=>false) ;
        let path = Array.from({length : 26} , ()=>false) ;
        let topo = [] ;
        
        for( const node of set ){
            const idx = node.charCodeAt(0) - 'a'.charCodeAt(0);
            if(vis[idx] == false){
                if(dfs( idx ) == true) return "" ;
            }
        }
        
        return topo.reverse().join("") ;
        
    }
}













