//@ts-nocheck
import ModalTemplate from "@/components/ModalTemplate"
import { Button } from "@/components/ui/button"

export default function ExportDataModal({ onClose }) {
  return (
    <ModalTemplate onClose={onClose}>
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
    </ModalTemplate>
  )
}
