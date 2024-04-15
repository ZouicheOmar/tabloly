/** @format */
import {tableStore} from "@/app/stores/tableStore"
import {Button} from "@/components/ui/button"

export default function AddRow() {
  const addRow = tableStore((state) => state.addRow)
  const columns = tableStore((state) => state.columns)
  return (
    columns.length > 0 && (
      <Button variant="outline" onPointerDown={addRow}>
        + row
      </Button>
    )
  )
}
