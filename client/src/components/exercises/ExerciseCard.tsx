//@ts-nocheck
export default function ExerciseCard({
  name,
  bodypart,
  category,
  onClick,
  isSelected,
}) {
  return (
    <div
      onClick={onClick}
      className={`${
        isSelected ? "bg-gray-400" : "hover:bg-gray-300 "
      } border border-gray-200 bg-gray-200 rounded-xl text-left cursor-pointer mt-2 w-[calc(100%-40px)] mx-auto p-[20px]`}
    >
      <div className="flex flex-row items-center">
        <div className="mr-8 text-4xl">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-bold">{name}</p>
          <p><span className="text-gray-500">Body part:</span> {bodypart}</p>
          <p><span className="text-gray-500">Category:</span> {category}</p>
        </div>
      </div>
    </div>
  )
}
