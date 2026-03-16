
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


// ===================================== 9. Surrounded Regions =======================================================
/**
Leetcode : https://leetcode.com/problems/surrounded-regions/

Isme ek matrix de rakhi hai , or use X and O hai . Bahot se O milke ek region banate hai . To in region ko X me convert 
krna hai Bas . 
Sirf ek edge case hai , agar in region me se kisi bhi 1 cell boundary k pass hogi , to us regioin ko convert nahi kr 
payenge . Because it is stated that , agar region all four side se completely X se surrounded hai tabhi kr payenge . 
Or jo boundary pe hai , to uska matlab wo cell 'X' se surrounded nahi hai . 

LOGIC : Simply first boundary traversal krke check krlo O kaha kaha hai . Jaha hai , ussse related region k sabhi cell me
'B' daal do . Or bas next loop chala k check krlo kaha bach gya 'O' waha sidhe 'X' daal do . 

Time Complexity: O(N × M), since each cell is visited at most once during DFS and once during the final traversal.
Space Complexity: O(N × M), due to the visited matrix and the recursion stack in the worst case.
 */

class Solution {
    fill(grid) {
       
        const row = grid.length ;
        const col = grid[0].length ;
        
        const isValid = (i , j)=>{
            if(i>=0 && i<row && j>=0 && j<col && grid[i][j] == 'O') return true ;
            return false ;
        }
        
        const dfs = (i , j)=>{
            grid[i][j] = 'B' ;
            
            if(isValid(i+1 , j)){
                dfs(i+1 , j) ;
            }
            
            if(isValid(i-1 , j)){
                dfs(i-1 , j) ;
            }
            
            if(isValid(i , j+1)){
                dfs(i , j+1) ;
            }
            
            if(isValid(i , j-1)){
                dfs(i , j-1) ;
            }
        }
        
        for(let i = 0 ; i<row ; i++){
            if(grid[i][0] == 'O') dfs( i , 0 ) 
            
            if(grid[i][col-1] == 'O') dfs(i , col-1) 
        }
        
        for(let i = 0 ; i<col ; i++){
            if(grid[0][i] == 'O')  dfs( 0 , i )
            
            if(grid[row-1][i] == 'O')  dfs( row-1 , i ) 
        }
       
        for(let i = 0 ; i<row ; i++){
            for(let j = 0 ; j<col ; j++){
                
                if(grid[i][j] == 'O' ){
                    grid[i][j] = 'X'
                }
                
                if(grid[i][j] == 'B' ){
                    grid[i][j] = 'O'
                }
            }
        }
    }
}

// ============================================ 10. Number of Enclaves ==========================================
/**
Leetcode : https://leetcode.com/problems/number-of-enclaves/

Same hi hai uper wale jaisa , isme bhi matrix de rakhi hai or batana hai , kitne aaise region hai jo boundary tak 
nahi jaa payenge . Isme 0 means water and 1 means land . To aaise land k kitne island hai jo boundary tak nahi le jata . 

LOGIC : Waise hi pehle boundary traversal karke un sabko water me change kr denge . Or uske baad jo bach gya 
land wali jagah usko count krke answer . 
 */
var numEnclaves = function(grid) {
    
    const row = grid.length ;
    const col = grid[0].length ;

    const dfs = (i , j)=>{

        if(i < 0 || i >=row || j < 0 || j >= col || grid[i][j] == 0) return 0 ;

        grid[i][j] = 0 ;

        return 1 + dfs(i+1 , j) + dfs(i-1 , j) + dfs(i , j+1) + dfs(i , j-1) ;
    }

    let ans = 0 ;
    for(let i=0 ; i<row ; i++){
        if(grid[i][0] == 1)  dfs(i , 0) 

        if(grid[i][col-1] == 1)  dfs(i , col-1) 
    }

    for(let i=0 ; i<col ; i++){
        if(grid[0][i] == 1) dfs( 0 , i) 

        if(grid[row-1][i] == 1)  dfs(row-1 , i) 
    }

    for(let i= 0 ; i<row ; i++){
        for(let j = 0 ; j<col ; j++){
            if(grid[i][j] == 1){
                ans += 1 ;
            }
        }
    }
    return ans ;
};


// ============================================ 11. Word Ladder 1 =========================================================
/**
Leetcode : https://leetcode.com/problems/word-ladder/description/

Question me Ek array de rakha hai words ka . Or 2 word hai start and end . Start se End tak word ko banane me minimum operation 
batana hai . Kisi bhi transformation me sirf 1 character hi different ho sakta hai , length same rahega . 

A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words
beginWord -> s1 -> s2 -> ... -> sk such that:

Every adjacent pair of words differs by a single letter.
Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
sk == endWord
Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest
transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

Example 1:
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.

Example 2:
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.

LOGIC : Isme har ek character k aage saare character replace krke check krna hai . Agar replace k baad aaisa koi 
word banata hai , jo ki array me hai , it means usko consider krke aage badh sakte hai . Har baar aaise word milne 
pe steps me +1 kr denge . Jab kabhi bhi ye krte krte newWord == end equal hota hai to steps return kr denge . 

Time Complexity: O(N * L * 26), where N is the number of words in the list and L is the length of each word.
For each word, we attempt to change each of its L characters to 26 possible letters.
Space Complexity: O(N * L), for the set storing all words and the queue used for BFS.

 */
