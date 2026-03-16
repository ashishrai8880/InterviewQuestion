// ==================================== 1. Topological Sort ====================================================
/*
Basically Need to find sequence of all vertices from 0 to V where in sequence 0 , V1 , V2 , V3 ... V , 
V2 should comes first before V3 . Every vertex which is coming first in sequence , it should be in graph also . 
Topological Sort can only be applied in Directed Acyclic Graph only , which is obviously . 
It this would have been directed cyclic , then there will be conflict in putting any vertex earlier before another vertex 
because both will be dependent on each other . 
It can't be Acyclic also , because in acyclic how you find vertex order . 

Second Definition : In Topo sort , vertex which has no dependency will come firs , then vertex with least dependency 
then at last vertex with highest dependency . 
Example : 1 -> 2 -> 4 . Now 4 don't have dependency 4 will come first and 1 will come at last . 

GFG : https://www.geeksforgeeks.org/problems/topological-sort/1
Below is the technique to find Topo Sort in DFS manner . Very Very simple approach . 
Just after doing all traversal of neighbours of any vertex at last push that vertex into stack . Iska kya matlab hua
pura krne k baad jo last me hai , jiske aage kuch bhi nahi hai , usko stack me daal do . 
Last me stack reverse krke return kardo . 
**/
class Solution {
    topoSort(V, edges) {
       
        let graph = Array.from( {length : V} , ()=>[]);
        edges.forEach((e)=>{
            const sc = e[0] ;
            const dst = e[1] ;
            graph[sc].push(dst) ;
        })
        
        const dfs = (i)=>{
            vis[i] = true ;
            const vertex = graph[i] ;
            
            for(const n of vertex){
                if(vis[n] == false){
                    dfs(n) ;
                }
            }
            st.push(i) ;
        }
        
        let st = [] ;
        let vis = Array.from({length : V} , ()=>false) ;
        
        for(let i = 0 ; i<V ; i++){
            if(vis[i] == false){
                dfs(i) ;
            }
        }
        return st.reverse();
    }
}






