import os
import flask
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, PersonVaccine
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

routes_person_vaccine = flask.Blueprint('routes_person_vaccine', __name__)

# INICIO - Definición de EndPoints para el Modelo [PersonVaccine] - INICIO
# [GET] - Ruta para obtener todos los [PersonVaccine]
@routes_person_vaccine.route('/api/person_vaccine', methods=['GET'])
@jwt_required()
def index():
    results = PersonVaccine.query.all()

    return jsonify(list(map(lambda x: x.serialize(), results))), 200

# [GET] - Ruta para obtener un [PersonVaccine]
@routes_person_vaccine.route('/api/person_vaccine/<int:id>', methods=['GET'])
@jwt_required()
def indexPersonVaccine(id):
    person_vaccine = PersonVaccine.query.get(id)

    if person_vaccine is None:
        raise APIException('El detalle de las vacunas de la persona con el id especificado, no fue encontrado.',status_code=403)

    return jsonify(PersonVaccine.serialize(person_vaccine)), 200

# [POST] - Ruta para crear un [PersonVaccine]
@routes_person_vaccine.route('/api/person_vaccine', methods=['POST'])
@jwt_required()
def store():
    data_request = request.get_json()

    person_vaccine = PersonVaccine(description = data_request["description"],
    application_date = data_request["application_date"],
    user_creation_id = data_request["user_creation_id"],
    creation_date = datetime.datetime.now(),
    update_date = datetime.datetime.now())

    try:
        db.session.add(person_vaccine)
        db.session.commit()
        
        return jsonify(PersonVaccine.serialize(person_vaccine)), 201
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400

# [PUT] - Ruta para modificar un [PersonVaccine]
@routes_person_vaccine.route('/api/person_vaccine/<int:id>', methods=['PUT'])
@jwt_required()
def update(id):
    person_vaccine = PersonVaccine.query.get(id)

    if person_vaccine is None:
        raise APIException('El detalle de las vacunas de la persona con el id especificado, no fue encontrado.',status_code=403)

    data_request = request.get_json()

    person_vaccine.description = data_request["description"]
    person_vaccine.application_date = data_request["application_date"]
    person_vaccine.update_date = datetime.datetime.now()

    try: 
        db.session.commit()
        
        return jsonify(PersonVaccine.serialize(person_vaccine)), 200
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400

# [DELETE] - Ruta para eliminar un [PersonVaccine]
@routes_person_vaccine.route('/api/person_vaccine/<int:id>', methods=['DELETE'])
@jwt_required()
def delete(id):
    person_vaccine = PersonVaccine.query.get(id)

    if person_vaccine is None:
        raise APIException('El detalle de las vacunas de la persona con el id especificado, no fue encontrado.',status_code=403)

    try:
        db.session.delete(person_vaccine)
        db.session.commit()
        
        return jsonify('El detalle de las vacunas fue eliminado satisfactoriamente.'), 200
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400
# FIN - Definición de EndPoints para el Modelo [PersonVaccine] - FIN