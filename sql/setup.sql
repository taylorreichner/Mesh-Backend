DROP TABLE IF EXISTS events CASCADE;

CREATE TABLE events (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT,
    url TEXT,
    date TEXT,
    host text
)







