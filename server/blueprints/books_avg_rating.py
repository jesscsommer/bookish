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

books_avg_rating_bp = Blueprint("books_avg_rating", __name__)

@books_avg_rating_bp.route("/avg_rating/books", methods=["GET"])
def get_avg_rating():
    try:
        books_avg_ratings = [{
            "id": book.id, 
            "title": book.title, 
            "avg_rating": round(sum(review.rating for review in book.reviews) / len(book.reviews), 1)} 
        for book in Book.query.all()]
        sorted_books_avg_ratings = sorted(books_avg_ratings, key=lambda book: book["avg_rating"], reverse=True)
        return make_response(sorted_books_avg_ratings, 200)
    except Exception as e: 
        return make_response({"error": [str(e)]}, 400)