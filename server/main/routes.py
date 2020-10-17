"""Package and module dependency imports."""
from flask import Blueprint, request, jsonify, render_template
from server import db
from bson.json_util import dumps
from server.main.data import generate_text

main = Blueprint("main", __name__)


@main.route("/", methods=["GET", "POST"])
def home():
    """Show the user the homepage."""
    return render_template("index.html")


@main.route("/kerasgenerator", methods=['GET', 'POST'])
def kerasgenerator():
    """Generate text based on keras model and user input."""
    if request.method == "POST":
        user_input = request.form.get('user-input')
        response = generate_text(user_input, 2.0)
        context = {
            "response": response,
            "user_input": user_input
        }
        return render_template('generator.html', **context)
    return render_template('generator.html')


@main.route("/about")
def about():
    """Render about.html."""
    return render_template("about.html")


@main.route("/gettrainingdata")
def show_training_data():
    """Return all training data as json to client."""
    training_data = db.trainingdata.find({})
    return dumps(training_data)


@main.route("/trainingdata", methods=["POST"])
def add_training_data():
    """Simple interface to add training data to database from client."""
    training_data = request.json
    db.trainingdata.insert(training_data)
    return dumps(training_data)