var ladderLength = function( start, end , words ) {
    
    let set = new Set( words ) ;
    let ans = 0 ;

    let q = [ [start , 1] ] ;

    while(q.length != 0){
        
        const curr = q.shift() ;
        const [wrd , step] = curr ;

        if(wrd == end) return step ;

        for(let i= 0 ; i<wrd.length ; i++){

            for(let j = 97 ; j<=122 ; j++){
                const newWrd = wrd.substring(0,i) + String.fromCharCode(j) + wrd.substring(i+1) ;
                if(set.has(newWrd)){
                    set.delete(newWrd) ;
                    q.push([newWrd , step+1]) ;
                }
            }
        }
    }
    return 0 ; 
};


// ======================================12 . Word Ladder 2 =====================================================
/**
Leetcode : https://leetcode.com/problems/word-ladder-ii/
Same like above question , but now need to return sequence also . If multiple exists return all of them . 

Example 1:
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
Explanation: There are 2 shortest transformation sequences:
"hit" -> "hot" -> "dot" -> "dog" -> "cog"
"hit" -> "hot" -> "lot" -> "log" -> "cog"

Example 2:
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: []
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.

Below Solution Will give TLE . 

Time Complexity: O(N × L × 26 + S × L) → dominated by generating all transformations (N = words, L = word length, S = number of shortest sequences).
Space Complexity: O(N × L + S × L) → for queue storing paths, set for unused words, and final sequences.
 */
var findLadders = function( start , end , words ) {
    
    let set = new Set(words);
    let ans = [];
    let q = [[start]];
    let usedWordsOnLevel = [start];
    let level = 1;
    let front = 0;

    while (front < q.length) {

        const path = q[front++];
        if(ans.length && path.length > ans[0].length) break;

        if (path.length > level) {
            level++;

            for (const wrd of usedWordsOnLevel) {
                set.delete(wrd);
            }
            usedWordsOnLevel = [];
        }

        const word = path.at(-1);

        if (word === end) {
            if (ans.length === 0 || ans[0].length === path.length) {
                ans.push([...path]);
            }
        }

        for (let i = 0; i < word.length; i++) {

            for (let j = 97; j <= 122; j++) {

                const ch = String.fromCharCode(j);
                if (ch === word[i]) continue;

                const newWord = word.slice(0,i) + ch + word.slice(i+1);

                if (set.has(newWord)) {
                    path.push(newWord);
                    usedWordsOnLevel.push(newWord);
                    q.push([...path]);
                    path.pop();
                }
            }
        }
    }
    return ans;
};

// ===================================== 13. BiPartite Graph ==================================================
/**
Leetcode : https://leetcode.com/problems/is-graph-bipartite/

Basically Ye pta karna hai , ki kya pure graph ko sirf 2 color de sakte hai . Rules ye hai ki 
kisi adjacent node ko same color nahi milna chahiye . Isi graph ko Bipartite graph bolenge . 
Carefully dekhne pe pta chalega ki agar cycle odd ban rahi hai to nahi ho payenga or even ban rahi hai to ho jayega . 
Normal DFS . 
 */
var isBipartite = function(graph) {
    
    const dfs = (i , color) =>{
        isColored[i] = color ;
        const vertex = graph[i] ;

        for(const v of vertex){
            if(isColored[v] == -1){
                const r = dfs(v , 1-color )  // 1-color basically toggling color 0,1 
                if(r == false) return false ;
            }
            else if(isColored[v] == color){
                return false ;
            }
        }
        return true ;
    }

    const n = graph.length ;
    let isColored = Array.from({length : n} , ()=>-1) ;

    for(let i = 0 ; i<n ; i++){
        if(isColored[i] == -1 ){
            const r = dfs(i , 0);
            if(r == false) return false ;
        }
    }

    return true ;
};


// ============================================ 14. Number of Island ===================================================
/**
GFG : https://www.geeksforgeeks.org/problems/find-the-number-of-islands/1
Basically ek grid hai , jisme 'L' means land and 'W' means water hai . Ab ek island bahot se land part se milke banega
horizontal , vertical and diagonal all side can move . Easy Question . 
 */
class Solution {
    numIslands(grid) {
        
        const row = grid.length ;
        const col = grid[0].length ;
        
        const isValid = (i , j)=>{
            if(i>=0 && i<row && j>=0 && j<col && grid[i][j]=='L') return true ;
            return false ;
        }
        
        const dfs = (i , j)=>{
            grid[i][j] = 'W' ;
            
            // horizontal and vertical
            if(isValid(i+1 , j)) dfs(i+1 , j) ;
            if(isValid(i-1 , j)) dfs(i-1 , j) ;
            if(isValid(i , j+1)) dfs(i , j+1) ;
            if(isValid(i , j-1)) dfs(i , j-1) ;
            
            // diagonal traversal
            if(isValid(i-1 , j-1)) dfs(i-1 , j-1) ;
            if(isValid(i-1 , j+1)) dfs(i-1 , j+1) ;
            if(isValid(i+1 , j-1 )) dfs(i+1 , j-1) ;
            if(isValid(i+1 , j+1 )) dfs(i+1 , j+1) ;
        }
        
        let ans = 0 ;
        
        for(let i = 0 ; i<row ; i++){
            for(let j = 0 ; j<col ; j++){
                if(grid[i][j] == 'L'){
                    dfs(i , j);
                    ans += 1 ;
                }
            }
        }
        return ans ;
    }
}




