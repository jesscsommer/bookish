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
    a1 = Author(full_name="Amy Gerstler", bio=fake.paragraph())
    a2 = Author(full_name="R.F. Kuang", bio=fake.paragraph())
    a3 = Author(full_name="Richard Powers", bio=fake.paragraph())
    a4 = Author(full_name="Edward Albee", bio=fake.paragraph())
    a5 = Author(full_name="Maurice Sendak", bio=fake.paragraph())
    a6 = Author(full_name="Meg Wolitzer", bio=fake.paragraph())
    a7 = Author(full_name="Gerda Weissmann Klein", bio=fake.paragraph())
    authors = [a1, a2, a3, a4, a5, a6, a7]
    db.session.add_all(authors)

    print("Creating books ...")
    genres = ["Poetry", "Fantasy", "Historical Fiction", "Memoir", 
                "Literary Fiction", "Horror", "Drama", "Children's"]
    
    b1 = Book(
        title="Dearest Creature",
        description=fake.paragraph(), 
        genre="Poetry",
        page_count=96,
        cover_photo="https://books.google.com/books/publisher/content?id=2aeMEAAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71oSTl2BQzDaU2U5EQTWWGNUxF9H47idhvzErS_XdrCq7Yh5jzdgX6xfADx8oZiPLSpXqhwc3yiPsBdB0xdVKNcteOYhafyrp0f6h294xps3QYRFxwv6ipvE3z8KdrK207zuibk",
        author=a1
    )

    b2 = Book(
        title="The Poppy War",
        description=fake.paragraph(), 
        genre="Fantasy",
        page_count=544,
        cover_photo=fake.image_url(),
        author=a2
    )

    b3 = Book(
        title="The Dragon Republic",
        description=fake.paragraph(), 
        genre="Fantasy",
        page_count=672,
        cover_photo=fake.image_url(),
        author=a2
    )
    

    b4 = Book(
        title="The Burning God",
        description=fake.paragraph(), 
        genre="Fantasy",
        page_count=656,
        cover_photo=fake.image_url(),
        author=a2
    )
    
    b5 = Book(
        title="The Overstory",
        description=fake.paragraph(), 
        genre="Literary Fiction",
        page_count=512,
        cover_photo=fake.image_url(),
        author=a3
    )

    b6 = Book(
        title="Who's Afraid of Virginia Woolf?",
        description=fake.paragraph(), 
        genre="Drama",
        page_count=272,
        cover_photo=fake.image_url(),
        author=a4
    )

    b7 = Book(
        title="Where the Wild Things Are",
        description=fake.paragraph(), 
        genre="Children's",
        page_count=48,
        cover_photo=fake.image_url(),
        author=a5
    )

    b8 = Book(
        title="The Interestings",
        description=fake.paragraph(), 
        genre="Literary Fiction",
        page_count=460,
        cover_photo=fake.image_url(),
        author=a6
    )

    b9 = Book(
        title="All But My Life",
        description=fake.paragraph(), 
        genre="Memoir",
        page_count=272,
        cover_photo=fake.image_url(),
        author=a7
    )

    books = [b1, b2, b3, b4, b5, b6, b7, b8, b9]
    
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

    # print("Creating tags ...")
    # tags = []
    # for _ in range(10): 
    #     tag = Tag(
    #         name=fake.sentence(nb_words=1)
    #     )
    #     tags.append(tag)
    
    # db.session.add_all(tags)

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
            name="Read",
            user=user
        )
        s2 = Shelf(
            name="Want to read",
            user=user
        )
        s3 = Shelf(
            name="Favorites",
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

    # print("Creating book_tags ...")
    # book_tags = []

    # for _ in range(50):
    #     book_tag = BookTag(
    #         book=rc(books),
    #         tag=rc(tags)
    #     )
    #     book_tags.append(book_tag)
    
    # db.session.add_all(book_tags)

    # print("Creating reviews ...")
    # reviews = []
    
    # for _ in range(50):
    #     review = Review(
    #         rating=randint(0,5),
    #         comment=fake.paragraph(),
    #         book=rc(books),
    #         user=rc(users)
    #     )
    #     reviews.append(review)

    # db.session.add_all(reviews)

    print("Committing to db ...")

    db.session.commit()

    print("Complete")