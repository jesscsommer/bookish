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

tags_schema = TagSchema(many=True)
tags_bp = Blueprint("tags", __name__, url_prefix="/tags")

class Tags(Resource):
    def get(self): 
        tags = Tag.query.order_by(Tag.created_at.desc()).all()
        return make_response(tags_schema.dump(tags), 200)