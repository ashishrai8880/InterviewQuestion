/*
 1 --- 3
/      |  \
0      |     5 -- 6
\      |   /
 2 ---- 4
*/

//Helper Queue
class Queue{
    constructor(){
        this.arr = [];
    }
    
    push(e){
        this.arr.push(e);
    }
    
    pop(){
        this.arr.shift();
    }
    
    peek(){
        return this.arr[0];
    }
    
    print(){
        console.log(this.arr);
    }
    
    isEmpty(){
        return !this.arr.length ;
    }
}


class Edge{
    constructor(src , dest , weight=0){
        this.src = src ;
        this.dest = dest ;
        this.weight = weight ;
    }
}

class Graph{
    
    constructor(){
        this.graph = Array.from({length : 7 } , ()=>[]) ;
    }
    
    createGraph(){
        this.graph[0].push(new Edge(0,2));
        
        this.graph[1].push(new Edge(1,2));
        this.graph[1].push(new Edge(1,3));
        
        this.graph[2].push(new Edge(2,0));
        this.graph[2].push(new Edge(2,1));
        this.graph[2].push(new Edge(2,3));
        
        this.graph[3].push(new Edge(3,1));
        this.graph[3].push(new Edge(3,2));
    }
    
    printNeighbours(index){
        const vertex = this.graph[index];
        vertex.forEach(ele=>{
            console.log(ele.src , " ", ele.dest , " ",ele.weight)
        })
    }

    
    bfsTraversal(index){
        const q = new Queue();
        q.push(index);
        
        const isVisited = new Array(4);
        isVisited.fill(false);
        
        while(!q.isEmpty()){
            const currVertex = this.graph[q.peek()] ;
            
            if(!isVisited[q.peek()]){
                console.log(q.peek());
                currVertex.forEach((ele)=>{
                    q.push(ele.dest)
                })
                isVisited[currVertexIndex] = true ;
            }
            q.pop()
        }
    }
    bfsTraversalInBrokenGraph(start , isVisited=[]){
        const q = new Queue();
        q.push(start);
        
        while(!q.isEmpty()){
            const currVertex = this.graph[q.peek()];
            if(!isVisited[q.peek()] ){
                isVisited[q.peek()] = true ;
                console.log(q.peek());
                currVertex.forEach((ele)=>{
                    q.push(ele.dest);
                })
            }
             q.pop();
        }  
    }
    dfsTraversal(root , isVisited=[]){
        console.log(root) ;
        isVisited[root] = true 
        
        const vertex = this.graph[root] || [];
        
        //calling for child first of current vertex
        for(let i=0 ; i<vertex.length ; i++){
            const child = vertex[i].dest ;
            if(isVisited[child] ==false){
                this.dfsTraversal(child , isVisited);
            }
        }
    }

    
    printAllPaths(src , target , path="" , isVisited=[]){
        if(src == target){
            console.log(path);
            return ; 
        }
    
        const currVertex = this.graph[src] || [];
    
        currVertex.forEach((edge)=>{
            if(isVisited[edge.dest] == false){
                isVisited[edge.dest] = true ;
                this.printAllPaths(edge.dest , target , path+`${edge.dest}` , isVisited) ;
                isVisited[edge.dest] = false ;
            }
        })
    }
}

const graph = new Graph();
graph.createGraph()
graph.printNeighbours(2)

// bfs traversal . Time complexity : O (V + E) = O (N) . V is number of vertex and E is number of edges . This TC will be same for second bfsTraversalInBrokenGraph also .
graph.bfsTraversal(0) ; 

// for broken graph 
const isVisited = Array.from({ length: 4 }, () => false);
for(let i =0 ; i< isVisited.length ; i++){
    if(isVisited[i] == false){
        graph.bfsTraversalInBrokenGraph(i , isVisited)
    }
}

// dfs Traversal
graph.dfsTraversal(0 , isVisited) ;

