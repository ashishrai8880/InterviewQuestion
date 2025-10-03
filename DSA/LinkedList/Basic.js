
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


// ========================================================= Design Linked List ============================================================================
// Leetcode : https://leetcode.com/problems/design-linked-list/

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

var MyLinkedList = function() {
    this.head = null;
};

/** 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    let ptr = this.head;
    let i = 0;
    while (ptr !== null) {
        if (i === index) {
            return ptr.data;
        }
        i++;
        ptr = ptr.next;
    }
    return -1;  // If the index is out of bounds
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    const newNode = new Node(val);
    newNode.next = this.head;
    this.head = newNode;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    const newNode = new Node(val);
    if (this.head === null) {
        this.head = newNode;
        return;
    }
    let ptr = this.head;
    while (ptr.next !== null) {
        ptr = ptr.next;
    }
    ptr.next = newNode;
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    if (index < 0) return;  // Handle invalid index case
    
    const newNode = new Node(val);

    // If inserting at the head
    if (index === 0) {
        newNode.next = this.head;
        this.head = newNode;
        return;
    }
    
    let i = 0;
    let current = this.head;
    while (current !== null && i < index - 1) {
        i++;
        current = current.next;
    }

    // If current is null, the index is out of bounds
    if (current === null) return;

    newNode.next = current.next;
    current.next = newNode;
};

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    if (index < 0 || this.head === null) return;  // Invalid index or empty list
    
    // Special case for deleting the head node
    if (index === 0) {
        this.head = this.head.next;
        return;
    }

    let i = 0;
    let current = this.head;
    while (current !== null && i < index - 1) {
        i++;
        current = current.next;
    }

    // If current is null, the index is out of bounds
    if (current === null || current.next === null) return;

    // Delete the node at the specified index
    current.next = current.next.next;
};

/** 
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList();
 * var param_1 = obj.get(index);
 * obj.addAtHead(val);
 * obj.addAtTail(val);
 * obj.addAtIndex(index, val);
 * obj.deleteAtIndex(index);
 */










