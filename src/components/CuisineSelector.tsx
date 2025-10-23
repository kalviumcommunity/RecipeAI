import { cn } from "@/lib/utils";

interface CuisineSelectorProps {
  selected: string;
  onSelect: (cuisine: string) => void;
}

const cuisines = [
  "Indian",
  "Italian",
  "Mexican",
  "Chinese",
  "Japanese",
  "Thai",
  "Mediterranean",
  "American",
];

export const CuisineSelector = ({ selected, onSelect }: CuisineSelectorProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-foreground block">
        Select Cuisine Type
      </label>
      <div className="flex flex-wrap gap-2">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => onSelect(cuisine)}
            className={cn(
              "px-4 py-2 rounded-full font-medium transition-all",
              selected === cuisine
                ? "bg-gradient-fresh text-secondary-foreground shadow-md scale-105"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-105"
            )}
          >
            {cuisine}
          </button>
        ))}
      </div>
    </div>
  );
};
