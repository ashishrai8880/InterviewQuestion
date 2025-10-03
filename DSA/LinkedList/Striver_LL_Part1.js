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
