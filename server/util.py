import json
import pickle
import numpy as np
import os

__locations = None
__data_columns = None
__model = None


def get_estimated_price(location, sqft, bhk, bath):
    try:
        loc_index = __data_columns.index(location)
    except:
        loc_index = -1

    x = [0] * len(__data_columns)
    x[0] = sqft
    x[1] = bath
    x[2] = bhk

    if loc_index >= 0:
        x[loc_index] = 1

    return round(__model.predict([x])[0], 2)


def get_location_names():
    return __locations


def load_saved_artifacts():
    print("loading saved artifacts...start")

    global __data_columns
    global __locations
    global __model

    # ✅ Get correct path dynamically
    base_path = os.path.dirname(__file__)

    columns_path = os.path.join(base_path, "artifacts", "columns.json")
    model_path = os.path.join(base_path, "artifacts", "banglore_home_prices_model.pickle")

    # ✅ Load columns
    with open(columns_path, "r") as f:
        data = json.load(f)
        __data_columns = data["data_columns"]
        __locations = __data_columns[3:]

    # ✅ Load model
    with open(model_path, "rb") as f:
        __model = pickle.load(f)

    print("loading saved artifacts...Done")
    print("Sample locations:", __locations[:5])  # debug


# Run directly
if __name__ == "__main__":
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price('1st Phase JP Nagar', 1000, 2, 2))