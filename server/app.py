#!/usr/bin/env python3

from flask import request
from flask_restful import Resource

from config import app, db, api

# Import models 
from models.author import Author
from models.book_shelf import BookShelf
from models.book_tag import BookTag
from models.book import Book
from models.quote import Quote
from models.review import Review
from models.shelf import Shelf
from models.tag import Tag
from models.user import User

# Add resources

if __name__ == '__main__':
    app.run(port=5555, debug=True)
