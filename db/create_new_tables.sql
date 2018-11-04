CREATE TABLE IF NOT EXISTS photo
(
    pid SERIAL PRIMARY KEY NOT NULL,
    url VARCHAR(200) NOT NULL,
    title VARCHAR(100) DEFAULT 'Untitled',
    uid INTEGER NOT NULL,
    datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tag
(
    tid INTEGER NOT NULL,
    pid INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS tag_alias
(
    alias_id SERIAL PRIMARY KEY NOT NULL,
    old_name VARCHAR(50) NOT NULL,
    new_name VARCHAR(50) NOT NULL
);