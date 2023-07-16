from schemas import (
    fields,
    validate,
    validates,
    ValidationError,
    ma,
    Tag
)

class TagSchema(ma.SQLAlchemySchema):
    class Meta():
        model = Tag
        load_instance = True
        ordered = True
        fields = ("id", "name", "book_tags", "user_id", "url")

    book_tags = fields.Nested("BookTagSchema", only=("id", "url"), many=True)

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "tagbyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("tags")
        }
    )