// dfs Traversal for broken graph /seperated graph
for(let i =0 ; i<isVisited.length ; i++){
    if(isVisited[i] == false){
        graph.dfsTraversal(i , isVisited) ;
    }
}


// print all path
isVisited[0] = true ;
graph.printAllPaths(0 , 5 , "0" , isVisited)



// ========================================  2 Cycle Detection (Directed Graph) (TC = O(V+E)===========================================
/*
 1 --->  0                                              
        ⬇️  ↖️
        ⬇️     3
        ⬇️   ↗️
        2
*/

/*
 0 ----->  1 <------ 2                                              
                ↙️  ⬆️
             ↙️     ⬆️
           3 --------> 4
*/

class Edge{
   
    constructor(src , dest){
        this.src = src ;
        this.dest = dest ;
    }
}

class Graph{
    
    constructor(size){
        console.log("size is : ",size)
        this.graph = Array.from({length : size} , ()=>[]);
    }
    
    createGraph(){

        this.graph[0].push(new Edge(0,2)) ;
        this.graph[1].push(new Edge(1,0)) ;
        this.graph[2].push(new Edge(2,3)) ;
        this.graph[3].push(new Edge(3,0)) ;
        
    }
    
    isCyclicHelper(start , isVisited=[] , rec=[]){
        
        isVisited[start] = true ;
        rec[start] = true ;
        
        const vertices = this.graph[start] ;
        
        for(let i = 0 ; i<vertices.length ; i++){
            const edge = vertices[i] ;
            if(rec[edge.dest]){ //cycle
                return true ;
            }
            else if(!isVisited[edge.dest]){
                if(this.isCyclicHelper(edge.dest , isVisited , rec)){
                    return true ;
                }
            }
        }
        
        rec[start] = false ;
        return false ;
        
    }
    
    // ✅ Wrapper that checks all nodes
    isCyclic() {
        console.log("length of graph : ",this.graph.length)
        const isVisited = Array(this.graph.length).fill(false);
        const rec = Array(this.graph.length).fill(false);

        for (let i = 0; i < this.graph.length; i++) {
            if (!isVisited[i]) {
                if (this.isCyclicHelper(i, isVisited, rec)) {
                    return true;
                }
            }
        }

        return false;
    }
}

const g = new Graph(4);
g.createGraph();
console.log("is cyclic updated : ",g.isCyclic());



// ========================================  3 Topological Sort ===========================================

// It is only for Directed Acyclic Graph (DAG) . DAG is a linear order of vertices such that  every directed edge
//  U -> V , the vertex u comes before v in the order . 
/*
  5                   4
 ⬇️  ↘️         ↙️  ⬇️
 ⬇️     ↘️   ↙️     ⬇️                     
 ⬇️        0         ⬇️
 ⬇️                  ⬇️
  2                   1
    ↘️        ↗️
          3  
*/

// Algo 
// 1. Apply Simple DFS , take 1 stack , which will store data at last . When it arrives at the peak or leaf element , it will store it . And print stack in reverse order .


class Edge{
   
    constructor(src , dest){
        this.src = src ;
        this.dest = dest ;
    }
}

class Graph{
    
    constructor(size){
        this.graph = Array.from({length : size} , ()=>[]);
    }
    
    constructor(size){
        this.graph = Array.from({length : size} , ()=>[]);
    }
    
    createGraph(){

        this.graph[2].push(new Edge(2,3)) ;
        this.graph[3].push(new Edge(3,1)) ;
        this.graph[4].push(new Edge(4,0) ,  new Edge(4,1)) ;
        this.graph[5].push(new Edge(5,0) , new Edge(5,2) ) ;
        
    }
    
    topologicalSortUtil(curr , isVisited=[] , stack=[]){
        
        isVisited[curr] = true ;
        
        
        const vertex = this.graph[curr];
        
        //call for each of its neighbours
        for(let i = 0 ; i<vertex.length ; i++){
            if(isVisited[vertex[i].dest] == false){
                this.topologicalSortUtil(vertex[i].dest , isVisited , stack);
            }
        }
        
        stack.push(curr);
        console.log({stack , isVisited})
        
    }
    
