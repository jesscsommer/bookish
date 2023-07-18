from schemas import (
    fields,
    ma,
    validate,
    validates, 
    Shelf,
    ValidationError
)

from schemas.user_schema import UserSchema
from blueprints import session

class ShelfSchema(ma.SQLAlchemySchema):
    class Meta():
        model = Shelf
        load_instance = True
        ordered = True
        fields = ("id", "name", "user", "user_id", "default", "books", "book_shelves", "url")

    name = fields.String(required=True, \
                        validate=validate.Length(min=1, max=100),
                        error="Shelf name must be less than 100 characters")
    user = fields.Nested(UserSchema, only=("id", "username", "url"))
    book_shelves = fields.Nested("BookShelfSchema", \
                                only=("id", "book_id", "shelf_id", "url"), \
                                many=True)
    books = fields.Nested("BookSchema", many=True)

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "shelfbyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("shelves")
        }
    )

    @validates("name")
    def validates_name(self, name): 
        if Shelf.query.filter(Shelf.user_id == session["user_id"]) \
                            .filter(Shelf.name == name).first():
            raise ValidationError("Shelf name must be unique")
