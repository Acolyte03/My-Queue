DROP DATABASE IF EXISTS tvshow_db;

CREATE DATABASE tvshow_db;

USE tvshow_db;

-- Define a table for TV shows
CREATE TABLE tv_shows (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    number_of_seasons INT,
    number_of_episodes INT,
    vote_count INT,
    vote_average FLOAT,
    overview TEXT,
    homepage VARCHAR(255),
    in_production BOOLEAN,
	popularity FLOAT,
    tagline VARCHAR(255),
    genres VARCHAR(255),
    created_by VARCHAR(255),
    networks VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Define a table for genres (if not already defined)
CREATE TABLE IF NOT EXISTS genres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Define a foreign key relationship between TV shows and genres
ALTER TABLE tv_shows
ADD FOREIGN KEY (genres) REFERENCES genres(id);


