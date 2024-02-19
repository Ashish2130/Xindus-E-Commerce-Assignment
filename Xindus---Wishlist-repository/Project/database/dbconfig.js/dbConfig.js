CREATE TABLE DbConfiguration (
    id INT PRIMARY KEY AUTO_INCREMENT,
    databaseName VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    host VARCHAR(255) NOT NULL,
    port INT NOT NULL
);
