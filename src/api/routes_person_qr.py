import os
import flask
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Person_qr
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

routes_person_qr = flask.Blueprint('routes_person_qr', __name__)

# INICIO - Definición de EndPoints para el Modelo [Person_qr] - INICIO
# [GET] - Ruta para obtener todos los [Person_qr]
@routes_person_qr.route('/api/person_qr', methods=['GET'])
@jwt_required()
def index():
    results = Person_qr.query.all()

    return jsonify(list(map(lambda x: x.serialize(), results))), 200

# [GET] - Ruta para obtener un [Person_qr]
@routes_person_qr.route('/api/person_qr/<int:id>', methods=['GET'])
@jwt_required()
def indexPersonqr(id):
    person_qr = Person_qr.query.get(id)

    if person_qr is None:
        raise APIException('el qr para la persona con el id especificado, no fue encontrado.',status_code=403)

    return jsonify(Person_qr.serialize(person_qr)), 200

# [POST] - Ruta para crear un [Person_qr]
@routes_person_qr.route('/api/person_qr', methods=['POST'])
@jwt_required()
def store():
    data_request = request.get_json()

    person_qr = Person_qr(url = data_request["url"], 
    user_creation_id = data_request["user_creation_id"],
    creation_date = datetime.datetime.now(),
    update_date = datetime.datetime.now())

    try:
        db.session.add(person_qr)
        db.session.commit()
        
        return jsonify(Person_qr.serialize(person_qr)), 201
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400

# FIN - Definición de EndPoints para el Modelo [Person] - FIN