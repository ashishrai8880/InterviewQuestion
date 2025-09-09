// ======================================================================== 1. Maximum Path Sum ===============================================================================================

/**
Leetcode : https://leetcode.com/problems/binary-tree-maximum-path-sum/
Time complexity : O(N) , Space Complexity : O (1) . 
A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. 
Note that the path does not need to pass through the root.
The path sum of a path is the sum of the node's values in the path.
Given the root of a binary tree, return the maximum path sum of any non-empty path.
 */

var maxPathSum = function(root) {
    
    const util = (ptr) =>{

        if(ptr == null) return 0 ;

        const left =  Math.max(0 ,  util(ptr.left) ) ;
        const right = Math.max(0 ,  util(ptr.right) ) ;

        const sum = ptr.val + left + right ;

        ans = Math.max(ans , sum );
        return ptr.val + Math.max( left , right ) ;
    }

    let ans = -Infinity ;
    util(root);
    return ans ;

};


// ================================================================== 2. Same/Identical Tree ========================================================================================
/**
Leetcode : https://leetcode.com/problems/same-tree/
Given the roots of two binary trees p and q, write a function to check if they are the same or not.
Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.
 */
var isSameTree = function(p, q) {
    
    const preOrderTraversal = (ptr , arr)=>{
        if(ptr == null) {
            return ;
        }

        arr.push(ptr.val)  ;

        if(ptr.left != null){
            preOrderTraversal(ptr.left , arr);
        }
        else{
            arr.push(null);
        }

        if(ptr.right != null){
            preOrderTraversal(ptr.right , arr);
        }
        else{
            arr.push(null);
        }
    }

    let arr1 = [];
    preOrderTraversal(p , arr1) ;
    let arr2 = [];
    preOrderTraversal(q , arr2);

    if(arr1.length != arr2.length) return false ;

    for(let i=0 ; i<arr1.length ; i++){
        if(arr1[i] != arr2[i]) return false ;
    }

    return true ;

};


/**
Second Approach , Super Easy , Super Cool
 */
var isSameTree = function(p, q) {
    
    if(p == null && q == null) return true ;

    if(p == null || q == null) return false ;

    if(p.val != q.val) return false ;

    return isSameTree(p.left , q.left) && isSameTree(p.right , q.right);

};



// ============================================ 3. Zigzag Level Order Traversal============================================
/**
Leetcode : https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
 */
var zigzagLevelOrder = function(root) {
   
    if(root == null) return [];

    let ans = [];
    let q = [];
    q.push(root);
    let level = 1 ;

    while(q.length != 0){
        let temp = [];
        let qLen = q.length ;

        while(qLen-- > 0){
            const curr = q[0];
            q = q.slice(1)

            if(curr && curr.val != undefined){
                temp.push(curr.val);
            }

            if(curr && curr.left){
                q.push(curr.left);
            }

            if(curr && curr.right){
                q.push(curr.right);
            }
        }
        if(level % 2 == 0){
            ans.push([...temp.reverse()]);
        }else{
            ans.push([...temp])
        }
        level += 1 ;
    }

    return ans ;

};


//============================================= 4. Boundary Traversal =====================================================
/*
https://www.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1
First Left Traversal , and then check for leaf node by any DFS traversal and then right traversal (reverse answer of right)
 */

class Solution {
    boundaryTraversal(root) {
        // code here
        
        const isLeaf = (ptr)=>{
            if(ptr && ptr.left == null && ptr.right == null) return true ;
            return false ;
        }
        
        const leftBoundaryTraversal = (curr)=>{
            let ptr = curr ;
            let temp = [];
            
            while(ptr){
                if(!isLeaf(ptr)){
                    temp.push(ptr.data)
                }
                
                if(ptr.left){
                    ptr = ptr.left ;
                }else{
                    ptr = ptr.right ;
                } 
            }
            // res.push(...temp)
            return temp ;
        }
        
        const rightBoundaryTraversal = (curr)=>{
            let ptr = curr ;
            let temp = [];
            
            while(ptr){
                if(!isLeaf(ptr)){
                    temp.push(ptr.data)
                }
                
                if(ptr.right){
                        ptr = ptr.right ;
                }
                else{
                    ptr = ptr.left ;
                }
            }
            
           
            return temp.reverse();
        }
    
    
        
        const leafNodeTraversal = (ptr)=>{
            
            if(ptr == null) return ;
            
            if( isLeaf(ptr) ){
                res.push(ptr.data);
            }
            
            leafNodeTraversal(ptr.left);
            leafNodeTraversal(ptr.right);
            
        }
        
        let res = [];
        if(root == null) return res ;
        
        if(isLeaf(root)) return [root.data];
        
        res.push(root.data);
        
        if(root.left){
            const left = leftBoundaryTraversal(root.left );
            res.push(...left)
        }
        
        leafNodeTraversal(root);
        
        if(root.right){
            const right = rightBoundaryTraversal(root.right );
            res.push(...right);
        }
        
        return res ;
        
    }
}


