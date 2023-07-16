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
from models.book import Book
from schemas.book_schema import BookSchema

book_schema = BookSchema()
book_by_id_bp = Blueprint("book_by_id", __name__, url_prefix="/books/<int:id>")

class BookById(Resource):
    def get(self, id): 
        if book := book_schema.dump(db.session.get(Book, id)):
            book_with_avg_rating = {**book, \
                "avg_rating": round(sum(review["rating"] \
                    for review in book["reviews"]) / len(book["reviews"]), 1)}
            return make_response(book_with_avg_rating, 200)
        return make_response({"error": "Book not found"}, 404)