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


// ===========================================





























