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













