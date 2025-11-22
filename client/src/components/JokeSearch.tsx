import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import JokeCard from "./JokeCard";
import CategorySelector from "./CategorySelector";
import { Loader2, Shuffle } from "lucide-react";

interface Joke {
  value: string;
  category?: string;
}

export default function JokeSearch() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const searchJokes = async () => {
    if (!selectedCategory) {
      setError("Please select a category");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.chucknorris.io/jokes/search?query=${selectedCategory}`
      );
      if (!response.ok) throw new Error("Failed to fetch jokes");
      const data = await response.json();
      setJokes(data.result || []);
      setSearched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setJokes([]);
    } finally {
      setLoading(false);
    }
  };

  const getRandomJokeFromCategory = async () => {
    if (!selectedCategory) {
      setError("Please select a category");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.chucknorris.io/jokes/random?category=${selectedCategory}`
      );
      if (!response.ok) throw new Error("Failed to fetch joke");
      const data = await response.json();
      setJokes([data]);
      setSearched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setJokes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Search by Category
        </h2>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select a Category
              </label>
              <CategorySelector
                onCategoryChange={setSelectedCategory}
                disabled={loading}
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={searchJokes}
                disabled={loading || !selectedCategory}
                className="flex-1"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                View All Jokes
              </Button>
              <Button
                onClick={getRandomJokeFromCategory}
                disabled={loading || !selectedCategory}
                variant="outline"
                className="flex-1 gap-2"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Shuffle className="h-4 w-4" />
                )}
                Random from Category
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      )}

      {searched && jokes.length === 0 && !loading && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
          No jokes found for this category.
        </div>
      )}

      {jokes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {jokes.length} Joke{jokes.length !== 1 ? "s" : ""} Found
          </h3>
          <div className="grid gap-4">
            {jokes.map((joke, index) => (
              <JokeCard
                key={index}
                joke={joke.value}
                category={selectedCategory}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
