
// =============================================== Flatten Binary Tree to Linked List =========================================
/**
Leetcode : https://leetcode.com/problems/flatten-binary-tree-to-linked-list/
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

var flatten = function(root) {
    
    const util = (ptr)=>{
        if(ptr == null) return ptr ;

        util(ptr.right);
        util(ptr.left);

        ptr.left = null ;
        ptr.right = nextRight ;
        nextRight = ptr ;
    }

    let nextRight = null ;
    util(root);
    return root ;

};
