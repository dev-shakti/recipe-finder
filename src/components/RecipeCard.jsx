export default function RecipeCard({meal,onSelect}) {
  return (
    <div
      key={meal.idMeal}
       onClick={onSelect}
      className="bg-white rounded-xl shadow p-4 hover:scale-105 transition cursor-pointer"
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
  );
}
