/**
============================================= 1. Search in a BST =============================================
Leetcode : https://leetcode.com/problems/search-in-a-binary-search-tree/

You are given the root of a binary search tree (BST) and an integer val.

Find the node in the BST that the node's value equals val and return the subtree rooted with that node. 
If such a node does not exist, return null.

Recursive Approach . 

Time Complexity: O(log N),Each step eliminates half of the tree, just like binary search.
However, in the worst case (unbalanced tree), it could be O(N).
Space Complexity:O(1),Iterative solution uses constant space as no recursion stack is involved.
 */
var searchBST = function(root, val) {
    
    if(root && root.val == val){
        return root ;
    }

    if(root && root.val > val){
        return searchBST(root.left , val) ;
    }
    else if(root && root.val <= val){
        return searchBST(root.right , val) ;
    }

    return null ;
};

// Easiest Approach 
var searchBST = function(root, val) {
    
    while(root != null && root.val != val){
        if(root.val < val){
            root = root.right ;
        }
        else{
            root = root.left ;
        }
    }
    return root ;
};


// ======================================== 2. Find Min/Max in a BST ============================================
// GFG : https://www.geeksforgeeks.org/problems/minimum-element-in-bst/1
class Solution {
    minValue(root) {
        // code here
        while(root.left != null){
            root = root.left ;
        }
        return root.data ;
    }
}

//=============================================== 3. Floor/Ceil in BST ==============================================
/**
GFG : https://www.geeksforgeeks.org/problems/floor-in-bst/1 
target node se just ek chhota values . Same in ceil , target node se just ek bada value . 
 */
class Solution {
    findFloor(root, x) {
        
        let floor = -1 ;
        while(root != null ){
            if(root.data == x){
                return root.data ;
            }
            
            if(root.data > x){
                root = root.left ;
            }
            else{
                floor = root.data ;
                root = root.right ;
            }
        }
        return floor  ;
    }
}


// ============================================ 4. Insert in BST =====================================================

/**
Leetcode : https://leetcode.com/problems/insert-into-a-binary-search-tree/
Simple Question . 
 */
var insertIntoBST = function(root, val) {
    
    const newNode = new TreeNode(val) ;
    let ptr = root ;

    if(root == null){
        root = newNode ;
        return root ;
    }

    while(ptr){
        if( val > ptr.val ){
            if(ptr.right == null){
                ptr.right = newNode ;
                break ;
            }
            ptr = ptr.right ;
        }
        else{
            if(ptr.left == null){
                ptr.left = newNode ;
                break ;
            }
            ptr = ptr.left ;
        }
    }
    return root ;
};













