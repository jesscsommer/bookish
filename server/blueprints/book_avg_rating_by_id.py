from blueprints import (
    Resource,
    request, 
    session, 
    Blueprint, 
    make_response, 
    abort, 
    g
)

from config import (
    app,
    client,
    redirect,
    url_for
) 

from models import db
from models.book import Book
from models.review import Review
from blueprints.book_by_id import book_schema
from blueprints.review_by_id import review_schema

book_avg_rating_by_id_bp = Blueprint("books_avg_rating_by_id", __name__)

@book_avg_rating_by_id_bp.route("/avg_rating/books/<int:id>", methods=["GET"])
def get_avg_rating_by_id(id):
    try:
        book = Book.query.filter(Book.id == id).first_or_404()
        book_avg_rating = {
            "id": book.id, 
            "title": book.title, 
            "avg_rating": round(sum(review.rating for review in book.reviews) / len(book.reviews), 1)}
        return make_response(book_avg_rating, 200)
    except Exception as e: 
        return make_response({"error": [str(e)]}, 400)