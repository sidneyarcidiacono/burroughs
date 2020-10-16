"""Package and module dependency imports."""
from flask import Blueprint, request, jsonify, render_template
from server import db
from bson.json_util import dumps

main = Blueprint("main", __name__)


@main.route("/", methods=["GET", "POST"])
def home():
    """Show the user the homepage."""
    return render_template("index.html")


@main.route("/kerasgenerator")
def kerasgenerator():
    """Function to generate text based on keras model."""
    pass


@main.route("/about")
def about():
    """Render about.html."""
    return render_template("about.html")


@main.route("/gettrainingdata")
def show_training_data():
    """Return all training data as json to client."""
    training_data = db.trainingdata.find({})
    return dumps(training_data)


@main.route("/getuserinput", methods=["POST"])
def get_user_input():
    pass


@main.route("/trainingdata", methods=["POST"])
def add_training_data():
    """Simple interface to add training data to database from client."""
    training_data = request.json
    db.trainingdata.insert(training_data)
    return dumps(training_data)
