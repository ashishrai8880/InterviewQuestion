// ================================ 1. Prim's Algorithm ==========================================================
/*
GFG : https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1

First Spanning Tree kya hota hai . 
Koi bhi graph , jisme V vertex / node hai to usme V-1 Edges hi hone chahiye . Taaki Graph me saare nodes bhi ho 
or wo kam se kam edges se connected hai . 
Second Spanning Tree me cycle nahi banana chahiye , agar bana to graph ban jayega naaki tree . 

MST - Aisa spanning tree jiska weight ka sum sabse kam ho . 

Prim's Algo - MST nikalne ka hi tarika hai . Ye ek Greedy approach hai . 
- Ek PQ lene ka , or kisi bhi node se start karne ka . kisi se bhi !!!!! . 
- Ek visited array bhi maintain karna hai , taaki wapas usi node pe na pahoch jaye . 
- Dijkstra ki tarah hi pq ko sort krke ek ek element nikalna hai , or uske neighbours ko traverse karo . 
- Har ek node k wt ko add karte chalo . 
- Niche solution me pop() kiya hai instead of shift() , ghabaraane ki jarurat nahi hai , bas TLE save karne k liye kara . 

Time Complexity: O(E*logE) + O(E*logE)~ O(E*logE), where E = no. of given edges.
The maximum size of the priority queue can be E so after at most E iterations the priority queue will be empty and the loop
will end. Inside the loop, there is a pop operation that will take logE time. This will result in the first O(E*logE) time
complexity. Now, inside that loop, for every node, we need to traverse all its adjacent nodes where the number of nodes can 
be at most E. If we find any node unvisited, we will perform a push operation and for that, we need a logE time complexity. 
So this will result in the second O(E*logE). 

Space Complexity: O(E) + O(V), where E = no. of edges and V = no. of vertices. O(E) occurs due to the size of the priority 
queue and O(V) due to the visited array. If we wish to get the mst, we need an extra O(V-1) space to store the edges of the most.

**/
class Solution {
    spanningTree(V, edges) {
       
        let graph = Array.from({length : V} , ()=>[]);
        let vis = Array.from({length : V} , ()=> false );
        
        for(let i = 0 ; i<edges.length ; i++){
            const [sc , dst , wt] = edges[i] ;
            graph[sc].push([dst , wt]) ;
            graph[dst].push([sc , wt]) ;
        }
        
        let pq = [ [ 0 , 0 ] ]  // src and wt
        let sum = 0 ;
        let canSort = true ;
        
        while(pq.length > 0){
            
            if(canSort == true){
                pq.sort((a,b)=>b[1]-a[1]);
                canSort = false ;
            }
            
            const [currNode , currWt] = pq.pop() ;
            if(vis[currNode] == true) continue ;
            
            vis[currNode] = true ;
            sum += currWt ;
            
            for(const [nextNei , nextWt] of graph[currNode]){
                if( vis[nextNei] == false ){
                    pq.push( [nextNei , nextWt] )
                    canSort = true ;
                }
            }
        } 
        return sum ;  
    }
}


// =========================================== 2. Disjoint Sets ====================================================
/*
Are basically jayada kuch badi cheez nahi hai . Agar Graph continuous change hue jaa rha hai , or kisi point pe 
batana hai ki 2 node same component me hai ya nahi . 
Ye cheez simple bfs and dfs se bhi ho sakti hai . But uski TC O(E+V) hai , usse acha TC Disjoint set deta hai , bas yahi hai .

Isme 2 array hai , ek parent and ek rank . 
Graph store karna ya uska structure se kuch lena dena nahi hai . Isko bas kam time me 2 node same component me hai ya nahi
yehi pata lagane k liye karte hai . 

parent array contain karega kisi node ka parent node kya hai . Thoda compression karne k liye , bas sabse uper wala
parent store kar lete hai wahi hai bas path compression . Jayada hawuaaa nahi hai kuch bhi . 

rank array basically store karta hai wo kitne uper hai . Jaise 0 -> 1 -> 2 . to bas 0 ka rank 2 hai , and 2 ka rank 0 . 
Kyuki 2 sabse niche hai . 

Kul milake 2 function or hai isme . 1 function jisme parent find karke dena hai , ultimate parent sabse uper wale parent 
ko bol rhe idhar . 
Dusra function hai , jisme union karna hai bas 2 node ko . 
Union karne ka process niche hai . 
    1. Pehle dono node ka parent nikal lo . 
    2. Agar ultimate parent same hai , matlab same component me hai , kuch bhi nahi karne ka . 
    3. Agar nahi hai same , to fir dubara 3 condition hai . 
        1. Agar u ka rank jayada hai , to v(v k ultimate parent) node ko u(u k ultimate parent) se attach kardo . or parent bhi bana do.
        2. Same agar v ka rank jayada hai to ulta kardo . 
        Agar same hai , to dono me se kisi ko bhi bana do . Agar chhote ko bade se attach karte hai to badhiya rehta hai . Thoda soch . Diagram dekh
**/

