import { useEffect, useState } from "react";
import RecipeCard from "./components/RecipeCard";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";
import RecipeDetail from "./components/RecipeDetail";
import Header from "./components/Header";

export default function App() {
  const [searchText, setSearchText] = useState("chicken");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [filterType, setFilterType] = useState("i");

  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);

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

  // Fetch ingredient,category,area list once
  useEffect(() => {
    async function fetchLists() {
      try {
        const [ingRes, catRes, areaRes] = await Promise.all([
          fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list"),
          fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list"),
          fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list"),
        ]);

        const [ingData, catData, areaData] = await Promise.all([
          ingRes.json(),
          catRes.json(),
          areaRes.json(),
        ]);

        setIngredients(ingData.meals.map((item) => item.strIngredient));
        setCategories(catData.meals.map((item) => item.strCategory));
        setAreas(areaData.meals.map((item) => item.strArea));
      } catch (err) {
        console.error("Failed to fetch filter lists", err);
      }
    }
    fetchLists();
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
          `https://www.themealdb.com/api/json/v1/1/filter.php?${filterType}=${searchText}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await res.json();

        if (!data.meals) {
          setRecipes([]);
          setError("No recipes found for your search.");
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
  }, [searchText, filterType]);

  const currentOptions =
    filterType === "i" ? ingredients : filterType === "c" ? categories : areas;

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header with Search */}
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        options={currentOptions}
      />

      {/* Error Message */}
      {error && (
        <p className="text-center text-red-500 font-medium mb-4">{error}</p>
      )}

      {/* Loading Indicator */}
      {loading && <Loader />}

      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Filter Type Dropdown */}
        <div className="flex justify-end mb-6 ">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="i">Ingredient</option>
            <option value="c">Category</option>
            <option value="a">Area (Cuisine)</option>
          </select>
        </div>
        {searchText && recipes.length > 0 && (
          <h1 className="text-center lg:text-left font-bold mb-4 text-2xl lg:text-3xl">
            All Recipes for Search{" "}
            <span className="text-blue-500">{searchText}:</span>
          </h1>
        )}

        {/* Recipe Cards */}
        {!loading && !error && recipes.length && (
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.map((meal) => (
              <RecipeCard
                meal={meal}
                key={meal.idMeal}
                onSelect={() => fetchMealDetail(meal.idMeal)}
              />
            ))}
          </div>
        )}
      </div>

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
