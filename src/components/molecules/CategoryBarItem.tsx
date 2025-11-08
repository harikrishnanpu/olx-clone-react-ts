



export const CategoryBarItem = ({category}:{category: string}) => {
  return (
    <div className="py-2 cursor-pointer hover:text-blue-600">
        <p className="text-sm">{category}</p>
    </div>
  )
}
