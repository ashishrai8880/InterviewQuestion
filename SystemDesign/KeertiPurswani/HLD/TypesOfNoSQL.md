
Time Series Database (TSDB): InfluxDB
InfluxDB is a write-optimized time-series database designed specifically for timestamped data. It is engineered for high-ingestion workloads and efficient time-range queries.

🚀 Key Characteristics
A TSDB like InfluxDB is optimized for:

Timestamped Data: Every record has a mandatory time component.
Append-only Writes: Designed for continuous data streams rather than updates.
Time-range Queries: Efficiently retrieves data between specific time points.
High Ingestion Rate: Handles millions of points per second.
Aggregations: Built-in functions for calculating averages, maximums, and trends over time.


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
   Cardinality Concept - High cardinality example user_id = 1,2,3,4.. millions . Problem will be memory explosion , slow queries , high index load .
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

8️⃣ Read or Write Heavy? - WRITE-HEAVY optimized

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










