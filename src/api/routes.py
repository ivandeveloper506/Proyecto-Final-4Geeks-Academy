"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# INICIO - Definición de EndPoints para el Modelo [User] para Login y Registro - INICIO
@api.route("/users/login", methods=["POST"])
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
@api.route('/users/register', methods=['POST'])
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
    active = data_request["active"])

    try:
        db.session.add(user)
        db.session.commit()
        
        return jsonify(User.serialize(user)), 201
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400
# FIN - Definición de EndPoints para el Modelo [User] para Login y Registro - FIN


# INICIO - Definición de EndPoints para el Modelo [User] - INICIO
# [GET] - Ruta para obtener todos los [user]
@api.route('/users', methods=['GET'])
@jwt_required()
def indexAllUser():
    results = User.query.all()

    return jsonify(list(map(lambda x: x.serialize(), results))), 200

# [GET] - Ruta para obtener un [user]
@api.route('/users/<int:id>', methods=['GET'])
@jwt_required()
def indexUser(id):
    user = User.query.get(id)

    if user is None:
        raise APIException('El usuario con el id especificado, no fue encontrado.',status_code=403)

    return jsonify(User.serialize(user)), 200

# [POST] - Ruta para crear un [user]
@api.route('/users', methods=['POST'])
@jwt_required()
def storeUser():
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
    active = data_request["active"])

    try:
        db.session.add(user)
        db.session.commit()
        
        return jsonify(User.serialize(user)), 201
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400

# [PUT] - Ruta para modificar un [user]
@api.route('/users/<int:id>', methods=['PUT'])
@jwt_required()
def updateUser(id):
    user = User.query.get(id)

    if user is None:
        raise APIException('El usuario con el id especificado, no fue encontrado.',status_code=403)

    data_request = request.get_json()

    user.name = data_request["name"]
    user.first_surname = data_request["first_surname"]
    user.second_surname = data_request["second_surname"]
    user.user_image = data_request["user_image"]
    user.password = data_request["password"]

    try: 
        db.session.commit()
        
        return jsonify(User.serialize(user)), 200
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400

# [DELETE] - Ruta para eliminar un [user]
@api.route('/users/<int:id>', methods=['DELETE'])
@jwt_required()
def deleteUser(id):
    user = User.query.get(id)

    if user is None:
        raise APIException('El usuario con el id especificado, no fue encontrado.',status_code=403)

    try:
        db.session.delete(user)
        db.session.commit()
        
        return jsonify('El usuario fue eliminado satisfactoriamente.'), 200
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400
# FIN - Definición de EndPoints para el Modelo [User] - FIN