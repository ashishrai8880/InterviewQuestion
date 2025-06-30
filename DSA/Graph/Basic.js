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
    