    topologicalSort(){
        let stack = [] ;
        let isVisited = Array.from( {length : this.graph.length }  , ()=>false );
       
        
        for(let i = 0 ; i<this.graph.length ; i++){
            console.log(" i : ",i)
            if(isVisited[i] == false){
                this.topologicalSortUtil(i ,isVisited , stack);
            }
        }
        return stack ;
        
    }
}


const g = new Graph(6);
g.createGraph();
const stack = g.topologicalSort();
console.log(stack.reverse());   // opposite console of stack will print correct topoplogical order 

//=========2nd method of topological sort
// Algo : First calculate indegree of each node . 
// Take one queue , and first time push all node which have indegree 0 . 
// Apply loop until queue is empty . For every node , subtract its neigbour node indeg by 1 and check , if there is again 0 indeg node is coming ,then again push into queue.


class Solution {
    topoSort(V, edges) {
        let indeg = Array.from({length : V} , ()=>0);
        let adj = {} ;
        
        for (let i = 0; i < V; i++) {
            adj[i] = [];
        }

        edges.forEach((e) => {
            const src = e[0];
            const dest = e[1];
            indeg[dest]++;
            adj[src].push(dest);
        });
        
        let q = [];
        indeg.forEach((e , i)=>{
            if(e == 0 ){
                q.push(i)
            }
        })
        
        let res = [];
        while(q.length !== 0){
            const v = q.shift();
            res.push(v);
            
            // checking its neighbours
            const vertex = adj[v];
            for(const ver of vertex){
                indeg[ver]-- ;
                
                if(indeg[ver] == 0){
                    q.push(ver);
                }
            }
        }
        return res ;
        
    }
}



// ========================================== Cycle Detection in Undirected Graph ======================================

/*
     1 --------2 
  /  |         |
0    |         |
  \  |         |
     4         3
       \
         5
 
*/


/*
Pseudo Code : We need to store parent of vertex . because in Undirected graph , one can easily go back to previous vertex 
which will give wrong result . for eg : vertex 0 to vertex 1 , now 1 is also connected to 0 , that doesnot mean it is cyclic
graph . 

CASE 1 : if  visited[dest] == true  &&   parent != dest 
         This means traversing coming back to previous visited node and it is not its just immediate previous node , it means it is making
         cycle 

CASE 2 : if   visited[dest] == false 
                 call for its neighbours , and if in further traversing there is cycle found  , then return true 
                 dfs(dest , visited , curr)  curr will now act as a parent for next node 
*/



class Graph{
    
    constructor(size){
        this.graph = Array.from({length : size} , ()=>[]);
    }
    
    createGraph(){

        this.graph[0].push(new Edge(0,1) , new Edge(0,4)) ;
        
        this.graph[1].push(new Edge(1,0),new Edge(1,2) , new Edge(1,4)) ;
        
        this.graph[2].push(new Edge(2,3) ) ;
        
        this.graph[4].push(new Edge(4,0) , new Edge(4,1) , new Edge(4,5) ) ;
        
        this.graph[5].push(new Edge(5,4))
        
    }
    
    isCyclicUtil(curr , isVisited=[] , parent){
        console.log({curr , isVisited , parent})
        
        isVisited[curr] = true ;
        const vertex = this.graph[curr] ;
        
        for(let i = 0 ; i<vertex.length ; i++){
            const dest = vertex[i].dest ;
            
            if(isVisited[dest] == true && dest != parent ){
                return true ;
            }
            
            if(isVisited[dest] == false){
                const r = this.isCyclicUtil(dest , isVisited , curr) ;
                if(r == true){
                    return true ;
                }
            }
            
        }
     return false ;
        
    }
    
