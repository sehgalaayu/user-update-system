## 🚀 User Update System

A simple web application built with **Node.js**, **Express**, **MySQL**, and **EJS** that allows users to view a list of users and update their username only after verifying their password.

---

### 📂 Features

* View all users from the database
* Edit a user’s username securely
* Password verification before updating
* Clean UI with EJS templating
* Patch request used for update logic
* Uses MySQL as the database

---

### 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **MySQL**
* **EJS**
* **method-override**
* **faker.js** (for dummy users)

---

### ⚙️ Setup Instructions

#### 1. Clone the repo

```bash
git clone https://github.com/sehgalaayu/user-update-system.git
cd user-update-system
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Set up MySQL Database

```sql
CREATE DATABASE "___";

USE <--__database-name__-->;

CREATE TABLE user (
  id VARCHAR(255) PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);
```

#### 4. Optional: Add fake users

Uncomment the `/add-fake-users` route in `index.js`, run the server, and visit:

```
http://localhost:8080/add-fake-users
```

Then comment it again to avoid re-adding.

#### 5. Start the server

```bash
node index.js
```

Visit:

```
http://localhost:8080/
```

---

### 🧠 How it Works

1. Users are listed on the `/users` route.
2. Click **Edit** next to a username — it takes you to a form.
3. You enter a **new username** and **password**.
4. The app checks the entered password against the DB.
5. If correct, the username updates; if not, it shows an error.

---

### 🙋‍♀️ Author

Made with ❤️ by [Aayu](https://github.com/YOUR-USERNAME)

---
