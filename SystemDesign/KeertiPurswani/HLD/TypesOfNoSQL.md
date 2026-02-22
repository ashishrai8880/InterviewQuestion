First Need to Learn Ways of storing data which is used by databases . 
1. B-Tree - A B-Tree is a self-balancing tree data structure that keeps data sorted and allows searching,
    insertion, and deletion in logarithmic time. It is mainly used in databases and file systems because
    it efficiently handles large amounts of data stored on disk.
    Each Node can have k-1 keys and k children .

```
        [10 | 20]
       /     |     \
   [5 | 7] [12 | 15] [22 | 30]
```
Root has 2 keys and root node has 3 children . Every node uses array data structure which is sorted 
in order to store keys . Search , Insert and Delete all takes just O(logN) time complexity . Great!  

So Why it stores only k-1 keys . So A key is simply a value used for searching and ordering.  
In databases, a key could be - Studentid , roleId , customerId So a key is just the data value that helps  in searching . Each key acts like a separator between children.  
If You have - 
```
[ K1 | K2 | K3 ]
```
These 3 keys divide values into 4 ranges:  
Values < K1 , K1 < values < K2 , K2 < values < K3 , Values > K3  
👉 3 keys create 4 regions 👉 So number of children = number of keys + 1  
m children ⇒m−1 keys  

```
+----------------------------------+
|  10   |   20   |   40           |
+----------------------------------+
  |        |        |        |
  v        v        v        v
 <10    10-20    20-40     >40
```

In B-Tree data can be stored in internal nodes also , but in B+ tree data stores only on leaf node. 

2. B+ Tree
   A B+ Tree is a modified version of a B-Tree where
   ✅ All actual data is stored only in the leaf nodes\
   ✅ Internal nodes store only keys (for searching)\
   ✅ Leaf nodes are linked together like a linked list\
   It is widely used in database systems like MySQL, Oracle Database , MongoDB , PostgreSQL .\

Example 
```
          [15]
        /      \
   [5 | 10]   [15 | 20 | 25]
```
Now suppose want to search element between 10-25 , in normal B-tree we will first come to first  
children and again need to go to top and then need to search in second children  . 
But in B+ Tree , since everything is store inside leaf node , we will just start finding where is 10  
and from 10 we know data is store in ascending order .\

Best Article - https://medium.com/@dwivedi.ankit21/lsm-trees-the-go-to-data-structure-for-databases-search-engines-and-more-c3a48fa469d2
3. LSM Trees - Log Structured Merge Trees . It is data structure designed for
   ✅ Very fast writes\
   ✅ High write throughput\
   ✅ Large-scale storage systems\
   Widely used in systems like cassandra , time series database like influx db , level db , rockdb ,
   or wherever write heavy system required , it is used . 

Main Components of LSM Tree  
1️⃣ MemTable (in memory)\
2️⃣ SSTables (on disk) Sorted String table\
3️⃣ Write Ahead Log (WAL)\
4️⃣ Compaction Process\

Why and how it became write heavy , for this please read above article . \
In short , it directly not write to database or disk when write operation comes , instead of this \
it first write to WAL Write ahead log (in disk for backup) and in MemTable(in Memory) , then \
periodically writes to database which makes it extremely fast .

-------------------------------------------------------------------------------------------------------

Time Series Database (TSDB): InfluxDB
InfluxDB is a write-optimized time-series database designed specifically for timestamped data. It is engineered for high-ingestion workloads and efficient time-range queries.

🚀 Key Characteristics
A TSDB like InfluxDB is optimized for 

1. Timestamped Data: Every record has a mandatory time component.
2. Append-only Writes: Designed for continuous data streams rather than updates.
3. Time-range Queries: Efficiently retrieves data between specific time points.
4. High Ingestion Rate: Handles millions of points per second.
5. Aggregations: Built-in functions for calculating averages, maximums, and trends over time.


Examples of TSDBs: InfluxDB, Prometheus, TimescaleDB

1️⃣ Data Modelling : InfluxDB uses a measurement-tag-field model. Think of it as a table where time is the primary axis.
   
  ```
       Measurement
    ├── Tags (indexed)
    ├── Fields (not indexed)
    └── Timestamp (mandatory)
  ```

