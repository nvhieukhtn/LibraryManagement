-- CREATE DATABASE LibraryManagement
-- USE LibraryManagement


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
--DROP TABLE Document
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


CREATE TABLE Chanel 
(
	ID UNIQUEIDENTIFIER,
	Name NVARCHAR(50),
	Description NVARCHAR(100)
)

CREATE TABLE ChanelSubcribes
(
	ID UNIQUEIDENTIFIER,
	UserId UNIQUEIDENTIFIER,
	ChanelID UNIQUEIDENTIFIER
)


CREATE TABLE NotificationUsers
(
	ID UNIQUEIDENTIFIER,
	UserId UNIQUEIDENTIFIER,
	Title NVARCHAR(50),
	Content NVARCHAR(MAX),
	IsRead BIT
)


------------------------------------STORE PROCEDURE----------------------------------------
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

GO 
CREATE PROCEDURE sp_Notification_GetAllNotifications
	@UserId UNIQUEIDENTIFIER
AS 
BEGIN 
	SELECT *
	FROM NotificationUsers
	WHERE UserId = @UserId
END

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

GO

CREATE PROCEDURE sp_Account_Get
	@Token NVARCHAR(50)
AS 
BEGIN 
	SELECT * 
	FROM Account 
	WHERE Token = @Token
END 

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

GO

CREATE PROCEDURE sp_Chanel_GetAll
AS 
BEGIN	
	SELECT *
	FROM Chanel
END

GO

CREATE PROCEDURE sp_Chanel_GetAllSubcribes
	@ChanelId UNIQUEIDENTIFIER
AS 
BEGIN
	SELECT acc.*
	FROM Account acc 
		INNER JOIN ChanelSubcribes cs ON cs.UserId = acc.ID AND cs.ChanelID = @ChanelId
END