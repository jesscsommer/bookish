# bookish

This app to save and review your favorite books has a React frontend and Python with Flask backend. These instructions will walk through server-side setup. Visit [this README](/client/README.md) for a look at the app's user stories. 

***

## Installation

1. Fork and clone this repo from Github to your local environment
2. Navigate into your local directory and open the contents in your preferred code editor
3. Run `pipenv install` to install dependencies 
4. Run `pipenv shell` to create virtual environment
5. From the main project directory, run `cd server` to enter the server directory 

### .env set up
6. Create `.env` file in the server directory with `touch .env`
7. Add a line for `SECRET_KEY=`
8. In your terminal, run `python -c 'import secrets; print(secrets.token_hex())` to generate your own key
9. Copy the result into the `.env` file as the value for the secret key
10. Make sure `.env` is added to your `.gitignore`
11. Add a line for `DATABASE_URI=`
12. Copy the link to the external database you would like to connect. If you are using Render, start the link with `postgresql://` -- **not** just `postgres://`. You can find full instructions [here](https://render.com/docs/databases#connecting-from-outside-render).

### OAuth set up
If you would like to build on the Login with Google functionality, you will need to do additional Google-side setup. 
13. Configure your [OAuth consent screen](https://developers.google.com/workspace/guides/configure-oauth-consent).
14. You can select **External** for your user type and add yourself as a test user. 
15. Create your [access credentials](https://developers.google.com/workspace/guides/create-credentials).
16. In your `.env` file, add lines for `GOOGLE_CLIENT_ID=` and `GOOGLE_CLIENT_SECRET=` that match your new credentials. 
17. While testing, you can use `https://localhost` or `https://127.0.0.1` links for your authorized origins and redirects. If you do this, you will need to update `login_with_google.py` to redirect the user to the appropriate client URL, e.g. `https://127.0.0.1:4000`, on successful login.

### Configuring the database 
