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
        const startVertex = this.graph[index];
        
        const q = new Queue();
        q.push(index);
        
        const isVisited = new Array(4);
        isVisited.fill(false);
        
        while(!q.isEmpty()){
            const currVertexIndex = q.peek();
            const currVertex = this.graph[currVertexIndex] ;
            
            if(!isVisited[q.peek()]){
                console.log(q.peek());
                let i = 0 ;
                while(i < currVertex.length){
                    const child = currVertex[i].dest ;
                    q.push(child)
                    i++ ;
                }
                isVisited[currVertexIndex] = true ;
            }
            q.pop()
        }
    }
}

const graph = new Graph();
graph.createGraph()
graph.printNeighbours(2)


