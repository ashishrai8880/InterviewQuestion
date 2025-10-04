// ================================================== 1. Delete Node without head pointer =======================================================================
/*
Leetcode : https://leetcode.com/problems/delete-node-in-a-linked-list/
Logic : Very simle super simple , just change value of node . current node value will be next node , and remove next node just . Super cool 
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    node.val = node.next.val ;
    node.next = node.next.next ;
};

// ===================================================== 2. Count Node in linked list ============================================================================
getCount(head) {
        // Code here
        let count = 0 ;
        let ptr = head ;
        while(ptr != null){
            ptr = ptr.next ;
            count +=1 ;
        }
        return count ;
    }

// ================================================= 3. Search element ===========================================================================
searchKey(head, key) {
        // Code here
        let ptr = head ;
        while(ptr != null){
            if(ptr.data == key){
                return true ;
            }
            ptr = ptr.next ;
        }
        return false ;
    }


// ==============================================4. Delete All element equal to given value ====================================================================
// Leetcode : https://leetcode.com/problems/remove-linked-list-elements/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    while (head !== null && head.val === val) {
        head = head.next; 
    }

    let current = head; 

    while (current !== null && current.next !== null) {
        if (current.next.val === val) {
            current.next = current.next.next; 
        } else {
            current = current.next; 
        }
    }

    return head;
};


// ============================================================== 5. Remove Node from Linked List ====================================================================
/*
Leetcode : https://leetcode.com/problems/remove-nodes-from-linked-list/ . 
You are given the head of a linked list.

Remove every node which has a node with a greater value anywhere to the right side of it.

Return the head of the modified linked list.

Example 1:

Input: head = [5,2,13,3,8]
Output: [13,8]
Explanation: The nodes that should be removed are 5, 2 and 3.
- Node 13 is to the right of node 5.
- Node 13 is to the right of node 2.
- Node 8 is to the right of node 3.

Logic : Just store every node into a stack , so that , can traverse from back . 
Also , while traversing , need to just check which element is greater than current max 
*/

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeNodes = function(head) {
    
    if(head == null || head.next == null) return head ;

    let stack = [];
    let ptr = head ;
    while(ptr){
        stack.push(ptr);
        ptr = ptr.next ;
    }

    // removing from stack and checking
    
    let newHead = stack.pop();
    newHead.next = null ;
    let maxVal = newHead.val 

    while(stack.length > 0){
        
        const curr = stack.pop();
        if(curr.val < maxVal){
            curr.next = null ;
            continue ;
        }
        curr.next = newHead ;
        newHead = curr ;
        maxVal = curr.val ;
    }

    return newHead ;
};


// ================================================== 6. Find Middle Element of List ====================================================================================
/**
Leetcode : https://leetcode.com/problems/middle-of-the-linked-list/
Brute Force : Just count how many elements in list , and then search for middle element . 
 */

var middleNode = function(head) {
    let count = 0 ;
    let ptr = head ;
    while(ptr){
        count++ ;
        ptr = ptr.next ;
    }

    let midIndex = Math.floor(count/2);
    let i=0 ;
    ptr = head ;
    while( i != midIndex && ptr != null ){
        if(i==midIndex){
            return ptr ;
        }
        ptr = ptr.next ;
        i++ ;
    }
    return ptr ;
};

// Optimize approach : Use hare and tortoise algorithm . Increament hare by 2 and tortoise by 1 ;
var middleNodeOptimize = function(head) {
    
    let hare = head ;
    let tortoise = head ;
    while( hare && hare.next != null ){
        hare =  hare.next.next ;
        tortoise = tortoise.next ;
    }

    return tortoise ;
};


// ====================================================================== 7. Reverse a linked list ====================================================================
/**
Leetcode : https://leetcode.com/problems/reverse-linked-list/
Brute Force : Using a stack , store data and then traverse stack and put data 
 */

