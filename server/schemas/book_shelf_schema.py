from schemas import (
    fields,
    validates,
    validates_schema,
    ValidationError,
    ma,
    BookShelf
)
    
from schemas.book_schema import BookSchema
from schemas.shelf_schema import ShelfSchema

from models.book import Book
from models.shelf import Shelf
from models.user import User

class BookShelfSchema(ma.SQLAlchemySchema):
    class Meta():
        model = BookShelf
        load_instance = True
        ordered = True
        # fields = ("id", "url")
        fields = ("id", "book", "shelf", "book_id", "shelf_id", "url")
        
    book = fields.Nested(BookSchema, only=("id", "title", "url"))
    shelf = fields.Nested(ShelfSchema, only=("id", "user", "url"))

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "bookshelfbyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("bookshelves")
        }
    )

    @validates_schema
    def validate_object(self, data):
        if BookShelf.query.filter(BookShelf.book_id == data["book"].id \
                                and BookShelf.shelf_id == data["shelf"].id) \
                                .first(): 
            raise ValidationError("Book already on that shelf")