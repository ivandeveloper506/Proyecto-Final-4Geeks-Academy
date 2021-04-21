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
    observation = db.Column(db.String(100))
    # TODO: Pendiente agregar referencia al modelo person
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
            "user_creation_id": self.user_creation_id,
            "creation_date": self.creation_date,
            "update_date": self.update_date
        }
# FIN - Modelo para la tabla [User] - FIN