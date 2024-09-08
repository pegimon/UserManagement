USE User_Management;

IF EXISTS (SELECT * FROM sysobjects WHERE name = N'Users' AND xtype = 'U')
BEGIN
    DROP TABLE Users;
END