import os
import flask
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Person
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

routes_person = flask.Blueprint('routes_person', __name__)

# INICIO - Definición de EndPoints para el Modelo [Person] - INICIO
# [GET] - Ruta para obtener todos los [Person]
@routes_person.route('/api/person', methods=['GET'])
@jwt_required()
def index():
    results = Person.query.all()

    return jsonify(list(map(lambda x: x.serialize(), results))), 200

# [GET] - Ruta para obtener un [Person]
@routes_person.route('/api/person/<int:id>', methods=['GET'])
@jwt_required()
def indexPerson(id):
    person = Person.query.get(id)

    if person is None:
        raise APIException('La persona con el id especificado, no fue encontrada.',status_code=403)

    return jsonify(Person.serialize(person)), 200

# [POST] - Ruta para crear un [Person]
@routes_person.route('/api/person', methods=['POST'])
@jwt_required()
def store():
    data_request = request.get_json()

    person = Person(name = data_request["name"], 
    first_surname = data_request["first_surname"],
    second_surname = data_request["second_surname"],
    known_as = data_request["known_as"],
    telephone_number = data_request["telephone_number"],
    emergency_contact = data_request["emergency_contact"],
    emergency_phone = data_request["emergency_phone"],
    user_creation_id = data_request["user_creation_id"],
    creation_date = datetime.datetime.now(),
    update_date = datetime.datetime.now())

    try:
        db.session.add(person)
        db.session.commit()
        
        return jsonify(Person.serialize(person)), 201
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400

# [PUT] - Ruta para modificar un [Person]
@routes_person.route('/api/person/<int:id>', methods=['PUT'])
@jwt_required()
def update(id):
    person = Person.query.get(id)

    if person is None:
        raise APIException('La persona con el id especificado, no fue encontrada.',status_code=403)

    data_request = request.get_json()
    
    person.name = data_request["name"]
    person.first_surname = data_request["first_surname"]
    person.second_surname = data_request["second_surname"]
    person.known_as = data_request["known_as"]
    person.telephone_number = data_request["telephone_number"]
    person.emergency_contact = data_request["emergency_contact"]
    person.emergency_phone = data_request["emergency_phone"]
    person.update_date = datetime.datetime.now()

    try: 
        db.session.commit()
        
        return jsonify(Person.serialize(person)), 200
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400

# [DELETE] - Ruta para eliminar un [Person]
@routes_person.route('/api/person/<int:id>', methods=['DELETE'])
@jwt_required()
def delete(id):
    person = Person.query.get(id)

    if person is None:
        raise APIException('La persona con el id especificado, no fue encontrada.',status_code=403)

    try:
        db.session.delete(person)
        db.session.commit()
        
        return jsonify('La persona fue eliminada.'), 200
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400
# FIN - Definición de EndPoints para el Modelo [Person] - FIN