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
    get_jwt_identity,
    cache,
    login_required,
    current_user
) 

from models import db
from models.user import User
from blueprints.user_by_id import user_schema

me_bp = Blueprint("me", __name__)

@me_bp.route("/me", methods=["GET"])
# @login_required()
# @cache.memoize(50)
def me():
    if current_user.is_authenticated:
            return make_response({"user": user_schema.dump(current_user)}, 200)
    return make_response({"error": "Unauthorized"}, 401) 
