Authentication
- authentication - you are who you say you are
- something you know (username/password), something you have (2FA), 3rd party connect
- username/password
	- can't store passwords using plain text
	- encrypt - implies a decryption
	- hashing - one way (the way you want to store your passwords)
		- hashing algorithms should be collision resistant, slow enough to not brute force, reliant on some standard
		- salt - some info pre/appended to password before hashing resulting in unique hashes for the same password
- user registration flow
	- user enters login and pw
	- server searches for existing login
	- if no login
		- take pw
		- generate a salt
		- ap/prepend to pw
		- hash salt and pw combo
		- store resulting hash in db
		- store the salt with other user info
	- else if there is a login
		- search for username
		- take incoming password
		- add existing salt
		- hash pw and salt combo

TLS/SSL
- series of cryptographic protocols
- guarantees the following
	- communication is private (symmetric key encryption)
	- one of the partieis is verified (they are who they say they are)
	- message haven't been tampered with
- Protocol
	- 1. agrees to what algorithms and version are supported by both client and server
	- 2. server presents an ssl cert (3rd party verifies it)
	- 3. exchange keys
	- 4. encrypted communication ensues


Authorization
- authorization - you have access to a certain resource based on who you are
