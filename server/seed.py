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
    BookShelf.query.delete()
    BookTag.query.delete()
    Review.query.delete()

    Quote.query.delete()
    Book.query.delete()
    Author.query.delete()
    Shelf.query.delete()
    Tag.query.delete()
    User.query.delete()


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
        description="""
            Hallucinogenic plants chant in chorus. A thoughtful dog grants an interview. A caterpillar offers life advice. Amy Gerstler’s newest collection of poetry, Dearest Creature, marries fact and fiction in a menagerie of dramatic monologues, twisted love poems, and epistolary pleadings. Drawing on sources as disparate as Lewis Carroll and Mary Shelley’s Frankenstein, as well as abnormal psychology, etiquette, and archaeology texts, these darkly imaginative poems probe what it means to be a sentient, temporary, flesh-and-blood beast, to be hopelessly, vividly creaturely.
        """, 
        genre="Poetry",
        page_count=96,
        cover_photo="https://m.media-amazon.com/images/I/91NTy5MeveL._SY522_.jpg",
        author=a1
    )

    b2 = Book(
        title="The Poppy War",
        description="""
            When Rin aced the Keju—the Empire-wide test to find the most talented youth to learn at the Academies—it was a shock to everyone: to the test officials, who couldn’t believe a war orphan from Rooster Province could pass without cheating; to Rin’s guardians, who believed they’d finally be able to marry her off and further their criminal enterprise; and to Rin herself, who realized she was finally free of the servitude and despair that had made up her daily existence. That she got into Sinegard—the most elite military school in Nikan—was even more surprising.

            But surprises aren’t always good.

            Because being a dark-skinned peasant girl from the south is not an easy thing at Sinegard. Targeted from the outset by rival classmates for her color, poverty, and gender, Rin discovers she possesses a lethal, unearthly power—an aptitude for the nearly-mythical art of shamanism. Exploring the depths of her gift with the help of a seemingly insane teacher and psychoactive substances, Rin learns that gods long thought dead are very much alive—and that mastering control over those powers could mean more than just surviving school.

            For while the Nikara Empire is at peace, the Federation of Mugen still lurks across a narrow sea. The militarily advanced Federation occupied Nikan for decades after the First Poppy War, and only barely lost the continent in the Second. And while most of the people are complacent to go about their lives, a few are aware that a Third Poppy War is just a spark away . . .

            Rin’s shamanic powers may be the only way to save her people. But as she finds out more about the god that has chosen her, the vengeful Phoenix, she fears that winning the war may cost her humanity . . . and that it may already be too late.
        """, 
        genre="Fantasy",
        page_count=544,
        cover_photo="https://m.media-amazon.com/images/I/415sNT7bPjL._SY445_SX342_.jpg",
        author=a2
    )

    b3 = Book(
        title="The Dragon Republic",
        description="""
            The war is over.

            The war has just begun.

            Three times throughout its history, Nikan has fought for its survival in the bloody Poppy Wars. Though the third battle has just ended, shaman and warrior Rin cannot forget the atrocity she committed to save her people. Now she is on the run from her guilt, the opium addiction that holds her like a vice, and the murderous commands of the fiery Phoenix—the vengeful god who has blessed Rin with her fearsome power.

            Though she does not want to live, she refuses to die until she avenges the traitorous Empress who betrayed Rin’s homeland to its enemies. Her only hope is to join forces with the powerful Dragon Warlord, who plots to conquer Nikan, unseat the Empress, and create a new republic.

            But neither the Empress nor the Dragon Warlord are what they seem. The more Rin witnesses, the more she fears her love for Nikan will force her to use the Phoenix’s deadly power once more.

            Because there is nothing Rin won’t sacrifice to save her country . . . and exact her vengeance.
        """, 
        genre="Fantasy",
        page_count=672,
        cover_photo="https://m.media-amazon.com/images/I/41B7aPHTmvL._SY445_SX342_.jpg",
        author=a2
    )
    

    b4 = Book(
        title="The Burning God",
        description="""
            After saving her nation of Nikan from foreign invaders and battling the evil Empress Su Daji in a brutal civil war, Fang Runin was betrayed by allies and left for dead.

            Despite her losses, Rin hasn’t given up on those for whom she has sacrificed so much—the people of the southern provinces and especially Tikany, the village that is her home. Returning to her roots, Rin meets difficult challenges—and unexpected opportunities. While her new allies in the Southern Coalition leadership are sly and untrustworthy, Rin quickly realizes that the real power in Nikan lies with the millions of common people who thirst for vengeance and revere her as a goddess of salvation.

            Backed by the masses and her Southern Army, Rin will use every weapon to defeat the Dragon Republic, the colonizing Hesperians, and all who threaten the shamanic arts and their practitioners. As her power and influence grows, though, will she be strong enough to resist the Phoenix’s intoxicating voice urging her to burn the world and everything in it? 
        """, 
        genre="Fantasy",
        page_count=656,
        cover_photo="https://m.media-amazon.com/images/I/71pNOR-3x3L._SY522_.jpg",
        author=a2
    )
    
    b5 = Book(
        title="The Overstory",
        description="""
            The Overstory, winner of the 2019 Pulitzer Prize in Fiction, is a sweeping, impassioned work of activism and resistance that is also a stunning evocation of―and paean to―the natural world. From the roots to the crown and back to the seeds, Richard Powers’s twelfth novel unfolds in concentric rings of interlocking fables that range from antebellum New York to the late twentieth-century Timber Wars of the Pacific Northwest and beyond. There is a world alongside ours―vast, slow, interconnected, resourceful, magnificently inventive, and almost invisible to us. This is the story of a handful of people who learn how to see that world and who are drawn up into its unfolding catastrophe.
        """, 
        genre="Literary Fiction",
        page_count=512,
        cover_photo="https://m.media-amazon.com/images/I/81YgPnTNf5L._SY522_.jpg",
        author=a3
    )

    b6 = Book(
        title="Who's Afraid of Virginia Woolf?",
        description="""
            “Twelve times a week,” answered actress Uta Hagen when asked how often she’d like to play Martha in Who’s Afraid of Virginia Woolf? In the same way, audiences and critics alike could not get enough of Edward Albee’s masterful play. A dark comedy, it portrays husband and wife George and Martha in a searing night of dangerous fun and games. By the evening’s end, a stunning, almost unbearable revelation provides a climax that has shocked audiences for years. With its razor-sharp dialogue and the stripping away of social pretense, Newsweek rightly foresaw Who’s Afraid of Virginia Woolf? as “a brilliantly original work of art—an excoriating theatrical experience, surging with shocks of recognition and dramatic fire [that] will be igniting Broadway for some time to come.”
        """, 
        genre="Drama",
        page_count=272,
        cover_photo="https://m.media-amazon.com/images/I/81lKVMC0SxL._SY522_.jpg",
        author=a4
    )

    b7 = Book(
        title="Where the Wild Things Are",
        description="""
            This iconic story has inspired a movie, an opera, and the imagination of generations. When Max dresses in his wolf suit and causes havoc in the house, his mother sends him to bed. From there, Max sets sail to an island inhabited by the Wild Things, who name him king and share a wild rumpus with him. But then from far away across the world, Max smells good things to eat...
        """, 
        genre="Children's",
        page_count=48,
        cover_photo="https://m.media-amazon.com/images/I/61AmMPEa1SL._SY522_.jpg",
        author=a5
    )

    b8 = Book(
        title="The Interestings",
        description="""
            The summer that Nixon resigns, six teenagers at a summer camp for the arts become inseparable. Decades later the bond remains powerful, but so much else has changed. In The Interestings, Wolitzer follows these characters from the height of youth through middle age, as their talents, fortunes, and degrees of satisfaction diverge.

            The kind of creativity that is rewarded at age fifteen is not always enough to propel someone through life at age thirty; not everyone can sustain, in adulthood, what seemed so special in adolescence. Jules Jacobson, an aspiring comic actress, eventually resigns herself to a more practical occupation and lifestyle. Her friend Jonah, a gifted musician, stops playing the guitar and becomes an engineer. But Ethan and Ash, Jules’s now-married best friends, become shockingly successful—true to their initial artistic dreams, with the wealth and access that allow those dreams to keep expanding. The friendships endure and even prosper, but also underscore the differences in their fates, in what their talents have become and the shapes their lives have taken.

            Wide in scope, ambitious, and populated by complex characters who come together and apart in a changing New York City, The Interestings explores the meaning of talent; the nature of envy; the roles of class, art, money, and power; and how all of it can shift and tilt precipitously over the course of a friendship and a life.
        """, 
        genre="Literary Fiction",
        page_count=460,
        cover_photo="https://m.media-amazon.com/images/I/51uL9I-u3EL._SY445_SX342_.jpg",
        author=a6
    )

    b9 = Book(
        title="All But My Life",
        description="""
            From her comfortable home in Bielitz (present-day Bielsko) in Poland to her miraculous survival and her liberation by American troops--including the man who was to become her husband--in Volary, Czechoslovakia, in 1945, Gerda takes the reader on a terrifying journey.

            Gerda's serene and idyllic childhood is shattered when Nazis march into Poland on September 3, 1939. Although the Weissmanns were permitted to live for a while in the basement of their home, they were eventually separated and sent to German labor camps. Over the next few years Gerda experienced the slow, inexorable stripping away of "all but her life." By the end of the war she had lost her parents, brother, home, possessions, and community; even the dear friends she made in the labor camps, with whom she had shared so many hardships, were dead.

            Despite her horrifying experiences, Klein conveys great strength of spirit and faith in humanity. In the darkness of the camps, Gerda and her young friends manage to create a community of friendship and love. Although stripped of the essence of life, they were able to survive the barbarity of their captors. Gerda's beautifully written story gives an invaluable message to everyone. It introduces them to last century's terrible history of devastation and prejudice, yet offers them hope that the effects of hatred can be overcome.
        """, 
        genre="Memoir",
        page_count=272,
        cover_photo="https://m.media-amazon.com/images/I/41OxmraY4wL._SY445_SX342_.jpg",
        author=a7
    )

    books = [b2, b3, b4, b1, b5, b6, b7, b8, b9]
    
    db.session.add_all(books)

    print("Creating quotes ...")

    ## dearest creature 

    q1 = Quote(
        content="""
            ...Your troublesome legacy,
            and maybe part of your charm, is to shine
            too hotly and brightly at times, to be lost
            in a maze of sensations to have
            trouble switching gears, to be socially
            clueless, to love books as living things,
            and therefore to be much alone. 
    """,
        book=b1
    )

    q2 = Quote(
        content="""
            ...Don't get sentimental 
            about your discarded skins. Grow
            quickly. Develop a yen for nettles. 
    """,
        book=b1
    )

    q3 = Quote(
        content="""
            Beauty only divides the world–
            ugliness is far more fascinating, 
            contains infinitely more variation,
            its existence crucial to beauty, 
            therefore all the more precious. 
    """,
        book=b1
    )

    ## the poppy war

    q4 = Quote(
        content="""
            The Gatekeeper hung in a vacuum, frozen in a state of suspended animation, a place next to nowhere and on the way to everywhere.
    """,
        book=b2
    )

    q5 = Quote(
        content="""
            Altan's voice cracked. "I didn't need to be helped." 
            "You needed it more than anything," Jiang said sadly.
    """,
        book=b2
    )

    q6 = Quote(
        content="""
            "I don't know what happened to you in that temple," he said. "But you are not Fang Runin." 
    """,
        book=b2
    )

    # the dragon republic 
    q7 = Quote(
        content="""
            Moag wanted Yang Yuanfu dead. The Cike specialized in assassination. They were a matchmaker's dream.
""",
        book=b3
    )

    q8 = Quote(
        content="""
            They burned for someone else's war, someone else's wrongs; someone they had never met made the decision they should die, so in their last moments they had no idea why their skin was scorching off. 
""",
        book=b3
    )

    q9 = Quote(
        content="""
            "'You asked how large my sorrow is,'" Nezha recited. Rin recognized the line – it was from a poem she'd studied a lifetime ago, a lament by an Emperor whose last words became exam material for future generations. "'And I answered, like a river in spring flowing east.'"
""",
        book=b3
    )

    # the burning god 
    q10 = Quote(
        content="""
            But she screamed it again, and then again, and then again. It felt so good to say that she'd survived, that she'd ... finally come out on top, that she didn't even care that she was screaming to corpses.
""",
        book=b4
    )

    q11 = Quote(
        content="""
            There are never any new stories, just old ones told again and again as this universe moves through its cycles of civilization and crumbles into despair.
""",
        book=b4
    )

    q12 = Quote(
        content="""
            The Dragon collects pretty things. Was it because the sea absorbed anything it touched? Because it was so vast and so unfathomably dark that it sought whatever ornament it could find to give it shape? 
        """,
        book=b4
    )

    ## the overstory 

    q13 = Quote(
        content="""
            There are seeds that need fire. Seeds that need freezing. Seeds that need to be swallowed, etched in digestive acid, dispelled as waste. Seeds that must be smashed open before they'll germinate.
            
            A thing can travel everywhere, just by holding still. 
        """,
        book=b5
    )

    q14 = Quote(
        content="""
            There's a thing in programming called branching. And that's what Neelay Mehta does. He will reincarnate himself, live again as people of all races, genders, colors, and creeds. He'll raise decaying corpses and eat the souls of the young. He'll tent high up in the canopies of lush forests, lie in broken heaps at the bottom of impossibly high cliffs, and swim in the seas of planets with many suns. He'll spend his life in the service of an immense conspiracy, launched from the Valley of Heart's Delight, to take over the human brain and change it more than anything since writing.
        """,
        book=b5
    )

    q15 = Quote(
        content="""
            Let me sing to you now, about how people turn into other things.
            At those words, she's back where acorns are a step away from faces and pine cones compose the bodies of angels. She reads the book. The stories are odd and fluid, as old as humankind. They're somehow familiar, as if she were born knowing them. The fables seem to be less about people turning into other living things than about other living things somehow reabsorbing, at the moment of greatest danger, the wildness inside people that never really went away.
        """,
        book=b5
    )

    ## who's afraid of virginia woolf

    ## where the wild things are

    q16 = Quote(
        content="""
            his mother called him "WILD THING!" 
            and Max said "I'LL EAT YOU UP!"
            so he was sent to bed without eating anything.
    """,
        book=b7
    )

    q17 = Quote(
        content="""
            And when he came to the place where the wild things are 
            they roared their terrible roars and gnashed their terrible teeth
    """,
        book=b7
    )

    q18 = Quote(
        content="""
            "And now," cried Max, "let the wild rumpus start!"
    """,
        book=b7
    )

    ## the interestings 

    ## all but my life 

    quotes = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18]
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

    u1 = User(
        username="claire123",
        email="claire123@gmail.com",
        profile_pic="https://images.unsplash.com/photo-1531123414780-f74242c2b052?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        display_name="Claire",
        bio="Reader from the Midwest, partial to thrillers and mysteries"
    )
    u1.password_hash = u1.username + "password"

    u2 = User(
        username="ben456",
        email="ben456@gmail.com",
        profile_pic="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        display_name="Ben",
        bio="7th grade English teacher. Recommend your favorite middle-grade reads!"
    )
    u2.password_hash = u2.username + "password"

    u3=User(
        username="meow789",
        email="meow789@gmail.com",
        profile_pic="https://images.unsplash.com/photo-1587723958656-ee042cc565a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        display_name="Meow",
        bio="Books left in direct sunlight make excellent nap pads"
    )
    u3.password_hash = u3.username + "password"

    users = [u1, u2, u3]

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
        s4 = Shelf(
            name="Currently reading",
            user=user
        )
        shelves.extend([s1, s2, s3, s4])
    
    db.session.add_all(shelves)

    # Creating join tables 
    print("Creating book_shelves ...")
    book_shelves = []

    for shelf in shelves: 
        for _ in range(5):
            book_shelf = BookShelf(
                book=rc(books),
                shelf=shelf,
                user=shelf.user
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

    print("Creating reviews ...")

    BAD_REVIEWS=[
        "This book was so incredibly slow. I stuck with it because I kept hearing about it from my friend, but it needed a lot more action.",
        "Eh, super predictable. I'm always looking for a twist or turn, and I didn't get that here. Then again, I'm hard to surprise!",
        "I had a hard time picking this one up again once I put it down. There were some lines I really enjoyed though."
    ]

    GOOD_REVIEWS=[
        "This is one of my favorite books of all time. It made my heart hurt in the best way. Give me two days, and I'll be reading it again.",
        "The drama, the action, the surprise! Excellent book, super glad that I found out about it here. Has this author written anything else?",
        "A bit of a guilty pleasure. It's not going to win any awards but it's a wild ride. Very fun to bring with you to the beach."
    ]


    reviews = []
    
    for _ in range(25):
        review = Review(
            rating=randint(1,3),
            comment=rc(BAD_REVIEWS),
            book=rc(books),
            user=rc(users)
        )
        reviews.append(review)

    for _ in range(25):
        review = Review(
            rating=randint(3,5),
            comment=rc(GOOD_REVIEWS),
            book=rc(books),
            user=rc(users)
        )
        reviews.append(review)

    db.session.add_all(reviews)

    print("Committing to db ...")

    db.session.commit()

    print("Complete")