// ========================================= 5. Bottom Left Tree Value =================================================
/**
Leetcode : https://leetcode.com/problems/find-bottom-left-tree-value/description/
 */
var findBottomLeftValue = function(root) {
    
    let q = [];
    q.push(root);
    let ans = 0 ;

    while( q.length != 0  ){

        let qLen = q.length ;

        ans = q[0].val ;

        while(qLen -- > 0){
            const curr = q[0];
            q.shift();

            if(curr && curr.left){
                q.push(curr.left);
            }
            if(curr && curr.right){
                q.push(curr.right);
            }
        }
    }

    return ans ;

};


// ======================================================================== 6. Right View Of Binary Tree =============================================================================================
/**
Leetcode : https://leetcode.com/problems/binary-tree-right-side-view/description/
 */
var rightSideView = function(root) {
    
    if(root == null) return [];

    if( !root.left && !root.right ) return [root.val]

    let q = [];
    let ans = [];
    let ptr = root ;
    q.push(ptr);

    while(q.length != 0){

        let qLen = q.length ;

        for (let i = 0; i < qLen; i++) {
            const curr = q.shift();

            if (i === 0) {
                ans.push(curr.val);
            }
            
            if (curr.right) q.push(curr.right);
            if (curr.left) q.push(curr.left);
        }

    }

    return ans ;

};


// ============================================== 7. Check Symmetri of Binary Tree ======================================
/**
Leetcode : https://leetcode.com/problems/symmetric-tree/
Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

 */
var isSymmetric = function(root) {
    
    const util = (root1 , root2)=>{
        if(root1 == null && root2 == null)return true ;

        if(root1 == null || root2 == null) return false ;

        if(root1.val != root2.val) return false ;

        return util(root1.left , root2.right) && util(root1.right , root2.left)
        
    }

    if(root == null  || (root.left == null && root.right == null)  ) return true ;

    return util(root.left , root.right)
};


// ===================================== 8. Vertical Order Traversal of Binary Tree =======================================

/**
Leetcode : https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/ 
Simple BFS or Level Order Traversal Apply 
Just maintained horizonal distance from root node . Take root node hd as 0 , if you are going left then subtract 1 from its parent
node hd , and add if going right . 
Just take one map , and store all hd as key , and node value coming under its horizontal value . 
 */
var verticalTraversal = function(root) {
    
    let q = [];
    
    q.push({node : root , hd : 0 , row : 0});
    let obj = {};

    while(q.length != 0){

        const curr = q.shift();
        const {node , hd , row} = curr ;

        // setting values into map
        if(  !obj[hd] ){
            obj[hd] = [ ];
        }
        
        // if(node.val != null || node.val != undefined){
            obj[hd].push([row+1 , node.val ])
        // }
        

        if(node && node.left){
            q.push({node : node.left , hd : hd - 1 , row : row + 1 });
        }

        if(node && node.right){
            q.push({node : node.right , hd : hd + 1 , row : row + 1 });
        }
    }

    const sortedKeys = Object.keys(obj).map(Number).sort((a,b)=>a-b) ;

    const result = [];

    for(const key of sortedKeys){
        const arr = obj[key];
        // Sort by row, then by value
        arr.sort((a, b) => {
            if (a[0] === b[0]) return a[1] - b[1];
            return a[0] - b[0];
        });
        result.push(arr.map(item => item[1]));
    }

    return result ;
};


// ======================================== 9. Top View of Binary Tree =================================================
// GFG : https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1
// Just stored first coming horizontal distance value
topView(root) {
        // code here
        
        let q = [];
        let map = {} ;
        q.push({node : root , hd : 0});
        let res = [];
        
        
        while(q.length !== 0){
            
            const { node , hd } = q.shift();
            
            if(!map[hd]){
                map[hd] = [node.data];
                
            }
            // map[hd].push(node.data) ;
            
            if(node.left){
                q.push({node : node.left , hd : hd-1})
            }
            
            if(node.right){
                q.push({node : node.right , hd : hd+1})
            }
        }
        
        const sortedKeys = Object.keys(map).map(Number).sort((a,b)=>a-b)
        
        for(const key of sortedKeys){
            res.push(map[key])
        }
        
        return res ;
        
    }