    isCyclic(){
        
        let isVisited = Array.from({length : 6} , ()=>false);
        
        for(let i = 0 ; i<this.graph.length ; i++){
            return this.isCyclicUtil(i , isVisited , -1);
        }
    }
    
    
    
}

const g = new Graph(6);
g.createGraph();

const result = g.isCyclic();
console.log(result); 

// ===================================================Shortest Path In Unweighted Graph ===================================================================================================================
// Logic : Take distance array and initialize with Infinity . It will be like greedy technique . When you move forward , just store dist[v] = dist[u] + 1 , when you are going from u->v


class Edge{
    constructor(src , dest){
        this.src = src ;
        this.dest = dest ;
    }
}

class Graph{
    constructor(n , mat){
        this.graph = Array.from({length : n},()=>[]);
        this.size = n ;
        
        mat.forEach((e)=>{
            const s = e[0];
            const d = e[1]
            this.graph[s].push(new Edge(s , d));
            this.graph[d].push(new Edge(d , s));
        })
    }
    
    shortestPath(src , dest ){
        
        let isVisited = Array.from({length : this.size} , ()=>false);
        let distance = Array.from({length : this.size} , ()=>Infinity);
        
        //Apply BFS
        distance[src] = 0 ;
        isVisited[src] = true ;
        let q = [];
        q.push(src);
        
        while(q.length !=0 ){
            
            const u = q.shift();
            const vertex = this.graph[u];
            
            // iterating its neighbour
            for(const v of vertex){
                if(isVisited[v.dest] == false){
                    isVisited[v.dest] = true ;
                    distance[v.dest] = distance[u]+1 ;
                    q.push(v.dest);
                }
            }
        }
        return distance ;
        
    }
}

const n = 8 ;
const list = [[1,2],[1,0],[0,3],[3,7],[3,4],[7,4],[7,6],[4,6],[4,5],[6,5]];
const g= new Graph(8 , list);
console.log(g.shortestPath(0,7))


// ============================================= Part 3 : Dijkstra Algorithm (Shortest Path between source to destination)=========================================================================
// Approach : First take cheapest array , which will at starting save infinity for all destination except source . Source will contain 0 cost , because source to source takes 
// 0 cost . This algorithm uses BFS technique . It also uses priority queue or MIN Heap of Pair . 
// Pair class will contain 2 data , one is destination and second is cost to go to that destination . It is stored inside priority queue or min heap . 
// This PQ will sort data based on cost in ascending order . 

// Time Complexity : O( E + ELogV)

/*        7
      1 ------->3 
2 ↗️  |         |  ↘️ 1
0      |1      2|     5
4 ↘️  |         |  ↗️ 5
     2 ------> 4
          3
      
 
*/
class Pair{
    constructor(dest , cost){
        this.dest = dest ;
        this.cost = cost ;
    }
}

class MinHeap{
    constructor(){
        this.arr = [];
    }
    
    add(pair){
        this.arr.push(pair);
        this.arr.sort((a , b)=> a.cost - b.cost);
    }
    
    peek(){
        return this.arr[0] ;
    }
    
    pop(){
        const poppedElement = this.arr[0];
        this.arr.shift();
        return poppedElement ;
    }
    
    size(){
        return this.arr.length ;
    }
    
    isEmpty(){
        return this.arr.length > 0 ? false : true ;
    }
}

class Edge{
    constructor(src , dest , cost){
        this.src = src ;
        this.dest = dest ;
        this.cost = cost ;
    }
}

class Graph{
    constructor(n){
        this.graph = Array.from({length : n} , ()=>[]);
    }
    
    createGraph(){
      this.graph[0].push(new Edge(0, 1, 2));
      this.graph[0].push(new Edge(0, 2, 4));
      this.graph[1].push(new Edge(1, 3, 7));
      this.graph[1].push(new Edge(1, 2, 1));
      this.graph[2].push(new Edge(2, 4, 3));
      this.graph[3].push(new Edge(3, 5, 1));
      this.graph[4].push(new Edge(4, 3, 2));
      this.graph[4].push(new Edge(4, 5, 5));
    }
    
