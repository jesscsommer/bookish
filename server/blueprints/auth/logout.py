from blueprints import (
    Resource,
    request, 
    session, 
    Blueprint, 
    make_response, 
    abort, 
    g
)

from config import app, unset_jwt_cookies 
from models import db

logout_bp = Blueprint("logout", __name__)

@logout_bp.route("/logout", methods=["DELETE"])
def logout():
    res = make_response({}, 204)
    unset_jwt_cookies(res)
    return res
