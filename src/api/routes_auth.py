import os
import flask
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

routes_auth = flask.Blueprint('routes_auth', __name__)

# INICIO - Definición de EndPoints para el Modelo [User] para Login y Registro - INICIO
@routes_auth.route("/api/users/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email is None:
        return jsonify({"msg": "El email es requerido."}), 400

    if password is None:
        return jsonify({"msg": "El password es requerido."}), 400
    
    user = User.query.filter_by(email=email, password=password).first()
    
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "El email o el password son invalidos."}), 401
    else:
        expiration_date = datetime.timedelta(days=1)
        access_token = create_access_token(identity=user.id,expires_delta=expiration_date)
        return jsonify({ "token": access_token, "user_id": user.id }), 200

# [POST] - Ruta para registro de un [user]
@routes_auth.route('/api/users/register', methods=['POST'])
def register():
    data_request = request.get_json()

    user = User.query.filter_by(email=data_request["email"]).first()
    
    # Se valida que el email no haya sido registrado.
    if user:
        return jsonify({"msg": "El email ya fue registrado."}), 401

    user = User(name = data_request["name"],
    first_surname = data_request["first_surname"],
    second_surname = data_request["second_surname"],
    user_image = data_request["user_image"],
    email = data_request["email"],
    password = data_request["password"],
    active = data_request["active"],
    creation_date = datetime.datetime.now(),
    update_date = datetime.datetime.now())

    try:
        db.session.add(user)
        db.session.commit()
        
        return jsonify(User.serialize(user)), 201
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400

# [PUT] - Ruta para modificar el activo de un [user]
@routes_auth.route('/api/users/active/<int:id>', methods=['PUT'])
@jwt_required()
def active(id):
    user = User.query.get(id)

    if user is None:
        raise APIException('El usuario con el id especificado, no fue encontrado.',status_code=403)

    data_request = request.get_json()

    user.active = data_request["active"]

    try: 
        db.session.commit()
        
        return jsonify(User.serialize(user)), 200
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400
# FIN - Definición de EndPoints para el Modelo [User] para Login y Registro - FIN
