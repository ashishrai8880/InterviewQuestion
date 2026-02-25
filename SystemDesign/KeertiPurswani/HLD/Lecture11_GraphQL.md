GraphQL - GraphQL is a query language + runtime for APIs.\
```
Client (React / Mobile / etc)
        ↓
POST /graphql
        ↓
Express Middleware
        ↓
GraphQL Engine
        ↓
Resolvers
        ↓
Database / Services
```

3️⃣ Core Building Blocks of GraphQL\
  1️⃣ Schema - The schema is the contract between client and server. Defines Types,Queries,Mutations , Relationships\
  ```
type User {
  id: ID!
  name: String!
  email: String!
}

type Query {
  getUser(id: ID!): User
}
```

2️⃣ Resolvers - Resolvers are the actual implementation functions.\
```
const resolvers = {
  Query: {
    getUser: async (_, args, context) => {
      return await db.users.findById(args.id);
    }
  }
};
```
Think of resolvers as - Controllers in REST , But mapped per field . Every field can have a resolver.\

3️⃣ Query Execution Flow (Internals) - When a request hits /graphql \
    Step 1: Parsing - GraphQL converts the query string into an AST (Abstract Syntax Tree). \
    Step 2: Validation \
    Step 3: Execution - Execution engine - Starts at Query -> Calls getUser resolver -> Waits for result -> Then resolves nested fields -> Builds response object\

4. Mutations - It is basically used to write or update the data .
   
```javascript
const {posts , users} = require('../data')
const {randomUUID} = require('crypto')

const resolvers = {
    Query : {
        users : () => users ,
        user : ( _ , {id}) => users.find(user => user.id === id) ,
        posts : () => posts ,
    } ,

    Mutation : {
        addUser : ( _ , {name , email}  ) =>{
            const newUser = {
                id : randomUUID(),
                name , 
                email 
            }
            users.push(newUser) ;
            return newUser
        }
    } ,

    User: {
        posts: (parent) => {
            console.log({parent})
            return posts.filter(post => post.authorId === parent.id);
        }
    },

    Post: {
        author: (parent) => {
            console.log({parent})
        return users.find(user => user.id === parent.authorId);
        }
    }
}

module.exports = resolvers;
```

It always make POST request on frontend browser with payload . If you see graph ql API call , you \
will see /graphql endpoint with payload asking for requested keys . 

-------------------------------------------------------------------------------------------------------

E-Tag - When client/browser sends request for some data to server , server sends response with eTag \
Now there can be multiple hashing technique for generating this eTag (either hash response) . \
Now client will store this eTag and when next time client request the same API , \
It will send in request header If-None-Match : eTag . Now server will check if eTag is same which \
generated before , it means response is not change , and Server will response with statusCode 304 \
Mean Not Modified . So Now browser will load and render data very fast . \
If eTag not matched then only server will respond with statusCode 200 . \

---------------------------------------------------------------------------------------------------------

Rate Limiting - It can be done using 2 things \

1. IP Based - But problem is , it is possible many user are siting in same ip / network . Now it is possible that due to other user huge request , rate limit is hit and user which has not used server yet\
   got 429 too many request response .

2. UserId Based - It works , but in this case , it will fail for Login API , Login API should be free\
   from rate limiting . \

Solution is to use rate limiting with the combination of both above 2 techniques . \
Can Apply Different rate limiting for different APIs . \

--------------------------------------------------------------------------------------------------------





