#!/usr/bin/env python3

from flask import request
from flask_restful import Resource

from config import (
    app, 
    db, 
    api, 
    get_jwt, 
    get_jwt_identity,
    make_response, 
    create_access_token, 
    set_access_cookies, 
    jwt_required,
    login_manager,
    current_user,
    requests,
    GOOGLE_DISCOVERY_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    login_user,
    client,
    redirect,
    url_for,
    login_required,
    logout_user
)
from datetime import timedelta, datetime, timezone
import json

# Import models 
from models.author import Author
from models.book_shelf import BookShelf
from models.book_tag import BookTag
from models.book import Book
from models.quote import Quote
from models.review import Review
from models.shelf import Shelf
from models.tag import Tag
from models.user import User

# Import blueprints
from blueprints.auth.signup import signup_bp
from blueprints.auth.login import login_bp
from blueprints.auth.logout import logout_bp
from blueprints.auth.me import me_bp

from blueprints.authors import Authors
from blueprints.author_by_id import AuthorById
from blueprints.books import Books
from blueprints.book_by_id import BookById
from blueprints.book_shelves import BookShelves
from blueprints.book_shelf_by_id import BookShelfById
from blueprints.quotes import Quotes
from blueprints.quote_by_id import QuoteById
from blueprints.shelves import Shelves
from blueprints.shelf_by_id import ShelfById
from blueprints.users import Users
from blueprints.user_by_id import UserById, user_schema
from blueprints.user_by_username import user_by_username_bp

# Add resources

api.add_resource(Authors, "/authors")
api.add_resource(AuthorById, "/authors/<int:id>")
api.add_resource(Books, "/books")
api.add_resource(BookById, "/books/<int:id>")
api.add_resource(BookShelves, "/book_shelves")
api.add_resource(BookShelfById, "/book_shelves/<int:id>")
api.add_resource(Quotes, "/quotes")
api.add_resource(QuoteById, "/quotes/<int:id>")
api.add_resource(Shelves, "/shelves")
api.add_resource(ShelfById, "/shelves/<int:id>")
api.add_resource(Users, "/users")
api.add_resource(UserById, "/users/<int:id>")

@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, user_id)

@app.route("/")
def index():
    if current_user.is_authenticated:
        return (
            "<p>Hello, {}! You're logged in! Email: {}</p>"
            '<a class="button" href="/logout">Logout</a>'.format(
                current_user.username, current_user.email
            )
        )
    else:
        return '<a class="button" href="/login">Google Login</a>'
    
def get_google_provider_cfg():
    ## add error handling
    return requests.get(GOOGLE_DISCOVERY_URL).json()

@app.route("/login")
def login():
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=request.base_url + "/callback",
        scope=["openid", "email", "profile"],
    )
    return redirect(request_uri)

@app.route("/login/callback")
def callback():
    code = request.args.get("code")

    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    token_url, headers, body = client.prepare_token_request(
    token_endpoint,
    authorization_response=request.url,
    redirect_url=request.base_url,
    code=code
    )

    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    client.parse_request_body_response(json.dumps(token_response.json()))

    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)   

    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        picture = userinfo_response.json()["picture"]
        users_name = userinfo_response.json()["given_name"]
    else:
        return "User email not available or not verified by Google.", 400

    # user = User(
    #     id=unique_id, display_name=users_name, email=users_email, profile_pic=picture
    # )
    # data = {
    #     "id": unique_id,
    #     "email": users_email,
    #     # "profile_pic": picture,
    #     "display_name": users_name,
    #     "username": users_name
    # }
    # user = user_schema.load(data)

    user = User(
        display_name=users_name, email=users_email, username=users_name
    )

    # if not db.session.get(User, unique_id):
    #     User.create(unique_id, users_name, users_email, picture)

    db.session.add(user)
    db.session.commit() 

    login_user(user)

    return redirect(url_for("index"))

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))

# @app.after_request 
# @signup_bp.after_request
# @login_bp.after_request
# @me_bp.after_request
# @user_by_username_bp.after_request
# def refresh_expiring_jwts(response):
#     try:
#         exp_timestamp = get_jwt()["exp"]
#         now = datetime.now(timezone.utc)
#         target_timestamp = datetime.timestamp(now + timedelta(minutes=5))
#         if target_timestamp > exp_timestamp:
#             access_token = create_access_token(identity=get_jwt_identity())
#             set_access_cookies(response, access_token)
#         return response
#     except (RuntimeError, KeyError):
#         return response

app.register_blueprint(signup_bp)
app.register_blueprint(login_bp)
app.register_blueprint(logout_bp)
app.register_blueprint(me_bp)

app.register_blueprint(user_by_username_bp)

if __name__ == '__main__':
    app.run(port=5555, debug=True, ssl_context="adhoc")
