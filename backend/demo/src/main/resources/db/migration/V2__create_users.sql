CREATE TABLE users (
    id            BIGSERIAL PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP    NOT NULL DEFAULT now()
);

ALTER TABLE tasks ADD COLUMN user_id BIGINT REFERENCES users(id) ON DELETE CASCADE;
CREATE INDEX idx_tasks_user_id ON tasks(user_id);