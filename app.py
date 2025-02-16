from flask import Flask, render_template, jsonify, request, redirect, url_for, flash, session
import os
import json
from bson import ObjectId
import secrets
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv  # Import dotenv to load environment variables

load_dotenv()  # This will load the variables from the .env file

app = Flask(__name__)

# Set MongoDB database name, URI, and secret key from environment variables
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

# Connect to MongoDB
try:
    mongo = PyMongo(app)
    print("Connected to MongoDB")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")

@app.route("/")
def index():
    existing_user = None
    if session.get("logged_in"):
        email = session.get("email")
        existing_user = mongo.db.users.find_one({"email": email})
    return render_template("index.html", existing_user=existing_user)

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/shop")
def shop():
    data = []
    with open("data/products.json", "r") as json_data:
        data = json.load(json_data)
    return render_template("shop.html", company=data)

@app.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        existing_user = mongo.db.users.find_one({"email": email})
        if existing_user and check_password_hash(existing_user["password"], password):
            flash("Login successful", "success")
            session["logged_in"] = True
            session["email"] = email
            return redirect(url_for("profile"))
        else:
            flash("Invalid email or password", "error")

    session["logged_in"] = False
    return redirect(url_for("index"))

@app.route("/checkout", methods=["POST"])
def checkout():
    if request.method == "POST":
        cart_items = request.json.get("cartItems", [])
        user_email = session.get("email")

        if user_email:
            update_user_cart(user_email, cart_items)
            return jsonify({"message": "Checkout successful"})

    return jsonify({"error": "Invalid request"})

@app.route("/profile", methods=["GET", "POST"])
def profile():
    if request.method == "POST":
        if request.form.get("delete_profile"):
            delete_user()
            return redirect(url_for("index"))
        elif request.form.get("update_profile"):
            update_user_information()
            session.clear()
            return redirect(url_for("index"))

    user_email = session.get("email")
    user_data = mongo.db.users.find_one({"email": user_email})
    cart_items_from_db = user_data.get("cart", [])
    return render_template("profile.html", user_data=user_data, cart_items_from_db=cart_items_from_db)

def update_user_information():
    new_username = request.form.get("username")
    new_email = request.form.get("emailprofile")
    new_password = request.form.get("passwordprofile")

    user_email = session.get("email")
    user_data = mongo.db.users.find_one({"email": user_email})

    if new_username:
        user_data["username"] = new_username
    if new_email:
        user_data["email"] = new_email
    if new_password:
        hashed_password = generate_password_hash(new_password, method="pbkdf2:sha256")
        user_data["password"] = hashed_password

    mongo.db.users.update_one({"email": user_email}, {"$set": user_data})

def update_user_cart(email, cart_items):
    user_collection = mongo.db.users
    user = user_collection.find_one({"email": email})
    if user:
        user_collection.update_one({"email": email}, {"$set": {"cart": cart_items}})

def delete_user():
    user_collection = mongo.db.users
    user_email = session.get("email")
    user_collection.delete_one({"email": user_email})
    session.clear()

@app.route("/remove_item", methods=["POST"])
def remove_item():
    if request.method == "POST":
        item_to_remove = request.get_json().get("itemToRemove", {})
        user_email = session.get("email")

        if user_email:
            remove_item_from_cart(user_email, item_to_remove)
            return jsonify({"message": "Item removed successfully"})

    return jsonify({"error": "Invalid request"})

def remove_item_from_cart(email, item_to_remove):
    user_collection = mongo.db.users
    user_collection.update_one(
        {"email": email},
        {"$pull": {"cart": item_to_remove}}
    )

@app.route("/signup", methods=["GET", "POST"])
def signup():
    username_exists = False
    success_exists = session.pop("success_exists", False)

    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        confirm_password = request.form.get("confirm_password")
        email = request.form.get("email")

        try:
            existing_user = mongo.db.users.find_one({"username": username})

            if existing_user:
                flash("Username already exists", "error")
                username_exists = True
                return render_template("signup.html", username_exists=username_exists)

            elif password != confirm_password:
                flash("Passwords do not match", "error")
                return render_template("signup.html", username_exists=username_exists)

            hashed_password = generate_password_hash(password, method="pbkdf2:sha256")

            mongo.db.users.insert_one({
                "username": username,
                "email": email,
                "password": hashed_password
            })

            session["success_exists"] = True
            return redirect(url_for("signup"))

        except Exception as e:
            print(f"Error accessing or inserting user into MongoDB: {e}")
            flash("Error accessing or inserting user into MongoDB", "error")
            return render_template("signup.html", username_exists=username_exists)

    return render_template("signup.html", username_exists=username_exists, success_exists=success_exists)

@app.route("/api/products")
def products():
    products_data = [...]  
    return jsonify(products_data)

@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    flash("Logout successful", "success")
    return redirect(url_for("index"))

@app.route("/update_quantity", methods=["POST"])
def update_quantity():
    if request.method == "POST":
        data = request.get_json()
        item_name = data.get("itemName")
        new_quantity = int(data.get("updatedQuantity"))

        user_email = session.get("email")
        update_quantity_in_cart(user_email, item_name, new_quantity)

        return jsonify({"message": "Quantity updated successfully"})

    return jsonify({"error": "Invalid request"})

def update_quantity_in_cart(email, item_name, new_quantity):
    user_collection = mongo.db.users
    user_collection.update_one(
        {"email": email, "cart.name": item_name},
        {"$set": {"cart.$.quantity": new_quantity}}
    )

# Running the Flask app
if __name__ == "__main__":
    app.run(host=os.environ.get("IP", "127.0.0.1"), port=int(os.environ.get("PORT", 5000)), debug=True)
