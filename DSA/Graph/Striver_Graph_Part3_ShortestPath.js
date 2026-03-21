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


// ======================================== 5. Shortest Path Binary Matrix =============================================
/**
Leetcode : https://leetcode.com/problems/shortest-path-in-binary-matrix/
Question me ek binary matrix de rakha hai . Jaha 0 hai wahi path pe chal sakte hai . 8 directioin me move kar sakta hai.
Shortest path batana hai first cell se last cell tak ki . from (0,0) to (row-1 , col-1) . 

LOGIC : DFS works but will give TLE , because for every cell it has option 8 . So TC is O (8 ^ N**N ) which is huge . 

 */
var shortestPathBinaryMatrix = function(grid) {
    
    const row = grid.length ;
    const col = grid[0].length ;

    const isValid = (i,j)=>{
        if(i>=0 && i<row && j>=0 && j<col && grid[i][j] == 0) return true ;
        return false ;
    }

    const dfs = (i,j)=>{

        if(i==row-1 && j==col-1) return 1 ;

        let up = Infinity ;
        if(isValid(i+1 , j)){
            grid[i+1][j] = 1 ;
            up = 1 + dfs(i+1 , j);
            grid[i+1][j] = 0 ;
        }
        
        let down = Infinity ;
        if(isValid(i-1 , j)){
            grid[i-1][j] = 1 ;
            down = 1 + dfs(i-1 , j);
            grid[i-1][j] = 0 ;
        }
        
        let left = Infinity ;
        if(isValid(i , j-1)){
            grid[i][j-1] = 1 ;
            left = 1 + dfs(i , j-1);
            grid[i][j-1] = 0 ;
        }
        
        let right = Infinity ;
        if(isValid(i , j+1)){
            grid[i][j+1] = 1 ;
            right = 1 + dfs(i , j+1);
            grid[i][j+1] = 0 ;
        }
        
        let lup = Infinity ;
        if(isValid(i-1 , j-1)){
            grid[i-1][j-1] = 1 ;
            lup = 1 + dfs(i-1 , j-1);
            grid[i-1][j-1] = 0 ;
        }
        
        let rup = Infinity ;
        if(isValid(i-1 , j+1)){
            grid[i-1][j+1] = 1 ;
            rup = 1 + dfs(i-1 , j+1);
            grid[i-1][j+1] = 0 ;
        }
        
        let lbtm = Infinity ;
        if(isValid(i+1 , j-1)){
            grid[i+1][j-1] = 1 ;
            lbtm = 1 + dfs(i+1 , j-1);
            grid[i+1][j-1]  = 0 ;
        }
        
        let rbtm = Infinity ;
        if(isValid(i+1 , j+1)){
            grid[i+1][j+1] = 1 ;
            rbtm = 1 + dfs(i+1 , j+1);
            grid[i+1][j+1] = 0 ;
        }
        
        return Math.min( up , down , left , right , lup , rup , lbtm , rbtm )

    }

    if(grid[0][0] == 1) return -1 ;

    const ans = dfs(0,0) ;
    return ans == Infinity ? -1 : ans ;

};

// BFS way which is most optimized and it will work 
/**
LOGIC  : Apply Dijkstra Algo . Basically matrix k sabhi cell ko graph ki tarah maan lo . 
 */
