CREATE TABLE tokens(
                       іd       SERIAL PRIMARY KEY,
                       user_id        INTEGER NOT NULL REFERENCES users(id),
                       user_email     VARCHAR(50) NOT NULL,
                       accesstoken   TEXT NOT NULL,
                       refreshtoken  TEXT NOT NULL,
                       created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                       updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
