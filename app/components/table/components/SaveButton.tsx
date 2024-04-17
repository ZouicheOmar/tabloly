/** @format */
import {useState} from "react"

import {Button} from "@/components/ui/button"
import {tableStore} from "@/app/stores/tableStore"
import {ReloadIcon} from "@radix-ui/react-icons"

export default function SaveButton() {
  const saveData = tableStore((state) => state.saveData)
  const [loading, setLoading] = useState(false)
  const handleSave = async () => {
    setLoading(true)
    saveData()
      .then((res) => setTimeout(() => setLoading(false), 300))
      .catch((err) => console.log("err"))
  }

  return (
    <Button variant="outline" onPointerDown={handleSave}>
      {loading ? <ReloadIcon className="animate-spin" /> : "save"}
    </Button>
  )
}
