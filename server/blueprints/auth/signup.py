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
    set_refresh_cookies
) 
from models import db
from models.user import User
from blueprints.user_by_id import user_schema

signup_bp = Blueprint("signup", __name__)

@signup_bp.route("/signup", methods=["POST"])
def signup():
    try: 
        data = request.get_json()

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if User.query.filter(User.username == username).first():
            return make_response({"error": "Username must be unique"}, 400)
        
        new_user = user_schema.load({"username": username, "email": email})
        new_user.password_hash = password

        db.session.add(new_user)
        db.session.commit()

        token = create_access_token(identity=new_user.id)
        refresh_token = create_refresh_token(identity=new_user.id)
        res = make_response({"user": user_schema.dump(new_user)}, 201)

        set_access_cookies(res, token)
        set_refresh_cookies(res, refresh_token)

        return res

    except Exception as e: 
        return make_response({"error": [str(e)]}, 422)
