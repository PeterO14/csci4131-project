CREATE TABLE todo (
    message_id INT NOT NULL AUTO_INCREMENT,
    note VARCHAR(300) NOT NULL,
    done BOOL,
    PRIMARY KEY(message_id)
);