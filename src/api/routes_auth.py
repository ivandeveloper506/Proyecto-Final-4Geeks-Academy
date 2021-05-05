import os
import app
import flask
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Person, PasswordReset
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

routes_auth = flask.Blueprint('routes_auth', __name__)

# INICIO - Definición de EndPoints para el Modelo [User] para Login y Registro - INICIO
@routes_auth.route("/api/users/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email is None:
        return jsonify({"message": "El email es requerido."}), 400

    if password is None:
        return jsonify({"message": "El password es requerido."}), 400
    
    user = User.query.filter_by(email=email, password=password).first()
    
    if user is None:
        # the user was not found on the database
        return jsonify({"message": "El email o el password son inválidos."}), 401
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
        return jsonify({"message": "Ya existe una cuenta asociada a ese email."}), 401

    user = User(name = data_request["name"],
    first_surname = data_request["first_surname"],
    second_surname = data_request["second_surname"],
    birth_date = data_request["birth_date"],
    telephone_number = data_request["telephone_number"],
    user_image = data_request["user_image"],
    email = data_request["email"],
    password = data_request["password"],
    active = data_request["active"],
    creation_date = datetime.datetime.now(),
    update_date = datetime.datetime.now())

    try:
        db.session.add(user)
        db.session.commit()

        # Se crea una persona con los mismos datos del usuario que se esta registrando
        userInfo = User.serialize(user)

        person = Person(name = data_request["name"],
        first_surname = data_request["first_surname"],
        second_surname = data_request["second_surname"],
        known_as = "",
        birth_date = data_request["birth_date"],
        telephone_number = data_request["telephone_number"],
        user_image = "",
        emergency_contact = "",
        emergency_phone = "",
        user_creation_id = userInfo["id"],
        creation_date = datetime.datetime.now(),
        update_date = datetime.datetime.now())

        db.session.add(person)
        db.session.commit()

        nombreBienvenida = data_request["name"] + " " + data_request["first_surname"]

        # Se envia correo de bienvenida al usuario que se esta registrando.
        app.send_email(subject='Bienvenido(a) a QR+Services',
                       sender=current_app.config['DONT_REPLY_FROM_EMAIL'],
                       recipients=[data_request["email"]],
                       text_body=f'Hola {nombreBienvenida}, bienvenido(a) a QR+Services',
                       html_body=f'<p>Hola <strong>{nombreBienvenida}</strong>, bienvenido(a) a QR+Services.</p>')
        
        return jsonify(User.serialize(user)), 201
    
    except AssertionError as exception_message: 
        return jsonify(msg='Error: {}. '.format(exception_message)), 400

# [POST] - Ruta para recuperar contraseña de un [user]
@routes_auth.route('/api/users/forgot', methods=['POST'])
def forgot():
    data_request = request.get_json()

    rEmail = data_request["email"]

    if rEmail is None:
        return jsonify({"message": "El email es requerido."}), 400
    
    user = User.query.filter_by(email=rEmail).first()
    
    # Se valida que el email no haya sido registrado.
    if user is None:
        return jsonify({"message": "El email ingresado es inválido."}), 401
    
    try:
        codeForgot = app.codeGenerate()

        # Se guardar el regisrtro del token enviado al usuario
        passwordReset = PasswordReset(email = rEmail,
        token=codeForgot,
        expiration_date = datetime.datetime.utcnow() + datetime.timedelta(minutes=15),
        creation_date = datetime.datetime.utcnow(),
        update_date = datetime.datetime.utcnow())

        db.session.add(passwordReset)
        db.session.commit()

        passwordResetInfo = PasswordReset.serialize(passwordReset)

        # Se envia correo para recuperación de contraseña.
        app.send_email(subject='Recuperación de contraseña [Código verificador]',
                       sender=current_app.config['DONT_REPLY_FROM_EMAIL'],
                       recipients=[data_request["email"]],
                       text_body=f'Recuperar su contraseña.',
                       html_body=f'<p style="font-size:15px;">Recupere su contraseña ingresando el siguiente Código de verificación: &nbsp;&nbsp;<strong style="color:blue; font-size:15px;">{codeForgot}</strong></p>')

        return jsonify({"message": "El email de recuperación ha sido enviado exitosamente.","results": passwordResetInfo}), 200
        
    except AssertionError as exception_message: 
        return jsonify(msg='error: {}. '.format(exception_message)), 400

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

# [PUT] - Ruta para modificar el activo de un [user]
@routes_auth.route('/api/users/password-reset/<string:token>', methods=['PUT'])
def passwordReset(token):
    data_request = request.get_json()

    email = data_request["email"]
    password = data_request["password"]

    if email is None:
        return jsonify({"message": "El email es requerido."}), 400

    if password is None:
        return jsonify({"message": "El password es requerido."}), 400
    
    user = User.query.filter_by(email=email).first()
    
    if user is None:
        # the user was not found on the database
        return jsonify({"message": "El usuario con el email especificado no existe."}), 401
    else:
        try:
            user.password = password
            
            db.session.commit()

            # Se envia correo para recuperación de contraseña.
            app.send_email(subject='Recuperación de contraseña [Contraseña actualizada]',
                       sender=current_app.config['DONT_REPLY_FROM_EMAIL'],
                       recipients=[data_request["email"]],
                       text_body=f'Actualizar su contraseña.',
                       html_body=f'<p style="font-size:15px;">La contraseña ha sido actualizada exitosamente.</p>')
        
            return jsonify({"message": "¡La contraseña fue actualizada exitosamente!"}), 200
    
        except AssertionError as exception_message: 
            return jsonify(msg='Error: {}. '.format(exception_message)), 400
# FIN - Definición de EndPoints para el Modelo [User] para Login y Registro - FIN