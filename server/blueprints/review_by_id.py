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
    def patch(self, id):
        if review := db.session.get(Review, id):
            try:
                # import ipdb; ipdb.set_trace()
                if review.user_id == session["user_id"]:
                    data = request.get_json()
                    data["user_id"] = session["user_id"]
                    review_schema.validate(data)
                    # review_schema.validate(data)

                    updated_review = review_schema.load(data, instance=review, \
                                                    partial=True)
                    db.session.commit()
                    return make_response(review_schema.dump(updated_review), 200)
            except Exception as e: 
                db.session.rollback()
                return make_response({"error": [str(e)]}, 422)
        return make_response({"error": "User not found"}, 404)
    def delete(self, id):
        try:
            review = db.session.get(Review, id)

            db.session.delete(review)
            db.session.commit()
            return make_response({}, 204)
        except Exception as e:
            return make_response({"error": "Review not found"}, 404)