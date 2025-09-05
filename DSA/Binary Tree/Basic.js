

class Node {
    constructor(data){
        this.data = data ;
        this.left = null ;
        this.right = null ;
    }
}

class BinaryTree {
    constructor(){
        this.root = null ;
    }
    
    insert(val){
        
        const newNode = new Node(val);
        
        if(this.root == null){
            this.root = newNode ;
            return ;
        }
        
        let ptr = this.root ;
        
        while(true){
            if( val < ptr.data ){
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
    
    preOrder(){
        
        const util = (root)=>{
            if(root == null) return ;
        
            arr.push(root.data);
            
            util(root.left);
            util(root.right)
        }
        
        let arr = [];
        const ptr = this.root ;
        util(ptr);
        console.log(arr);
    }
    
    postOrder(root){
        
        const util = (root)=>{
            if(root == null) return ;
        
            util(root.left);
            util(root.right);
            arr.push(root.data);
        }
        
        let arr = [];
        const ptr = this.root ;
        util(ptr);
        console.log(arr);
    }
    
    inOrder(root){
        
        const util = (root)=>{
            if(root == null) return ;
        
            util(root.left);
            arr.push(root.data);
            util(root.right)
        }
        
        let arr = [];
        const ptr = this.root ;
        util(ptr);
        console.log(arr);
    }
    
}


const t = new BinaryTree();

// Insert nodes
t.insert(10);
t.insert(5);
t.insert(15);
t.insert(3);
t.insert(7);
t.insert(12);
t.insert(18);

t.preOrder();
t.postOrder();
t.inOrder();


// ======================================================================== Level Order Traversal ================================================================
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {

    if(root == null) return [];
    
    let q = [];
    let ptr = root ;
    q.push(ptr);
    let ans = [];

    while(q.length != 0){

        let len = q.length ;

        let levelNode = [] ;
        while(len-- > 0){
             
            const curr = q[0];
            q = q.slice(1) ;
            if(curr != null){
                levelNode.push( curr.val );
            }
            
            if(curr && curr.left){
                q.push(curr.left);
            }
            if(curr && curr.right){
                q.push(curr.right)
            }

        }

        ans.push([...levelNode]);
       
    }

    return ans ;

};


// ========================================================== Iterative Approach of PreOrder Traversal =================================================================
/**
 
 Time Complexity: O(N) where N is the number of nodes in the binary tree. Every node of the binary tree is visited exactly once, and for each node, 
 the operations performed (pushing and popping from the stack, accessing node values, etc.) are constant time operations.

Space Complexity: O(N) where N is the number of nodes in the binary tree. This is because the stack can potentially hold all nodes in the tree when dealing
with a skewed tree (all nodes have only one child), consuming space proportional to the number of nodes.
 */
var preorderTraversal = function(root) {
    
    let stack = [];
    let ans = [];
    stack.push(root);

    while(stack.length != 0){
        
        const peekElement = stack.pop();

        if(peekElement != null && peekElement.val != null){
            ans.push(peekElement.val)
        }

        if(peekElement != null && peekElement.right){
            stack.push(peekElement.right);
        }
        if(peekElement != null && peekElement.left){
            stack.push(peekElement.left);
        }

    }

    return ans ;

};


// ========================================================= Iterative Inorder Traversal =============================================================================
// Define the TreeNode class
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class Solution {
    // Function to perform inorder traversal
    // of a binary tree iteratively
    inorderTraversal(root) {
        // Initialize a stack to track nodes
        const st = [];
        // Start from the root node
        let node = root;
        // Initialize an array to store
        // inorder traversal result
        const inorder = [];

        // Start an infinite
        // loop for traversal
        while (true) {
            // If the current node is not null
            if (node !== null) {
                // Push the current
                // node to the stack
                st.push(node);
                // Move to the left child
                // of the current node
                node = node.left;
            } else {
                // If the stack is empty,
                // break the loop
                if (st.length === 0) {
                    break;
                }
                // Retrieve a node from the stack
                node = st.pop();
                // Add the node's value to
                // the inorder traversal list
                inorder.push(node.val);
                // Move to the right child
                // of the current node
                node = node.right;
            }
        }
        // Return the inorder
        // traversal result
        return inorder;
    }
}


// ========================================================================================= Height Of a Binary Tree ===================================================================================================
var maxDepth = function(root) {
    if(root == null) return 0 ;

    const left = 1 + maxDepth(root.left);
    const right = 1 + maxDepth(root.right);

    return Math.max(left , right);
};






