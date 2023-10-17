//@ts-ignore
export default function ExerciseCard({
  name,
  bodypart,
  category,
  onClick,
  isSelected,
}:any) {
  return (
    <div
      onClick={onClick}
      className={`${
        isSelected ? "bg-gray-400" : "hover:bg-gray-300 "
      } border border-gray-200 bg-gray-200 rounded-xl text-left cursor-pointer mt-2 p-4`}
    >
      <p className="font-bold">{name}</p>
      <p>Body part: {bodypart}</p>
      <p>Category: {category}</p>
    </div>
  )
}
