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
from models.shelf import Shelf
from schemas.shelf_schema import ShelfSchema

shelves_schema = ShelfSchema(many=True)
shelves_bp = Blueprint("shelves", __name__, url_prefix="/shelves")

class Shelves(Resource):
    def get(self): 
        shelves = Shelf.query.order_by(Shelf.created_at.desc()).all()
        return make_response(shelves_schema.dump(shelves), 200)