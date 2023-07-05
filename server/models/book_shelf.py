from models import db

class BookShelf(db.Model):
    __tablename__ = "book_shelves"

    id = db.Column(db.Integer, primary_key=True)

    book_id = db.Column(db.Integer, db.ForeignKey("books.id"))
    shelf_id = db.Column(db.Integer, db.ForeignKey("shelves.id"))

    book = db.relationship("Book", back_populates="book_shelves")
    shelf = db.relationship("Shelf", back_populates="book_shelves")

    def __repr__(self):
        return (
            f"BookShelf #{self.id}:"
            + f"Book: {self.book.title}"
            + f"Shelf: {self.shelf.name}"
        )