//@ts-nocheck
export default function ExerciseCard({
  name,
  bodypart,
  category,
  onClickExerciseCard,
  isSelected,
  exerciseId,
}) {
  return (
    <div
      onClick={() => onClickExerciseCard(exerciseId)}
      className={`${
        isSelected ? "bg-gray-400" : "hover:bg-gray-300 "
      } border border-gray-200 bg-gray-200 rounded-2xl text-left cursor-pointer mt-2 mx-auto p-4 flex flex-row items-center`}
    >
      <div className="text-4xl mr-8">{name.charAt(0)}</div>

      <div className="flex-col">
        <p className="font-bold">{name}</p>
        <p>
          <span className="text-gray-500">Body part:</span> {bodypart}
        </p>
        <p>
          <span className="text-gray-500">Category:</span> {category}
        </p>
      </div>
    </div>
  )
}