class DisjointSets {
    constructor(n){
        this.parent = Array.from({length : n+1} , (_ , i)=>{
            return i ;
        })
        this.rank = Array.from({length : n+1} , ()=>0) ;
    }
    
    findParent = (u) =>{
        if(this.parent[u] == u) return u ;
        
        // path compression
        this.parent[u] = this.findParent( this.parent[u] ) ;
        return this.parent[u];
    }
    
    unionByRank = (u , v)=>{
        const ult_parent_u = this.findParent(u) ;
        const ult_parent_v = this.findParent(v) ;
        
        if(ult_parent_u == ult_parent_v) return ;
        
        if(this.rank[ult_parent_u] > this.rank[ult_parent_v]){
            this.parent[ult_parent_v] = ult_parent_u ;
        }
        else if(this.rank[ult_parent_u] < this.rank[ult_parent_v]){
            
            this.parent[ult_parent_u] = ult_parent_v ;
        }
        else{
            this.parent[ult_parent_v] = ult_parent_u ;
            this.rank[ult_parent_u]++ ;
        }
    }
    
    isInSameComponent(u , v){
        const ult_parent_u = this.findParent(u) ;
        const ult_parent_v = this.findParent(v) ;
        console.log(ult_parent_u , ult_parent_v)
        return ult_parent_v == ult_parent_u ;
    }
}

const ds = new DisjointSets(7) ;

ds.unionByRank(1,2) ;
ds.unionByRank(2,3) ;
ds.unionByRank(4,5) ;
ds.unionByRank(6,7) ;

console.log("Check for " , [5,6] , ds.isInSameComponent(5,6))

ds.unionByRank(5,6);

console.log("Check for " , [5,6] , ds.isInSameComponent(5,6))


// ======================================= 3. Minimum no. of operation to make connected ==================================
/**
Leetcode : https://leetcode.com/problems/number-of-operations-to-make-network-connected/
Problem : Are basically bahot se computers hai from 0 to n-1 tak . Ab ek koi network hai . 
Is network me kuch kuch computers aapas me connect hai . To batana hai , kam se kam kitne operation lagenge taanki saare 
computers connect ho jaye . 
Basically number of disconnected components nikal lo or usme se 1 minus karne ka . 
Shuru me bas ek check laga do ki , abhi jo edges hai , wo jayada kam to nahi hai number of nodes/computer se fir to nahi ho payega . 

Niche wala solution thoda sa slow hoga . Kyuki DFS ki TC lagegi . Isiliye Disjoin sets hai . 
DS se solution iske niche hai , thoda sa bada hai bas lekin easy hai . 
 */
var makeConnected = function(n, connections) {
    
    const edges = connections.length ;

    if(edges < n-1) return -1 ;

    let graph = Array.from({length : n } , ()=>[]) ;
    let vis = Array.from({length : n } , ()=>false) ;

    for(const [sc , dest] of connections){
        graph[sc].push(dest) ;
        graph[dest].push(sc) ;
    }

    const dfs = (i)=>{
        vis[i] = true ;

        for(const nei of graph[i]){
            if(vis[nei] == false){
                dfs(nei) ;
            }
        }
    }

    let ans = 0 ;
    for(let i = 0 ; i<n ; i++){
        if(vis[i] == false){
            dfs(i) ;
            ans+=1 ;
        }
    }
    return ans - 1 ;
};


