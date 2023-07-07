from blueprints import (
    Resource,
    request, 
    session, 
    Blueprint, 
    make_response, 
    abort, 
    g
)

from config import app, jwt_required, get_jwt_identity 
from models import db
from models.shelf import Shelf
from models.user import User
from schemas.shelf_schema import ShelfSchema

shelf_schema = ShelfSchema()
shelves_schema = ShelfSchema(many=True)
shelves_bp = Blueprint("shelves", __name__, url_prefix="/shelves")

class Shelves(Resource):
    def get(self): 
        shelves = Shelf.query.order_by(Shelf.created_at.desc()).all()
        return make_response(shelves_schema.dump(shelves), 200)
    
    # @jwt_required()
    def post(self):
        try: 
            data = request.get_json()
            shelf_schema.validate(data)
            # data.user_id = get_jwt_identity()
            # data.user_id = 22
            # import ipdb; ipdb.set_trace()
            data["user_id"] = 22

            new_shelf = shelf_schema.load(data)
            db.session.add(new_shelf)
            db.session.commit()
            return make_response(shelf_schema.dump(new_shelf), 201)
        except Exception as e: 
            db.session.rollback()

