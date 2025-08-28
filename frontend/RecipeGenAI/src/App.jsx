import React, { useState } from "react";
import "./App.css";

function App() {
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const handleAddIngredient = () => {
    if (ingredientInput.trim() && !ingredients.includes(ingredientInput.trim())) {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput("");
    }
  };

  const handleRemoveIngredient = (item) => {
    setIngredients(ingredients.filter((i) => i !== item));
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0 || !cuisine) {
      alert("Please add at least one ingredient and choose a cuisine.");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("http://localhost:5000/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients, cuisine }),
      });

      const data = await res.json();
      setOutput(data.recipe || "No recipe generated.");
    } catch (err) {
      console.error(err);
      setOutput("Error: Could not generate recipe.");
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <h1 className="title">🍲 Recipe AI</h1>

      <div className="section">
        <h2>Ingredients</h2>
        <div className="input-row">
          <input
            type="text"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            placeholder="Enter an ingredient"
          />
          <button onClick={handleAddIngredient}>Add</button>
        </div>
        <div className="ingredient-board">
          {ingredients.map((item, index) => (
            <div className="ingredient-tag" key={index}>
              {item}
              <span className="remove" onClick={() => handleRemoveIngredient(item)}>✖</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Select Cuisine</h2>
        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
          <option value="">-- Choose Cuisine --</option>
          <option value="Italian">Italian</option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
          <option value="Mexican">Mexican</option>
          <option value="French">French</option>
        </select>
      </div>

      <div className="section">
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate Recipe"}
        </button>
      </div>

      <div className="section">
        <h2>Recipe Suggestions</h2>
        <div className="output">{output}</div>
      </div>
    </div>
  );
}

export default App;
  