// Solution with Disjoin sets 
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function(n, connections) {
    
    const edges = connections.length ;

    if(edges < n-1) return -1 ;

    class DisjointSets {
        constructor(){
            this.rank = Array.from({length : n} , ()=>0) ;
            this.parent = Array.from({length : n} , (_ , i)=>{
                return i ;
            }) ;
        }

        findParent(u){
            if(this.parent[u] == u) return u ;
            this.parent[u] = this.findParent(this.parent[u]) ;
            return this.parent[u] ;
        }

        unionByRank = (u , v)=>{
            const ult_parent_u = this.findParent(u) ;
            const ult_parent_v = this.findParent(v) ;
            
            if(ult_parent_u == ult_parent_v) return ;
            
            if(this.rank[ult_parent_u] > this.rank[ult_parent_v]){
                this.parent[ult_parent_v] = ult_parent_u ;
            }
            else if(this.rank[ult_parent_u] < this.rank[ult_parent_v]){
                
                this.parent[ult_parent_u] = ult_parent_v ;
            }
            else{
                this.parent[ult_parent_v] = ult_parent_u ;
                this.rank[ult_parent_u]++ ;
            }
        }

        isInSameComponent(u , v){
            const ult_parent_u = this.findParent(u) ;
            const ult_parent_v = this.findParent(v) ;
            console.log(ult_parent_u , ult_parent_v)
            return ult_parent_v == ult_parent_u ;
        }

        findDisconnected(){
            
            let components = 0;
            for(let i = 0; i < n; i++){
                if(this.findParent(i) === i){
                    components++;
                }
            }
            return components-1;
        }
    }

    const ds = new DisjointSets() ;
    for(let i = 0 ; i < connections.length ; i++){
        const [sc , dest] = connections[i];
        ds.unionByRank(sc , dest);
    }

    return ds.findDisconnected();

};


// ===================================4. Most Stones removed from same column and row  ================================


// ============================================= 5. Account Merge ===================================================
/*
Leetcode : https://leetcode.com/problems/accounts-merge/
Important and Good Questions

Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is 
a name, and the rest of the elements are emails representing emails of the account.

Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common 
email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people 
could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have 
the same name.

After merging the accounts, return the accounts in the following format: the first element of each account is the name, 
and the rest of the elements are emails in sorted order. The accounts themselves can be returned in any order.

Example 1:
Input: accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
Output: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
Explanation:
The first and second John's are the same person as they have the common email "johnsmith@mail.com".
The third John and Mary are different people as none of their email addresses are used by other accounts.
We could return these lists in any order, for example the answer [['Mary', 'mary@mail.com'], ['John', 'johnnybravo@mail.com'], 
['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com']] would still be accepted.

Example 2:
Input: accounts = [["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]]
Output: [["Ethan","Ethan0@m.co","Ethan4@m.co","Ethan5@m.co"],["Gabe","Gabe0@m.co","Gabe1@m.co","Gabe3@m.co"],["Hanzo","Hanzo0@m.co","Hanzo1@m.co","Hanzo3@m.co"],["Kevin","Kevin0@m.co","Kevin3@m.co","Kevin5@m.co"],["Fern","Fern0@m.co","Fern1@m.co","Fern5@m.co"]]

LOGIC : Easy hi hai , jayda kuch nahi hai . 
Ek disjoint sets ka basic template class banane ka . 
0 to n-1 array size ko node maanlo . And email ko ek map me store karte raho , { email : nodeIndex} . 
Traversing k waqt agar kahi bhi email repeat ho rha hai , iska matlab us email ka jo nodeindex hai , usko union karna hai
ho pehle aa chuka hai . 

Pura karne k baad last me hume disconnected componenents mil jayega . 
Or fir cosmetics and fancy cheeze karni hai answer nikalne k liye  .
**/
class DisjointSets {

    constructor(n){
        this.parent = Array.from({length : n},(_ , i)=>{
            return i ;
        })
        this.rank = Array.from({length : n},()=>0)
    }

    findParent(node){
        if(this.parent[node] == node) return node ;
        this.parent[node] = this.findParent(this.parent[node]) ;
        return this.parent[node] ;
    }

