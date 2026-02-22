
Distributed Transaction - A distributed transaction is a transaction that spans multiple independent systems or databases but must still follow the same reliability rules as a normal transaction.\

For Example - If someone orders on Amazon then this request will go through multiple services/database \

From Payment -> Inventory -> Orders -> Delivery Partners -> Logs\
Now if at any points , if transaction fails suppose at Inventory , then it should not charge customer . Entire transaction should rollback in each service . Now it cannot be normal lock\
in every service , because it is possible that few services rolledback and few not!! . \

To Solve this issue we have multiple locking method which we will discuss later . \

1. Pessimist Lock - Lock entire transaction from begin to end until all transaction completes as in ACID \
   Pessimistic locking assumes that conflicts are likely to happen, so it locks the data before modification to prevent other transactions from accessing it.\
   Example - Multiple user tries to order same thing on Amazon , now for first user entire system will be locked . After commit or rollback from first order then only system will be able to unlock it and another user can try .\
   It ensures the ACID properties across different systems:\
   
   Atomicity – Either all systems commit the transaction, or none do.\
   Consistency – The system remains in a valid state after completion.\
   Isolation – Concurrent transactions don’t interfere improperly.\
   Durability – Once committed, the changes are permanent.\

  Bank account balance update:\
  Transaction A locks account row.\
  Transaction B tries to update same row → must wait.\
  A commits → lock released → B proceeds.\

  ✅ Advantages - Prevent data conflicts , safe for high conflict systems , simple logic . \
  ❌ Disadvantages - Can cause blocking , deadlock may occure , reduced performance under high traffic . \
  📍 Best Used When - High contention on data , Financial systems , Inventory systems . Common in db like - MySQL , PsSQL , OracleDB

   acquireLock()\
   ...... processes\
   releaseLock()\

   Pessimist Lock has itself two parts Shared Lock and Exclusive Lock \
   1. Shared Lock - While in locking state , read operation is allowed but write is not allowed . While locking , it is able to read the data but not able to concurrent write . \
   2. Exclusive Lock - While in locking state , both read and write operation is not allowed which makes it more consistent but less available . More Locking is always expensive operation . \

   Pros - It is good for high number of write system , but will be expensive in locking . have to trade off with availability in this lock .\

2. Optimistic Lock - No Lock . Optimistic locking assumes that conflicts are rare, so it does not lock data when reading. Instead, it checks for conflicts before committing. “Let everyone work freely; we’ll check for conflicts later.”\

   🛠 How It Works\
   Transaction reads data (no lock).\
   Transaction modifies data.\
   Before commit, system checks if data changed.\
   If changed → transaction fails (retry needed).\
   Usually Implemented using version number , timestamp , hash . \

   🧠 Example - Suppose in inventory there is 20 unit of some items . Now User A and B tried to order and reduce unit . Or suppose both tries to double the number . If it happen twice it will become 80 . \
   Now user A and user B read at same time and both will get {val : 20 , version : 1} . Now user A tries to change it to 30 , it will send request like {val : 30 , version : 2} so updating \
   version to 2 . Now there will be check that , okay difference in version is just 1 it means user A trying to change it first so let's change it .\
   Now it will becomes {val : 30 , version:2} . Now user B tries to change it and it will send {val : 50 , version : 2} , but it will check before commit that\
   version is already 2 , so it means someone before b changed it values ,and it will stop the user to change it .\
```sql
    UPDATE accounts 
    SET balance = 5000, version = version + 1
    WHERE id = 101 AND version = 5;
```

  ✅ Advantages - No blocking , Better performance for read heavy systems , No deadlocks . \
  ❌ Disadvantages - Must handle retries , Not good for high-conflict scenarios . \
  📍 Best Used When - Low contention systems , Web applications , Microservices , Distributed systems \
  Common In - Hibernate , JPA ,MongoDB \

   