    getShortestPath(src){
        
        const isVisited = Array.from({length : this.graph.length}, ()=>false);
        const cheapest = Array.from({length : this.graph.length}, ()=>Infinity);
        
        cheapest[src] = 0 ;  // source to source , cost will be 0
        
        const pq = new MinHeap();
        pq.add( new Pair(src , 0)); // add first element in priority queue 
       
        while(!pq.isEmpty()){
            
            const pair = pq.pop();
            const u = pair.dest ;
            const vertex = this.graph[u] ;
         
            if(isVisited[u] == false){
                isVisited[u] = true ;
                for(let e of vertex){
                    const v = e.dest ;
                    if( cheapest[u] + e.cost < cheapest[v] ){
                        cheapest[v] = cheapest[u] + e.cost ;
                        pq.add( new Pair(v , cheapest[v] ));
                    }
                }
            }
        }
        return cheapest ;
    }
}

const g = new Graph(6);
g.createGraph();
console.log(g.getShortestPath(0))



// ============================================= Part 3 : BellmanFord Algorithm (Shortest Path between source to destination)=========================================================================
// Approach : Easier Than Dijksta . Time Complexity is : O(V*E) more than Dijkstra .
//Just iterate over loop and keep saving minimum cost to reach to destination . 
// Bellman ford algorithm fail in negative weight cycle . Negative weight cycle forms where , there is sum of all weight in 
//cycle is in negative or less than 0 . To detect negative weight cycle , there is another loop at last . All logic will be same
// This is just to check , if there is still relaxation conditioin is true ,it means it is forming negative weight cycle . 

class Edge{
    constructor(src , dest , cost){
        this.src = src ;
        this.dest = dest ;
        this.cost = cost ;
    }
}

class Graph{
    constructor(n){
        this.graph = Array.from({length : n},()=>[]);
    }
    
    createGraph(){
        
        this.graph[1].push( new Edge(1,0,4) , new Edge(1,2,-6) )
        this.graph[2].push(new Edge(2,3,5))
        this.graph[3].push(new Edge(3,1,-2))
        
    }
    
    bellmanFord(src){
        const cost = Array.from({length : this.graph.length},()=>Infinity)
        
        cost[src] = 0 ;
        
        this.graph.forEach((node , index)=>{
            node.forEach((edge)=>{
                const u = index ;
                const c = edge.cost ;
                const v = edge.dest ;
                if(cost[u] + c < cost[v]){
                    cost[v] = cost[u] + c ;
                }
            })
        })
        
        // To Detect Negative Cycle
        let flag = false ;
        this.graph.forEach((node , index)=>{
            node.forEach((edge)=>{
                const u = index ;
                const c = edge.cost ;
                const v = edge.dest ;
                if(cost[u] + c < cost[v]){
                    flag = true ;
                }
            })
        })
        if(flag){
            return [-1]
        }
        
        return cost ;
    }
}

const g = new Graph(4);
g.createGraph()
const ans = g.bellmanFord(1);
console.log({ans})






// ============================================= Part 4 : Prim's Algorithm (For MST Minimum Spanning Tree)=========================================================================
// Approach : Similar To Dijkstra . Uses BFS . Time Complexity is : O(ELogE) Everytime there is sorting in minHeap that's why ElogE .
// A minimum spanning tree (MST) or minimum weight spanning tree is a subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight.
// MST will contain all vertex of graph , but sum of all edge should be minimum .
// It should not contains any cycle in it . There should not any directed graph . And All node should be connected . Only then prim's algorithm can apply .


/*     

           0 
    10   / | \  15
       /   |    \
     1     |30   2        
       \   |    /
    40   \ |  /  50
           3


         Answer Should be 55

           0 
    10   / | \  15
       /   |    \
     1     |30   2        
           |    
           |    
           3
           
*/

