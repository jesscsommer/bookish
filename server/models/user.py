from models import db, association_proxy

class User(db.Model):
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    display_name = db.Column(db.String)
    profile_pic = db.Column(db.String)
    bio = db.Column(db.String)

    reviews = db.relationship("Review", back_populates="user", cascade="all, delete-orphan")
    reviewed_books = association_proxy("reviews", "book")

    shelves = db.relationship("Shelf", back_populates="user")

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    def __repr__(self):
        return (
            f"User #{self.id}: {self.username}"
        )