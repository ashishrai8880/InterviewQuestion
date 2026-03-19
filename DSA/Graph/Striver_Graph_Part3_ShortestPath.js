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

This Algo works in every case , but it is not optimized , because it is going to check all path and cases . Instead of 
queue we can use priority queue min heap where shortest distance will be at the top of queue . Also this makes it 
Dijstra Algorithm .
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

//=================================== 3. Shortest Path in DAG Topo Sort Way ============================================
// Class containing shortest path logic using Topological Sort
/*
Ideally this algo should be before previous one . This is the basic approach . When you order graph in topo sort 
order , it means it is already ordered in way of path . if like  4 -> 6 -> 0 -> 1 -> 2
Now if we need to find shortest distance from 0 to every node , then it is clearly visible that from 0 you can never ever 
go to node 4 and 6 . So ignore it . From 0 you can only go to node 1 and 2 . Below algorithm works only in DAG . 

Approach : First Find topo sort using any method bfs/dfs . Then just traverse that topo sort order and find shortest 
path . 
**/
class Solution {

    // Function to perform DFS and build topological order
    topoSort(node, visited, stack, adj) {
        
        // Mark current node as visited
        visited[node] = true;

        // Traverse all neighbors
        for (let [neighbor, weight] of adj[node]) {
            
            // If neighbor not visited, recurse
            if (!visited[neighbor]) {
                this.topoSort(neighbor, visited, stack, adj);
            }
        }

        // Push the node after all neighbors are visited
        stack.push(node);
    }

    // Main function to compute shortest path from source (0)
    shortestPath(N, M, edges) {

        // Initialize adjacency list
        let adj = new Array(N).fill().map(() => []);

        // Populate adjacency list with edges and weights
        for (let [u, v, wt] of edges) {
            adj[u].push([v, wt]);
        }

        // Initialize visited array and stack for topological sort
        let visited = new Array(N).fill(false);
        let stack = [];

        // Perform topological sort from each unvisited node
        for (let i = 0; i < N; i++) {
            if (!visited[i]) {
                this.topoSort(i, visited, stack, adj);
            }
        }

        // Initialize distance array with large number (infinity)
        let dist = new Array(N).fill(Infinity);

        // Distance to source node is 0
        dist[0] = 0;

        // Process nodes in topological order
        while (stack.length > 0) {
            let node = stack.pop();

            // Only process if node is reachable
            if (dist[node] !== Infinity) {

                // Traverse all adjacent nodes
                for (let [neighbor, weight] of adj[node]) {

                    // Relax the edge
                    if (dist[node] + weight < dist[neighbor]) {
                        dist[neighbor] = dist[node] + weight;
                    }
                }
            }
        }

        // Convert unreachable distances to -1
        for (let i = 0; i < N; i++) {
            if (dist[i] === Infinity) {
                dist[i] = -1;
            }
        }
        // Return the shortest path distances
        return dist;
    }
}


// =========================================== 4. Dijkstra's Algorithm ===================================================
/*
        1          4
    3 /    \ 4  / 2
    0        3  
    1 \    / 2  \ 1
        2          5

ADJ List : {  0-> (1,3)(2,1) , 1-> (0,3)(3,4) , 2 -> (0,1)(3,2) , 3-> (1,4)(2,2)(4,2)(5,1) , 4-> (3,2) , 5 -> (3,1)  }
In above adj list , first one is node and second one is weight on edge .

Simply BFS but with Priority Queue . PQ will store 2 things weight and node . 

Now Why PQ instead of normal queue . Normal queue would also give right answer in each and every case , but there is 
more time complexity , it is going to check all cases . Queue might process distance which has high cost than lost cost 
distance path . Because it just works in FIFO way . But in PQ , it is always going to work for minimum path first , 
even maximum path comes in queueu , it is not going to entertain much . 

We can also use Set (not js set) in place of PQ . Because suppose in queue we already have (10,5) [means going to node 5
have 10 cost] and in some operation we are getting (8,5) [means going to 5 take only 8 cost] . So first of all we 
process (8,5) and and and and we can delete (10,5) from queueu !!!!!!! . No need to process this again . 
Which basically slightly decrease the time complexity . But also deleting from Set takes LogN TC . So basically a choice
we will be trading off between these case completely depends on Graph structure .

TC of Dijkstra is : O( E log V ) . comes from derivation .
TC of previous raw BFS can go upto O(E X V) .
**/
// GFG : https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1
class Solution {
    // Returns shortest distances from src to all other vertices
    dijkstra(V, edges, src) {
        // code here
        
        let graph = Array.from({length : V} , ()=>[]);
        
        for(let i = 0 ; i<edges.length ; i++){
            const e = edges[i];
            const sc = e[0] ;
            const dest = e[1] ;
            const wt = e[2] ;
            graph[sc].push( [dest , wt] );
            graph[dest].push( [sc , wt] );
        }
        
        let dist = Array.from({length : V} , ()=>Infinity);
        dist[src] = 0 ;
        
        let pq = [];
        pq.push([src , 0]) ;
        
        let front = 0 ;
        while( front < pq.length ){
            
            pq.sort((a,b)=> {
                return a[1] != b[1] ? a[1] - b[1] : a[0] - b[0];
            } )
            
            const [ curr , currWeight ] = pq.at(front);
            front+=1 ;
            
            const vertex = graph[curr];
            
            for(const nei of vertex){
                const [node , nextWeight] = nei ;
                
                if( dist[curr] + nextWeight < dist[node] ){
                    dist[node] = dist[curr] + nextWeight ;
                    pq.push( [node , dist[node]] );
                }
            }
        }  
        return dist ;
    }
}