var reverseList = function(head) {
    
    let stack = [];
    let ptr = head ;
    while(ptr){
        stack.push(ptr.val) ;
        ptr = ptr.next ;
    }

    ptr = head ;
    while(stack.length != 0){
        ptr.val = stack.pop();
        ptr = ptr.next ;
    }

    return head ;

};

/**
Optimize Approach : Using Recursion 
*/
var reverseList = function(head) {
    
    const util = (ptr) =>{
        if(ptr == null || ptr.next == null) return ptr ;

        const reversed = util(ptr.next);

        ptr.next.next = ptr ;
        ptr.next = null ;
        return reversed ;
    }
    return util(head);
};


// =================================================================== 8. Cycle Detection in Linked List =================================================================
/**
Leetcode : https://leetcode.com/problems/linked-list-cycle/ 
Logic : Just store "visited" string after visiting node , and then on revisiting just return true , and at last just return false ;
*/
var hasCycle = function(head) {
    if(head == null || head.next == null) return false ;
    let ptr = head ;

    while(ptr != null){
        if( ptr.val == "visited"){
            return true ;
        }
        ptr.val = "visited" ;
        ptr = ptr.next ;
    }
    return false ;
};


// Hare and tortoise algorithm 
var hasCycle = function(head) {
    if(head == null || head.next == null) return false ;
    let ptr = head ;

    let hare = head ;
    let tortoise = head ;
    while(hare && hare.next != null){
        hare = hare.next.next ;
        tortoise = tortoise.next ;
        if(hare == tortoise){
            return true ;
        }
    }
    return false ;
};


// ============================================================ 9. Return Node from where cycle starts =======================================================

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    if(head == null || head.next == null) return null ;
    let ptr = head ;
    while(ptr){
        if(ptr.val == 'visited'){
            return ptr ;
        }
        ptr.val = 'visited';
        ptr = ptr.next ;
    }
    return null ;
};


// ================================================================ 10. Count Nodes in Loop in Linked List =========================================================
// GFG : https://www.geeksforgeeks.org/problems/find-length-of-loop/1
class Solution {
    lengthOfLoop(head) {
        // code here
        let ptr = head ;
        let count = 0 ;
        let flag = false ;
        while(ptr){
            if(ptr.data == 'visited'){
                flag = true ;
                break ;
            }
            ptr.data = 'visited';
            ptr = ptr.next ;
        }
        console.log
        if(flag ==false) return 0 ;
        while(ptr){
            if(ptr.data == 'counted'){
                return count ;
            }
            ptr.data = 'counted'
            count += 1 ;
            ptr = ptr.next ;
        }
        return count ;
    }
}

//==================================================================== 11 . Check Linked List Palindromic or not ==========================================================
// Leetcode : https://leetcode.com/problems/palindrome-linked-list/
var isPalindrome = function(head) {
    let ptr = head ;
    let str = "";
    while(ptr){
        str = str + ptr.val ;
        ptr = ptr.next ;
    }

    if(str == str.split('').reverse().join('')) return true ;
    return false ;
};


// ==================================================================== 12 . Odd Even Linked List ====================================================================
/*
Leetcode : https://leetcode.com/problems/odd-even-linked-list/
Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

The first node is considered odd, and the second node is even, and so on.

Note that the relative order inside both the even and odd groups should remain as it was in the input.

You must solve the problem in O(1) extra space complexity and O(n) time complexity.
Brute Force is below 
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function(head) {
    
    if(head== null || head.next == null ) return head ;

    let odd = head ;
    let even = head.next ;
    let oddPtr = head ;
    let evenPtr = head.next ;

    while(oddPtr != null && oddPtr.next != null && evenPtr != null && evenPtr.next != null){
        oddPtr.next = oddPtr.next.next ;
        oddPtr = oddPtr.next ;
        evenPtr.next = evenPtr.next.next ;
        evenPtr = evenPtr.next ;
    }

    oddPtr.next = even ;
    return head ;

};


// ============================================================ 13 . Segrate Odd and Even number in Linked List =======================================================
// GFG : https://www.geeksforgeeks.org/problems/segregate-even-and-odd-nodes-in-a-linked-list5035/1
// User function Template for javascript

/*LINKED LIST NODE
class Node {
  constructor(x){
    this.data = x;
    this.next = null;
  }
}
*/

