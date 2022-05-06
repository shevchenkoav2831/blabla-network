import os
import random
import bcrypt
import mysql.connector

db_host = 'localhost'
db_username = 'user'
db_password = 'password'
db_name = 'db'

batch_size = 2
total_size = 2


def read_all_lines(filename):
    script_dir = os.path.dirname(__file__)
    file_path = os.path.join(script_dir, filename)
    lines = open(file_path).read().splitlines()
    return lines


def remove_duplicates(input):
    print("Removing duplicates...", end='')
    visited = set()
    output = []

    for email, password, firstname, lastname, gender, city, bio in input:
        if not email in visited:
            visited.add(email)
            output.append((email, password, firstname, lastname, gender, city, bio))

    return output


def get_random_users(size):
    print("Generating {} random users... ".format(size), end='')
    users = []

    firstnames = read_all_lines('firstnames.txt')
    lastnames = read_all_lines('lastnames.txt')
    genders = read_all_lines('genders.txt')
    cities = read_all_lines('cities.txt')
    bios = read_all_lines('bios.txt')

    for u in range(size):
        firstname = random.choice(firstnames)
        lastname = random.choice(lastnames)
        email = '{}{}{}@example.com'.format(lastname, firstname[0:2], random.randint(1111, 9999))
        password = bcrypt.hashpw(b'password', bcrypt.gensalt(4))
        gender = random.choice(genders)
        city = random.choice(cities)
        bio = random.choice(bios)

        users.append((email, password, firstname, lastname, gender, city, bio))

    unique_users = remove_duplicates(users)
    print("Complete, total users generated: {}".format(len(unique_users)))

    return unique_users


def get_init_users():
    return [
        ("shevchenkoav@example.com", bcrypt.hashpw(b"password", bcrypt.gensalt(4)), "Andrey", "Shevchenko", "Male",
         "Moscow", "Software architect"),
        ("shevchenkoaa@example.com", bcrypt.hashpw(b"password", bcrypt.gensalt(4)), "Alla", "Shevchenko", "Female",
         "Moscow", "System analyst"),
        ("mamaevaaa@example.com", bcrypt.hashpw(b"password", bcrypt.gensalt(4)), "Anastasia", "Mamaeva", "Female",
         "Moscow", "Pupil"),
        ("kakab@example.com", bcrypt.hashpw(b"password", bcrypt.gensalt(4)), "Kakab", "Kakabsky", "Cat", "Moscow",
         "Fat lazy cat"),
    ]


def batch(iterable, n=1):
    l = len(iterable)
    for ndx in range(0, l, n):
        yield iterable[ndx:min(ndx + n, l)]


def truncate_users():
    connection = mysql.connector.connect(
        host=db_host,
        user=db_username,
        password=db_password,
        database=db_name
    )
    cursor = connection.cursor()

    sql = str.format("TRUNCATE db.Users")
    cursor.execute(sql)
    print("db.Users was truncated successfully")
    cursor.close()
    connection.close()


def insert_users(users):
    print("Inserting {} entries... ".format(len(users)), end='')
    connection = mysql.connector.connect(
        host=db_host,
        user=db_username,
        password=db_password,
        database=db_name
    )

    sql = "INSERT INTO " \
          "Users (email, password, firstName, lastName, gender, city, bio) " \
          "VALUES (%s, %s, %s, %s, %s, %s, %s)"

    cursor = connection.cursor()
    try:
        cursor.executemany(sql, users)
        connection.commit()
        print("Complete!")
    except Exception as e:
        print("Error: {}".format(e))

    cursor.close()
    connection.close()


#truncate_users()

init_users = get_init_users()
insert_users(init_users)

random_users = get_random_users(total_size)
for users_batch in batch(random_users, batch_size):
    insert_users(users_batch)
