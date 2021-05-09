import os
import flask
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, PersonQr, Person
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

routes_person_qr = flask.Blueprint('routes_person_qr', __name__)

# INICIO - Definición de EndPoints para el Modelo [PersonQR] - INICIO
# [GET] - Ruta para obtener todos los [PersonQr]
@routes_person_qr.route('/api/personqr', methods=['GET'])
@jwt_required()
def index():
    results = PersonQr.query.all()

    return jsonify(list(map(lambda x: x.serialize(), results))), 200

# [POST] - Ruta para obtener un [PersonQr] por id de persona
@routes_person_qr.route('/api/person/qr', methods=['POST'])
@jwt_required()
def indexPersonQr():
    person_id = request.json.get("person_id",None)

    if person_id is None:
        return jsonify({"message": "El código de la persona es requerido."}), 400
    
    personQr = PersonQr.query.filter_by(person_id=person_id).first()
    
    if personQr is None:
        # the user was not found on the database
        return jsonify({"message": "El código de persona es invalido."}), 401
    else:
        return jsonify(PersonQr.serialize(personQr)), 200

# [POST] - Ruta para obtener la información de un [PersonQr] por id de persona
@routes_person_qr.route('/api/person/infoqr/<int:id>', methods=['GET'])
def indexInfoPersonQr(id):
    person = Person.query.get(id)

    if person is None:
        raise APIException('La persona con el id especificado, no fue encontrada.',status_code=403)

    return jsonify(Person.serialize(person)), 200

# [POST] - Ruta para crear un [PersonQr]
@routes_person_qr.route('/api/personqr', methods=['POST'])
@jwt_required()
def store():
    data_request = request.get_json()

    personQr = PersonQr(url = data_request["url"], 
    person_id = data_request["person_id"],
    user_creation_id = data_request["user_creation_id"],
    creation_date = datetime.datetime.now(),
    update_date = datetime.datetime.now())

    try:
        db.session.add(personQr)
        db.session.commit()
        
        return jsonify(PersonQr.serialize(personQr)), 201
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400

# [DELETE] - Ruta para eliminar un [PersonQr]
@routes_person_qr.route('/api/personqr/<int:id>', methods=['DELETE'])
@jwt_required()
def delete(id):
    personQr = PersonQr.query.get(id)

    if personQr is None:
        raise APIException('El Código QR con id especificado, no fue encontrado.',status_code=403)

    try:
        db.session.delete(personQr)
        db.session.commit()
        
        return jsonify('El Código QR fue eliminado satisfactoriamente.'), 200
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400
# FIN - Definición de EndPoints para el Modelo [PersonQR] - FIN