//@ts-nocheck

export default function WorkoutExercisesListExerciseCard({
  name,
  bodypart,
  category,
  onClick,
  isSelected,
}) {
  // formats category and bodypart fields correctly for the frontend
  function formatString(category) {
    const words = category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    return words.join(" ")
  }
  return (
    <div
      onClick={onClick}
      className={`${
        isSelected ? "bg-gray-400" : "hover:bg-gray-300 "
      } border border-gray-200 bg-gray-200 rounded-xl text-left cursor-pointer mt-2 w-[calc(100%-40px)] mx-auto p-4`}
    >
      <div className="flex flex-row items-center">
        <div className="mr-8 text-4xl">{name.charAt(0)}</div>
        <div>
          <p className="font-light text-xl">{name}</p>
          <p>
            <span className="text-gray-500">Body part:</span> {formatString(bodypart)}
          </p>
          <p>
            <span className="text-gray-500">Category:</span> {formatString(category)}
          </p>
        </div>
      </div>
    </div>
  )
}