var shortestPathBinaryMatrix = function(grid) {
    
    const row = grid.length ;
    const col = grid[0].length ;

    if(grid[0][0] == 1) return -1 ;

    if(row == 1) return col ;  // edges cases , if only one row , then  one way to reach
    if(col == 1) return row ;

    const isValid = (i,j)=>{
        if(i>=0 && i<row && j>=0 && j<col && grid[i][j] == 0) return true ;
        return false ;
    }

    let dist = Array.from({length : row} , ()=>{
        return Array.from({length : col} , ()=>Infinity );
    })

    dist[0][0] = 0 ;
    let q = [ [ 1 , 0 , 0 ] ]  // wt , row , col

    while(q.length > 0){

        const curr = q.shift() ;
        const [wt , i , j] = curr ;

        // move in eight direction as it's neighbours
        // up
        if(isValid(i-1 , j) && wt + 1 < dist[i-1][j] ){
            dist[i-1][j] = wt+1 ;
            q.push( [wt+1 , i-1 , j] );
        }

        // down
        if(isValid(i+1 , j) && wt + 1 < dist[i+1][j] ){
            dist[i+1][j] = wt+1 ;
            q.push( [wt+1 , i+1 , j]);
        }

        // left
        if(isValid(i , j-1) && wt + 1 < dist[i][j-1] ){
            dist[i][j-1] = wt+1 ;
            q.push( [wt+1 , i , j-1]);
        }
        
        // right
        if(isValid(i , j+1) && wt + 1 < dist[i][j+1] ){
            dist[i][j+1] = wt+1 ;
            q.push( [wt+1 , i , j+1]);
        }
        
        // left upper
        if(isValid(i-1 , j-1) && wt + 1 < dist[i-1][j-1] ){
            dist[i-1][j-1] = wt+1 ;
            q.push( [wt+1 , i-1 , j-1]);
        }
        
        // right upper
        if(isValid(i-1 , j+1) && wt + 1 < dist[i-1][j+1] ){
            dist[i-1][j+1] = wt+1 ;
            q.push( [wt+1 , i-1 , j+1]);
        }
        
        // left bottom
        if(isValid(i+1 , j-1) && wt + 1 < dist[i+1][j-1] ){
            dist[i+1][j-1] = wt+1 ;
            q.push( [wt+1 , i+1 , j-1]);
        }
        
        // right bottom
        if(isValid(i+1 , j+1) && wt + 1 < dist[i+1][j+1] ){
            dist[i+1][j+1] = wt+1 ;
            q.push( [wt+1 , i+1 , j+1]);
        }
    }

    return dist[row-1][col-1] == Infinity ? -1 : dist[row-1][col-1]  ;
};

// Same logic just remove 8 times checking index which is more prone to error
/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function(grid) {
    
    const row = grid.length ;
    const col = grid[0].length ;

    if(grid[0][0] == 1) return -1 ;

    if(row == 1) return col ;  // edges cases , if only one row , then  one way to reach
    if(col == 1) return row ;

    const isValid = (i,j)=>{
        if(i>=0 && i<row && j>=0 && j<col && grid[i][j] == 0) return true ;
        return false ;
    }

    let dist = Array.from({length : row} , ()=>{
        return Array.from({length : col} , ()=>Infinity );
    })

    dist[0][0] = 0 ;
    let q = [ [ 1 , 0 , 0 ] ]  // wt , row , col

    let dirs = [-1 , 0 , 1] ;

    while(q.length > 0){

        const curr = q.shift() ;
        const [wt , i , j] = curr ;
        
        for(const x of dirs){
            for(const y of dirs){
                if(x == 0 && y==0) continue ;

                const newRow = i+x ;
                const newCol = j+y ;

                if(isValid( newRow , newCol ) && wt+1 < dist[newRow][newCol] ){
                    dist[newRow][newCol] = wt + 1 ;
                    q.push( [wt+1 , newRow , newCol] );
                }
            }
        }
    }
    return dist[row-1][col-1] == Infinity ? -1 : dist[row-1][col-1]  ;
};


// ======================================== 6. Path With Minimum Effort =================================================
/**
Leetcode : https://leetcode.com/problems/path-with-minimum-effort/

You are a hiker preparing for an upcoming hike. You are given heights, a 2D array of size rows x columns, 
where heights[row][col] represents the height of cell (row, col). You are situated in the top-left cell, (0, 0), 
and you hope to travel to the bottom-right cell, (rows-1, columns-1) (i.e., 0-indexed). You can move up, down, left, 
or right, and you wish to find a route that requires the minimum effort.

A route's effort is the maximum absolute difference in heights between two consecutive cells of the route.
Return the minimum effort required to travel from the top-left cell to the bottom-right cell.

Input: heights = [[1,2,2],[3,8,2],[5,3,5]]
Output: 2
Explanation: The route of [1,3,5,3,5] has a maximum absolute difference of 2 in consecutive cells.
This is better than the route of [1,2,2,2,5], where the maximum absolute difference is 3.

LOGIC : Same as previous one . Same apply Dijkstra Algorithm . 
 */
