export default function RecipeDetail({ meal, loading, onClose }) {
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-xl shadow">
          <p>Loading details...</p>
        </div>
      </div>
    );
  }

  if (!meal) return null;

  // Build ingredients + measures list
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-500 text-white rounded-full px-3 py-1 hover:bg-red-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-2">{meal.strMeal}</h2>
        <p className="text-gray-600 mb-1">
          <strong>Category:</strong> {meal.strCategory}
        </p>
        <p className="text-gray-600 mb-3">
          <strong>Area:</strong> {meal.strArea}
        </p>

        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="rounded-lg mb-4"
        />

        <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc list-inside mb-4">
          {ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mb-2">Instructions</h3>
        <p className="text-gray-700 whitespace-pre-line mb-4">
          {meal.strInstructions}
        </p>

        {meal.strYoutube && (
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            📺 Watch on YouTube
          </a>
        )}
      </div>
    </div>
  );
}
