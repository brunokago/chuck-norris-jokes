import RandomJoke from "@/components/RandomJoke";
import JokeSearch from "@/components/JokeSearch";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12">
          {/* Random Joke Section */}
          <section>
            <RandomJoke />
          </section>

          {/* Divider */}
          <div className="border-t-2 border-gray-200"></div>

          {/* Search by Category Section */}
          <section>
            <JokeSearch />
          </section>
        </div>
      </div>
    </div>
  );
}
