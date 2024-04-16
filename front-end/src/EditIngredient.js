import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./EditIngredient.css";
import axios from "axios";

const EditIngredient = () => {
  const [image, setImage] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [error, setError] = useState("");

  const [editedIngredient, setEditedIngredient] = useState("");

  const { ingredientId } = useParams();

  useEffect(() => {
    console.log("useEffect is being called");
    axios
      .get(`http://localhost:3001/api/editIngredientInfo/${ingredientId}`)
      .then((response) => {
        setEditedIngredient(response.data);
        setIngredientName(response.data.ingredient_name);
        setQuantity(response.data.quantity);
        setExpiryDate(response.data.expiry_date);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ingredient: ", error);
      });
  }, [ingredientId]);

  if (!editedIngredient) {
    return <div>Ingredient to edit not found!</div>;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Assuming you're allowing only one image to be uploaded
    setImage([file]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("api to submit edit is being called");

    const formData = new FormData();

    formData.append("ingredientId", ingredientId);
    formData.append("ingredientName", ingredientName);
    formData.append("image", image[0]);
    formData.append("quantity", quantity);
    formData.append("expiryDate", expiryDate);

    axios
      .post(`http://localhost:3001/api/editIngredient/${ingredientId}`)
      .then((response) => {
        console.log("ingredient has been edited: ", response.data);
      })
      .catch((err) => {
        console.log("error trying to edit ingredient: ", err);
        setError(err);
      });
  };

  return (
    <form className="add-ingredient-form" onSubmit={handleSubmit}>
      <main className="App">
        <h1>Edit Ingredient</h1>
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
              value={ingredientName}
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
              id="ingredientImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              // required
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
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              // required
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
              value={quantity}
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
            <Link to="/fridge">
              <button className="submit-edit-button" type="submit">
                Save Edit
              </button>
            </Link>
          </div>
          <div>
            <button className="cancel-edit-ingredient">
              <Link to="/fridge" className="cancel-link">
                Cancel Edit
              </Link>
            </button>
          </div>
        </div>
      </main>
    </form>
  );
};

export default EditIngredient;
