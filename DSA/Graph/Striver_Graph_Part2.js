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