var minimumEffortPath = function(heights) {
    
    // Get the grid size
    const n = heights.length;
    const m = heights[0].length;

    let dist = Array.from({ length: n }, () => Array(m).fill(Infinity));
    dist[0][0] = 0;  // Distance for the source cell (0, 0) is 0

    let pq = [[0, 0, 0]];  // wt , r , c

    // Define the possible directions (up, right, down, left)
    const dr = [-1, 0, 1, 0];
    const dc = [0, 1, 0, -1];

    let flag = false ;  // optimizing ; make sorting as less as possible

    // Start the Dijkstra algorithm
    while(pq.length > 0){

        if(flag){
            pq.sort((a, b) => a[0] - b[0]);  
            flag = false ;
        }

        const [diff , r , c] = pq.shift();

        // If we reach the destination cell, return the current effort
        if (r === n - 1 && c === m - 1) {
            return diff;
        }

        // Check all 4 possible adjacent cells
        for (let i = 0; i < 4; i++) {
            const newr = r + dr[i];
            const newc = c + dc[i];

            // Check if the new cell is within bounds
            if (newr >= 0 && newr < n && newc >= 0 && newc < m) {
                const newEffort = Math.max(Math.abs(heights[r][c] - heights[newr][newc]), diff);

                // If the calculated effort is less, update and push to the queue
                if (newEffort < dist[newr][newc]) {
                    flag = true ;
                    dist[newr][newc] = newEffort;
                    pq.push([newEffort, newr, newc]);
                }
            }
        }
    }

    return 0;  // If unreachable (although it should not reach here)
};


// =========================================== 7. Cheapest Flight Within K Stops =========================================
/**
Leetcode : https://leetcode.com/problems/cheapest-flights-within-k-stops/

Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700

Time Complexity: O(N), where the additional log(N) time is eliminated by using a simple queue rather than a priority
queue, which is usually used in Dijkstra’s Algorithm. Where N = Number of flights / Number of edges.

Space Complexity: O(|E| + |V|), for the adjacency list, priority queue, and the dist array. Where E = Number of
edges (flights.size()) and V = Number of airports.

LOGIC : Easy One . Just apply BFS with level order traversal . Number of stops will automatically get sorted . Cooollll!!!!! . 
 */
var findCheapestPrice = function(n, flights, src, dst, k) {
    
    let graph = Array.from({ length: n }, () => []);

    for (let [u, v, w] of flights) {
        graph[u].push([v, w]);
    }

    let dist = Array(n).fill(Infinity);
    dist[src] = 0;

    let queue = [[src, 0]];
    let stops = 0;

    while (queue.length > 0 && stops <= k) {
        let size = queue.length;

        for (let i = 0; i < size; i++) {
            let [node, cost] = queue.shift();

            for (let [nei, price] of graph[node]) {
                if (cost + price < dist[nei]) {
                    dist[nei] = cost + price;
                    queue.push([nei, dist[nei]]);
                }
            }
        }
        stops++;
    }
    return dist[dst] === Infinity ? -1 : dist[dst];
};


// ====================================== 8. Network Delay Time =======================================================
/**
Leetcode : https://leetcode.com/problems/network-delay-time/description/

Basically nodes k bich me time de rakha hai . Question me source node diya hai . Or batana hai ki waha se kam se kam 
kitne time me info sabhi node k pass pahoch jayegi . 

LOGIC : Easy , just apply BFS level order traversal with Dijsktra algo . Last me distance array me jo bhi maximum 
time hoga , wahi minimum time hoga sabhi node tak info pahochne k liye
 */
