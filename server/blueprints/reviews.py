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
reviews_schema = ReviewSchema(many=True)
reviews_bp = Blueprint("reviews", __name__, url_prefix="/reviews")

class Reviews(Resource):
    def get(self): 
        reviews = Review.query.order_by(Review.created_at.desc()).all()
        return make_response(reviews_schema.dump(reviews), 200)
    
    def post(self):
        try: 
            # import ipdb; ipdb.set_trace()
            data = request.get_json()
            data["user_id"] = session["user_id"]
            review_schema.validate(data)

            new_review = review_schema.load(data)
            db.session.add(new_review)
            db.session.commit()
            return make_response(review_schema.dump(new_review), 201)
        except Exception as e: 
            db.session.rollback()
            return make_response({"error": str(e)}, 422)

