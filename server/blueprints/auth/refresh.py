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

refresh_bp = Blueprint("refresh", __name__)

@refresh_bp.route("/refresh", methods=["POST"])
def refresh():
    return make_response("Reached refresh!", 200) 
