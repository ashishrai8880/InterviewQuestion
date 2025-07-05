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



// ========================================  2 Cycle Detection (TC = O(V+E)===========================================
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


    


