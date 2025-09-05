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
