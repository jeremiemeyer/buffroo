//@ts-nocheck
import { Button } from "@/components/ui/button"

export default function ExportDataModal({ onClose }) {
  return (
    <div
      onClick={onClose}
      className="fixed z-[700] inset-0 bg-slate-700/75 bg-blur flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-[900] relative bg-gray-50 text-slate-900  px-6 pt-6 pb-6 rounded-2xl border border-slate-600 w-full md:w-[600px]"
      >
        <div className="h-[5%] flex flex-col justify-between items-center">
          <div className="justify-between w-full grid grid-cols-3 items-center text-center pb-6">
            <Button className="w-2" onClick={onClose} variant="destructive">
              X
            </Button>
            <h1 className="text-2xl">Export Data?</h1>
            <div></div>
          </div>

          <p className="pb-6">Do you wish to receive your data by e-mail?</p>

          <div className="grid grid-cols-2 gap-2">
            <Button>Send data</Button>
            <Button onClick={onClose} variant="destructive">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
