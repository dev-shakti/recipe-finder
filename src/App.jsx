import { useState } from "react";

export default function App() {
  const [ingredient, setIngredient] = useState(""); // user input
  const [recipes, setRecipes] = useState([]); // fetched recipes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch recipes from API
  async function fetchRecipes() {
    if (!ingredient) return;
    setLoading(true);
    setError(""); // clear old error

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await res.json();

      if (!data.meals) {
        setRecipes([]);
        setError("No recipes found for that ingredient.");
      } else {
        setRecipes(data.meals);
      }
      console.log(data.meals);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-6">🍳 Recipe Finder</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Enter an ingredient (e.g. chicken)"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          className="border rounded-l-lg p-2 w-64"
        />
        <button
          onClick={fetchRecipes}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-center text-red-500 font-medium mb-4">{error}</p>
      )}

      {/* Loading Indicator */}
      {loading && (
        <p className="text-center text-gray-600 mb-4">Loading recipes...</p>
      )}

      {/* Recipe Cards */}
      {!loading && !error && recipes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white rounded-xl shadow p-4 hover:scale-105 transition"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="rounded-lg mb-3"
              />
              <h2 className="text-lg font-semibold mb-2">{meal.strMeal}</h2>
              <a
                href={`https://www.themealdb.com/meal/${meal.idMeal}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Recipe →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
