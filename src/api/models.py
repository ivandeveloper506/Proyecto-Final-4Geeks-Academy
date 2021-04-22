from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# INICIO - Modelo para la tabla [User] - INICIO
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    first_surname = db.Column(db.String(100), nullable=False)
    second_surname = db.Column(db.String(100))
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
            "user_image": self.user_image,
            "email": self.email,
            "active": self.active,
            "creation_date": self.creation_date,
            "update_date": self.update_date
        }
# FIN - Modelo para la tabla [User] - FIN


# INICIO - Modelo para la tabla [PersonMedicine] - INICIO
class PersonMedicine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(1000), nullable=False)
    frequency = db.Column(db.String(1000), nullable=False)
    observation = db.Column(db.String(1000))
     # TODO: Pendiente agregar referencia a la columna person_id del modelo person
    user_creation_id = db.Column(db.Integer, db.ForeignKey('user.id'))
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
             # TODO: Pendiente agregar referencia a la columna person_id del modelo person
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
    # TODO: Pendiente agregar referencia a la columna person_id del modelo person
    user_creation_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    creation_date = db.Column(db.DateTime, nullable=False)
    update_date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return '<PersonVaccine %r>' % self.description

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description,
            "application_date": self.application_date,
             # TODO: Pendiente agregar referencia a la columna person_id del modelo person
            "user_creation_id": self.user_creation_id,
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
    telephone_number = db.Column(db.String(15),nullable=False)
    user_image = db.Column(db.String(2000))
    emergency_contact = db.Column(db.String(255),nullable=False)
    emergency_phone = db.Column(db.String(15),nullable=False)
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
            "telephone_number": self.telephone_number,
            "user_image": self.user_image,
            "emergency_contact": self.emergency_contact,
            "emergency_phone": self.emergency_phone,
            "user_creation_id": self.user_creation_id,
            "creation_date": self.creation_date,
            "update_date": self.update_date
        }
# FIN - Modelo para la tabla [User] - FIN
# FIN - Modelo para la tabla [PersonVaccine] - FIN