class Pair{
    constructor(dest , cost){
        this.dest = dest ;
        this.cost = cost ;
    }
}

class MinHeap{
    constructor(){
        this.arr = [] ;
    }
    
    push(pair){
        this.arr.push(pair);
        this.arr.sort((a,b)=>a.cost-b.cost);
    }
    
    isEmpty(){
        return this.arr.length == 0 ;
    }
    
    peek(){
        return this.arr[0];
    }
    
    pop(){
        const popped = this.peek()
        this.arr.shift();
        return popped ;
    }
}

class Edge{
    constructor(src , dest , cost){
        this.src = src ;
        this.dest = dest ;
        this.cost = cost ;
    }
}

class Graph{
    constructor(n){
        this.graph = Array.from({length : n},()=>[]);
    }
    
    createGraph(){
        
        this.graph[0].push(new Edge(0, 1, 10));
        this.graph[0].push(new Edge(0, 2, 15));
        this.graph[0].push(new Edge(0, 3, 30));
        this.graph[1].push(new Edge(1, 0, 10));
        this.graph[1].push(new Edge(1, 3, 40));
        this.graph[2].push(new Edge(2, 0, 15));
        this.graph[2].push(new Edge(2, 3, 50));
        this.graph[3].push(new Edge(3, 1, 40));
        this.graph[3].push(new Edge(3, 2, 50));
    }
    
    primsAlgorithm(){
        
        const isVisited = Array.from({length : this.graph.length} , ()=>false) ;
        const pq = new MinHeap();
        pq.push(new Pair(0,0));
        let cost = 0 ;
        
        while(!pq.isEmpty()){
            
            const curr = pq.pop();
            if(isVisited[curr.dest] == false){
                isVisited[curr.dest] = true ;
                cost = cost + curr.cost ;
                for(let node of this.graph[curr.dest]){
                    if(isVisited[node.dest] == false){
                        pq.push(new Pair(node.dest , node.cost))
                    }
                }
            }
        }
        return cost ;
        
    }
}

const g = new Graph(4);
g.createGraph()
const ans = g.primsAlgorithm();
console.log({ans})



// short method of prim's algorithm . It is greedy type of algorithm . 
class Edge{
    constructor(src , dest , wt){
        this.src = src ;
        this.dest = dest ;
        this.wt = wt ;
    }
}

class Graph{
    constructor(n , mat){
        this.graph = Array.from({length : n} , ()=>[]);
        this.size = n ;
        
        mat.forEach((e)=>{
            const src = e[0];
            const dest = e[1];
            const wt = e[2];
            this.graph[src].push(new Edge(src , dest , wt));
            this.graph[dest].push(new Edge(dest , src , wt));
        })
    }
    
    primsAlgo(startNode){
        
        let vis = Array.from({length : this.size} , ()=>false);
        
        vis[startNode] = true ;
        let edges = [];
        let mst = [];
        let cost = 0 ;
        
        // traversing start node and add to edge
        const vertex = this.graph[startNode];
        for(const v of vertex){
            edges.push(v);
        }
        
        while(edges.length != 0){
            
            edges.sort((a,b)=>a.wt - b.wt);
            
            const curr = edges.shift();
            
            if(vis[curr.dest] == false){
                mst.push(curr);
                cost = cost + curr.wt ;
                vis[curr.dest] = true ;
                
                // pushing its neighbours
                for(const v of this.graph[curr.dest]){
                    if(vis[v.dest] == false){
                        edges.push(v)
                    }
                }
            }
        }
        return { edge : mst , cost} ;
    }
}

const n = 4 ;
const mat = [[0, 1, 10] , [0, 2, 15] , [0, 3, 30] , [1, 3, 40] , [2, 3, 50]] ;
const g = new Graph(n , mat);
const res = g.primsAlgo(3);
console.log(res);













    


