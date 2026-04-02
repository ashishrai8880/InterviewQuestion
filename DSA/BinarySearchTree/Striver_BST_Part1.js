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
Simple Question . Normal iteration hi karne ka , agar element chhota hai root se to left jao , warna right jao . 
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


// ========================================= 5. Delete Node from BST =====================================================
/**
Leetcode : https://leetcode.com/problems/delete-node-in-a-bst/
Are aasan hi hai . 3 case ho sakte hai . 
CASE 1 : Agar delete karne wala node leaf node hai , to sidhe delete ho jayega no problem . 
CASE 2 : Agar delete karne wala node ka sirf ek taraf ka hi children hai , to bhi easy hai . 
CASE 3 : Agar delete karne wala node k dono children tree hai , to fir 2 cheez possible hai . Ya to left subtree me sabse 
        badi value uski jagah daal do ya fir right subtree ka sabse minimum value uski jagah daal do , fir bhi BST hi rahega . 
        Niche solution me right subtree ki minimum value daali gayi hai . 
 */
var minValue = function(root){
    if(root == null) return Infinity ;
    if(root.left == null && root.right == null) return root.val;
    return Math.min(root.val , minValue(root.left) , minValue(root.right) ) ;
}

var deleteNode = function(root, key) {
    
    if(root == null ) return root ;

    if(root.val > key){
        root.left = deleteNode(root.left , key) ;
    }
    else if(root.val < key){
        root.right = deleteNode(root.right , key) ;
    }

    else {
        if(root.left == null) return root.right ;
        else if(root.right == null) return root.left ;
        root.val = minValue(root.right) ;
        root.right = deleteNode(root.right , root.val) ;
    }

    return root ;
};


// ============================================== 6. Kth Smallest Element in BST ===========================================
/**
Leetcode : https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/
Are ek BST me se kth smallest element batana hai . Very simple , ek Inorder laga do , array me store kardo or fir
return kardo arr[k] . 
Space bachane k liye , array bhi mat le yr , sidhee k ko minus karta reh , jaha k 0 ho jaye wahi answer hai . 
 */
var kthSmallest = function(root, k) {
    
    const inorder = (ptr)=>{
        if(ptr == null) return ;
        inorder(ptr.left) ;
        k = k - 1 ;
        if(k == 0){
            res = ptr.val ;
            return ;
        }
        inorder(ptr.right) ;
    }

    let res = 0 ;
    inorder(root) ;
    return res ;
};


// ========================================= 7. Is Binary Tree is valid BST =============================================
/**
Leetcode : https://leetcode.com/problems/validate-binary-search-tree/
Just need to find given Binary Tree is valid BST or not . 
Approach : Bahot simple hai . Ek range pakad lenge -Infinity to +Infinity . Ab jaise jaise niche jayenge 
waise waise range badalti jayegi . Kisi point me condition match nahi hoti to return false . 
 */
var isValidBST = function(root) {
    
    const util = (ptr , min , max)=>{
        if(ptr == null) return true ;
        if(ptr.val >= max || ptr.val <= min) return false ;
        return util(ptr.left , min , ptr.val) && util(ptr.right , ptr.val , max) ;
    }

    return util(root , -Infinity , Infinity)
};


// =============================================== 8. LCA in BST ==========================================================
/**
Leetcode : https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
Approach : Very Easy in BST . There can be only 3 case possible . 
CASE 1 : p and q node ya to root node se chhote honge , ya fir root node se bade honge dono k dono . 
CASE 2 : p and q me se koi ek chhota hoga or dusra bada hoga , matlab answer yahi wala node hai . 
CASE 3 : p and q me se koi ek root node k equal hoga , to bhi answer yahi hoga . 

 */
