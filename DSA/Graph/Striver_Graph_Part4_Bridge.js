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
                low[node] = Math.min(low[node] , low[nei]);
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






























