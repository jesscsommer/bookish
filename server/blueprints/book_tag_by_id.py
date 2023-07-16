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
from models.book_tag import BookTag
from schemas.book_tag_schema import BookTagSchema

book_tag_schema = BookTagSchema()
book_tag_by_id_bp = Blueprint("book_tag_by_id", __name__, url_prefix="/book_tags/<int:id>")

class BookTagById(Resource):
    def get(self, id): 
        if book_tag := book_tag_schema.dump(db.session.get(BookTag, id)):
            return make_response(book_tag, 200)
        return make_response({"error": "Book tag not found"}, 404)