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

login_bp = Blueprint("login", __name__)

@login_bp.route("/login", methods=["POST"])
def login():
    return make_response("Reached login!", 200) 
