"""Package and module dependency imports."""
from flask import Blueprint, request, jsonify, render_template
from server import db
from bson.json_util import dumps

main = Blueprint("main", __name__)


@main.route("/")
def home():
    """Show the user the homepage."""
    return render_template("index.html")


@main.route("/trainingdata", methods=["POST"])
def add_training_data():
    """Simple interface to add training data to database from client."""
    training_data = request.json
    db.trainingdata.insert({"trainingdata": training_data})
    return dumps({"trainingdata": training_data})


@main.route("/gettrainingdata", methods=["GET"])
def show_training_data():
    """Return all training data as json to client."""
    training_data = db.trainingdata.get({})
    return dumps({"trainingdata": training_data}), 200


@main.route("/getuserinput", methods=["POST"])
def get_user_input():
    pass
