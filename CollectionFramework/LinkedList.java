// Online Java Compiler
// Use this editor to write, compile and run your Java code online

class LinkedList {
    Node head ;
    int size ;
    static class Node{
        int data ;
        Node next ;
        
        Node(int data){
            this.data = data ;
            this.next = null ;
        }
    }
    
    public void addFirst(int val){
        Node newNode = new Node(val);
        this.size++ ;
        if(head == null){
            head = newNode ;
            return ;
        }
        
        newNode.next = head ;
        head = newNode ;
        return ;
    }
    
    public void addLast(int val){
        Node newNode = new Node(val) ;
        this.size++ ;
        if(head == null){
            head = newNode ;
            return ;
        }
        
        Node temp = head ;
        
        while(temp.next != null){
            temp = temp.next ;
        }
        temp.next = newNode ;
        return ;
    }
    
    public void addAt(int val , int index){
        Node newNode = new Node(val) ;
        this.size++ ;
        if(head == null){
            head = newNode ;
        }
        
        if(index == 0){
            newNode.next = head ;
            head = newNode ;
            return ;
        }
        
        int count = 0 ;  // 0 based index
        Node temp = head ;
        
        while(temp.next != null){
            if(count == index-1){
                break ;
            }
            temp = temp.next ;
            count++ ;
        }
        
        newNode.next = temp.next ;
        temp.next = newNode ;
        return ;
    }
    
    public void deleteFirst(){
        
        if(head == null ){
            System.out.println("List is empty");
            return ;
        }
        size-- ;
        head = head.next ;
    }    
    
    public void deleteLast(){
        if(head == null ){
            return ;
        }
        this.size--;
        if(head.next == null){
            head = null ;
            return ;
        }
        Node secondLast = head ;
        Node last = head.next ;
        
        while(last.next != null){
            secondLast = last ;
            last = last.next ;
        }
        secondLast.next = null ;
    }
    
    public void printList(){
        Node temp = head ;
        
        while(temp != null){
            System.out.print(temp.data + " -> ");
            temp = temp.next ;
        }
        System.out.print("NULL");
        System.out.println();
        
    }
    
    public int countNodes(){
        if(head == null){
            return 0 ;
        }
        Node temp = head ;
        int count = 0 ;
        while(temp != null){
            count++ ;
            temp = temp.next ;
        }
        return count ;
    }
    
     
    //reverse a linked list using iterative approach
    public void reverseIterate(){
        
        //case when only one node present in list
        if(head == null || head.next == null){
            return ;
        }
        
        Node curr = head.next ;
        Node prev = head ;
        
        while(curr != null){
            Node next = curr.next ;
            
            //pointing current node to previous node
            curr.next = prev ;
            
            //update or swap current and previous node
            prev = curr ;
            curr = next ;
            
        }
        head.next = null ;
        head = prev ;
        return ;
    }
   

    //reverse a linked list using recursive approach
    public Node reverseRecursive(Node head){
        
        if(head == null || head.next == null){
            return head ;
        }
        
        Node newNode = reverseRecursive(head.next);
        head.next.next = head ;
        head.next = null ;
        return newNode ;
        
    }
    

    public static void main(String[] args) {
        System.out.println("Try programiz.pro");
        
        LinkedList ll = new LinkedList();
        ll.addLast(1);
        ll.addLast(2);
        ll.addLast(4);
        ll.addAt(3,6);
        // ll.deleteLast();

        //reverse linked list using recursive approach
        ll.head = ll.reverseRecursive(ll.head);
        
        ll.printList();

        System.out.println("Number of nodes : "+ll.countNodes());
        System.out.println("size of list : "+ll.size);
                
    }
}