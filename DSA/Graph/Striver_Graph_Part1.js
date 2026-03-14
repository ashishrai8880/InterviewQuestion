
// ========================================================== 1. BFS ==================================================
/**
GFG : https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1
Time Complexity: O(V+E),Each vertex is visited exactly once, and each edge is processed at most twice (once from each end).
Space Complexity: O(1)
 */

class Solution {
    bfs(adj) {
        const n = adj.length ;
        let vis = Array.from({length : n} , ()=>false);
        
        let q = [0];
        let ans = [] ;
        
        while(q.length != 0 ){
            
            const idx = q.shift();
            const vertex = adj[idx];
            
            vis[idx] = true ;
            ans.push(idx);
            
            for(const v of vertex){
                if(vis[v] == false){
                    q.push(v);
                    vis[v] = true ;
                }
            }
        return ans ; 
    }
}


// ============================================== 2. DFS =====================================================

/**
GFG : https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1
 */

class Solution {
    dfs(adj) {
        
        const util = (i)=>{
            
            vis[i] = true ;
            ans.push(i);
            
            const vertex = adj[i];
            
            for(const v of vertex){
                if(vis[v] == false){
                    util(v);
                }
            }
        }
        
        const n = adj.length ;
        let vis = Array.from({length : n} , ()=>false);
        let ans = [];
        util(0);
        return ans ;
    }
}

// ============================================ 3. Number of Provinces =================================================

/**
Leetcode : https://leetcode.com/problems/number-of-provinces/description/

There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, 
and city b is connected directly with city c, then city a is connected indirectly with city c.

A province is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly 
connected, and isConnected[i][j] = 0 otherwise.

Return the total number of provinces

LOGIC : Are basically number of disconnected components nikalne hai . 
 */
var findCircleNum = function(mat) {
    
    const dfs = (i)=>{
        vis[i] = true ;

        const vertex = mat[i] ;

        for(let j = 0 ; j<col ; j++){
            
            if( vertex[j] == 1 && j!=i && vis[j] == false ){
                dfs(j);
            }
        }
    }

    const row = mat.length ;
    const col = mat[0].length ;

    let vis = Array.from({length : row} , ()=>false);

    let ans = 0 ; 

    for(let i = 0 ; i<row ; i++){
        if(vis[i] == false){
            dfs(i);
            ans += 1 ;
        }
    }

    return ans ;
};


// ======================================== 4. Rotten Oranges ============================================
/**
 * @param {number[][]} mat
 * @returns {number}
 */
class Solution {
    orangesRot(mat) {
       
        const isValid = (i , j)=>{
            if(i>=0 && i<row && j>=0 && j<col && mat[i][j] == 1 ){
                mat[i][j] = 2 ;
                return true ;
            }
            return false ;
        }
        
        const row = mat.length ;
        const col = mat[0].length ;
        
        let q = [] ;
        
        for(let i = 0 ; i<row ; i++){
            for(let j = 0 ; j<col ;j++){
                const cell = mat[i][j]
                if( cell == 2 ){
                    q.push([i,j])
                }
            }
        }
        
        let ans = 0 ;
        
        while( q.length !== 0 ){
            
            let qLen = q.length ;
            let temp = false ;
            
            while(qLen > 0){
                
                const pos = q.shift() ;
                const [i,j] = pos ;
                
                if( isValid(i+1 , j) ){
                    temp = true ;
                    q.push( [i+1 , j] );
                }
                
                if( isValid(i-1 , j) ){
                    temp = true ;
                    q.push( [i-1 , j] );
                }
                
                if( isValid(i  , j+1) ){
                    temp = true ;
                    q.push( [i , j+1] );
                }
                
                if( isValid(i , j - 1) ){
                    temp = true ;
                    q.push( [i , j-1 ] );
                }
                
                qLen = qLen - 1 ;
            }
            
            if(temp == true){
                ans += 1 ;
            }  
        }
        
        for(let i = 0 ; i<row ; i++){
            for(let j = 0 ; j<col ;j++){
                const cell = mat[i][j]
                if( cell == 1 ){
                    return -1 ;
                }
            }
        }
        return ans ;
    }
}


// =========================================== 5. Flood Fill Algorithm ================================================
/**
Leetcode : https://leetcode.com/problems/flood-fill/
Basically ek matrix de rakha hai , or usme new color feed karna hai , purane color ki jagah . Agar purana color 
5 hai to us source se start hoke uske sabhi neighbours me new color 6 fill krdo . 
BFS/DFS me se kuch bhi use ho jayega . 1 edge case hai bas , agar new color and old color same hai to pehle check 
krne ka warna TLE maar dega .
 */
var floodFill = function(image, sr, sc, color) {
    
    const initial = image[sr][sc] ;
    const row = image.length ;
    const col = image[0].length ;

    if(initial == color) return image ;

    const isValid = (i , j)=>{
        if(i>=0 && i<row && j>=0 && j<col && image[i][j] == initial){
            return true ;
        }
        return false ;
    }

    const dfs = ( i , j ) => {

        image[i][j] = color ;

        if( isValid(i-1 , j) ) {
            dfs(i-1 , j)
        }
        
        if( isValid(i+1 , j) ) {
            dfs(i+1 , j)
        }

        if( isValid(i , j-1) ) {
            dfs(i , j-1)
        }

        if( isValid(i , j+1) ) {
            dfs(i , j+1)
        }
    }

    dfs(sr , sc) ;
    return image ;
};


// ============================================= 6. Cycle Detection in Undirected Graph ===========================================
/** 
Very Easy Striver Way . Just maintain parent of node . It can be done in bfs and dfs way both . Just need to check 
if next neighbour is visited and it is not parent of current node , it means someone elese already visit that node
and created cycle . 
 */
class Solution {
    isCycle(V, edges) {
        // Code here
        
        let adj = Array.from({length : V} , ()=>[]);
        
        edges.forEach((e)=>{
            const sc = e[0] ;
            const dst = e[1];
            adj[sc].push(dst) ;
            adj[dst].push(sc);
        })
        
        // cycle detection bfs way
        const bfs = (i)=>{
            let q = [ [i , -1] ];
            
            while(q.length != 0 ){
                
                const [v , parent] = q.shift() ;
                vis[v] = true ;
                
                for(const n of adj[v]){
                    
                    if(vis[n] == false){
                        q.push( [n , v] );
                        vis[n] = true ;
                    }
                    
                    else if(vis[n] == true && n != parent ){
                        return true ;
                    }
                    
                }
                
            }
            return false ;
        }
        
        // cycle detection dfs way
        const dfs = (i , parent)=>{
            
            const vertex = adj[i] ;
            vis[i] = true ;
            
            for(const n of vertex){
                
                if(vis[n] == false){
                    const res = dfs(n , i) ;
                    if(res == true) return true ;
                }
                
                else if(vis[n] == true && n != parent ){
                    return true ;
                }
            }
            
            return false ;
        }
        
        let vis = Array.from({length : V} , ()=>false);
        let ans = false ;
        
        for(let i =0 ; i<V ; i++){
            if(vis[i] == false){
                // ans = bfs(i)
                ans = dfs(i) ;
            }
            if(ans == true) return true ;
        }
        return false ;
    }
}

// ======================================= 7. Cycle Detection in Directed Graph =======================================
/*
Now It is not same as previous one . There is difference . Previous Undirected Graph Cycle Detection Cannot apply here . Example : 

      1  -- >  2 --> 3 --> 4
               ^     |       \
               |      |        \>5
         9 <-- 8       -- > 7 --> 5 --> 6
         \      ^
          |     |
          \__> 10

 In above example when u go to 3 -> 4 -> 5 -> 6 -> when return back and start second neighbour of 3 -> 7 -> 5 !! 
 Now it will say 5 is visited and make it true , but it is not making cycle in that loop . So Above logic won't work . 

 Leetcode : https://leetcode.com/problems/course-schedule/description/
 GFG : https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1

 Below solution works for Course Schedule 1 also . No Issue .
*/
class Solution {
    isCyclic(n , pre) {
        
        let adj = Array.from({length : n} , ()=>[]);
        
        pre.forEach((e)=>{
            const sc = e[1] ;
            const dst = e[0] ;
            adj[sc].push(dst) ;
        })
        
        const dfs = (i)=>{
            
            vis[i] = true ;
            path[i] = true ;
            
            const v = adj[i] ;
            
            for(const n of v){
                
                if(vis[n] == false){
                    vis[n] = true ;
                    const r = dfs(n) ;
                    if(r == true) return true ;
                }
                
                else if(vis[n] == true && path[n] == true){
                    return true ;
                }
            }
            
            path[i] = false ;
            
            return false ;
        }
        
        let vis = Array.from({length : n+1} , ()=>false)
        let path = Array.from({length : n+1} , ()=>false)
        
        let ans = true ;
        for(let i = 0 ; i<n ; i++){
            if(vis[i] == false){
                ans = dfs(i)
            }
            if(ans == true) return true ;
        }
        return false ;
    }
}

// ========================================= 8. Distance of nearest cell having 1 =======================================
/**
GFG : https://www.geeksforgeeks.org/problems/distance-of-nearest-cell-having-1-1587115620/1
Leetcode : https://leetcode.com/problems/01-matrix/
Similar Question Must Visit : https://leetcode.com/problems/map-of-highest-peak/submissions/1947746293/

Ek Binary Matrix di hai , isme har ek cell ki nearest '1' ki position batani hai . 
CASE 1 : Agar cell me pehle se '1' hai to nearest distance 0 hogi . 
CASE 2 : Agar cell me 0 hai , or bilkul bagal wale me 1 hai , iska matlab distance 1 hoga nearest . 
CASE 3 : Agar cell me 0 hai , or neighbour k neighbour me 1 hai , iska matlab 2 step lena padega to distance 2 hoga . 
Basically sidhe sidhe 4 direction horizontaly and verticaly move kar sakte hai . 

The distance between two cells (i1, j1)  and (i2, j2) is calculated as |i1 - i2| + |j1 - j2|. 
You need to return a matrix of the same size, where each cell (i, j) contains the minimum distance from grid[i][j] 
to the nearest cell having value 1.

Input: grid[][] = [[0, 1, 1, 0], 
                [1, 1, 0, 0], 
                [0, 0, 1, 1]]
Output: [[1, 0, 0, 1], 
        [0, 0, 1, 1], 
        [1, 1, 0, 0]]

LOGIC : 0 se nearest 1 tak ka distance search karne ki jagah , BFS use krne ka , or pehle hi store kr lo
1 kaha kaha hai , or '1' cell k 4 direction me traverse krlo , or step update krdo unki jagah . 

 */

class Solution {
    nearest(grid) {
        // code here
        
        const row = grid.length ;
        const col = grid[0].length ;
        
        const isValid = (i , j)=>{
            if(i>=0 && i<row && j>=0 && j<col) return true ;
            return false ;
        }
        
        let res = Array.from({length : row} , ()=>{
            return Array.from({length : col} , ()=>0)
        })
        
        let q = [] ;
        
        
        for(let i = 0 ; i<row ; i++){
            for(let j = 0 ; j<col ; j++){
                if(grid[i][j] == 1){
                    q.push([i , j])
                }
            }
        }
        
        // console.log({q})
        let front = 0 ;
        
        // while(q.length != 0){
        while( front < q.length ){
            
            const curr = q[front] ;
            front+=1 ;
            const [i , j]  = curr ;
            
            // up 
            if(isValid(i-1 , j) && grid[i-1][j] == 0 ){
                res[i-1][j] = res[i][j] + 1 ;
                grid[i-1][j] = 1
                q.push([i-1 , j])
            }
            
            // down
            if(isValid(i+1 , j)  && grid[i+1][j] == 0 ){
                res[i+1][j] = res[i][j] + 1 ;
                grid[i+1][j] = 1
                q.push([i+1 , j])
            }
            
            // left
            if(isValid(i , j-1)  && grid[i][j-1] == 0 ){
                res[i][j-1] = res[i][j] + 1 ;
                grid[i][j-1] = 1
                q.push([i , j-1])
            }
            
            // right
            if(isValid(i , j+1)  && grid[i][j+1] == 0 ){
                res[i][j+1] = res[i][j] + 1 ;
                grid[i][j+1] = 1
                q.push([i , j+1])
            }
            
        }
        
        return res ;
    }
}









  

