// --- ONE SHOT PROMPTING EXPLANATION ---
// One-shot prompting is when you provide the AI model with a single example along with your instruction.
// Here, we give the model one sample recipe (example) and then ask it to generate a new recipe for the user's input.

function buildOneShotPrompt(ingredients, cuisine) {
	// Example: One-shot prompt with a sample recipe
	const example = `Example:\nIngredients: eggs, bread, milk\nCuisine: French\nRecipe:\nTitle: Classic French Toast\nIngredients List:\n- 2 eggs\n- 2 slices of bread\n- 1/2 cup milk\nInstructions:\n1. Beat the eggs and milk together.\n2. Dip bread slices in the mixture.\n3. Cook on a skillet until golden brown on both sides.\n4. Serve warm.`;
	return `${example}\n\nNow, using only these ingredients: ${ingredients}, and the cuisine: ${cuisine}, generate a creative, step-by-step recipe suitable for home cooks. Do not use any other ingredients. Format the recipe with a title, ingredients list, and clear instructions.`;
}

// One-shot prompt endpoint
app.post('/api/one-shot', async (req, res) => {
	const { ingredients, cuisine } = req.body;
	if (!ingredients || !cuisine) {
		return res.status(400).json({ error: 'Missing ingredients or cuisine' });
	}
	try {
		const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
		// Provide a single example (one-shot)
		const result = await model.generateContent(buildOneShotPrompt(ingredients, cuisine));
		const response = await result.response;
		const text = response.text();
		res.json({ recipe: text });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



// --- ZERO SHOT PROMPTING EXPLANATION ---
// Zero-shot prompting is when you ask an AI model to perform a task without giving it any examples, just clear instructions.
// Here, we use a single prompt to instruct the model to generate a recipe based on user input, without any sample recipes.

function buildZeroShotPrompt(ingredients, cuisine) {
	return `You are an expert chef. Given only the following ingredients: ${ingredients}, and the cuisine: ${cuisine}, generate a creative, step-by-step recipe suitable for home cooks. Do not use any other ingredients. Format the recipe with a title, ingredients list, and clear instructions.`;
}


// Zero-shot prompt endpoint

// RTFC-based system and user prompts
const SYSTEM_PROMPT = `You are an expert AI chef assistant. Your task is to generate creative, detailed, and easy-to-follow recipes based on the user’s provided ingredients and preferred cuisine. Always ensure the recipes are clear, use common cooking terms, and are suitable for home cooks. Respond in a friendly, encouraging tone.`;

function buildUserPrompt(ingredients, cuisine) {
	return `I have the following ingredients: ${ingredients}. I want to cook something ${cuisine}. Please suggest a recipe with step-by-step instructions.`;
}


app.post('/api/zero-shot', async (req, res) => {
	const { ingredients, cuisine } = req.body;
	if (!ingredients || !cuisine) {
		return res.status(400).json({ error: 'Missing ingredients or cuisine' });
	}
	try {
		const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

		const result = await model.generateContent([
			{ role: 'system', parts: [{ text: SYSTEM_PROMPT }] },
			{ role: 'user', parts: [{ text: buildUserPrompt(ingredients, cuisine) }] }
		]);

		const response = await result.response;
		const text = response.text();
		res.json({ recipe: text });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
