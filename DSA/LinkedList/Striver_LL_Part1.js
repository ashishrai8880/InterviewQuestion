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







