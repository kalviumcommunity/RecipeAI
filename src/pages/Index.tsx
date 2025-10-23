import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IngredientBubble } from "@/components/IngredientBubble";
import { CuisineSelector } from "@/components/CuisineSelector";
import { RecipeDisplay } from "@/components/RecipeDisplay";
import { ChefHat, Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("Italian");
  const [recipe, setRecipe] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const addIngredient = () => {
    const trimmed = currentIngredient.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setCurrentIngredient("");
      toast.success(`Added ${trimmed}!`);
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const generateRecipe = async () => {
    if (ingredients.length === 0) {
      toast.error("Please add at least one ingredient!");
      return;
    }

    setIsGenerating(true);
    setRecipe("");

    try {
      const { data, error } = await supabase.functions.invoke("generate-recipe", {
        body: { ingredients, cuisine: selectedCuisine },
      });

      if (error) throw error;

      setRecipe(data.recipe);
      toast.success("Recipe generated!");
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast.error("Failed to generate recipe. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addIngredient();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="w-12 h-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-warm bg-clip-text text-transparent">
              Recipe AI
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Add your ingredients and let AI create the perfect recipe for you
          </p>
        </div>

        {/* Ingredient Input Section */}
        <div className="bg-card rounded-2xl shadow-card p-6 mb-6 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Add Ingredients</h2>
          <div className="flex gap-2 mb-4">
            <Input
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter an ingredient..."
              className="flex-1"
            />
            <Button onClick={addIngredient} className="bg-gradient-warm border-0">
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          {/* Ingredients Display */}
          {ingredients.length > 0 && (
            <div className="flex flex-wrap gap-2 p-4 bg-muted rounded-xl min-h-[80px]">
              {ingredients.map((ingredient, index) => (
                <IngredientBubble
                  key={index}
                  ingredient={ingredient}
                  onRemove={() => removeIngredient(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Cuisine Selector */}
        <div className="bg-card rounded-2xl shadow-card p-6 mb-6 animate-fade-in">
          <CuisineSelector selected={selectedCuisine} onSelect={setSelectedCuisine} />
        </div>

        {/* Generate Button */}
        <div className="text-center mb-8">
          <Button
            onClick={generateRecipe}
            disabled={isGenerating || ingredients.length === 0}
            size="lg"
            className="bg-gradient-warm border-0 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Generating Recipe...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Recipe
              </>
            )}
          </Button>
        </div>

        {/* Recipe Display */}
        {recipe && <RecipeDisplay recipe={recipe} />}
      </div>
    </div>
  );
};

export default Index;
