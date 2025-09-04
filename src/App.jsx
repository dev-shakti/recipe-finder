import { useEffect, useState } from "react";
import RecipeCard from "./components/RecipeCard";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";

export default function App() {
  const [searchText, setSearchText] = useState("chicken"); 
  const [recipes, setRecipes] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch recipes from API
    async function fetchRecipes() {
      if (!searchText.trim()) {
        setRecipes([]); // clear recipes when input is empty
        return;
      }
      setLoading(true);
      setError(""); // clear old error

      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`
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
       
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, [searchText]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-6">🍳 Recipe Finder</h1>

      {/* Search Bar */}
      <SearchBar searchText={searchText} setSearchText={setSearchText} />

      {/* Error Message */}
      {error && (
        <p className="text-center text-red-500 font-medium mb-4">{error}</p>
      )}

      {/* Loading Indicator */}
      {loading && <Loader />}

      {/* Recipe Cards */}
      {!loading && !error && recipes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((meal) => (
            <RecipeCard meal={meal} key={meal.idMeal} />
          ))}
        </div>
      )}
    </div>
  );
}
