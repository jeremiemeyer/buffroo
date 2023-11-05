//@ts-nocheck
import useTemplateData from "@/hooks/useTemplateData"
import useToast from "@/hooks/useToast"

export default function TemplateExercisesListExerciseCard({
  onClick,
  isSelected,
  exercise,
}) {
  const { addExercise } = useTemplateData()

  // formats category and bodypart fields correctly for the frontend
  function formatString(category) {
    const words = category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    return words.join(" ")
  }

  const { bodypart, category, name, _id } = exercise
  const { exerciseAddedToTemplate } = useToast()

  function handleAddExercise(exercise) {
    addExercise(exercise)
    exerciseAddedToTemplate()
  }

  return (
    <div
      onClick={onClick}
      className={`${
        isSelected ? "bg-blue-100 border-blue-300" : "hover:bg-sky-50 hover:border-blue-200"
      } border border-gray-200 bg-white rounded-xl text-left cursor-pointer mt-2 w-[calc(100%-40px)] mx-auto p-4`}
    >
      <div className="flex flex-row items-center">
        <div className="mr-8 text-4xl">{name.charAt(0)}</div>
        <div className="grow">
          <p className="font-semibold text-xl">{name}</p>
          <p>
            <span className="text-gray-500">Body part:</span>{" "}
            {formatString(bodypart)}
          </p>
          <p>
            <span className="text-gray-500">Category:</span>{" "}
            {formatString(category)}
          </p>
        </div>
        <div>
          <div onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => handleAddExercise(exercise)}
              className="rounded-full bg-sky-200 bg-opacity-40 hover:bg-sky-300 hover:bg-opacity-40 h-8 w-8 text-sky-500 text-2xl font-semibold"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}