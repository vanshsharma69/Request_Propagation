# 🚀 Request Context Propagation Demo

A simple Node.js project that demonstrates how to maintain a unique **Request ID** across asynchronous operations and store structured logs in MongoDB.

This project helps you understand how real production systems trace a request from start to finish.

---

# 📌 What This Project Shows

✔ How to generate a unique Request ID
✔ How to preserve it across async functions
✔ How to log using that Request ID
✔ How to store logs in MongoDB
✔ How to fetch logs by Request ID from UI/UX

This concept is called:

---

# 📂 File-by-File Explanation

---

## 1️⃣ app.js

### What it does:

* Starts Express server
* Generates unique requestId
* Stores requestId in async context
* Calls async functions
* Provides API routes

### Important Routes:

| Route       | Description                         |
| ----------- | ----------------------------------- |
| `/demo`     | Generates new request and logs      |
| `/logs/:id` | Returns logs for a specific request |

---

## 2️⃣ context.js

### What it does:

Uses:

```js
AsyncLocalStorage
```

This allows us to:

* Store requestId
* Access it anywhere inside async functions

### Why is this needed?

Normally:

```
Async functions lose request data.
```

With AsyncLocalStorage:

```
Request ID is automatically preserved.
```

---

## 3️⃣ logger.js

### What it does:

* Gets current requestId from context
* Saves log message into MongoDB

Example usage:

```js
log("User authenticated");
```

It stores in database like this:

```json
{
  "requestId": "req-12345",
  "message": "User authenticated",
  "timestamp": "2026-02-21T10:00:00Z"
}
```

---

## 4️⃣ db.js

### What it does:

* Connects to MongoDB
* Exports database connection
* Used by logger.js

---

## 5️⃣ public/index.html

### What it does:

Frontend UI that:

* Generates a new request
* Displays the request ID
* Allows searching logs by request ID
* Shows formatted logs

---

# 🔄 Complete Workflow (Step-by-Step)

Let’s understand with an example.

---

## 🧪 Example Scenario

You click:

```
Generate New Request
```

---

### Step 1 – Server Receives Request

Server generates:

```
requestId = "req-839291"
```

This is stored inside AsyncLocalStorage.

---

### Step 2 – Async Functions Run

Example:

```js
await authenticateUser();
await fetchUserData();
await processPayment();
```

Even though these are async, they all share:

```
requestId = "req-839291"
```

---

### Step 3 – Logs Are Saved

Each function logs:

```
[req-839291] Authentication Started
[req-839291] User Data Fetched
[req-839291] Payment Processed
```

All stored in MongoDB.

---

### Step 4 – Frontend Shows Request ID

Browser displays:

```
Request ID: req-839291
```

---

### Step 5 – Fetch Logs

User enters:

```
req-839291
```

Clicks:

```
Fetch Logs
```

Server queries MongoDB:

```js
db.logs.find({ requestId: "req-839291" })
```

Returns all related logs.

---

# ⚙️ How To Run The Project

---

## 1️⃣ Install Dependencies

```bash
npm install
```

---

## 2️⃣ Start MongoDB

Make sure MongoDB is running:

```bash
mongod
```

---

## 3️⃣ Start Server

```bash
node server.js
```

You should see:

```
Server running on port 3000
MongoDB connected
```

---

## 4️⃣ Open in Browser

Go to:

```
http://localhost:3000
```

---

# 📊 Sample Output

Example logs returned:

```json
[
  {
    "requestId": "req-839291",
    "message": "Authentication Started",
    "timestamp": "2026-02-21T10:00:00Z"
  },
  {
    "requestId": "req-839291",
    "message": "User Data Fetched",
    "timestamp": "2026-02-21T10:00:02Z"
  }
]
```

---

# 🧠 Why This Is Important?

In real applications:

* One request may call multiple services
* Many async operations happen
* Debugging becomes difficult

With Request Context Propagation:

✅ You can trace full request lifecycle
✅ You can debug easily
✅ Logs are structured
✅ Works in microservices
✅ Used in real production systems

---

# 🎤 How To Explain in Presentation

You can say:

> Each request gets a unique ID. That ID is stored in async context. Every async function automatically uses that ID while logging. So later, we can fetch all logs related to that request and trace its complete lifecycle.

---

# 🏆 What You Learned

✔ AsyncLocalStorage
✔ Context propagation
✔ Structured logging
✔ MongoDB integration
✔ Full lifecycle tracing

---

# 📌 Summary

This project demonstrates:

* Request Context Propagation
* Async-safe logging
* MongoDB log storage
* Log tracing by request ID
* Clean UI for demonstration
