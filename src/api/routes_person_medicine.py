import os
import flask
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, PersonMedicine
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

routes_person_medicine = flask.Blueprint('routes_person_medicine', __name__)

# INICIO - Definición de EndPoints para el Modelo [PersonMedicine] - INICIO
# [GET] - Ruta para obtener todos los [PersonMedicine]
@routes_person_medicine.route('/api/person_medicine', methods=['GET'])
@jwt_required()
def index():
    results = PersonMedicine.query.all()

    return jsonify(list(map(lambda x: x.serialize(), results))), 200

# [GET] - Ruta para obtener un [PersonMedicine]
@routes_person_medicine.route('/api/person_medicine/<int:id>', methods=['GET'])
@jwt_required()
def indexPersonMedicine(id):
    person_medicine = PersonMedicine.query.get(id)

    if person_medicine is None:
        raise APIException('El detalle de los medicamentos de la persona con el id especificado, no fue encontrado.',status_code=403)

    return jsonify(PersonMedicine.serialize(person_medicine)), 200

# [GET] - Ruta para obtener todos los registros de [PersonMedicine] por Persona
@routes_person_medicine.route('/api/person_medicine/person', methods=['POST'])
@jwt_required()
def indexPersonMedicineByPerson():
    person_id = request.json.get("person_id",None)

    if person_id is None:
        return jsonify({"message": "El código de la persona es requerido."}), 400

    results = PersonMedicine.query.filter_by(person_id=person_id)

    if results is None:
        raise APIException('No existen medicamentos para la persona con el id especificado.',status_code=403)

    return jsonify(list(map(lambda x: x.serialize(), results))), 200

    if results is None:
        # No se toma como error, simplemente no hay medicamentos para la persona
        return jsonify([]), 200
    else:
        return jsonify(PersonMedicine.serialize(results)), 200

# [POST] - Ruta para crear un [PersonMedicine]
@routes_person_medicine.route('/api/person_medicine', methods=['POST'])
@jwt_required()
def store():
    data_request = request.get_json()

    person_medicine = PersonMedicine(description = data_request["description"],
    frequency = data_request["frequency"],
    observation = data_request["observation"],
    person_id = data_request["person_id"],
    user_creation_id = data_request["user_creation_id"],
    creation_date = datetime.datetime.now(),
    update_date = datetime.datetime.now())

    try:
        db.session.add(person_medicine)
        db.session.commit()
        
        return jsonify(PersonMedicine.serialize(person_medicine)), 201
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400

# [PUT] - Ruta para modificar un [PersonMedicine]
@routes_person_medicine.route('/api/person_medicine/<int:id>', methods=['PUT'])
@jwt_required()
def update(id):
    person_medicine = PersonMedicine.query.get(id)

    if person_medicine is None:
        raise APIException('El detalle de los medicamentos de la persona con el id especificado, no fue encontrado.',status_code=403)

    data_request = request.get_json()

    person_medicine.description = data_request["description"]
    person_medicine.frequency = data_request["frequency"]
    person_medicine.observation = data_request["observation"]
    person_medicine.update_date = datetime.datetime.now()

    try: 
        db.session.commit()
        
        return jsonify(PersonMedicine.serialize(person_medicine)), 200
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400

# [DELETE] - Ruta para eliminar un [PersonMedicine]
@routes_person_medicine.route('/api/person_medicine/<int:id>', methods=['DELETE'])
@jwt_required()
def delete(id):
    person_medicine = PersonMedicine.query.get(id)

    if person_medicine is None:
        raise APIException('El detalle de los medicamentos de la persona con el id especificado, no fue encontrado.',status_code=403)

    try:
        db.session.delete(person_medicine)
        db.session.commit()
        
        return jsonify('El detalle de los medicamentos fue eliminado satisfactoriamente.'), 200
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400
# FIN - Definición de EndPoints para el Modelo [PersonMedicine] - FIN