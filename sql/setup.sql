DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS user_events CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE events (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT,
    url TEXT,
    date TEXT,
    host text
);

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE user_events (
    event_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT,
    url TEXT,
    date TEXT,
    host text, 
    note text,
    linked_user int,
    CONSTRAINT fk_user
        FOREIGN KEY(linked_user)
            REFERENCES users(id)
            
);








