-- CREATE DATABASE LibraryManagement
-- USE LibraryManagement

IF OBJECT_ID (N'Account', N'U') IS NOT NULL
	DROP TABLE Account
CREATE TABLE Account
(
	ID UNIQUEIDENTIFIER,
	Username NVARCHAR(50),
	Password NVARCHAR(50),
	Phone NVARCHAR(50),
	EmailAddress NVARCHAR(50),
	Token UNIQUEIDENTIFIER,
	Type NVARCHAR(50),
	Status int
)
IF OBJECT_ID (N'Document', N'U') IS NOT NULL
	DROP TABLE Document
CREATE TABLE Document
(
	ID UNIQUEIDENTIFIER,
	Name NVARCHAR(100),
	[Description] NVARCHAR(256),
	Author NVARCHAR(50),
	Price DECIMAL(10,2),
	Quantity INT,
	[Group] NVARCHAR(50),
	[Major] NVARCHAR(50)
)

IF OBJECT_ID (N'Chanel', N'U') IS NOT NULL
	DROP TABLE Chanel
CREATE TABLE Chanel 
(
	ID UNIQUEIDENTIFIER,
	Name NVARCHAR(50),
	Description NVARCHAR(100)
)
IF OBJECT_ID (N'ChanelSubcribes', N'U') IS NOT NULL
	DROP TABLE ChanelSubcribes
CREATE TABLE ChanelSubcribes
(
	ID UNIQUEIDENTIFIER,
	UserId UNIQUEIDENTIFIER,
	ChanelID UNIQUEIDENTIFIER
)

IF OBJECT_ID (N'NotificationUsers', N'U') IS NOT NULL
	DROP TABLE NotificationUsers
CREATE TABLE NotificationUsers
(
	ID UNIQUEIDENTIFIER,
	UserId UNIQUEIDENTIFIER,
	Title NVARCHAR(50),
	Content NVARCHAR(MAX),
	IsRead BIT
)


------------------------------------STORE PROCEDURE----------------------------------------

IF OBJECT_ID (N'sp_Account_Register', N'P') IS NOT NULL
	DROP PROCEDURE sp_Account_Register
Go
CREATE Procedure sp_Account_Register 
	@UserName NVARCHAR(50),
	@Password NVARCHAR(100),
	@Phone NVARCHAR(50) = '',
	@EmailAddress NVARCHAR(50) = '',
	@Type NVARCHAR(50)
AS 
BEGIN 
	IF NOT EXISTS (SELECT 1 FROM Account WHERE UserName = @UserName)
	BEGIN 
		INSERT INTO Account (ID, Username, Password, Phone, EmailAddress, Type, Status)
		VALUES (NEWID(),@Username, @Password, @Phone, @EmailAddress, @Type, 0)
	END
END


IF OBJECT_ID (N'sp_Account_Login', N'P') IS NOT NULL
	DROP PROCEDURE sp_Account_Login
GO 

CREATE PROCEDURE sp_Account_Login
	@Username NVARCHAR(50),
	@Password NVARCHAR(50),
	@Token NVARCHAR(50)
AS 
BEGIN 
	IF EXISTS (SELECT 1 FROM Account WHERE Username = @Username AND Password = @Password)
	UPDATE Account SET Token = @Token WHERE Username = @Username AND Password = @Password

	SELECT * 
	FROM Account 
	WHERE Username = @Username AND Password = @Password
END

IF OBJECT_ID (N'sp_Notification_Notify', N'P') IS NOT NULL
	DROP PROCEDURE sp_Notification_Notify
GO

CREATE PROCEDURE sp_Notification_Notify
	@UserId UNIQUEIDENTIFIER,
	@Title NVARCHAR(50),
	@Content NVARCHAR(MAX)
AS 
BEGIN
	INSERT INTO NotificationUsers (Id, UserId, Title, Content, IsRead)
	VALUES (NEWID(), @UserId, @Title, @Content, 0)
