// ========================================================================= 1. Path from root to leaf node =================================================================================
/**
Leetcode : https://leetcode.com/problems/binary-tree-paths/
Given the root of a binary tree, return all root-to-leaf paths in any order.
A leaf is a node with no children.
 */

var binaryTreePaths = function(root) {
    
    const util = (ptr , path)=>{

        // leaf node condition
        if(ptr && ptr.left == null && ptr.right == null){
            ans.push(path)
            return ;
        }

        if(ptr == null) return ;

        if(ptr.left){
            util(ptr.left , `${path}->${ptr.left.val}`)
        }

        if(ptr.right){
            util(ptr.right , `${path}->${ptr.right.val}`)
        }

    }

    if(root==null) return [];

    let ans = [];
    util(root , `${root.val}`);
    return ans ;

};
