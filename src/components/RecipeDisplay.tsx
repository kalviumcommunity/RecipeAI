import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface RecipeDisplayProps {
  recipe: string;
}

export const RecipeDisplay = ({ recipe }: RecipeDisplayProps) => {
  return (
    <Card className="shadow-card border-2 border-border animate-fade-in">
      <CardHeader className="bg-gradient-warm text-white">
        <div className="flex items-center gap-2">
          <ChefHat className="w-6 h-6" />
          <CardTitle className="text-2xl">Your Custom Recipe</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="prose prose-sm max-w-none text-foreground">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 text-foreground">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl font-semibold mb-3 mt-6 text-foreground">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 mt-4 text-foreground">{children}</h3>,
              p: ({ children }) => <p className="mb-3 leading-relaxed text-foreground">{children}</p>,
              strong: ({ children }) => <strong className="font-bold text-primary">{children}</strong>,
              ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
              li: ({ children }) => <li className="ml-4 text-foreground">{children}</li>,
            }}
          >
            {recipe}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
};
