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
		res.json({ recipe: text });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
