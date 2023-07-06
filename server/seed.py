#!/usr/bin/env python3

from faker import Faker
from random import randint, choice as rc

from config import app, db

from models.author import Author
from models.book import Book
from models.quote import Quote
from models.shelf import Shelf
from models.tag import Tag
from models.user import User

from models.book_shelf import BookShelf
from models.book_tag import BookTag
from models.review import Review


fake = Faker()

with app.app_context(): 

    print("Deleting all records ...")

    Author.query.delete()
    Book.query.delete()
    Quote.query.delete()
    Shelf.query.delete()
    Tag.query.delete()
    User.query.delete()

    BookShelf.query.delete()
    BookTag.query.delete()
    Review.query.delete()

    # Creating initial tables 

    print("Creating authors ...")
    authors = []
    for _ in range(10):
        author = Author(
            full_name=fake.name(),
            bio=fake.paragraph()
        )

        authors.append(author)
    db.session.add_all(authors)

    print("Creating books ...")
    books = []
    genres = ["Poetry", "Fantasy", "Historical Fiction", "Memoir", 
                "Literary Fiction", "Horror", "Drama"]
    for _ in range(20):
        book = Book(
            title=fake.sentence(nb_words=3), 
            genre=rc(genres),
            description=fake.paragraph(),
            page_count=randint(100, 500),
            cover_photo=fake.image_url()
        )
        book.author = rc(authors) 
        books.append(book)
    
    db.session.add_all(books)

    print("Creating quotes ...")
    quotes = []
    for _ in range(50): 
        quote = Quote(
            content=fake.paragraph(),
            book = rc(books)
        )
        quotes.append(quote)

    db.session.add_all(quotes)

    print("Creating tags ...")
    tags = []
    for _ in range(10): 
        tag = Tag(
            name=fake.sentence(nb_words=1)
        )
        tags.append(tag)
    
    db.session.add_all(tags)

    print("Creating users ...")
    users = []
    usernames = []
    emails = []

    for _ in range(15):
        username = fake.first_name()
        email = fake.email()

        while username in usernames:
            username = fake.first_name()
        usernames.append(username)

        while email in emails: 
            email = fake.email()
        emails.append(email)

        user = User(
            username=username,
            email=email,
            profile_pic=fake.image_url(),
            display_name=fake.first_name(),
            bio=fake.paragraph()
        )
        user.password_hash = user.username + "password"

        users.append(user)

    db.session.add_all(users)

    print("Creating shelves ...")
    shelves = []
    for user in users: 
        s1 = Shelf(
            name="Favorites",
            user=user
        )
        s2 = Shelf(
            name="Want to read",
            user=user
        )
        s3 = Shelf(
            name="Birthday wishlist",
            user=user
        )
        shelves.extend([s1, s2, s3])
    
    db.session.add_all(shelves)

    # Creating join tables 
    print("Creating book_shelves ...")
    book_shelves = []

    for shelf in shelves: 
        for _ in range(5):
            book_shelf = BookShelf(
                book=rc(books),
                shelf=shelf
            )
            book_shelves.append(book_shelf)

    db.session.add_all(book_shelves)

    print("Creating book_tags ...")
    book_tags = []

    for _ in range(50):
        book_tag = BookTag(
            book=rc(books),
            tag=rc(tags)
        )
        book_tags.append(book_tag)
    
    db.session.add_all(book_tags)

    print("Creating reviews ...")
    reviews = []
    
    for _ in range(50):
        review = Review(
            rating=randint(0,5),
            comment=fake.paragraph(),
            book=rc(books),
            user=rc(users)
        )
        reviews.append(review)

    db.session.add_all(reviews)

    print("Committing to db ...")

    db.session.commit()

    print("Complete")