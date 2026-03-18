// ======================================= 1. Shortest Path in Undirected Graph ===========================================
/*
GFG : https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph-having-unit-distance/1
There is a graph . And there is one source node give . need to find shortest distance from that source node to all 
node in graph . Weight between any two adjacent vertex is One . 

Logic : Simply apply BFS . First take all dist is Infinity . dist[sc] = 0 ;
Now if there is path between u and v u->v . 
And if dist[u] + 1 < dist[v] , then put dist[v] = 1 + dist[u] . 
Are simply starting me sabke me Infinity hoga , to maan liya ki 'u' tak aane ka distance pehle se pta hai , ab 
u se v jaane me bas 1 unit lagega , or dist[v] pehle se v tak jane me cost infinity hai , to sidhe 'u' tak 
aane ka distance me +1 kardo . Easy AF . 
**/
class Solution {
    shortestPath(V, edges, src) {
        
        let dist = Array.from({length : V} , () => Infinity) ;
        let graph = Array.from( {length : V} , ()=>[] ) ;
        
        edges.forEach((e)=>{
            const sc = e[0] ;
            const dest = e[1];
            graph[sc].push(dest);
            graph[dest].push(sc);
        })
        
        let q = []
        q.push( src ) ;
        dist[src] = 0 ;
        
        while(q.length > 0){
            const curr = q.shift() ;
            
            for(const n of graph[curr]){
                if(dist[curr] + 1 < dist[n] ){
                    dist[n] = dist[curr] + 1  ;
                    q.push(n);
                }
            }
        }
        
        for(let i = 0 ; i<V ; i++){
            if(dist[i] == Infinity){
                dist[i] = -1 ;
            }
        }
        
        return dist ;
    }
}

// ================================= 2. Shortest Path in DAG ======================================================
/*
GFG : https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph/1
Same as above , in this just need to maintain weight , nothing different . By default source node is 0 always . 
**/
class Solution {
    shortestPath(V, E, edges) {
        // code here.
        
        let graph = Array.from({length : V} , ()=>[]);
        let dist = Array.from({length : V} , ()=>Infinity);
        dist[0] = 0 ;
        
        for(const e of edges){
            const sc = e[0];
            const dst = e[1] ;
            const wt = e[2] ;
            graph[sc].push([dst , wt])
        }
        
        let q = [] ;
        q.push(0) ;
        
        while(q.length > 0){
            const curr = q.shift() ;
            
            for(const vtx of graph[curr]){
                const [ dest , wt] = vtx ;
                if( dist[curr] + wt < dist[dest] ){
                    dist[dest] = wt + dist[curr] ;
                    q.push(dest) ;
                }     
            }
        }
        
        for(let i = 0 ; i<V ; i++){
            if(dist[i] == Infinity){
                dist[i] = -1 ;
            }
        } 
        return dist ;
    }
}















