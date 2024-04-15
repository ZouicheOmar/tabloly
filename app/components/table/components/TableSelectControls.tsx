/** @format */

import {tableStore} from "@/app/stores/tableStore"

import {Button} from "@/components/ui/button"
import {TrashIcon} from "@radix-ui/react-icons"

export default function TableSelectControls() {
  const rows = tableStore((state) => state.rows)
  const setSelectMode = tableStore((state) => state.setSelectMode)
  const selectMode = tableStore((state) => state.selectMode)
  const selectedRows = tableStore((state) => state.selectedRows)
  const deleteSelectedRows = tableStore((state) => state.deleteSelectedRows)

  return (
    <>
      {selectMode && selectedRows.length > 0 && (
        <Button variant="destructive" onPointerDown={deleteSelectedRows}>
          <TrashIcon />
        </Button>
      )}
      {rows.length > 0 && (
        <Button
          variant="outline"
          className={`${
            selectMode &&
            "text-blue-500 border-blue-500/40 bg-blue-50 hover:text-blue-600"
          }`}
          onPointerDown={setSelectMode}
        >
          select
        </Button>
      )}
    </>
  )
}