Measurement - Equivalent To table like cpu_usage , temperature , census
1. Tags (Indexed metadata) - Stored as key-value , used for filtering , indexed , should be LOW cardinality . Example - location (as in below example)
2. Fields (Actual values) - Not indexed , store numeric/string/boolean , used for computation . Eg - usage , bees , ants etc .
3. Timestamp - Mandatory , nanasecond precision supported , primary dimension of storage .

   Data Modelling Best Practice
  1. Use tags for filtering dimensions
  2.  Avoid high-cardinality tags (e.g. user_id)
  3. Keep measurement meaningful
  4. Use retention policies

2️⃣ Indexing Support - Yes it provides indexing supports on 'tags' not on fields . 'tags' for filtering and 'fields' for computation .
- Cardinality Concept - High cardinality example user_id = 1,2,3,4.. millions . Problem will be memory explosion , slow queries , high index load .
   InfluxDB performance depends heaviliy on controlling tag cardinality .

3️⃣ Schema Flexibility
1. Schema-less (semi-structured)
2. No fixed table schema
3. Fields can vary per record
4. New tags can be added dynamically
⚠ Field type must remain consistent per measurement.
   
4️⃣ Querying Support
InfluxDB V2 supports Flux QL and V3 supports SQL query
Supports - Time-range queries , aggregations , down sampling , group by tags , window function , continuos queries .

5️⃣ Storage Engine
Internally uses - WAL (Write Ahead Log) , TSM (Time Structured Merge Tree) , Time-based sharding
Optimized for - ✔ Sequential writes , ✔ High compression , ✔ Append-only workload

6️⃣ Clustering - Supports single Node as well as multiple node distributed system using influx db enterprise cloud , 
replication supported . Data partitioned by time ranges , series .

7️⃣ Horizontal vs Vertical Scaling - Vertically scalable possible obviosly by increasing RAM CPU , but horizontally
scalablity also supports .

8️⃣ Read or Write Heavy? - WRITE-HEAVY optimized . Uses LSM tree

9️⃣ Availability vs Consistency - Depends on deployment. In distributed mode - tunable consistency and replication supported . 
Generally closed to AP in distributed system , priotize more on Availability . But in single node it focus more on consistency Obviously .

1️⃣1️⃣ When To Use InfluxDB - Metrics System , Monitoring System , IoT telemetry , Financial tick data , event tracking , 
observability pipelines . Not to use obviosly in complex joins , transactioin heavy , frequent updates , relational integrity needed . 


```javascript
import { InfluxDB, Point } from "@influxdata/influxdb-client";

const url = "https://us-east-1-1.aws.cloud2.influxdata.com/";
const token =
  "your_token";
const org = "your_org";
const bucket = "testingbucket";

// const client = new InfluxDBClient({ host: url, token });
const client = new InfluxDB({ url: url, token });

async function main() {
  const points = [
    new Point("census").tag("location", "klamath").intField("bees", 23),
    new Point("census").tag("location", "Portland").intField("ants", 22),
    new Point("census").tag("location", "klamath").intField("bees", 12),
    new Point("census").tag("location", "Portland").intField("ants", 24),
    new Point("census").tag("location", "klamath").intField("bees", 44),
    new Point("census").tag("location", "Portland").intField("ants", 34),
    new Point("census").tag("location", "klamath").intField("bees", 43),
    new Point("census").tag("location", "Portland").intField("ants", 14),
    new Point("census").tag("location", "klamath").intField("bees", 54),
  ];

  const writeApi = client.getWriteApi(org, bucket);

  for (const p of points) {
    // await client.write(p, bucket).then(() => {
    // await writeApi.writePoint(p, bucket).then(() => {
    // await writeApi.writePoint(p).then(() => {
    //   new Promise((resolve) => setTimeout(resolve, 1000));
    // });
    writeApi.writePoint(p);
  }

  await writeApi.close();
}

async function getData() {
  //   const query = `SELECT * FROM 'census'
  // WHERE time >= now() - interval '24 hours' AND
  // ('bees' IS NOT NULL OR 'ants' IS NOT NULL) order by time asc`;

  //   // const readQuery = client.getQueryApi(org)

  //   const rows = await client.query(query, bucket);

  //   console.log({ rows });

  const queryApi = client.getQueryApi(org);

  const fluxQuery = `
    from(bucket: "${bucket}")
      |> range(start: -24h)
      |> filter(fn: (r) => r._measurement == "census")
      |> sort(columns: ["_time"], desc: false)
  `;

  queryApi.queryRows(fluxQuery, {
    next(row, tableMeta) {
      const data = tableMeta.toObject(row);
      console.log(data);
    },
    error(error) {
      console.error("Query error:", error);
    },
    complete() {
      console.log("Query completed");
    },
  });
}

