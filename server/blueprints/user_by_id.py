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
from schemas.user_schema import UserSchema

user_schema = UserSchema()
user_by_id_bp = Blueprint("user_by_id", __name__, url_prefix="/users/<int:id>")

class userById(Resource):
    def get(self, id): 
        if user := user_schema.dump(db.session.get(User, id)):
            return make_response(user, 200)
        return make_response({"error": "User not found"}, 404)