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
from models.tag import Tag
from schemas.tag_schema import TagSchema

tag_schema = TagSchema()
tag_by_id_bp = Blueprint("tag_by_id", __name__, url_prefix="/tags/<int:id>")

class TagById(Resource):
    def get(self, id): 
        if tag := tag_schema.dump(db.session.get(Tag, id)):
            return make_response(tag, 200)
        return make_response({"error": "Tag not found"}, 404)