
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



// ================================================================ Doubly Linked List ==============================================================================
// Javascript Program to insert a node at a given position

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

// Function to insert a new node at a given position
function insertAtPosition(head, pos, newData) {

    // Create a new node
    let newNode = new Node(newData);

    // Insertion at the beginning
    if (pos === 1) {
        newNode.next = head;
        if (head !== null) {
            head.prev = newNode;
        }
        head = newNode;
        return head;
    }

    let curr = head;
    
    // Traverse the list to find the node before the insertion point
    for (let i = 1; i < pos - 1 && curr !== null; ++i) {
        curr = curr.next;
    }

    // If the position is out of bounds
    if (curr === null) {
        console.log("Position is out of bounds.");
        return head;
    }

    // Set the prev of new node to curr
    newNode.prev = curr;

    // Set the next of new node to the next of curr
    newNode.next = curr.next;

    // Update the next of current node to new node
    curr.next = newNode;

    // If the new node is not the last node, update prev of next node to new node
    if (newNode.next !== null) {
        newNode.next.prev = newNode;
    }

    return head;
}



function delPos(head, x) {
    
    if (head === null)
        return head; 

    let curr = head;

    // traverse to the node at the given position
    for (let i = 1; curr !== null && i < x; i++) {
        curr = curr.next;
    }
    
    // position exceeds list length, no deletion
    if (curr === null) return head; 

    // if the node to delete is not the first node
    // update previous node's next
    if (curr.prev !== null) curr.prev.next = curr.next;

    // if the node to delete is not the last node
    // update next node's prev
    if (curr.next !== null) curr.next.prev = curr.prev;

    // if deleting the head, move head pointer to next node
    if (head === curr) head = curr.next;

    curr = null; 
    return head;
}


// Function to print the list
function printList(head) {
    let curr = head;
    while (curr !== null) {
        console.log(curr.data + " ");
        curr = curr.next;
    }
    console.log();
}

// Function to reverse a doubly linked list
function reverseDLL(head) {
    // Check if the list is empty
    // or has only one node
    if (head === null || head.next === null) {
        // No change is needed;
        // return the current head
        return head;
    }
    
    // Initialize a pointer to
    // the previous node
    let prev = null; 
    
    // Initialize a pointer
    // to the current node
    let current = head; 

    // Traverse the linked list
    while (current !== null) {
        // Store a reference to
        // the previous node
        prev = current.prev;

        // Swap the previous
        // and next pointers
        current.prev = current.next;
        
         // This step reverses the links
        current.next = prev;

        // Move to the next node
        // in the original list
        current = current.prev; 
    }

    // The final node in the original
    // list becomes the new head after reversal
    return prev.prev;
}

// Create a hardcoded doubly linked list:
// 1 <-> 2 <-> 4
let head = new Node(1);
head.next = new Node(2);
head.next.prev = head;
head.next.next = new Node(4);
head.next.next.prev = head.next;

// Print the original list
console.log("Original Linked List:");
printList(head);

// Insert new node with data 3 at position 3
console.log("Inserting Node with data 3 at position 3:");
head = insertAtPosition(head, 3, 3);

// Print the updated list
printList(head);






