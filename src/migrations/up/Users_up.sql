USE User_Management;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = N'Users' AND xtype = 'U')
BEGIN
    CREATE TABLE Users (
        id INT PRIMARY KEY IDENTITY,
        username NVARCHAR(100),
        email NVARCHAR(100),
        password NVARCHAR(100),
    );
END