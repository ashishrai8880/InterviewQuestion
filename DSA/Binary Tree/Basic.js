

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






