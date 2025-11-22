import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface JokeCardProps {
  joke: string;
  category?: string;
}

export default function JokeCard({ joke, category }: JokeCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <Lightbulb className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="text-gray-800 leading-relaxed">{joke}</p>
            {category && (
              <p className="text-xs text-blue-600 mt-3 font-semibold uppercase">
                Category: {category}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
