## Sessions

- different requests don't know about previous requests, ie http is a stateless protocol
  - it is however practical to have some state (maintaining authentication, prefilled forms, shopping cart, tracking site visits/behavior, etc)
- to maintain state, use sessions
  - 1. generate session id for the client
    - 2. associate that session id with some data store on the server
      - may be different from your application data store
    - 3. in response, send back that session id
    - 4. each subsequent request will send session id to same site
    - 5. now session id exists on request so server can fish out data from data store and send it in response
- since sessions are local, there needs to be security measures put into place
  - collision resistant
    - hard to guess and not easy to find
    - shouldn't be in query string or on the site
- cookie stores any info, including the session_id
  - cookie is a name value pair that exists on a client

```http
GET /path HTTP/1.1
Cookie: SESSION_ID
```

To check for cookie

- 1, does request have cookie header
- 2, does request have a cookie with name 'SESSION_ID'
- 3, does session_id cookie have a session_id that is valid (ie session id is a key in our data store)
- if 1, 2, 3, are true, then retrieve data for that session id
- if false
  - in our http response, ask the browser to set a cookie for generated session id ("Set-Cookie" header)
  - when the browser receives response and sets cookie, create cookie with session is
  - every request for the smame domain will include that cookie / session.id

Cookies options

- Domain - cookies will only be valid for certain domains
- SameSite - dictates when cookies are sent when the request originates from another site
- Path - cookies sent will only be valid for path
- HttpOnly - only allow reading cookies via http and not JS
- Secure - cookies will only be sent if the request is encrypted

## Persistant Data

Relational DBs (we are not using them)

- data is stored in tables with rows and columns
- are fairly rigid
  -must define database schema before using
- can have relationships between tables (books --> authors)
- transactions / "ACID" compliant
- oracle, postgres, mysql/mariadb, sql server, sqlite
- uses sql

NoSQL

- reputationally easy to use
- data storage varies depending on type
- categories
  - document stores
    - json or xml
  - key value stores
  - graph db
- no consistent querying language
- data storage varies depending on type
- usually not ACID compliant. compromises to do something better

MongoDB

- nosql
- document store
- "json" (but technically bson)
- query language in js