var networkDelayTime = function(times, n, k) {
    
    let graph = Array.from({length : n} , ()=>[]);

    for(let i = 0 ; i<times.length ; i++){
        const [src , dest , time] = times[i] ;
        graph[src-1].push( [dest-1 , time] )
    }

    let pq = [  [ k-1 , 0 ] ] ;

    let dist = Array.from({length : n } , ()=>Infinity);
    dist[k-1] = 0 ;

    while(pq.length > 0){

        const qLen = pq.length ;

        for(let i = 0  ; i<qLen ; i++){

            const curr = pq.shift() ;

            const [ currNode , currTime ] = curr ;
            for(const nei  of graph[currNode]){
                const [neiNode , neiTime] = nei ;

                if( dist[currNode] + neiTime < dist[neiNode] ){
                    dist[neiNode] = dist[currNode] + neiTime ;
                    pq.push( [ neiNode , dist[neiNode] ] )
                }
            }
        }  
    }

    let ans = -1 ;

    for(let i = 0 ; i<n ; i++){
        if(dist[i] == Infinity) return -1 ;
        ans = Math.max(ans , dist[i]);
    }

    return ans ;
};


// ===================================== 8. Minimum Steps to reach the end ===========================================
/**
GFG : https://www.geeksforgeeks.org/problems/minimum-multiplications-to-reach-end/1
Given start, end and an array arr of n numbers. At each step, start is multiplied with any number in the array and 
then mod operation with 100000 is done to get the new start.

Your task is to find the minimum steps in which end can be achieved starting from start. If it is not possible to reach 
end, then return -1.

Example 1 
Input:
arr[] = {2, 5, 7}
start = 3, end = 30
Output: 2
Explanation:
Step 1: 3*2 = 6 % 100000 = 6 
Step 2: 6*5 = 30 % 100000 = 30

Example 2:
Input:
arr[] = {3, 4, 65}
start = 7, end = 66175
Output:4
Explanation:
Step 1: 7*3 = 21 % 100000 = 21 
Step 2: 21*3 = 63 % 100000 = 63 
Step 3: 63*65 = 4095 % 100000 = 4095 
Step 4: 4095*65 = 266175 % 100000 = 66175

LOGIC : Same apply Dijsktra . From 0 to 100000 MOD takes dist array . Treat them as node . And for every node ,
there is n neighbour where n is the size of array . 

Time Complexity : O(100000 * N), Where ‘100000’ are the total possible numbers generated by multiplication
(hypothetical) and N = size of the array with numbers of which each node could be multiplied.

Space Complexity : O(100000 * N), Where ‘100000’ are the total possible numbers generated by multiplication
(hypothetical) and N = size of the array with numbers of which each node could be multiplied. 100000 * N is the
max possible queue size. The space complexity of the dist array is constant.
     */
class Solution {
    
    minimumMultiplications(arr, start, end) {
       
        const n = arr.length ;
        const MOD = 100000 ;
        
        let dist = Array.from({length : MOD} , ()=>Infinity) ;
        dist[start] = 0 ;
        
        let q = [[ 0 , start] ] ;
        let front = 0 ;
        while(front < q.length){
            const curr = q.at(front) ;
            front+=1 ;
            const [steps , prod] = curr ;
            
            if(prod == end) return steps ;
            
            for(const x of arr){
                const newProd = (prod * x)%MOD ;
               
                const newStep = steps + 1 ;
                
                if( newStep < dist[newProd] ){
                    dist[newProd] = newStep;
                    q.push( [ newStep , newProd ] )
                }
            } 
        }   
        return dist[end] == Infinity ? -1 : dist[end];
    }
}


// ===========================================9. Bellman Ford Algorithm ================================================
/**
GFG : https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1

1. This algo can works with negative weight also . 
2. But this algo will not works with negative weight cycle . Obviouslly . Agar cycle hi negative ho gya to jitni baaar
circle lagayega utni baar isko kam weight wala path milega . 
3. Bellman ford sirf directed graph k liye hi hai . Agar undirected graph k liye use krna hai to pehle undirected
graph to directed graph me convert karna padega . Aiisa isiliye kyuki thoda soch agar  0 --- 1 hai , or src 0 
hai , to pehle 1 k liye relaxation karega , or fir turant next cycle me 0 k liye karne lagega . 

Imporatant notes . 
1. Why only V-1 relaxation ?
Ans : Agar graph ye hai  0 -> 1 -> 2 -> 3 -> 4  or sabhi edge ka wait 1 hai . or source node 0 hai . 
Ab agar V vertex / node me hume 1 vertex pata hi hai jo ki src 0 hai . matlab 0 se 0 jane me 0 cost lag rha hai . 
To baanki V-1 vertex hi bacha nikalne k liye . 
Agar isko V times chalate hai to bhi work karega lekin lekin lekin agar negative cycle hai to nahi karega jo ki waise 
bhi nahi karta !!!! . 

2. How to detect negative cycle ?
Ans : Agar V-1 chalane k baad fir bhi koi gunjaish reh jati hai , it means kuch to hai jo ki negative weight cycle 
bana rahi hai . !! . 

Time Complexity: O(V*E), where V = no. of vertices and E = no. of Edges.
Space Complexity: O(V) for the distance array which stores the minimized distances.
 */

