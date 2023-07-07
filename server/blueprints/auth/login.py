from blueprints import (
    Resource,
    request, 
    session, 
    Blueprint, 
    make_response, 
    abort, 
    g
)

from config import (
    app,
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
    cache
) 

from models import db
from models.user import User
from blueprints.user_by_id import user_schema

login_bp = Blueprint("login", __name__)

@login_bp.route("/login", methods=["POST"])
def login():
    try: 
        data = request.get_json()

        username = data.get("username")
        password = data.get("password")

        if user := User.query.filter(User.username == username).first():

            if user.authenticate(password):
                token = create_access_token(identity=user.id)
                refresh_token = create_refresh_token(identity=user.id)

                res = make_response({"user": user_schema.dump(user)}, 200)

                set_access_cookies(res, token)
                set_refresh_cookies(res, refresh_token)

                return res
            
            return make_response({"error": "Invalid credentials"}, 401)
    except: 
        return make_response({"error": "Invalid credentials"}, 401)
