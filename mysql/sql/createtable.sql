USE nodedb;
CREATE TABLE IF NOT EXISTS people( 
    id MEDIUMINT NOT NULL AUTO_INCREMENT, 
    name CHAR(30) NOT NULL,     
    PRIMARY KEY (id) );
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root';
SELECT host FROM user WHERE user='root';
UPDATE user SET host = '%' WHERE user ='root';
FLUSH privileges;

