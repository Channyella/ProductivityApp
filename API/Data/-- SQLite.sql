-- SQLite
INSERT INTO Users (Id, FirstName, LastName, Email, Password)
VALUES (0, 'Chanel', 'O''Reilly', 'chanel@shortfam.com', 'H!Th3re');

SELECT name FROM sqlite_schema
WHERE type='table'
ORDER BY name;