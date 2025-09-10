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


// ===================================================================== 2. Lowest Common Ancestor of two node in Binary Tree ======================================================================================
/**
Leetcode : https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.
According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants 
(where we allow a node to be a descendant of itself).”

 Brute Force : Find path from root node to both two node p and q . And at last just check , what is the last common element in both the array . That will be the answer . 
 */

var lowestCommonAncestor = function(root, p, q) {
    
    console.log("in starting : ",{p , q})

    const util = (ptr , path=[] , item)=>{

        if(ptr == null) return null ;

        path.push(ptr);

        if(ptr == item){
            return [...path]
        }

        const leftPath = util(ptr.left , path , item);
        if(leftPath) return leftPath ;

        const rightPath = util(ptr.right , path , item);
        if(rightPath) return rightPath ;

        path.pop();
        return null ;

    }

    const pPath = util(root , [] , p) || [];
    const qPath = util(root , [] , q) || [];

    let i = 0 ;
    let ans = 0 ;
    while(i < Math.min(pPath.length , qPath.length)){
        if(pPath[i] == qPath[i]){
            ans = pPath[i];
        }
        i+=1 ;
    }

    return ans ;

};

// Optimized Approach
/*
There can be 4 cases which can happen in normal traversal
1. Curr node value can be equal to p or q : curr == a || curr == b
2. a can be in left subtree and b can be in right subtree .  a->left subtree and b-> right subtree
3. both a and b in any one of the subtree
4. Non of a & b in any subtree . (but in above leetcode question  it is given that it is always present in tree)

Desi Explanation
Agar right me koi element nahi milta , iska matlab wo left subtree se milega and vice versa agar left me koi element
nahi milta iska matlab wo right k kisi subtree me hoga . 
To agar answer of leftTraversal is null , then reture answer coming from right traversal and vice versa .

2. agar kisi bhi side se answer aa jata hai , to bas return kardo . 

*/
var lowestCommonAncestor = function(root, p, q) {
    
    const util = (ptr )=>{
        if(ptr == null) return null ;

        if(ptr == p || ptr == q){
            return ptr ;
        }

        const left = util(ptr.left);
        const right = util(ptr.right);

        if(left == null) return right ;
        if(right == null) return left ;

        return ptr ;
    }

    const ans =  util(root);
    return ans ;
};





















