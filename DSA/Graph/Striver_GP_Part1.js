
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













  