    unionByRank(u , v){
        const uParent = this.findParent(u) ;
        const vParent = this.findParent(v) ;

        if(uParent == vParent) return ;

        if(this.rank[uParent] > this.rank[vParent]){
            this.parent[vParent] = uParent ;
        }
        else if(this.rank[uParent] < this.rank[vParent]){
            this.parent[uParent] = vParent ;
        }
        else{
            this.parent[vParent] = uParent ; 
            this.rank[uParent]++ ;
        }
    }
}

var accountsMerge = function(accounts) {
    
    const n = accounts.length ;
    let map = new Map() ;
    const ds = new DisjointSets(n)

    for(let i = 0 ; i<n ; i++){

        const emails = accounts[i].slice(1) ;

        for(const eml of emails){
            if(map.has(eml)){
                const initialIndex = map.get(eml) ;
                ds.unionByRank(i , initialIndex) ;
            }
            else{
                map.set(eml , i) ;
            }
        }

    }

    let merged = Array.from({length : n} , ()=>[])
    
    for(const [email , index] of map){
        const parent = ds.findParent(index);
        merged[parent].push(email);
    }

    // build result 
    let res = [] ;

    for(let i = 0 ; i<n ; i++){

        if(merged[i].length == 0) continue ;

        merged[i].sort();

        const name = accounts[i][0] ;

        res.push([name , ...merged[i]]);
    }

    return res ;
};


// ============================================= 6. Number of Island 2 =================================================
/*
GFG : https://www.geeksforgeeks.org/problems/number-of-islands/1

Basically ek matrix de rakhi hai , starting me pura 0 se fill hai , means everywhere is water only  .
And ek operations ka array dia hua hai , jisme index hai . Un sabhi index pe ek ek karke 1 fill karna hai , means land me convert . 
Jaise jaise fill krte rehna , waise waise batana hai , ki matrix me kitne island ban rahe hai . 

Kind of running graph problem which can be solved using DSU . Please watch striver video for clarification . 

LOGIC : Isme sabhi cell ko numbers assign kar diya hai . Agar m rows and and n columns hai , to total numbers honge 0 to (m*n) . 
Sabhi number ek tarah k node hi honge . Starting me sab parent honge self . Ab jaise jaise fill ho rha hai , waise check 
karna hai ki neighbour already land me convert to nahi hua , agar ho gya , iska matlab new land cell add krne pe , 1 island
kam hua hai . Ek running count leke bhi chalna hai , jo ki store karega , ab tak kitne island ban chuke . 

Jaise hi neighbour already visited hai to count-- kardo .
**/
class DisjointSets {
    constructor(n){
        this.parent = Array.from({length : n} , (_ , i)=>{
            return i ;
        })
        this.rank = Array.from({length : n} , ()=>0)
    }
    
    findParent(u){
        if(this.parent[u] == u) return u ;
        this.parent[u] = this.findParent(this.parent[u]);
        return this.parent[u] ;
    }
    
    unionByRank(u , v){
        const uParent = this.findParent(u);
        const vParent = this.findParent(v) ;
        
        if(uParent == vParent) return ;
        
        if(this.rank[uParent] > this.rank[vParent]){
            this.parent[vParent] = uParent ;
        }
        else if(this.rank[uParent] < this.rank[vParent]){
            this.parent[uParent] = vParent ;
        }
        else{
            this.parent[vParent] = uParent ;
            this.rank[uParent]++ ;
        }
    }
}

