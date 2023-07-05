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
from models.book_shelf import BookShelf
from schemas.book_shelf_schema import BookShelfSchema

book_shelves_schema = BookShelfSchema(many=True)
book_shelves_bp = Blueprint("book_shelves", __name__, url_prefix="/book_shelves")

class BookShelves(Resource):
    def get(self): 
        book_shelves = BookShelf.query.order_by(BookShelf.created_at.desc()).all()
        return make_response(book_shelves, 200)