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

books_schema = BookSchema(many=True)
books_bp = Blueprint("books", __name__, url_prefix="/books")

class Books(Resource):
    def get(self): 
        books = Book.query.order_by(Book.created_at.desc()).all()
        serialized_books = books_schema.dump(books)
        serialized_books_with_ratings = [
            {**book, \
            "avg_rating": round(sum(review["rating"] for review in book["reviews"]) / len(book["reviews"]), 1)
            } 
        for book in serialized_books ]
        return make_response(serialized_books_with_ratings, 200)