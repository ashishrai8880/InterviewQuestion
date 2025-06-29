/*
1 --- 3
/ | \
0 | 5 -- 6
\ | /
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
        this.graph = [] ;
        for(let i=0 ; i< 4 ; i++){
            this.graph[i] = [];
        }
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
}

const graph = new Graph();
graph.createGraph()
graph.printNeighbours(2)

// bfs traversal
graph.bfsTraversal(0) ;

// for broken graph 
const isVisited = Array.from({ length: 4 }, () => false);
for(let i =0 ; i< isVisited.length ; i++){
    if(isVisited[i] == false){
        graph.bfsTraversalInBrokenGraph(i , isVisited)
    }
}


