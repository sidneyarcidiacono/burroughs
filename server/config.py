"""Package and module dependency import."""
import os


class Config(object):
    """Initialize environment variables."""

    FLASK_APP = os.getenv("FLASK_APP")