END


IF OBJECT_ID (N'sp_Notification_GetAllNotifications', N'P') IS NOT NULL
	DROP PROCEDURE sp_Notification_GetAllNotifications
GO 
CREATE PROCEDURE sp_Notification_GetAllNotifications
	@UserId UNIQUEIDENTIFIER
AS 
BEGIN 
	SELECT *
	FROM NotificationUsers
	WHERE UserId = @UserId
END

IF OBJECT_ID (N'sp_Chanel_Add', N'P') IS NOT NULL
	DROP PROCEDURE sp_Chanel_Add
GO
CREATE PROCEDURE sp_Chanel_Add
	@Id UNIQUEIDENTIFIER,
	@Name NVARCHAR(100),
	@Description NVARCHAR(Max)
AS 
BEGIN 
	INSERT INTO Chanel (Id, Name, Description)
	VALUES (@Id, @Name, @Description)
END 


IF OBJECT_ID (N'sp_Account_Get', N'P') IS NOT NULL
	DROP PROCEDURE sp_Account_Get
GO

CREATE PROCEDURE sp_Account_Get
	@Token NVARCHAR(50)
AS 
BEGIN 
	SELECT * 
	FROM Account 
	WHERE Token = @Token
END 

IF OBJECT_ID (N'sp_Chanel_Follow', N'P') IS NOT NULL
	DROP PROCEDURE sp_Chanel_Follow
GO 
CREATE PROCEDURE sp_Chanel_Follow
	@UserId UNIQUEIDENTIFIER ,
	@ChanelId NVARCHAR(50)
AS 
BEGIN 
	IF NOT EXISTS (SELECT 1 FROM ChanelSubcribes WHERE UserId = @UserId AND ChanelId = @ChanelId)
		INSERT INTO ChanelSubcribes (Id, UserId, ChanelId)
		VALUES (NEWID(), @UserId, @ChanelId)
END 

IF OBJECT_ID (N'sp_Chanel_GetAll', N'P') IS NOT NULL
	DROP PROCEDURE sp_Chanel_GetAll
GO

CREATE PROCEDURE sp_Chanel_GetAll
AS 
BEGIN	
	SELECT *
	FROM Chanel
END

IF OBJECT_ID (N'sp_Chanel_GetAllSubcribes', N'P') IS NOT NULL
	DROP PROCEDURE sp_Chanel_GetAllSubcribes
GO

CREATE PROCEDURE sp_Chanel_GetAllSubcribes
	@ChanelId UNIQUEIDENTIFIER
AS 
BEGIN
	SELECT acc.*
	FROM Account acc 
		INNER JOIN ChanelSubcribes cs ON cs.UserId = acc.ID AND cs.ChanelID = @ChanelId
END

IF OBJECT_ID (N'sp_Account_Upgrade', N'P') IS NOT NULL
	DROP PROCEDURE sp_Account_Upgrade
GO 
CREATE PROCEDURE sp_Account_Upgrade 
	@Token UNIQUEIDENTIFIER
AS 
BEGIN 
	UPDATE Account SET Type = 'VIP' WHERE Token = @Token
END

IF OBJECT_ID (N'sp_Account_Logout', N'P') IS NOT NULL
	DROP PROCEDURE sp_Account_Logout
GO 
CREATE PROCEDURE sp_Account_Logout
	@Token UNIQUEIDENTIFIER
AS 
BEGIN 
	UPDATE Account SET Token = '' WHERE Token = @Token
END

IF OBJECT_ID (N'sp_Account_Downgrade', N'P') IS NOT NULL
	DROP PROCEDURE sp_Account_Downgrade
GO 
CREATE PROCEDURE sp_Account_Downgrade
	@Token UNIQUEIDENTIFIER
AS 
BEGIN
	UPDATE Account SET Type = 'Normal' WHERE Token = @Token
END