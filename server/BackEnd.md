General Project Structure:
Keep folder structures clean and scalable.
Decide on the project structure (MVC or other) based on your preference and project requirements.
Authentication and Authorization:
Protect routes that need authentication or authorization.
Implement user authentication (e.g., JWT).
Validate all incoming user input.
<!-- Signup API:
Route: /signup [POST]
Validate email address, password, first name, and phone number.
Check that passwords match.
Ensure the email address is unique.
Store the user in the database.
Use bcrypt to hash and store the user's password securely.

Login API: -->
Route: /login [POST]
Validate email address and password.
Check that the email and password match an existing user.
Retrieve the user's data from the database and log in the user.

Add Pet API:
Route: /pet [POST] (Protected to admin only)
Validate all user input.
Handle photo upload.
Store pet information in the database.

Get Pet By ID API:
Route: /pet/:id [GET]
Retrieve a pet by ID from the database.

Edit Pet API:
Route: /pet/:id [PUT] (Protected to admin only)
Validate all user input.
Handle photo upload.
Store updated pet information in the database.

Get Pets API:
Route: /pet [GET]
Retrieve pets that match the given criteria.
Accept query parameters for searching the database.
Return only necessary fields.

Adopt/Foster API:
Route: /pet/:id/adopt [POST] (Protected to logged-in users)
Add the pet to the current user's pets.
Change the pet’s adoption status.

Return Pet API:
Route: /pet/:id/return [POST] (Protected to logged-in users)
Change the pet's status back to available.
Remove the pet from the user's pets.

Save Pet API:
Route: /pet/:id/save [POST] (Protected to logged-in users)
Allow a user to save a pet for later.
Store the saved pet in the user's account.

Delete Saved Pet API:
Route: /pet/:id/save [DELETE] (Protected to logged-in users)
Allow a user to remove a saved pet.

Get Pets By User ID API:
Route: /pet/user/:id [GET]
Allow a user to get the pets owned by or saved by a user based on the user ID.





-------------USER----------


Get User By ID API:
Route: /user/:id [GET]
Allow fetching a user based on the user's ID.

Update User API:
Route: /user/:id [PUT] (Protected to logged-in user)
Allow a user to change their settings while logged in.
Validate user inputs.
Ensure that if the email is being changed, it’s not already in use.

Get Users API:
Route: /user [GET] (Protected to admin)
Return all users in the database.
Only return the required information.

Get User By ID API:
Route: /user/:id/full [GET]
Allow fetching a user based on the user's ID.
Return all user details (aside from password) and the user's pets they own.
