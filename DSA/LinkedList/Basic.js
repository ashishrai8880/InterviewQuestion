
class Node {
    constructor(data){
        this.data = data ;
        this.next = null ;
    }
}

class LinkedList{
    constructor(){
        this.head = null ;
    }
    insert(data){
        const newNode = new Node(data);
        if(this.head == null){
            this.head = newNode ;
            return ;
        }
        let ptr = this.head ;
        while(ptr.next != null){
            ptr = ptr.next ;
        }
        ptr.next = newNode ;
    }
    print(){
        let ptr = this.head ;
        let res = ""
        while(ptr != null){
            res = res + ptr.data + "->" ;
            ptr = ptr.next ;
        }
        console.log(res + "null");
    }
    remove(data){
        if(this.head == null){
            console.log("Linked List is empty");
            return ;
        }
        if(this.head.data == data){
            this.head = this.head.next ;
            return ;
        }
        let current = this.head ;
        let prev = null ;
        while(current != null && current.data != data ){
            prev = current ;
            current = current.next ;
        }
        if(current == null){
            console.log("Element is not present in this list");
            return  ;
        }
        prev.next = current.next ;
        current.next = null ;
    }
}

const ll = new LinkedList();
ll.insert(1);
ll.insert(2);
ll.insert(3);
ll.insert(4);
ll.print()
ll.remove(3);
ll.print();














