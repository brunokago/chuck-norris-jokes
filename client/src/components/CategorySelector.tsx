import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface CategorySelectorProps {
  onCategoryChange: (category: string) => void;
  disabled?: boolean;
}

export default function CategorySelector({
  onCategoryChange,
  disabled = false,
}: CategorySelectorProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://api.chucknorris.io/jokes/categories"
        );
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm text-gray-600">Loading categories...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-600">
        Error loading categories: {error}
      </div>
    );
  }

  return (
    <Select onValueChange={onCategoryChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
