from blueprints import (
    Resource,
    request, 
    session, 
    Blueprint, 
    make_response, 
    abort, 
    g
)

from config import app
from models import db
from models.user import User
from models.shelf import Shelf
from blueprints.shelf_by_id import shelf_schema
from blueprints.user_by_id import user_schema

signup_bp = Blueprint("signup", __name__)

def create_default_shelves(new_user): 
    SHELF_NAMES = ["Read", "Currently reading", "Want to read", "Favorites"]
    for name in SHELF_NAMES: 
        new_shelf = shelf_schema.load({ "name": name, "user_id": new_user.id, "default": True })
        db.session.add(new_shelf)
        db.session.commit()

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

        session["user_id"] = new_user.id
        create_default_shelves(new_user)
        
        return make_response({"user": user_schema.dump(new_user)}, 200)

    except Exception as e: 
        return make_response({"error": [str(e)]}, 422)
