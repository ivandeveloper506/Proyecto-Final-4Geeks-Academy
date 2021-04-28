import os
import flask
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, PersonQr
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

# [GET] - Ruta para obtener un [PersonQr]
@routes_person_qr.route('/api/personqr/<int:id>', methods=['GET'])
@jwt_required()
def indexPersonQr(id):
    personQr = PersonQr.query.get(id)

    if personQr is None:
        raise APIException('La información del QR de la persona con el id especificado, no fue encontrada.',status_code=403)

    return jsonify(PersonQr.serialize(personQr)), 200

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
# FIN - Definición de EndPoints para el Modelo [PersonQR] - FIN