var lowestCommonAncestor = function(root, p, q) {
    
    const util = (ptr ) =>{

        if(ptr == null) return ptr ;

        // CASE 1 
        if( p.val < ptr.val  &&  q.val < ptr.val ){
            return util(ptr.left , p , q) ;
        }

        // CASE 1 
        if(p.val > ptr.val  &&  q.val > ptr.val){
            return util(ptr.right , p , q) ;
        }

        // CASE 2
        if( (p.val > ptr.val && q.val < ptr.val) ||  (p.val < ptr.val && q.val >ptr.val) ){
            return ptr ;
        }

        // CASE 3
        if(p.val == ptr.val || q.val == ptr.val) return ptr ;
    }

    return util(root);
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
Easiest and Shortest . Last k 2 case me ptr hi return ho rha hai , to likhna bhi kyu hai , Sidhe return karne ka . 
 */
var lowestCommonAncestor = function(root, p, q) {
    
    const util = (ptr ) =>{

        if(ptr == null) return ptr ;

        if( p.val < ptr.val  &&  q.val < ptr.val ){
            return util(ptr.left , p , q) ;
        }

        if(p.val > ptr.val  &&  q.val > ptr.val){
            return util(ptr.right , p , q) ;
        }

        return ptr ;
    }

    return util(root);
};


// ========================================= 9. Construct BST from Preorder ================================================
/**
Leetcode : https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/
Approach : Easy hi hai . Bas sabhi data k liye insert node wala function call karna hai . 
 */
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
var bstFromPreorder = function(preorder) {
    
    const insertNode = (data)=>{
        const newNode = new TreeNode(data);
        let ptr = root ;
        if(ptr == null){
            root = newNode ;
            return ;
        }

        while(ptr){
            if(data < ptr.val ){
                if(ptr.left == null){
                    ptr.left = newNode ;
                    return ;
                }
                ptr = ptr.left ;
            }
            else{
                if(ptr.right == null){
                    ptr.right = newNode ;
                    return ;
                }
                ptr = ptr.right ;
            }
        }
    }

    let root = null ;

    for(const x of preorder){
        insertNode(x);
    }

    return root ;
};


// =================================== 10. Predecessor and Successor of Node in BST ========================================
/**
GFG : https://www.geeksforgeeks.org/problems/predecessor-and-successor/1 . 
Are basically ek value de rakhi hai , or uska predecessor and successor node batana hai . Basically usse just ek chhota
element wala node and usse just ek bada element wala node . 
Simple Approach : Just apply normal traversal and can check easily . 
 */
class Solution {
    findPreSuc(root, key) {
        // code here
        
        let curr = root ;
        let pred = null ;
        
        while(curr){
            if(key > curr.data){
                pred = curr ;
                curr = curr.right ;
            }
            else{
                curr = curr.left ;
            }
        }
        
        let suc = null ;
        curr = root ;
        while(curr){
            if(key < curr.data){
                suc =  curr ;
                curr = curr.left ;
            }
            else{
                curr = curr.right ;
            }
        }
        
        return [pred , suc]
    }
} 


// ========================================== 11. Iterator in BST ========================================================
/**
Leetcode : https://leetcode.com/problems/binary-search-tree-iterator/
Ek bas iterator class implement karna hai , jisme 2 function honge next and hasNext , jo ki inorder traversal array pe chalenge . 
Niche brute force hai , TC to O(1) hai , lekin space le rha hai . 
 */
/**
 * @param {TreeNode} root
 */
var BSTIterator = function(root) {
    this.arr = [] ;
    this.idx = 0 ;

    const inorder = (ptr)=>{
        if(ptr == null) return ptr ;
        inorder(ptr.left) ;
        this.arr.push(ptr.val) ;
        inorder(ptr.right) ;
    }
    inorder(root) ;
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function() {
    const res = this.arr[this.idx] ;
    this.idx = this.idx + 1 ;
    return res ;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return this.idx < this.arr.length ;
};


// ============================================ 12. Merge two BST =======================================================
/**
GFG : https://www.geeksforgeeks.org/problems/merge-two-bst-s/1 
Approach : Dono ka inorder nikal k bas sort karke return karne ka . 
Thoda or optimized kar sakte hai . Sort karne me o(nlogN) lagega , to isse badhiya 2 alag alag array me dono ka inorder 
traversal store karke , 2 sorted array ko merge kardo . 

 * @param {Node} root1
 * @param {Node} root2
 * @returns {number[]}
 */
class Solution {
    merge(root1, root2) {
        
        const inorder = (ptr)=>{
            if(ptr == null) return ;
            inorder(ptr.left) ;
            arr.push(ptr.data) ;
            inorder(ptr.right) ;
        }
        
        let arr = [] ;
        inorder(root1) ;
        inorder(root2) ;
        
        return arr.sort((a,b)=>a-b)
    }
}











