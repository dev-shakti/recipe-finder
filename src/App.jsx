import { useEffect, useState } from "react";
import RecipeCard from "./components/RecipeCard";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";
import RecipeDetail from "./components/RecipeDetail";

export default function App() {
  const [searchText, setSearchText] = useState("chicken");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  // Fetch single meal detail
  async function fetchMealDetail(idMeal) {
    setDetailLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
      );
      const data = await res.json();
      console.log(data.meals[0]);

      setSelectedMeal(data.meals[0]);
    } catch (err) {
      alert("Failed to fetch meal details", err);
    } finally {
      setDetailLoading(false);
    }
  }

  // Fetch ingredient list once
  useEffect(() => {
    async function fetchIngredients() {
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
        );
        const data = await res.json();
        setIngredients(data.meals.map((item) => item.strIngredient));
      } catch (err) {
        console.error("Failed to fetch ingredients", err);
      }
    }
    fetchIngredients();
  }, []);

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
console.log(ingredients)
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-6">🍳 Recipe Finder</h1>

      {/* Search Bar */}
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        ingredients={ingredients}
      />

      {/* Error Message */}
      {error && (
        <p className="text-center text-red-500 font-medium mb-4">{error}</p>
      )}

      {/* Loading Indicator */}
      {loading && <Loader />}

      {/* Recipe Cards */}
      {!loading && !error && recipes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((meal) => (
            <RecipeCard
              meal={meal}
              key={meal.idMeal}
              onSelect={() => fetchMealDetail(meal.idMeal)}
            />
          ))}
        </div>
      )}

      {/* Modal for meal detail */}
      {selectedMeal && (
        <RecipeDetail
          meal={selectedMeal}
          loading={detailLoading}
          onClose={() => setSelectedMeal(null)}
        />
      )}
    </div>
  );
}
