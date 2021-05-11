from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# INICIO - Modelo para la tabla [PasswordReset] - INICIO
class PasswordReset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), nullable=False)
    token = db.Column(db.String(250), nullable=False)
    expiration_date = db.Column(db.DateTime, nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False)
    update_date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return '<PasswordReset %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "token": self.token,
            "expiration_date": self.expiration_date,
            "creation_date": self.creation_date,
            "update_date": self.update_date
        }
# FIN - Modelo para la tabla [PasswordReset] - FIN

# INICIO - Modelo para la tabla [User] - INICIO
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    first_surname = db.Column(db.String(100), nullable=False)
    second_surname = db.Column(db.String(100))
    birth_date = db.Column(db.Date, nullable=False)
    telephone_number = db.Column(db.String(15),nullable=False)
    user_image = db.Column(db.String(2000))
    email = db.Column(db.String(250), unique=True)
    password = db.Column(db.String(80), unique=False, nullable=False)
    active = db.Column(db.Boolean(), unique=False, nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False)
    update_date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "first_surname": self.first_surname,
            "second_surname": self.second_surname,
            "birth_date": self.birth_date,
            "telephone_number": self.telephone_number,
            "full_name": self.name + " " + self.first_surname + " " + self.second_surname,
            "user_image": self.user_image,
            "email": self.email,
            "active": self.active,
            "creation_date": self.creation_date,
            "update_date": self.update_date
        }
# FIN - Modelo para la tabla [User] - FIN


# INICIO - Modelo para la tabla [Person] - INICIO
class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    first_surname = db.Column(db.String(100), nullable=False)
    second_surname = db.Column(db.String(100))
    known_as = db.Column(db.String(100))
    birth_date = db.Column(db.Date, nullable=False)
    telephone_number = db.Column(db.String(15),nullable=False)
    user_image = db.Column(db.String(2000))
    emergency_contact = db.Column(db.String(255))
    emergency_phone = db.Column(db.String(15))
    vaccine_covid1_date = db.Column(db.Date)
    vaccine_covid2_date = db.Column(db.Date)
    user_creation_id = db.Column(db.Integer, db.ForeignKey('user.id')) 
    creation_date = db.Column(db.DateTime, nullable=False)
    update_date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return '<Person %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "first_surname": self.first_surname,
            "second_surname": self.second_surname,
            "known_as": self.known_as,
            "birth_date": self.birth_date,
            "telephone_number": self.telephone_number,
            "full_name": self.name + " " + self.first_surname + " " + self.second_surname,
            "user_image": self.user_image,
            "emergency_contact": self.emergency_contact,
            "emergency_phone": self.emergency_phone,
            "vaccine_covid1_date": self.vaccine_covid1_date,
            "vaccine_covid2_date": self.vaccine_covid2_date,
            "user_creation_id": self.user_creation_id,
            "creation_date": self.creation_date,
            "update_date": self.update_date
        }
# FIN - Modelo para la tabla [Person] - FIN


# INICIO - Modelo para la tabla [PersonMedicine] - INICIO
class PersonMedicine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(1000), nullable=False)
    frequency = db.Column(db.String(1000), nullable=False)
    observation = db.Column(db.String(1000))
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'),nullable=False)
    user_creation_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False)
    update_date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return '<PersonMedicine %r>' % self.description

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description,
            "frequency": self.frequency,
            "observation": self.observation,
            "person_id": self.person_id,
            "user_creation_id": self.user_creation_id,
            "creation_date": self.creation_date,
            "update_date": self.update_date
        }
# FIN - Modelo para la tabla [PersonMedicine] - FIN


# INICIO - Modelo para la tabla [PersonVaccine] - INICIO
class PersonVaccine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(1000), nullable=False)
    application_date = db.Column(db.Date, nullable=False)
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'),nullable=False)
    user_creation_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False)
    update_date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return '<PersonVaccine %r>' % self.description

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description,
            "application_date": self.application_date,
            "person_id": self.person_id,
            "user_creation_id": self.user_creation_id,
            "creation_date": self.creation_date,
            "update_date": self.update_date
        }
# FIN - Modelo para la tabla [PersonVaccine] - FIN


# INICIO - Modelo para la tabla [PersonQR] - INICIO
class PersonQr(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(2000), nullable=False)
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'),nullable=False)
    user_creation_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False)
    update_date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return '<PersonQr %r>' % self.url

    def serialize(self):
        return {
            "id": self.id,
            "url": self.url,
            "person_id": self.person_id,
            "user_creation_id": self.user_creation_id,
            "creation_date": self.creation_date,
            "update_date": self.update_date
        }
# FIN - Modelo para la tabla [PersonQR] - FIN

# INICIO - Modelo para la tabla [Message] - INICIO
class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(12), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.String(100), nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False)
    update_date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return '<Message %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "phone": self.phone,
            "email": self.email,
            "message": self.message,
            "creation_date": self.creation_date,
            "update_date": self.update_date
        }
# FIN - Modelo para la tabla [Message] - FIN