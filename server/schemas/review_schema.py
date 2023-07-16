## rating : number, int or float that ends in 0.5 only, can't be null
## max length for the comment, can't be null
## same user can't review the same book twice

from schemas import (
    fields,
    ma,
    validate,
    validates, 
    validates_schema,
    Review,
    ValidationError
)

from schemas.book_schema import BookSchema
from schemas.user_schema import UserSchema

from models.book import Book
from models.user import User

class ReviewSchema(ma.SQLAlchemySchema):
    class Meta():
        model = Review
        load_instance = True
        ordered = True
        fields = ("id", "rating", "comment", "book_id", "book", "user_id", "user", "url")
        
    rating = fields.Float(required=True, \
                    validate=validate.Range(min=0.5, max=5), \
                    error="Rating must be between 0.5 and 5")
    comment = fields.String(required=True, \
                    validate=validate.Length(min=100, max=2000), \
                    error="Comment must be between 100 and 2000 characters")
    book = fields.Nested(BookSchema, only=("id", "title", "url"))
    user = fields.Nested(UserSchema, only=("id", "display_name", "username", "profile_pic", "url"))

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "reviewbyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("reviews")
        }
    )

    @validates_schema
    def validate_object(self, data, **kwargs):
        if review := Review.query.filter(Review.book_id == data["book_id"]) \
                            .filter(Review.user_id == data["user_id"]) \
                            .first(): 
            if not review.id: 
                raise ValidationError("Book already reviewed")
