 // 1. Rotting Oranges  
// [[2,1,1],[1,1,0],[0,1,1]]  . You are given 2d matrix where 1-> fresh orange , 2-> rotten orange and 0 -> empty cell . Rotten orange can rotten its adjacent fresh orange
// in 1 unit time . You have to find minimum number of time required to rotten all fresh oranges . 
// Leetcode link : https://leetcode.com/problems/rotting-oranges/

const isValidPosition = (x, y, row, column, grid) => {
    return x >= 0 && x < row && y >= 0 && y < column && grid[x][y] === 1;
}

var orangesRotting = function(grid) {
    
    let q = [] ;
    const row = grid.length ; 
    const column = grid[0].length ;
    let fresh = 0 ;

    grid.forEach((r , ri)=>{
        r.forEach((c , ci)=>{
            if(c == 2){
                q.push([ri , ci])
            }
            else if(c == 1){
                fresh++ ;
            }
        })
    })
   
    if(fresh == 0){
        return 0 ;
    }

    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];
    
    let time = 0 ;
    while(q.length != 0){
        let temp = 0 ;
        const q_size = q.length;
        
        for(let i=0 ; i<q_size ; i++){
           
            const [x , y] = q[0];
           
            q.shift();

            // checking all its neghbours
            for(let j=0 ; j<4 ; j++){
                const neighbourRow = x + dx[j];
                const neighbourCol = y + dy[j] ;
                
                if(isValidPosition(neighbourRow , neighbourCol, row , column , grid)){
                    
                    grid[neighbourRow][neighbourCol] = 2 ;
                    q.push([neighbourRow,neighbourCol])
                    temp++ ;
                }
            }
        }
        if(temp > 0){
            time = time + 1 ;
        }
    }
    
    grid.forEach((r , ri)=>{
        r.forEach((c , ci)=>{
            if(c == 1){
                time = 0 ;
            }
        })
    })
    
    return time ? time : -1 ;

};




// ======================================= 2. Number of Island ====================================================
// LeetCode : https://leetcode.com/problems/number-of-islands/
//  Need to find number of island in matrix . where 1 denotes land and 0 is water . Island can be formed by connecting land 
// horizontally and vertically . 
/**
 * @param {character[][]} grid
 * @return {number}
 */

// Example 1:

// Input: grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// Output: 1
// Example 2:

// Input: grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// Output: 3

const isValid = (i , j , row , col , grid)=>{
    if(i>=0 && i<row && j>=0 && j<col && grid[i][j] == '1' ){
        return true ;
    }
    return false ;
}

const dfsTraversal = (i , j , row , col , grid)=>{

    if(grid[i][j] == '1'){
        grid[i][j] = '0';
    }

    if(isValid(i+1 , j , row , col , grid)){
        dfsTraversal(i+1 , j , row , col ,grid)
    }

    if(isValid(i , j+1 , row , col , grid)){
        dfsTraversal(i , j+1 , row , col ,grid)
    }
    
    if(isValid(i-1 , j , row , col , grid)){
        dfsTraversal(i-1 , j , row , col ,grid)
    }
    
    if(isValid(i , j-1 , row , col , grid)){
        dfsTraversal(i , j-1 , row , col ,grid)
    }

}

var numIslands = function(grid) {
    
    let ans = 0 ;
    let row = grid.length ;
    let col = grid[0].length ;

    for(let i=0 ; i<row ; i++){

        for(let j=0 ; j<col ; j++){
            if(grid[i][j] == '1'){
                ans = ans + 1 ;
                dfsTraversal(i , j , row , col , grid);
            }
        }

    }
    return ans ;


};


// ===================================3. Course Schedule ============================================================
// Leetcode Link : https://leetcode.com/problems/course-schedule/submissions/1687514818/
// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return true if you can finish all courses. Otherwise, return false.

// Example 1:

// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: true
// Explanation: There are a total of 2 courses to take. 
// To take course 1 you should have finished course 0. So it is possible.
// Example 2:

// Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
// Output: false
// Explanation: There are a total of 2 courses to take. 
// To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  const graph = new Graph(numCourses);
  graph.createGraph(numCourses, prerequisites);
  return !graph.isCyclic()  
};

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
    
    createGraph(numCourse , preRequisite=[]){
        
        preRequisite.forEach((ele , index)=>{
            const [ after , before ] = ele ;
            this.graph[before].push(new Edge(before , after));
        })
    }
    
    isCyclicUtil(curr , isVisited=[] , callStack=[]){
        
        isVisited[curr] = true ;
        callStack[curr] = true ;
        
        const vertex = this.graph[curr] ;
        
        for(let i = 0 ; i<vertex.length ; i++){
            const dest = vertex[i].dest ;
            
            if(callStack[dest] == true){
                return true ; //contains cycle
            }
            else if(isVisited[dest] == false){
                const r = this.isCyclicUtil(dest , isVisited , callStack);
                if(r== true){
                    return true ;
                }
            }
        }
        callStack[curr] = false ;
        return false ;
    }
    
    isCyclic(){
        
        let isVisited = Array.from({length : this.graph.length} , ()=>false);
        let callStack = [];
        
        for(let i = 0 ; i<this.graph.length ; i++){
            if(isVisited[i] == false){
                const r= this.isCyclicUtil(i , isVisited , callStack);
                if(r == true){
                    return true ;
                }
            }
        }
        return false ;
    }
}


//======================================================================4. Eventual Safe Space . TC O(E+V) ================================================================================================
// LEET CODE LINK : https://leetcode.com/problems/find-eventual-safe-states/

//PROBLEM STATEMENT : There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented by a 0-indexed 2D integer array graph where graph[i] is an integer array of nodes
//adjacent to node i, meaning there is an edge from node i to each node in graph[i].
// A node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to a terminal node (or another safe node).
// Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.

// Example 1:

// Illustration of graph
// Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
// Output: [2,4,5,6]
// Explanation: The given graph is shown above.
// Nodes 5 and 6 are terminal nodes as there are no outgoing edges from either of them.
// Every path starting at nodes 2, 4, 5, and 6 all lead to either node 5 or 6.
// Example 2:

// Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
// Output: [4]
// Explanation:
// Only node 4 is a terminal node, and every path starting at node 4 leads to node 4.

// Solution : Idea is to find all node which is not in any cycle . If any node is in any cycle , make its index as true . And at last filter all item which index is false . That will be answer .


/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function(graph) {
    const g = new Graph(graph.length);
    g.createGraph(graph);
    const safeNode = Array.from({length : graph.length},()=>false);
    g.isCyclic(safeNode);

    let ans = []
    safeNode.forEach((e,i)=>{
        if(e == false){
           ans.push(i);
        }
    });
    return ans ;
};

class Edge{
    constructor(src , dest){
        this.src = src ;
        this.dest = dest ;
    }
}

class Graph{
    constructor(size){
        this.graph = Array.from({length : size} , ()=> []);
    }

    createGraph(arr){

        arr.forEach((node , i)=>{
            node.forEach((d)=>{
                this.graph[i].push(new Edge(i , d));
            }) 
        })
    }

    isCyclicUtil(curr , isVisited=[] , callStack=[],safeNode=[]){

        isVisited[curr] = true ;
        callStack[curr] = true ;
        const vertex = this.graph[curr];
        const len = vertex.length ;

        for(let i = 0 ; i<len ; i++){
            const dest = vertex[i].dest ;

            if(callStack[dest]== true ){
                safeNode[curr] = true ; 
                return true ;
            }
            else if(isVisited[dest] == false){
                if(this.isCyclicUtil(dest , isVisited , callStack , safeNode)){
                    safeNode[curr] = true ;
                    return true ;
                }
            }
        }
        callStack[curr] = false ;
        return false ;
    }

    isCyclic(safeNode=[]){
        const len = this.graph.length ; 
        const isVisited = Array.from({length : len} , ()=>false) ;
        const callStack = Array.from({length : len} , ()=>false) ;
        
        for(let i=0 ; i<len ; i++ ){
            if(isVisited[i] == false){
                this.isCyclicUtil(i , isVisited , callStack,safeNode)
            }
        }
        return false ;
    }
}