/**
 * @param {Node} head
 * @return {Node}
 */

class Solution {
    divide(head) {
        // code here
        
        if(head == null || head.next == null) return head ;
        
        let odd = null ;
        let oddPtr = null ;
        let even = null ;
        let evenPtr = null ;
        let ptr = head ;
        
        while(ptr){
            
            if(ptr.data % 2 == 0){
                if(even == null){
                    even = ptr ;
                    evenPtr = ptr ;
                }
                else{
                    evenPtr.next = ptr ;
                    evenPtr = ptr ;
                }
            }
            else{
                if(odd == null){
                    odd = ptr ;
                    oddPtr = ptr ;
                }
                else{
                    oddPtr.next = ptr ;
                    oddPtr = ptr ;
                }
            }
            ptr = ptr.next ;
            
        }
        
        if (evenPtr) evenPtr.next = null;
        if (oddPtr) oddPtr.next = null;
        
        if (even) {
            evenPtr.next = odd;
            return even;
        } else {
            return odd; // If no even nodes, return odd list
        }
        
    }
}



// ==================================================== 14. Delete nth Node from last ==============================================================================
/**
Leetcode : https://leetcode.com/problems/remove-nth-node-from-end-of-list/
Brute Force Approach , just count total number of nodes and then start counting from start .
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    if(head == null || (head.next == null && n==1)){
        return null ;
    }
    let count = 0 ;
    let ptr = head ;
    while(ptr){
        count +=1 ;
        ptr = ptr.next ;
    }

    let index = count - n ;
    if(index == 0){
        head = head.next ;
        return head ;
    }
    console.log({index})
    ptr = head ;
    while(ptr){
        if(index == 1){
            ptr.next = ptr.next.next ;
            return head ;
        }
        ptr = ptr.next ;
        index -= 1 ;
    }
    return head ;
};


// Optimize Approach 
var removeNthFromEnd = function(head, n) {
    if(head == null || (head.next == null && n==1)){
        return null ;
    }

    const util = (ptr)=>{
        if(ptr == null){
            return 0 ;
        }
        const count = 1 + util(ptr.next);

        if(count == n+1){
            ptr.next = ptr.next.next ;
        }
        return count ;
    }
    let count = util(head);
    if(count == n ){
        head = head.next ;
    }
    return head ;
};


// ========================================================= 15. Delete Middle Element from linked List ================================================================
/**
 Leetcode : https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteMiddle = function(head) {

    if(head == null || head.next == null) return null ;
    
    let hare = head ;
    let tortoise = head ;
    let prev = null ;

    while(hare && hare.next ){
        hare = hare.next.next ;
        prev = tortoise ;
        tortoise = tortoise.next ;
    }

    prev.next = tortoise.next ;
    return head ;
};


// ======================================================= 16.  Sort Linked List ======================================================================
/**
Leetcode : https://leetcode.com/problems/sort-list/
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
    let arr = [];
    let ptr = head ;
    while(ptr){
        arr.push(ptr.val) ;
        ptr = ptr.next ;
    }

    arr.sort((a,b)=>a-b);
    ptr = head ;
    while(ptr){
        ptr.val = arr.shift();
        ptr = ptr.next ;
    }
    return head ;
};

// Optimize way : Use Merge Sort to sort linked list

var sortList = function(head) {
    
    if(head == null || head.next == null) return head ;

    const findMiddle = (ptr)=>{
        if(ptr == null || ptr.next == null) return ptr ;
        let fast = ptr.next ;
        let slow = ptr ;
        while(fast && fast.next){
            fast = fast.next.next ;
            slow = slow.next ;
        }
        return slow ;
    }

    const merge = (list1 , list2)=>{

        let temp = new ListNode(-1);
        const root = temp ;
        while(list1 && list2){
            if(list1.val <= list2.val){
                temp.next = list1 ;
                list1 = list1.next ;
            }
            else{
                temp.next = list2 ;
                list2 = list2.next ;
            }
            temp = temp.next ;
        }

        while(list1){
            temp.next = list1 ;
            list1 = list1.next ;
            temp = temp.next ;
        }

        while(list2){
            temp.next = list2 ;
            list2 = list2.next ;
            temp = temp.next ;
        }

        return root.next ;
    }

    const mergeSort = (ptr)=>{
        if (ptr === null || ptr.next === null) {
            return ptr;
        }
        const middle = findMiddle(ptr);
        let left = ptr ; 
        let right = middle.next ;
        middle.next = null ;
        left = mergeSort(left);
        right = mergeSort(right);
        return merge(left , right);
    }

    return mergeSort(head);

};


// =================================================================== 17. Add two number in linked list =============================================================
// Leetcode : https://leetcode.com/problems/add-two-numbers/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    
    const root = new ListNode(-1);
    let temp = root ;
    let carry = 0 ;
    while(l1 && l2){
        let sum = 0 ;
        
        if(l1){
            sum += l1.val ;
            l1 = l1.next ;
        }
        if(l2){
            sum += l2.val ;
            l2 = l2.next ;
        }
        sum += carry ;
        carry = Math.floor(sum/10);
        const val = sum % 10 ;
        const newNode = new ListNode(val);
        temp.next = newNode ;
        temp = temp.next ;
    }

    while(l1){
        const sum = l1.val + carry ;
        const val = sum % 10 ;
        carry = Math.floor(sum /10);
        const newNode = new ListNode(val);
        temp.next = newNode ;
        temp = temp.next ;
        l1 = l1.next ;
    }

    while(l2){
        const sum = l2.val + carry ;
        const val = sum % 10 ;
        carry = Math.floor(sum /10);
        const newNode = new ListNode(val);
        temp.next = newNode ;
        temp = temp.next ;
        l2 = l2.next ;
    }

    if(carry){
        const newNode = new ListNode(carry);
        temp.next = newNode ;
    }

    return root.next ;

};


// =========================================================== 18. Sort LL of 0 , 1 , 2==================================================================================
// GFG : https://www.geeksforgeeks.org/dsa/sort-a-linked-list-of-0s-1s-or-2s/
/*
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
} */

