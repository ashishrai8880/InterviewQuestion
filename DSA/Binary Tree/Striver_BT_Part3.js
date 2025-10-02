
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



// =========================================================================================================================
//========================================== 3. Build Binary Tree from inorder and preorder traversal =======================
/**
Leetcode : https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
Logic : Just easy question , preOrder first element will always contains root node , 
then try to find index of rootVal in inOrder array . All the element at left of that rootVal in inOrder will be 
in left subtree and other one will be in right subtree . This is recursion question . 
Do same thing in every recursion , just break inorder into 2 small array for left and right subtree . 
Same breaking for preOrder array , if there is 4 element at the left of rootVal in inOrder , then it means 4 element in 
left subtree , so take 4 element from start from preOrder array for next iteration . 

Example : Inorder : [ 40 , 20 , 50 , 10 , 60 , 30  ]
          PostOrder : [ 10 , 20 , 40 , 50 , 30 , 60 ] ;
*/



/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    
    const util = ( preStart , preEnd , inStart , inEnd  )=>{

        if(preStart > preEnd || inStart > inEnd){
            return null ;
        }

        const rootVal = preorder[preStart];
        const rootIndex = map[rootVal];
        const leftCount = rootIndex - inStart ;
        const root = new TreeNode(rootVal);

        root.left = util(preStart +1 , preStart+leftCount , inStart , rootIndex-1) ;

        root.right = util(preStart+leftCount+1 , preEnd , rootIndex +1 , inEnd)

        return root ;

    }

    let map = {};
    inorder.forEach((e , i)=> map[e]=i);

    return util(0 , preorder.length-1 , 0 , inorder.length-1 );

};


// ====================================== 4. Convert from Inorder and Postorder into Binary Tree =========================
// Leetcode : https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
// Easy Logic Explanation at Striver Notes : https://takeuforward.org/data-structure/construct-binary-tree-from-inorder-and-postorder-traversal/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
    
    const util = (postStart , postEnd , inStart , inEnd)=>{
        
        if(postStart > postEnd || inStart > inEnd){
            return null ;
        }

        const rootVal = postorder[postEnd];
        const root = new TreeNode(rootVal , undefined , undefined);
        const rootPos = map[rootVal];
        const rightCount = inEnd - rootPos ;

        root.right = util(postEnd-rightCount , postEnd-1 , rootPos+1 , inEnd);
        root.left = util(postStart , postEnd-rightCount-1 , inStart , rootPos-1);

        return root ;
    }

    let map = {};
    inorder.map((e ,i)=>map[e]=i);
    return util(0 , postorder.length-1 , 0 , inorder.length-1);
};


// ================================================= 5. Minimum time to burn Binary Tree ==================================
// Leetcode : https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/
// Logic : First convert Binary tree into bidirectional edge of graph . Then simply applly bfs over it to calculate time .

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} start
 * @return {number}
 */
var amountOfTime = function(root, start) {
    if(root == null) return 0 ;
    
    const buildGraph = (pRoot , parent)=>{
        if(pRoot == null) return ;

        if(parent){

            // parent neighbour update
            let parentNbr = graph.get(parent.val) || [] ;
            parentNbr.push(pRoot.val) ;
            graph.set(parent.val , parentNbr);

            // child neighbout update
            let childNbr = graph.get(pRoot.val) || [];
            childNbr.push(parent.val);
            graph.set(pRoot.val , childNbr); 
        }

        buildGraph(pRoot.left , pRoot);
        buildGraph(pRoot.right , pRoot);
    }

    let graph = new Map();
    buildGraph(root , null);

    if(graph.size <1) return 0 ;

    // bfs on graph to calculate time
    let visited = {};
    visited[start] = true ;
    let time = 0 ;
    let q = [];
    q.push(start);

    while(q.length > 0){

        let qSize = q.length ;

        let burned = false ;
        while(qSize-- > 0){

            const curr = q.shift();
            const neighbours = graph.get(curr);

            // visit all neighbours of node
            for(let i=0 ; i<neighbours.length ; i++){
                const n = neighbours[i];

                if(visited[n] == undefined){
                    visited[n] = true ;
                    q.push(n);
                    burned = true ;
                }
            }

        }
        if(burned){
            time = time + 1 ;
        }

    }

    return time ;

};