// await main();

await getData();

```

-------------------------------------------------------------------------------------------------------

2. Columinar DB Cassandra

   1. Distributed wide-column (column-family) NoSQL database
   2. Designed for high availability + massive scalability . Originally develloped by Facebook .
  
      It Uses
      ```
      Keyspace → Tables → Partitions → Rows → Columns
      ```
      Similar to RDBMS , but with No Joins , No foreign key , query driven schema design , denormalisation is common .

   3. 3️⃣ Schema Flexibility - Need to define Schema of table . But column can be sparse , each row
     doesn't need all columns , easy to add new columns .  It has semi-flexibility in schema .

   4. 4️⃣ Availability Focused by default - By default it is AP system and provides eventual consistency .
      It supports tunable consistency . It's consistency depends on Quorum consistency level
      which means , in writing how many replication we want . If RF replication factor is 2 ,
      it means it should get replicated to atleast 2 replicas .
      As we increase RF , We start losing Avaialbililty .
      We can choose per query
      a. ONE
      b. QUORUM
      c. ALL
      So practically default AP , but configurable toward CP if needed .

   5.5️⃣ Read or Write Heavy : 🔥 Cassandra is WRITE OPTIMIZED :
      1. Uses LSM (Log structure merge trees ) .
      2. Sequential disk writes .
      3. No random disk updates .
      4. Memtable -> SSTables .
      5. Best For - High Write Throughputs . Append heavy workloads .
  
   6. 6️⃣ Scalability - Horizontal Scaling supports . Shared nothing architecture .
      1. Add more nodes -> automatic rebalancing .
      2. No master nodes (peer to peer) .
      3. No Vertical Scaling . Make it ideal for Multiple region deployment , internet scale apps .
     
   7. 7️⃣ High Availability
      1. Data replication across nodes
      2. Multi-data center replication
      3. No single point of failure
     
   8. Real world use cases :
      1. Time Series Data - Logs , IoT sensor data , monitoring systems
      2. Messaging systems - Chat messages , Notifications .
      3. Event Logging - Clickstream data , Analytics .
      4. Recommendation systems - user activity tracking .
      5. Write heavy application - Payment logs , order tracking , audit logs .
      6. Not to use where complex joins are required , strong ACID supports , small scale application , financial system required strict consistency .
     
```javascript
const cassandra = require("cassandra-driver");
const path = require("path");

const ASTRA_DB_API_ENDPOINT =
  "ASTRA_DB_API_ENDPOINT";
const ASTRA_DB_APPLICATION_TOKEN =
  "ASTRA_DB_API_ENDPOINT";

const credentials = {
  clientId: "clientId",

  secret:
    "secret",
  token:
    "token",
};

const client = new cassandra.Client({
  cloud: {
    secureConnectBundle: path.join(__dirname, "secure-connect-testing.zip"),
  },
  credentials: {
    username: credentials.clientId,
    password: credentials.secret,
  },
});

async function connect() {
  console.log("Connecting to Cassandra (Astra DB)...");
  await client.connect();
  console.log("Connected to Cassandra (Astra DB)");
}

connect().catch((err) => {
  console.log("Error connecting to cassandra : ", err);
});

const keyspace = "testing_keyspace";
const table = "users";

const createTable = async () => {
  const createTableQuery = `CREATE TABLE IF NOT EXISTS ${keyspace}.${table} (
  id UUID PRIMARY KEY,
  name TEXT,
  email TEXT
)`;

  await client.execute(createTableQuery);
  console.log(`Table ${table} created if not exists `);
};

const insertData = async () => {
  await createTable();

  const insertQuery = `INSERT INTO ${keyspace}.${table} (id , name , email)
VALUES (? , ? , ?)`;
  const params = [
    cassandra.types.Uuid.random(),
    "Rashmi Munni",
    "rashmi@gmail.com",
  ];
  await client.execute(insertQuery, params, (err) => {
    if (err) {
      console.log("Error inserting data : ", err);
    } else {
      console.log("Data inserted successfully");
    }
  });
};

const readData = async () => {
  const readQuery = `SELECT * FROM ${keyspace}.${table}`;
  client.execute(readQuery, (err, result) => {
    if (err) {
      console.log(`Error in reading data : `, err);
    } else {
      console.log("Data read successfully : ", result);
    }
  });
};

// insertData();
readData();

```
     
      
      
      
      