/**
 * @param {Node} head
 * @returns {Node}
 */

class Solution {
    segregate(head) {
        // code here
        let count = [0,0,0];
        let ptr = head ;
        while(ptr){
            count[ptr.data] = count[ptr.data]+1 ;
            ptr = ptr.next ;
        } 
        let idx = 0 ;
        ptr = head ;
        while(ptr){
            if(count[idx] == 0){
                idx +=1 ;
            }
            else{
                ptr.data = idx ;
                count[idx] = count[idx] - 1 ;
                ptr = ptr.next ;
            }      
        }
        return head ;
    }
}


// ======================================================================== 19. Add Number 1 to Linked List =================================================================
/**
 GFG : https://www.geeksforgeeks.org/problems/add-1-to-a-number-represented-as-linked-list/1
 */
/*
class Node{
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

let head;
This is method only submission.
You only need to complete the below method.
*/

class Solution {
    addOne(node) {
        // your code here
        
        const util = (ptr)=>{
            if(ptr == null) return 1 ;
            
            const carry = util(ptr.next);
            
            let sum = carry + ptr.data ;
            let nextCarry = Math.floor(sum/10);
            let val = sum % 10 ;
            ptr.data = val ;
            return nextCarry ;
        }
        
        let p = node ;
        const lastCarry = util(p);
        if(lastCarry){
            const newNode = new Node(lastCarry);
            newNode.next = node ;
            node = newNode ;
        }
        return node ;
    }
}


















