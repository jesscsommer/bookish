from schemas import (
    fields,
    ma,
    validate,
    validates, 
    Shelf
)

from schemas.user_schema import UserSchema

class ShelfSchema(ma.SQLAlchemySchema):
    class Meta():
        model = Shelf
        load_instance = True
        ordered = True
        fields = ("id", "name", "user", "book_shelves", "url")

    name = fields.String(required=True, \
                        validate=validate.Length(min=1, max=100),
                        error="Shelf name must be less than 100 characters")
    user = fields.Nested(UserSchema, only=("id", "username", "url"))
    book_shelves = fields.Nested("BookShelfSchema", only=("id", "shelf_id", "url"))

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "shelfbyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("shelves")
        }
    )

    @validates
    def validates_name(self, name): 
        pass
        ## get current user id 
        # if Shelf.query.filter(Shelf.name == name \
        #                     and Shelf.user.id == current user id):
        #     raise ValidationError("Shelf name must be unique")