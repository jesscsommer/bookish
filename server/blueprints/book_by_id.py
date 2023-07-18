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
from models import db, joinedload
from models.book import Book
from schemas.book_schema import BookSchema

book_schema = BookSchema()
book_by_id_bp = Blueprint("book_by_id", __name__, url_prefix="/books/<int:id>")

class BookById(Resource):
    def get(self, id): 
        if book := Book.query.options(joinedload(Book.reviews)) \
                    .filter(Book.id == id).first():
            book = book_schema.dump(book)
            book_with_avg_rating = {**book, \
                "avg_rating": round(sum(review["rating"] \
                    for review in book["reviews"]) / len(book["reviews"]), 1)}
            return make_response(book_with_avg_rating, 200)
        return make_response({"error": "Book not found"}, 404)