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
from models.review import Review
from models.user import User
from schemas.review_schema import ReviewSchema

review_schema = ReviewSchema()
review_by_id_bp = Blueprint("review_by_id", __name__, url_prefix="/reviews/<int:id>")

class ReviewById(Resource):
    def get(self, id): 
        if review := review_schema.dump(db.session.get(Review, id)):
            return make_response(review, 200)
        return make_response({"error": "Review not found"}, 404)
    def delete(self, id):
        try:
            review = db.session.get(Review, id)

            db.session.delete(review)
            db.session.commit()
            return make_response({}, 204)
        except Exception as e:
            return make_response({"error": "Review not found"}, 404)