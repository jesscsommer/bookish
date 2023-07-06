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

logout_bp = Blueprint("logout", __name__)

@logout_bp.route("/logout", methods=["DELETE"])
def logout():
    return make_response("Reached logout!", 200) 
