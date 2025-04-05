CREATE DATABASE lollafest;

USE lollafest;



    CREATE TABLE artista(
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(45) NOT NULL
    );

    CREATE TABLE palco (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(25) NOT NULL,
        id_artista  INT NOT NULL,
        Foreign Key (id_artista) REFERENCES artista(id)
    );



    CREATE TABLE apresentacao(
        id INT AUTO_INCREMENT PRIMARY KEY ,
        data_horario TIMESTAMP NOT NULL,
        id_artista INT NOT NULL,
        id_palco INT NOT NULL,
        Foreign Key (id_artista) REFERENCES artista(id),
        Foreign Key (id_palco) REFERENCES palco(id)

    );

    CREATE TABLE ingresso(
        id INT PRIMARY KEY AUTO_INCREMENT,
       apresentacao_id INT NOT NULL,
        Foreign Key (apresentacao_id) REFERENCES apresentacao(id)
    );
    



