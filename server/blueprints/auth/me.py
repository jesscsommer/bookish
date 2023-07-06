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

me_bp = Blueprint("me", __name__)

@me_bp.route("/me", methods=["GET"])
def me():
    return make_response("Reached me!", 200) 
