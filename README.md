# 🍲 AI Recipe Generator

An AI-powered assistant that generates personalized recipes from user input. This project demonstrates **prompt engineering techniques** (system/user prompts, chain-of-thought, dynamic, and multi-shot prompting) and explores **generation controls** (Top-K, Top-P, Temperature).  

---

## 🚀 Features
- Generate recipes based on **ingredients, cuisine type, or dietary style**  
- Uses **system & user prompts** for structured responses  
- Supports **multi-shot prompting** with sample recipes  
- **Dynamic prompting** for beginner-friendly or chef-style instructions  
- Experiments with **Top-K, Top-P, and Temperature** settings  
- Tracks **token usage** for optimization  
- Includes **evaluation dataset** for recipe quality testing  
a
---

## 🛠️ Tech Stack
- **Language Model API** (e.g., OpenAI, Hugging Face)  
- **Python / JavaScript** (choose based on your setup)  
- CLI or Web-based interface  

---

## 📂 Project Structure
```
AI-Recipe-Generator/
│── data/                # Evaluation dataset
│── notebooks/           # Prompt experiments
│── src/                 # Main code
│   ├── generator.py     # Recipe generation logic
│   ├── evaluation.py    # Testing framework
│── README.md            # Project documentation
```

---

## ⚡ How It Works
1. User provides input (ingredients, cuisine, or dietary preference).  
2. System prompt sets the assistant’s persona (creative chef).  
3. Model generates recipes using **Top-K, Top-P, Temperature** controls.  
4. **Chain-of-thought prompting** explains reasoning before giving the recipe.  
5. Output is adjusted based on **dynamic prompting** (beginner vs. expert mode).  

---

## 🧪 Evaluation
- Small **evaluation dataset** included (`data/recipes.json`).  
- Tests output for:
  - **Clarity** (easy to follow steps)  
  - **Correctness** (valid ingredients & process)  
  - **Creativity** (variety in results)  

---

## 📊 Example
**Input:**  
`Ingredients: chicken, rice, spinach | Cuisine: Indian | Level: Beginner`

**Output:**  
Step 1: Cook rice with a pinch of salt.  
Step 2: Stir-fry spinach with garlic.  
Step 3: Grill chicken with spices.  
Step 4: Combine and serve as a one-pot meal.  

---

## 📖 Future Improvements
- Add a web UI with search and filters  
- Store user preferences for personalized suggestions  
- Expand evaluation dataset with community inputs  

---

## 📜 License
This project is licensed under the MIT License.  
