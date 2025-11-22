import { describe, it, expect, beforeAll } from "vitest";

describe("Chuck Norris API Integration", () => {
  describe("Random Joke API", () => {
    it("should fetch a random joke successfully", async () => {
      const response = await fetch(
        "https://api.chucknorris.io/jokes/random"
      );
      expect(response.ok).toBe(true);

      const data = await response.json();
      expect(data).toHaveProperty("value");
      expect(typeof data.value).toBe("string");
      expect(data.value.length).toBeGreaterThan(0);
    });

    it("should fetch a random joke from a specific category", async () => {
      const response = await fetch(
        "https://api.chucknorris.io/jokes/random?category=dev"
      );
      expect(response.ok).toBe(true);

      const data = await response.json();
      expect(data).toHaveProperty("value");
      expect(typeof data.value).toBe("string");
      expect(data.value.length).toBeGreaterThan(0);
    });
  });

  describe("Categories API", () => {
    it("should fetch all categories successfully", async () => {
      const response = await fetch(
        "https://api.chucknorris.io/jokes/categories"
      );
      expect(response.ok).toBe(true);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(typeof data[0]).toBe("string");
    });

    it("should return common categories", async () => {
      const response = await fetch(
        "https://api.chucknorris.io/jokes/categories"
      );
      const data = await response.json();

      const commonCategories = ["dev", "explicit", "fashion", "food"];
      const hasCommonCategories = commonCategories.some((cat) =>
        data.includes(cat)
      );
      expect(hasCommonCategories).toBe(true);
    });
  });

  describe("Search API", () => {
    it("should search jokes by category", async () => {
      const response = await fetch(
        "https://api.chucknorris.io/jokes/search?query=dev"
      );
      expect(response.ok).toBe(true);

      const data = await response.json();
      expect(data).toHaveProperty("result");
      expect(Array.isArray(data.result)).toBe(true);

      if (data.result.length > 0) {
        expect(data.result[0]).toHaveProperty("value");
        expect(typeof data.result[0].value).toBe("string");
      }
    });

    it("should handle empty search results gracefully", async () => {
      const response = await fetch(
        "https://api.chucknorris.io/jokes/search?query=nonexistentcategory12345"
      );
      expect(response.ok).toBe(true);

      const data = await response.json();
      expect(data).toHaveProperty("result");
      expect(Array.isArray(data.result)).toBe(true);
    });
  });

  describe("API Response Structure", () => {
    it("random joke should have required fields", async () => {
      const response = await fetch(
        "https://api.chucknorris.io/jokes/random"
      );
      const data = await response.json();

      expect(data).toHaveProperty("value");
      expect(data).toHaveProperty("url");
      expect(data).toHaveProperty("icon_url");
    });

    it("search results should have required fields", async () => {
      const response = await fetch(
        "https://api.chucknorris.io/jokes/search?query=dev"
      );
      const data = await response.json();

      if (data.result.length > 0) {
        const joke = data.result[0];
        expect(joke).toHaveProperty("value");
        expect(joke).toHaveProperty("url");
      }
    });
  });
});
