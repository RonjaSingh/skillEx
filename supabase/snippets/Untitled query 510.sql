ALTER TABLE session_request
ALTER COLUMN status TYPE session_status
USING status::session_status;

