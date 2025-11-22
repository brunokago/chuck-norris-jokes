import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import JokeCard from "./JokeCard";
import { Loader2, RotateCw } from "lucide-react";

interface Joke {
  value: string;
  category?: string;
}

export default function RandomJoke() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      if (!response.ok) throw new Error("Failed to fetch joke");
      const data = await response.json();
      setJoke(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomJoke();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Random Joke</h2>
        <Button
          onClick={fetchRandomJoke}
          disabled={loading}
          className="gap-2"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RotateCw className="h-4 w-4" />
          )}
          Get New Joke
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {loading && !joke && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      )}

      {joke && <JokeCard joke={joke.value} />}
    </div>
  );
}
