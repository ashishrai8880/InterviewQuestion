// ================================ 1. Prim's Algorithm ==========================================================
/*
GFG : https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1

First Spanning Tree kya hota hai . 
Koi bhi graph , jisme V vertex / node hai to usme V-1 Edges hi hone chahiye . Taaki Graph me saare nodes bhi ho 
or wo kam se kam edges se connected hai . 
Second Spanning Tree me cycle nahi banana chahiye , agar bana to graph ban jayega naaki tree . 

MST - Aisa spanning tree jiska weight ka sum sabse kam ho . 

Prim's Algo - MST nikalne ka hi tarika hai . Ye ek Greedy approach hai . 
- Ek PQ lene ka , or kisi bhi node se start karne ka . kisi se bhi !!!!! . 
- Ek visited array bhi maintain karna hai , taaki wapas usi node pe na pahoch jaye . 
- Dijkstra ki tarah hi pq ko sort krke ek ek element nikalna hai , or uske neighbours ko traverse karo . 
- Har ek node k wt ko add karte chalo . 
- Niche solution me pop() kiya hai instead of shift() , ghabaraane ki jarurat nahi hai , bas TLE save karne k liye kara . 

Time Complexity: O(E*logE) + O(E*logE)~ O(E*logE), where E = no. of given edges.
The maximum size of the priority queue can be E so after at most E iterations the priority queue will be empty and the loop
will end. Inside the loop, there is a pop operation that will take logE time. This will result in the first O(E*logE) time
complexity. Now, inside that loop, for every node, we need to traverse all its adjacent nodes where the number of nodes can 
be at most E. If we find any node unvisited, we will perform a push operation and for that, we need a logE time complexity. 
So this will result in the second O(E*logE). 

Space Complexity: O(E) + O(V), where E = no. of edges and V = no. of vertices. O(E) occurs due to the size of the priority 
queue and O(V) due to the visited array. If we wish to get the mst, we need an extra O(V-1) space to store the edges of the most.

**/
class Solution {
    spanningTree(V, edges) {
       
        let graph = Array.from({length : V} , ()=>[]);
        let vis = Array.from({length : V} , ()=> false );
        
        for(let i = 0 ; i<edges.length ; i++){
            const [sc , dst , wt] = edges[i] ;
            graph[sc].push([dst , wt]) ;
            graph[dst].push([sc , wt]) ;
        }
        
        let pq = [ [ 0 , 0 ] ]  // src and wt
        let sum = 0 ;
        let canSort = true ;
        
        while(pq.length > 0){
            
            if(canSort == true){
                pq.sort((a,b)=>b[1]-a[1]);
                canSort = false ;
            }
            
            const [currNode , currWt] = pq.pop() ;
            if(vis[currNode] == true) continue ;
            
            vis[currNode] = true ;
            sum += currWt ;
            
            for(const [nextNei , nextWt] of graph[currNode]){
                if( vis[nextNei] == false ){
                    pq.push( [nextNei , nextWt] )
                    canSort = true ;
                }
            }
        } 
        return sum ;  
    }
}


// =========================================== 2. Disjoint Sets ====================================================
/*
Are basically jayada kuch badi cheez nahi hai . Agar Graph continuous change hue jaa rha hai , or kisi point pe 
batana hai ki 2 node same component me hai ya nahi . 
Ye cheez simple bfs and dfs se bhi ho sakti hai . But uski TC O(E+V) hai , usse acha TC Disjoint set deta hai , bas yahi hai .

Isme 2 array hai , ek parent and ek rank . 
Graph store karna ya uska structure se kuch lena dena nahi hai . Isko bas kam time me 2 node same component me hai ya nahi
yehi pata lagane k liye karte hai . 

parent array contain karega kisi node ka parent node kya hai . Thoda compression karne k liye , bas sabse uper wala
parent store kar lete hai wahi hai bas path compression . Jayada hawuaaa nahi hai kuch bhi . 

rank array basically store karta hai wo kitne uper hai . Jaise 0 -> 1 -> 2 . to bas 0 ka rank 2 hai , and 2 ka rank 0 . 
Kyuki 2 sabse niche hai . 

Kul milake 2 function or hai isme . 1 function jisme parent find karke dena hai , ultimate parent sabse uper wale parent 
ko bol rhe idhar . 
Dusra function hai , jisme union karna hai bas 2 node ko . 
Union karne ka process niche hai . 
    1. Pehle dono node ka parent nikal lo . 
    2. Agar ultimate parent same hai , matlab same component me hai , kuch bhi nahi karne ka . 
    3. Agar nahi hai same , to fir dubara 3 condition hai . 
        1. Agar u ka rank jayada hai , to v(v k ultimate parent) node ko u(u k ultimate parent) se attach kardo . or parent bhi bana do.
        2. Same agar v ka rank jayada hai to ulta kardo . 
        Agar same hai , to dono me se kisi ko bhi bana do . Agar chhote ko bade se attach karte hai to badhiya rehta hai . Thoda soch . Diagram dekh
**/

