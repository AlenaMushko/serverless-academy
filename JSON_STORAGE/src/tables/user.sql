CREATE TABLE users(
                      id         SERIAL PRIMARY KEY,
                      email      VARCHAR(50) NOT NULL UNIQUE,
                      password   VARCHAR(100) NOT NULL,
                      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
                      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
