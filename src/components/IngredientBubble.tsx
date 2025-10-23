import { X } from "lucide-react";

interface IngredientBubbleProps {
  ingredient: string;
  onRemove: () => void;
}

export const IngredientBubble = ({ ingredient, onRemove }: IngredientBubbleProps) => {
  return (
    <div className="inline-flex items-center gap-2 bg-gradient-warm text-primary-foreground px-4 py-2 rounded-full shadow-ingredient animate-pop-in group hover:shadow-lg transition-all">
      <span className="font-medium">{ingredient}</span>
      <button
        onClick={onRemove}
        className="hover:bg-white/20 rounded-full p-1 transition-colors"
        aria-label={`Remove ${ingredient}`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
