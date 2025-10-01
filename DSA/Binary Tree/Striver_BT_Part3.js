
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


// =========================================== 2. Serialize and Deserialize Binary Tree Easy One ==========================
/**
Leetcode : https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
Need to just serialize Binary tree and deserialize it . No Matter what algorithm you use . 
Tree should be same after deserialisation . 
Logic : Just level order traversal , and save it in a string and return to deseriralize function 
Deserialasation function just take that string , and convert it again into binary tree . 
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    
    if(root == null) return "";

    let res = "";
    let q = [];
    q.push(root);

    while(q.length != 0 ){
        const curr = q.shift();

        if(curr == null){
            res = res + 'N->'
        }
        else{
            res = res + curr.val + '->' ;

            q.push(curr.left);
            q.push(curr.right);
        }

    }
  
    return res ;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    
    if(data.length == 0) return null ;

    const arr = data.split('->');

    let q = [];
    const rootVal = arr.shift();
    const root = new TreeNode(parseInt(rootVal)) ;

    q.push(root);

    while(q.length != 0 ){

        const curr = q.shift();

        const leftVal = arr.shift();
        if(leftVal != 'N'){
            const leftNode = new TreeNode(parseInt(leftVal));
            curr.left = leftNode ;
            q.push(leftNode);
        }

        const rightVal = arr.shift();
        if(rightVal != 'N'){
            const rightNode = new TreeNode(parseInt(rightVal));
            curr.right = rightNode ;
            q.push(rightNode)
        }

    }

    return root ;


};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
