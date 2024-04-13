import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddIngredient.css";

const AddIngredient = () => {
  const [ingredientName, setIngredientName] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // allowing only one image
    setImage([file]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("ingredientName", ingredientName);
    formData.append("image", image[0]);
    formData.append("quantity", quantity);
    formData.append("expiryDate", expiryDate);

    try {
      const jwtToken = localStorage.getItem("jwt");
      console.log("token: ", jwtToken);
      const response = await axios.post(
        "http://localhost:3001/api/addIngredient",
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Received server response: ", response.data);
      navigate("/fridge");
    } catch (error) {
      console.log(`Received server error: ${error}`);
      setError("Failed to add ingredient");
    }
  };

  return (
    <form className="add-ingredient-form" onSubmit={handleSubmit}>
      <main className="App">
        <h1>Add Ingredient</h1>
        <div class="formField">
          <div>
            <label
              className="add-ingredient-form-field"
              htmlFor="ingredientName"
            >
              Enter your ingredient name:
            </label>
          </div>

          <div>
            <input
              id="ingredientName"
              type="text"
              placeholder="Ingredient Name"
              onChange={(e) => setIngredientName(e.target.value)}
              required
            />
          </div>
        </div>

        <div class="formField">
          <div>
            <label
              className="add-ingredient-form-field"
              htmlFor="ingredientImage"
            >
              Upload image of ingredient:
            </label>
          </div>

          <div>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
        </div>

        <div class="formField">
          <div>
            <label
              className="add-ingredient-form-field"
              htmlFor="ingredientExpiryDate"
            >
              Enter expiry date
            </label>
          </div>

          <div>
            <input
              id="ingredientExpiryDate"
              type="date"
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div class="formField">
          <div>
            <label
              className="add-ingredient-form-field"
              htmlFor="ingredientQuantity"
            >
              Enter quantity
            </label>
          </div>

          <div>
            <input
              id="ingredientQuantity"
              type="number"
              placeholder="Quantity"
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
        </div>

        {error && (
          <div>
            <p className="notwork">{error}</p>
            <Link to="/">Bypass due to error</Link>
          </div>
        )}

        <div className="btn-section">
          <div>
            <button className="submit-ingredient-button" type="submit">
              {" "}
              Add Ingredient
            </button>
          </div>
          <div>
            <button className="cancel-submit-ingredient">
              <Link to="/fridge" className="cancel-link">
                Cancel your changes
              </Link>
            </button>
          </div>
        </div>
      </main>
    </form>
  );
};

export default AddIngredient;
