3rd Party API:  https://ipinfo.io/<ip-address>/geo

- utilize STATES & REDUCERS
- no usage of CONTEXT
- no usage of REACT FRAMEWORKS

- users should be REDIRECTED to Login page (if not logged in) or Home Page (if logged in)

LOGIN
- email & password
- validate the credentials are correct
- Create USER SEEDER (used to login)
- redirects user to Homepage after login

HOMESCREEN
- display IP & GEOLOCATION info of logged user
- be able to enter a NEW ip address and DISPLAY Geo Info on SAME screen
- ADD history in the DATABASE for every added NEW ip address
    - add TIMESTAMP for change/added ip address
- DISPLAY ERROR if entered INVALID ip address
- DISPLAY list of SEARCH history 
    - click on SEARCHED history and display info again

OPTIONAL
- be able to SELECT and DELETE multiple items on history list
- DISPLAY the map and PIN exact location of specified IP ADDRESS