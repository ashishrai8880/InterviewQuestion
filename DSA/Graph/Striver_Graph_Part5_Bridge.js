// ===================================== 1. Bridge In a Graph (Tarzan's Algorithm ========================================
/**
Leetcode : https://leetcode.com/problems/critical-connections-in-a-network/

Basically koi bhi graph de rakha hai , to usme batana hai , ki aaise kon kon se edge hai jisko remove karne pe graph 2 component
me break ho jayega . Basically ek tarah se bridge hai graph k andar . 

Algo me 2 array hai , ek discovery time and ek lowest time to discover nodes . 
Kisi bhi nodes se start kar sakte hai dfs traversal . 
Traverse karte karte , agar koi visited nodes wapas se aa jata hai , it means cycle bana raha hai ( back edge) . 
To back bana raha hai to basically lowest discovery time update kar denge . 

Logic mota mota yahi hai ki cycle banane pe agar edge hata bhi de to graph break nahi hoga 2 component me . 

Agar Agar Agar , neighbour ka low bada ho gya  discovery  of  curr node se , iska matlab iska matlab neighbour pe 
jane tak ka sirf ek hi rasta tha , or or or or agar usko break kar diya to bridge mil jayega . Please watch example . 

0 ----- 1
|   \   |
|     \ |
3       2
|
|
4

 */
var criticalConnections = function(n, connections) {
    
    const dfs = (node , parent)=>{

        vis[node] = true ;
        low[node] = discovery[node] = time++ ;

        for(const nei of graph[node]){
            if(parent == nei) continue ;

            if(vis[nei] == false){

                dfs(nei , node)

                low[node] = Math.min(low[node] , low[nei]) ;

                if(low[nei] > discovery[node]){  // bridge
                    res.push([node , nei])
                }
            }
            else{
                low[node] = Math.min(low[node] , , discovery[nei] );
            }
        }
    }

    let vis = Array.from({length : n} , ()=>false);
    let low = Array.from({length : n} , ()=>0);
    let discovery = Array.from({length : n} , ()=>0);
    let res = [];

    let graph = Array.from({length : n} , ()=>[]);
    let time = 0 ;

    for(let i = 0 ; i<connections.length ; i++){
        const [ sc , dest] = connections[i] ;
        graph[sc].push(dest);
        graph[dest].push(sc);
    }

    dfs(0 , -1);

    return res ;
};


// ======================================= 2. Articulation Point in a Graph ============================================
// User function Template for javascript
/**
Same hi hai , bas last wale me bridge nikalna tha , isme node nikalna hai . Aaisa node , jisko nikalne par graph 2 se jayada 
componenet me break hoega . 

Algo same hi hai , bas bas bas ek child ki condition daalni hai root node k liye , agar root node k ek se jayada child hai 
to wo definitely break karega graph ko . 
Set bas isiliye liya hai  , ki node / vertex repeat na ho . 
 */

class Solution {
    // Function to find articulation points in an undirected graph.
    articulationPoints(V, adj) {
        // Code here
         
        const dfs = (node , parent)=>{

            vis[node] = true ;
            low[node] = discovery[node] = time++ ;
            let child = 0 ;
    
            for(const nei of graph[node]){
                if(parent == nei) continue ;
    
                if(vis[nei] == false){
    
                    dfs(nei , node)
    
                    low[node] = Math.min(low[node] , low[nei]) ;
    
                    if(low[nei] >= discovery[node] && parent != -1){  // bridge
                        set.add(node)
                    }
                    child += 1 ;
                }
                else{
                    low[node] = Math.min(low[node] , discovery[nei] );
                }
            }
            if(parent == -1 && child > 1) set.add(node)
        }

        const n = V ;
    
        let vis = Array.from({length : n} , ()=>false);
        let low = Array.from({length : n} , ()=>0);
        let discovery = Array.from({length : n} , ()=>0);
        let set = new Set();
    
        let graph = adj ;
        
        let time = 0 ;
    
        for (let i = 0; i < n; i++) {
            if (!vis[i]) {
                dfs(i, -1);
            }
        }
    
        return set.size == 0 ? [-1] : [...set].sort((a,b)=>a-b) ;
    }
}


// ================================= 3. Kosaraju Algorithm =================================================
/*
Ye Algo SCC component find karne k liye use karte . Strongly connected components SCC , iska matlab agar directed graph 
hai or usme cycle hai it means kisi bhi nodes se kahi bhi pahucha jaa sakta hai . To aaise hi components nikalne hai . 

Steps : 
1. Pehle Topo Sort nikal lo . 
2. Transpose / Reverse kardo graph ko 
3. Simple DFS laga do . (jab tak topo stack empty na ho jaye ) . 
**/
class Solution {
    kosaraju(V, edges) {
        // code here
        
        const topo = ( i )=>{
            vis[i] = true ;
            const vertex = graph[i] ;
            
            for(const nei of vertex){
                if(vis[nei] == false){
                    topo(nei);
                }
            }
            stack.push(i);
        }
        
        const dfs = ( i ) => {
            vis[i] = true ;
            
            const vertex = graph[i] ;
            
            for(const nei of vertex){
                if(vis[nei] == false){
                    topo(nei);
                }
            }
        }
        
        let graph = Array.from({length : V} , ()=>[]) ;
        let vis = Array.from({length : V} , ()=>false) ;
        
        for(const [sc , dest] of edges){
            graph[sc].push(dest);
        }
        
        let stack = [] ;
        for(let i = 0 ; i<V ; i++){
            if(vis[i] == false){
                topo(i);
            }
        }
        
        vis = Array.from({length : V} , ()=>false) ;
        graph = Array.from({length : V} , ()=>[]) ;
        
        // transpose graph 
        for(const [sc , dest] of edges){
            graph[dest].push(sc);
        }
        
        let res = [];
        let count = 0 ;
        
        while(stack.length > 0){
            const curr = stack.pop() ;
            if(vis[curr] == false){
                count += 1 ;
                dfs(curr);
            }
        }
        
        return count ;
        
    }
}

























