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


// ================================================================== 3. Maximum Width of a Binary Tree ===========================================================================
/**
Leetcode : https://leetcode.com/problems/maximum-width-of-binary-tree/
Given the root of a binary tree, return the maximum width of the given tree.

The maximum width of a tree is the maximum width among all levels.

The width of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes that would be present in a complete
binary tree extending down to that level are also counted into the length calculation.

It is guaranteed that the answer will in the range of a 32-bit signed integer.

LOGIC : Just require normal BFS , and at each level need to find difference of index between last node and first node . 
It is working on CBT index Complete Binary Tree Index . First node index is 0 and next index could be 2*0+1 and 2*0+2 for left and right child respectively . 

 
 */

var widthOfBinaryTree = function(root) {
    
    let q = [];
    q.push({node : root , i : 0});
    let ans = 0 ;

    while(q.length != 0){

        let qlen = q.length ;
        const firstNodeCBTIndex = q[0].i ;
        const r = q.at(-1).i - q[0].i + 1;
        ans = Math.max(r , ans);

        while(qlen-- > 0){

            const {node , i } = q.shift();
            const normalisedIndex = i - firstNodeCBTIndex ;

            if(node.left){
                q.push({node : node.left , i : (2*normalisedIndex) + 1}) ;
            }

            if(node.right){
                q.push({node : node.right , i : (2*normalisedIndex) + 2}) ;
            }

        }

    }

    return ans ;



};


// ================================================================== 4. All Nodes from k distance from Target Node ==========================================================================
/**
Leetcode : https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/
There can be two case . 
1. But suppose if i got target node , then all node below then target node , i will just find where k == 0 , in every recursion call , i will subtract by 1 . 
2. For Ancestor case , I will return some value , which indicates how above the ancestor is , if i am just returning from target node , then i will send 1 , for 2  above ancestor 
I will send 2 , so just adding 1 everytime going above in ancestor call . After reaching at ancestor node , I have to check two cases , if current k is 0 , it means this 
ancestor node should also be added in ans array . Otherwise , i will call function findNode for right subtree . 
If target node is at left subtree , then call for right subtree and if target node is at right subtree then will call for left subtree . 
 */

var distanceK = function(root, target, k) {
    // console.log({target})
    
    const findNode = ( ptr , rk )=>{
        if(ptr == null) return ;

        if(rk == 0){
            ans.push(ptr.val);
        }

        findNode(ptr.left , rk-1);
        findNode(ptr.right , rk -1);

    }

    const forAncestorTraversal = (ptr , rk ) =>{

        if(ptr == null) return -1 ;

        if(ptr == target){
            findNode(ptr , rk);
            return 1 ;
        }

        const left = forAncestorTraversal(ptr.left , rk)

        if(left != -1){
            if(rk-left == 0){
                ans.push(ptr.val);
            }
            else{
                findNode(ptr.right , rk-left-1);
            }
            return left+1 ;
        }

        const right = forAncestorTraversal(ptr.right , rk)

        if(right != -1){
            if(rk-right == 0){
                ans.push(ptr.val);
            }
            else{
                findNode(ptr.left , rk-right-1);
            }
            return right+1 ;
        }

        return -1 ;

    }

    let ans = [];
    forAncestorTraversal(root , k)
    return ans ;

};


// ===================================================================== 5. Check Children Sum Property ===========================================================================================
/**
GFG : https://www.geeksforgeeks.org/problems/children-sum-parent/1
Given the root of a binary tree, determine whether the tree satisfies the Children Sum Property. In this property, each non-leaf node must have a value equal to the sum of its left and right children's values. A NULL child is considered to have a value of 0, and all leaf nodes are considered valid by default.
Return true if every node in the tree satisfies this condition, otherwise return false.
 */

class Solution {
    isSumProperty(root) {
        //  code here
        
        const util = (ptr)=>{
            
            
            if(ptr == null) return 0 ;
            
            if( ptr.left == null && ptr.right == null) return ptr.data;
            
            const leftVal =  util(ptr.left) ;
            const rightVal =  util(ptr.right) ;
            
            if( ptr.data != leftVal + rightVal){
                ans = false ;
            }
            
            return ptr.data ;
            
        }
        
        let ans = true ;
        util(root);
        return ans ;
        
    }
}


// =========================================================== 6. Count Nodes in Binary Tree ========================================
// Leetcode : https://leetcode.com/problems/count-complete-tree-nodes/

var countNodes = function(root) {
    
    if(root == null) return 0 ;

    let count = 0 ;
    let q = [];
    q.push(root);

    while(q.length != 0){
        const curr = q.shift();
        count +=  1;

        if(curr && curr.left){
            q.push(curr.left);
        }
        if(curr && curr.right){
            q.push(curr.right);
        }
    }
    return count ;
};


// Second Approach 
var countNodes = function(root) {
    if(root == null) return 0 ;
    return 1 + countNodes(root.left) + countNodes(root.right) ;
};






