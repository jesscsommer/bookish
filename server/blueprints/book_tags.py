from blueprints import (
    Resource,
    request, 
    session, 
    Blueprint, 
    make_response, 
    abort, 
    g
)

from config import app, jwt_required 
from models import db
from models.book_tag import BookTag
from schemas.book_tag_schema import BookTagSchema

book_tags_schema = BookTagSchema(many=True)
book_tags_bp = Blueprint("book_tags", __name__, url_prefix="/book_tags")

class BookTags(Resource):
    def get(self): 
        book_tags = BookTag.query.order_by(BookTag.created_at.desc()).all()
        return make_response(book_tags_schema.dump(book_tags), 200)
    