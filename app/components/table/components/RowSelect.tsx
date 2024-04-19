/** @format */
import {tableStore} from "@/app/stores/tableStore"

import {TableCell} from "@/components/ui/table"
import {Checkbox} from "@/components/ui/checkbox"

export default function RowSelect({row}) {
  const selectMode = tableStore((state) => state.selectMode)
  const selectRow = tableStore((state) => state.selectRow)
  const selectedRows = tableStore((state) => state.selectedRows)

  if (selectMode) {
    return (
      <TableCell role="checkbox">
        <Checkbox
          onCheckedChange={() => selectRow(row)}
          checked={
            selectedRows.findIndex(
              (selectedRow) => selectedRow.id === row.id
            ) !== -1
          }
        />
      </TableCell>
    )
  }
}
