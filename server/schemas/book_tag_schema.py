from schemas import (
    fields,
    validate,
    validates,
    ValidationError,
    ma,
    BookTag
)

class BookTagSchema(ma.SQLAlchemySchema):
    class Meta():
        model = BookTag
        load_instance = True
        ordered = True
        fields = ("id", "book_id", "tag_id", "url")

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "booktagbyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("booktags")
        }
    )
