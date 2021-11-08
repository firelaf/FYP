# FYP

Non-Medical Support Worker Communication and Organisation Software

Daniel Sergilov P2443155

Development Project

De Montfort University

EXTERNAL DEPENDANCIES - Please install on the running machine

- Node Package Manager
- MySQL 8.0

STEPS TO RUN

1. Open MySQL Command Line Client (or any client capable of making MySQL queries)
2. Run these EXACT queries:

------------------------------
CREATE DATABASE userdata;
------------------------------
CREATE TABLE login(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50),
    username VARCHAR(50),
    user_type CHAR(1),
    pass VARCHAR(60)
);
------------------------------
CREATE TABLE requests(
    startTime TIME,
    endTime TIME,
    requestDate DATE,
    requester_id INT,
    assignedTo_id INT,
    session_id VARCHAR(36),
    details VARCHAR(1000),
    practicalType TINYINT(1),
    noteTakingType TINYINT(1),
    FOREIGN KEY (requester_id) REFERENCES login(user_id),
    FOREIGN KEY (assignedTo_id) REFERENCES login(user_id)
);
-----------------------------
CREATE TABLE availability(
    availableDate DATE,
    worker_id INT,
    unavailableFrom TIME,
    unavailableTo TIME,
    setByWorker TINYINT(1),
    session_id VARCHAR(36),
    FOREIGN KEY (worker_id) REFERENCES login(user_id)
);
-----------------------------
CREATE TABLE accountData(
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    course VARCHAR(150),
    practical BOOL,
    noteTaking BOOL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES login(user_id)
);
-----------------------------
INSERT INTO login(user_id, email, username, user_type, pass) VALUES
(4, "admin1@testmail.com", "admin1", "A", "adminPass"),
(5, "student1@testmail.com", "student1", "S", "studentPass1"),
(6, "student2@testmail.com", "student2", "S", "studentPass2"),
(7, "student3@testmail.com", "student3", "S", "studentPass3"),
(8, "worker1@testmail.com", "worker1", "W", "workerPass1"),
(9, "worker2@testmail.com", "worker2", "W", "workerPass2"),
(10, "worker3@testmail.com", "worker3", "W", "workerPass3");
------------------------------

3. Navigate to "./private"
4. Open "database_connection.js" in any text editor
5. Enter your MySQL authentication information iside the quotation marks
   -NOTE: Usually, your host will be "localhost", and your user will be "root"
6. In your prefered command line interface, navigate to the root dir of the project "/"
7. Execute the command "npm start"
8. Open your browser (Google Chrome is recommended)
9. Go to http://localhost:5000
