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
    jwt_required,
    get_jwt_identity
) 

from models import db
from models.user import User
from blueprints.user_by_id import user_schema

refresh_bp = Blueprint("refresh", __name__)

@refresh_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    user = db.session.get(User, user_id)

    new_access_token = create_access_token(identity=user_id)
    res = make_response({"user": user_schema.dump(user)}, 200)

    set_access_cookies(res, new_access_token)

    return make_response("Reached refresh!", 200) 
