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







