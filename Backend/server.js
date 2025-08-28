// --- TOKEN LOGGING EXPLANATION ---
// Tokens are chunks of text (words or parts of words) that language models use to process input and output. Logging token usage helps monitor cost and efficiency.
// --- CHAIN OF THOUGHT PROMPTING EXPLANATION ---
// Chain of thought prompting encourages the AI to reason step-by-step, making its thinking process explicit.
// Here, we instruct the model to first plan the recipe, then explain the reasoning, and finally output the recipe.

function buildChainOfThoughtPrompt(ingredients, cuisine) {
	return `You are an expert chef. Using only these ingredients: ${ingredients}, and the cuisine: ${cuisine}, plan a creative recipe. First, list your reasoning step-by-step: explain how you choose the dish, how you combine the ingredients, and why the steps are ordered as they are. Then, output the final recipe with a title, ingredients list, and instructions.`;
}

// Chain of thought prompt endpoint
app.post('/api/chain-of-thought', async (req, res) => {
	const { ingredients, cuisine } = req.body;
	if (!ingredients || !cuisine) {
		return res.status(400).json({ error: 'Missing ingredients or cuisine' });
	}
	try {
		const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
		// Instruct the model to reason step-by-step (chain of thought)
		const result = await model.generateContent(buildChainOfThoughtPrompt(ingredients, cuisine));
		const response = await result.response;
		const text = response.text();
		if (response.usage && response.usage.totalTokens) {
			console.log(`[Chain-of-Thought] Tokens used:`, response.usage.totalTokens);
		}
		res.json({ recipe: text });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});
// --- DYNAMIC PROMPTING EXPLANATION ---
// Dynamic prompting is when you build the prompt on-the-fly based on user input or context, customizing instructions or examples.
// Here, we adjust the prompt based on the user's dietary preference and desired output format.

function buildDynamicPrompt(ingredients, cuisine, dietary, format) {
	let dietaryText = dietary ? `The recipe must be suitable for a ${dietary} diet.` : '';
	let formatText = '';
	if (format === 'json') {
		formatText = 'Respond in JSON with keys: title, ingredients, instructions.';
	} else if (format === 'markdown') {
		formatText = 'Format the recipe in Markdown.';
	} else {
		formatText = 'Format the recipe as plain text.';
	}
	return `You are an expert chef. Using only these ingredients: ${ingredients}, and the cuisine: ${cuisine}, generate a creative, step-by-step recipe. ${dietaryText} ${formatText}`;
}

// Dynamic prompt endpoint
app.post('/api/dynamic-prompt', async (req, res) => {
	const { ingredients, cuisine, dietary, format } = req.body;
	if (!ingredients || !cuisine) {
		return res.status(400).json({ error: 'Missing ingredients or cuisine' });
	}
	try {
		const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
		// Build the prompt dynamically based on user input
		const result = await model.generateContent(buildDynamicPrompt(ingredients, cuisine, dietary, format));
		const response = await result.response;
		const text = response.text();
		if (response.usage && response.usage.totalTokens) {
			console.log(`[Dynamic] Tokens used:`, response.usage.totalTokens);
		}
		res.json({ recipe: text });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});
// --- MULTI SHOT PROMPTING EXPLANATION ---
// Multi-shot prompting is when you provide the AI model with multiple examples along with your instruction.
// Here, we give the model two sample recipes (examples) and then ask it to generate a new recipe for the user's input.

function buildMultiShotPrompt(ingredients, cuisine) {
	// Multi-shot prompt with two sample recipes
	const example1 = `Example 1:\nIngredients: eggs, bread, milk\nCuisine: French\nRecipe:\nTitle: Classic French Toast\nIngredients List:\n- 2 eggs\n- 2 slices of bread\n- 1/2 cup milk\nInstructions:\n1. Beat the eggs and milk together.\n2. Dip bread slices in the mixture.\n3. Cook on a skillet until golden brown on both sides.\n4. Serve warm.`;
	const example2 = `Example 2:\nIngredients: tomatoes, pasta, olive oil\nCuisine: Italian\nRecipe:\nTitle: Simple Tomato Pasta\nIngredients List:\n- 2 tomatoes\n- 200g pasta\n- 2 tbsp olive oil\nInstructions:\n1. Boil the pasta until al dente.\n2. Sauté chopped tomatoes in olive oil.\n3. Mix the pasta with the tomato sauce.\n4. Serve hot.`;
	return `${example1}\n\n${example2}\n\nNow, using only these ingredients: ${ingredients}, and the cuisine: ${cuisine}, generate a creative, step-by-step recipe suitable for home cooks. Do not use any other ingredients. Format the recipe with a title, ingredients list, and clear instructions.`;
}

// Multi-shot prompt endpoint
app.post('/api/multi-shot', async (req, res) => {
	const { ingredients, cuisine } = req.body;
	if (!ingredients || !cuisine) {
		return res.status(400).json({ error: 'Missing ingredients or cuisine' });
	}
	try {
		const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
		// Provide multiple examples (multi-shot)
		const result = await model.generateContent(buildMultiShotPrompt(ingredients, cuisine));
		const response = await result.response;
		const text = response.text();
		if (response.usage && response.usage.totalTokens) {
			console.log(`[Multi-Shot] Tokens used:`, response.usage.totalTokens);
		}
		res.json({ recipe: text });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});
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
		if (response.usage && response.usage.totalTokens) {
			console.log(`[One-Shot] Tokens used:`, response.usage.totalTokens);
		}
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
app.post('/api/zero-shot', async (req, res) => {
	const { ingredients, cuisine } = req.body;
	if (!ingredients || !cuisine) {
		return res.status(400).json({ error: 'Missing ingredients or cuisine' });
	}
	try {
		const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
		// Only a single, clear instruction is given (zero-shot)
		const result = await model.generateContent(buildZeroShotPrompt(ingredients, cuisine));
		const response = await result.response;
		const text = response.text();
		if (response.usage && response.usage.totalTokens) {
			console.log(`[Zero-Shot] Tokens used:`, response.usage.totalTokens);
		}
		res.json({ recipe: text });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
