import os
from flask_admin import Admin
from .models import db, User
from flask_admin.contrib.sqla import ModelView
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from api.routes_user import routes_user
from api.routes_auth import routes_auth
from api.routes_person_medicine import routes_person_medicine
from api.routes_person_vaccine import routes_person_vaccine

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')
    app.config["JWT_SECRET_KEY"] = "Secr3tKeyR3sTAp1FinalProyect#123$456%789&"

    jwt = JWTManager(app)

    app.register_blueprint(routes_user)
    app.register_blueprint(routes_auth)
    app.register_blueprint(routes_person_medicine)
    app.register_blueprint(routes_person_vaccine)

    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))