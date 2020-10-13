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
    training_data = request.json
    db.trainingdata.insert({"trainingdata": training_data})
    return dumps({"trainingdata": training_data})
