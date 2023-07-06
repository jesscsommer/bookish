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

me_bp = Blueprint("me", __name__)

@me_bp.route("/me", methods=["GET"])
def me():
    return make_response("Reached me!", 200) 
