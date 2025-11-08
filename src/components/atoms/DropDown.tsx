import { ChevronDown, } from "lucide-react"


export const DropDown = ({labels, open}: {labels: Array<string>, open: boolean}) => {
  return (
    <>
    <div className="flex px-4 items-center w-full cursor-pointer">
        <p className="text-md">{labels[0]}</p>
        <ChevronDown className={`ml-auto w-7 h-8 transition-all ${open && 'rotate-180'}`} />
    </div>
    </>
  )
}