class Solution {
    // Function to count the number of islands.
    numOfIslands(rows, cols, operators) {
        // your code here
        
        const isValid = (i , j)=>{
            if(i>=0 && i<rows && j>=0 && j<cols) return true ;
            return false ;
        }
        
        let count = 0 ;
        let res = [] ;
        let vis = Array.from({length : rows} , ()=>{
            return Array.from({length : cols} , ()=>false);
        })
        
        let dir = [-1 , 0 , 1] ;
        
        const dsu = new DisjointSets(rows*cols);
        
        for(const [r , c] of operators){
            
            if(vis[r][c] == true) {
                res.push(count);
                continue ;
            }
            vis[r][c] = true ;
            count+=1 ;
            
            for(const x of dir){
                
                for(const y of dir){
                    
                    if(Math.abs(x+y) !== 1){
                        continue ;
                    }
                    
                    const nr = r+x ;
                    const nc = c+y ;
                    
                    if(isValid(nr , nc) && vis[nr][nc] == true ){
                        
                        const oldNode = (r*cols)+c ;
                        const adjNode = (nr*cols)+nc ;
                        
                        if( dsu.findParent(oldNode) != dsu.findParent(adjNode)){
                            count-- ;
                            dsu.unionByRank(oldNode , adjNode);
                        }     
                    } 
                } 
            }
            res.push(count);
        }
        return res ;
    }
}


// =========================================7. Making a larger Island ====================================================
/*
Leetcode : https://leetcode.com/problems/making-a-large-island/description/
**/
class DisjointSets{
    constructor(n){
        this.rank = Array.from({length : n} , ()=>0)
        this.size = Array.from({length : n} , ()=>1)
        this.parent = Array.from({length : n} ,(_,i)=>{
            return i ;
        })
    }

    findParent(u){
        if(this.parent[u] == u) return u ;
        this.parent[u] = this.findParent(this.parent[u]);
        return this.parent[u] ;
    }

    unionByRank(u , v){
        const uParent = this.findParent(u);
        const vParent = this.findParent(v);

        if(uParent == vParent) return ;

        if(this.rank[uParent] > this.rank[vParent]){
            this.parent[vParent] = uParent ;
        }
        
        else if(this.rank[uParent] < this.rank[vParent]){
            this.parent[uParent] = vParent ;
        }
        else{
            this.parent[vParent] = uParent ;
            this.rank[uParent]++ ;
        }
    }

    unionBySize(u , v){
        const uParent = this.findParent(u);
        const vParent = this.findParent(v) ;

        if(uParent == vParent) return ;

        if(this.size[uParent] < this.size[vParent]){
            this.parent[uParent] = vParent ;
            this.size[vParent] += this.size[uParent]
        }
        else{
            this.parent[vParent] = uParent ;
            this.size[uParent] += this.size[vParent];
        }
    }

    getSize(u){
        return this.size[this.findParent(u)];
    }
}


var largestIsland = function(grid) {
    
    const row = grid.length ;
    const col = grid[0].length ;

    const isValid = (i , j)=>{
        if(i>=0 && i<row && j>=0 && j<col) return true ;
        return false ;
    }

    const getNodeNumber = (i , j)=>{
        return (i*col) + j ;
    }

    const dsu = new DisjointSets(row*col);

    let dir = [-1 , 0 , 1];

    for(let i = 0 ; i< row ; i++ ){
        
        for(let j = 0 ; j<col ; j++){
            if(grid[i][j] == 0) continue ;

            const currNodeNum = getNodeNumber(i , j);

            for(const r of dir){
                for(const c of dir){
                    if(Math.abs(r+c) !== 1) continue ;

                    const newRow = i+r ; 
                    const newCol = j+c ;

                    if(isValid(newRow , newCol) && grid[newRow][newCol] == 1){
                        const newNodeNum = getNodeNumber(newRow , newCol);
                        dsu.unionBySize(currNodeNum , newNodeNum);
                    }
                }
            }
        }
    }

    let max = 0 ;

    for(let i = 0 ; i<row ; i++){

        for(let j = 0 ; j<col ; j++){
            if(grid[i][j] == 1) continue ;

            let set = new Set();
            let tempMax = 1 ;

            for(const r of dir){
                for(const c of dir){
                    if(Math.abs(r+c) !== 1) continue ;
                    
                    const newRow = i+r ; 
                    const newCol = j+c ;

                    if(isValid(newRow, newCol) && grid[newRow][newCol] == 1){
                        const parent = dsu.findParent(getNodeNumber(newRow, newCol));

                        if(!set.has(parent)){
                            set.add(parent);
                            tempMax += dsu.size[parent];
                        }
                    }

                }
            }

            max = Math.max(tempMax , max);

        }
    }

    return max === 0 ? row * col : max;

};