class DisjointSets {
    constructor(n){
        this.parent = Array.from({length : n+1} , (_ , i)=>{
            return i ;
        })
        this.rank = Array.from({length : n+1} , ()=>0) ;
    }
    
    findParent = (u) =>{
        if(this.parent[u] == u) return u ;
        
        // path compression
        this.parent[u] = this.findParent( this.parent[u] ) ;
        return this.parent[u];
    }
    
    unionByRank = (u , v)=>{
        const ult_parent_u = this.findParent(u) ;
        const ult_parent_v = this.findParent(v) ;
        
        if(ult_parent_u == ult_parent_v) return ;
        
        if(this.rank[ult_parent_u] > this.rank[ult_parent_v]){
            this.parent[ult_parent_v] = ult_parent_u ;
        }
        else if(this.rank[ult_parent_u] < this.rank[ult_parent_v]){
            
            this.parent[ult_parent_u] = ult_parent_v ;
        }
        else{
            this.parent[ult_parent_v] = ult_parent_u ;
            this.rank[ult_parent_u]++ ;
        }
    }
    
    isInSameComponent(u , v){
        const ult_parent_u = this.findParent(u) ;
        const ult_parent_v = this.findParent(v) ;
        console.log(ult_parent_u , ult_parent_v)
        return ult_parent_v == ult_parent_u ;
    }
}

const ds = new DisjointSets(7) ;

ds.unionByRank(1,2) ;
ds.unionByRank(2,3) ;
ds.unionByRank(4,5) ;
ds.unionByRank(6,7) ;

console.log("Check for " , [5,6] , ds.isInSameComponent(5,6))

ds.unionByRank(5,6);

console.log("Check for " , [5,6] , ds.isInSameComponent(5,6))


// ======================================= 3. Minimum no. of operation to make connected ==================================
/**
Leetcode : https://leetcode.com/problems/number-of-operations-to-make-network-connected/
Problem : Are basically bahot se computers hai from 0 to n-1 tak . Ab ek koi network hai . 
Is network me kuch kuch computers aapas me connect hai . To batana hai , kam se kam kitne operation lagenge taanki saare 
computers connect ho jaye . 
Basically number of disconnected components nikal lo or usme se 1 minus karne ka . 
Shuru me bas ek check laga do ki , abhi jo edges hai , wo jayada kam to nahi hai number of nodes/computer se fir to nahi ho payega . 

Niche wala solution thoda sa slow hoga . Kyuki DFS ki TC lagegi . Isiliye Disjoin sets hai . 
DS se solution iske niche hai , thoda sa bada hai bas lekin easy hai . 
 */
var makeConnected = function(n, connections) {
    
    const edges = connections.length ;

    if(edges < n-1) return -1 ;

    let graph = Array.from({length : n } , ()=>[]) ;
    let vis = Array.from({length : n } , ()=>false) ;

    for(const [sc , dest] of connections){
        graph[sc].push(dest) ;
        graph[dest].push(sc) ;
    }

    const dfs = (i)=>{
        vis[i] = true ;

        for(const nei of graph[i]){
            if(vis[nei] == false){
                dfs(nei) ;
            }
        }
    }

    let ans = 0 ;
    for(let i = 0 ; i<n ; i++){
        if(vis[i] == false){
            dfs(i) ;
            ans+=1 ;
        }
    }
    return ans - 1 ;
};


// Solution with Disjoin sets 
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function(n, connections) {
    
    const edges = connections.length ;

    if(edges < n-1) return -1 ;

    class DisjointSets {
        constructor(){
            this.rank = Array.from({length : n} , ()=>0) ;
            this.parent = Array.from({length : n} , (_ , i)=>{
                return i ;
            }) ;
        }

        findParent(u){
            if(this.parent[u] == u) return u ;
            this.parent[u] = this.findParent(this.parent[u]) ;
            return this.parent[u] ;
        }

        unionByRank = (u , v)=>{
            const ult_parent_u = this.findParent(u) ;
            const ult_parent_v = this.findParent(v) ;
            
            if(ult_parent_u == ult_parent_v) return ;
            
            if(this.rank[ult_parent_u] > this.rank[ult_parent_v]){
                this.parent[ult_parent_v] = ult_parent_u ;
            }
            else if(this.rank[ult_parent_u] < this.rank[ult_parent_v]){
                
                this.parent[ult_parent_u] = ult_parent_v ;
            }
            else{
                this.parent[ult_parent_v] = ult_parent_u ;
                this.rank[ult_parent_u]++ ;
            }
        }

        isInSameComponent(u , v){
            const ult_parent_u = this.findParent(u) ;
            const ult_parent_v = this.findParent(v) ;
            console.log(ult_parent_u , ult_parent_v)
            return ult_parent_v == ult_parent_u ;
        }

        findDisconnected(){
            
            let components = 0;
            for(let i = 0; i < n; i++){
                if(this.findParent(i) === i){
                    components++;
                }
            }
            return components-1;
        }
    }

    const ds = new DisjointSets() ;
    for(let i = 0 ; i < connections.length ; i++){
        const [sc , dest] = connections[i];
        ds.unionByRank(sc , dest);
    }

    return ds.findDisconnected();

};








