class Solution {
    bellmanFord(V, edges, src) {
        
        const MAX = 10**8 ;
        let dist = Array.from({length : V} , ()=>MAX) ;
        dist[src] = 0 ;
        
        for(let i = 0 ; i<V-1 ; i++){
            for(const e of edges){
                const [sc , dest , wt] = e ;
                if( dist[sc] != MAX && dist[sc] + wt < dist[dest] ){
                    dist[dest] = dist[sc] + wt ;
                }
            }   
        }
        
        // negative weight cycle check
        for(const e of edges){
            const [sc , dest , wt] = e ;
            if( dist[sc] !== MAX && dist[sc] + wt < dist[dest] ){
                return [-1]
            }
        }  
        return dist ;
    }
}


// ==================================== 10 . Floyd Warshall Algorithm (MISSING)==========================================

// =====================================11. City With Smalles Neighbour under given threshhold ============================
/**
Leetcode : https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/

Basically cities ka graph de rakha hai . Ek city se dusre city me jane ka cost hai . Ek threshold dia hua hai ,
matlab utne hi cost me kahi jaa sakte hai . To batana hai , kon se city ka sabse kam padosi hai , jaha jaha jaa sakte hai . 
For better understanding go to question . 

Example 1:
Input: n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4
Output: 3
Explanation: The figure above describes the graph. 
The neighboring cities at a distanceThreshold = 4 for each city are:
City 0 -> [City 1, City 2] 
City 1 -> [City 0, City 2, City 3] 
City 2 -> [City 0, City 1, City 3] 
City 3 -> [City 1, City 2] 
Cities 0 and 3 have 2 neighboring cities at a distanceThreshold = 4, but we have to return city 3 since it has the greatest number.

LOGIC : Are sabhi city se har jagah jaane ka shortest path and cost nikal lene ka , or last me check krlo 
kaha se kitne city me jaa sakte hai under given threshold . Isme Bellman ford lagaya hai , Dijkstra bhi lag sakta hai . 
Bas Dijkstra k liye , isko pehle proper graph strcture me karna padega . 
 */
var findTheCity = function(n, edges, distanceThreshold) {
    
    const belmanFord = (src)=>{
        let dist = Array.from({length : n} , ()=>Infinity) ;
        dist[src] = 0  ;

        for(let i = 0 ; i<n-1 ; i++){
            for(const e of edges){
                const [sc , dest , cost] = e ;
                if( dist[sc] + cost < dist[dest] ){
                    dist[dest] = dist[sc] + cost ;
                }
                if( dist[dest] + cost < dist[sc] ){
                    dist[sc] = dist[dest] + cost ;
                }
            }
        }
        return dist ;
    }
   
    let arr = Array.from({length : n} , ()=>[] );

    for(let i= 0 ; i<n ; i++){
        const rs = belmanFord(i) ;
        arr[i].push(...rs);
    }

    let ansNode = 0 ;
    let ansCount = Infinity ;
    for(let i = 0 ; i< n ; i++){
        let cnt = 0 ;
        for(let j = 0 ; j<n ; j++){
            if(arr[i][j] <= distanceThreshold){
                cnt+=1 ;
            }
        }
        if(ansCount >= cnt){
            ansCount = cnt ;
            ansNode = i ;
        }
    }
    return ansNode ;
};















