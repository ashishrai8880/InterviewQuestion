
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

   ---------------------------------------------------------------------------------------------------------------

   🔁 What is Two-Phase Commit (2PC)\
   Two-Phase Commit is a distributed coordination protocol that ensures all participating systems either commit or roll back together.\

   It is commonly used in distributed databases and transaction managers like: MySQL , PostgreSQL(prepared txn) , oracle db , apache kafka (transactional producers) . \

   🧠 Why Do We Need 2PC?\
   In a distributed transactions - service A updates db A and service B updates db B . if A commits B fails . \
   Users A sends 100$ to user B , now suppose deducted from user A but user B didn't get . So need 2 PC here . \

   🏗 Components in 2PC\
   1. Coordinator (Transaction Manager) - Control the process , makes the final decision .\
   2. Participants (Resource Manager) - Database or services involved . Vote to commit or abort . \

🚦 The Two Phases Explained\
🟢 Phase 1: Prepare Phase (Voting Phase) - \
Step 1 : Coordinator asks all participants - Can you commit ? \
Step 2 : Each participant : Executes txn locally . writes changes to log . lock resources . \
Responds - ✅ YES (Ready to commit) or ❌ NO (Cannot commit) . Participants do not commit yet . They only promise \ “If you tell me to commit later, I will.”
   
🔵 Phase 2: Commit / Abort Phase\
Case 1: All participants say YES . Coordinator : writes commit to log . Send commit to everyone . \
Participants : Permanently commit , release lock . 

Case 2 : Any participant says NO . Coordinator : Writes “abort” to log . Sends ROLLBACK to everyone . \
Participants undo changes and release locks . 
```
Coordinator → PREPARE? → P1
Coordinator → PREPARE? → P2

P1 → YES
P2 → YES

Coordinator → COMMIT → P1
Coordinator → COMMIT → P2
```

Example - After order from Amazon , it will go like - \
1. Performs its operation locally ( all service payment , inventory , logs etc...)\
2. BUT does not commit yet . Locks the necessary resources \
3. Responds - YES (ready to commit) , NO (cannot commit) \
4. Payment → holds money (but not finalized) , Inventory → reserves item , Delivery → creates tentative shipment \
  All in prepare state , waiting for coordinator to give Commit instructions .
5. If any of the service respond with "NO" then Coordinator respond with Abort otherwise Commit .\
6. 2 PC is called synchronous because Everyone waits during prepare , Everyone waits during commit , If coordinator crashes → system is blocked \
   

⚠ Problems with 2PC - 2PC is correct but not perfect.\
1️⃣ Blocking Problem - If coordinator crashes after Phase 1 then participants are stuck  , lock remains held \
system blocks \
3️⃣ Not Fully Fault Tolerant - If coordinator dies at wrong time, recovery is complex.\
2 PC commenly used in banking systems , Enterprise systems , distributed relational dbs . \

Two-Phase Commit ensures atomicity across multiple distributed systems by introducing a prepare phase where all participants agree to commit, followed by a commit/rollback phase controlled by a coordinator. This guarantees that either all systems commit or none do, maintaining consistency.\

Coordinator can be seperate server or it can be inside Application server also depends on requirements .\

----------------------------------------------------------------------------------------------------------------

3 Phase Commit - It basically solves problem of Coordinator went down issue . If coordinator went down \
then it can go to Long term lock transaction . Also in 2 PC , if any one service taking long time then \
other service has to wait for that service \
If the coordinator crashes after participants say “YES” (prepared),participants are stuck forever waiting.\
This is called the blocking problem.\
3PC tries to solve this by\
Making sure no participant stays in an uncertain state forever.\
```
CanCommit → PreCommit → DoCommit
```
🔹 Phase 1: CanCommit (Voting Phase)\
Coordinator asks: “Can you commit this transaction?”\
Each participant:\
- Checks if it can perform the operation\
- Does NOT lock resources permanently\
- Replies YES or NO\
- If any says NO → abort immediately.\
This phase is similar to 2PC prepare.\

🔹 Phase 2: PreCommit (Ready-to-Commit Phase) - If ALL say YES: Coordinator sends: “Prepare to commit” \
Now participants: Execute the operation\
Lock resources -> Enter a pre-commit state -> Acknowledge back\

🔹 Phase 3: DoCommit (Final Commit) - Coordinator sends: “Do Commit” . Participants: \
Permanently commit -> Release locks\

Why This Extra Phase Helps ?\
In 2PC, after voting YES, participants are stuck in uncertain state.\
In 3PC - States are designed so that:\
There is no state where a participant doesn’t know what to do \
Timeouts are used \
If coordinator crashes, participants can decide safely \

Failure Scenarios (Important) - \

Case 1: Coordinator crashes after Phase 1 \
Participants timeout → safe to abort. \
Because commit wasn’t guaranteed yet.\ 

Case 2: Coordinator crashes after PreCommit \ 
Participants timeout and They know . Everyone agreed and Commit was inevitable . So they can safely commit  themselves. This removes indefinite blocking.

```
Initial
  ↓
CanCommit
  ↓
PreCommit
  ↓
Commit
```

------------------------------------------------------------------------------------------------------------

SAGA Sequential Approach to General Availability - A sequence of local transactions where each step commits independently, and if something fails, compensating transactions undo the previous steps.\
Unlike 2PC/3PC - There is no global lock , No distributed transaction , No blocking coordinator , Eventual Consistent .\

🚀 Why Saga Was Introduced - Problems with 2PC/3PC -> Blocking , Poor scalability , High latency , Tight coupling \

Saga says: “Each step commits. If something fails later, we compensate.” \

-- Step-by-Step Flow (Success Case)\
Order Created → status = PENDING\
Payment Service → charge customer (commit) \
Inventory Service → reserve item (commit) \
Delivery Service → schedule delivery (commit) \
Order → status = CONFIRMED \
All services commit independently.

❌ Failure Scenario\
Suppose - Order created ✅ , Payment successful ✅ , Inventory fails ❌ (out of stock) \
Now Saga runs compensations - Payment Service → refund money , Order Service → mark order CANCELLED \
Each step has a defined compensating transaction. \

🧩 Two Types of Saga\
1️⃣ Choreography-Based Saga (Event Driven)\
No central coordinator. Services publish events. \ 
Example - OrderCreated event , Payment service listens → charges → emits PaymentCompleted , Inventory listens → reserves → emits InventoryReserved , Delivery listens → schedules \

If failure - Failure event is emitted , Other services trigger compensations . Very loosely coupled. 

2️⃣ Orchestration-Based Saga - There is a Saga Orchestrator (central controller). \
Flow - Orchestrator calls Payment , Then Inventory , Then Delivery . \
If failure - Orchestrator explicitly calls compensation APIs .

💥 Important Characteristics \
1. No Distributed Locking - Services don’t wait for each other. \
2. Eventual Consistency - System may be temporarily inconsistent. , Example - Payment succeeded. Inventory not yet reserved. Short time window of inconsistency. But system eventually becomes consistent.
3.  High Scalability
4.  4. Complexity Moves to Business Logic











