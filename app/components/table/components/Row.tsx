/** @format */

import {TableRow} from "@/components/ui/table"
import RowSelect from "./RowSelect"
import Cell from "./Cell"

export default function Row({row, index}) {
  return (
    <>
      <TableRow className="divide-x-[1px]">
        <RowSelect row={row} />
        {Object.keys(row).map(
          (rowProp, k_index) =>
            rowProp !== "id" && (
              <Cell
                row={row}
                rowProp={rowProp}
                rowIndex={index}
                key={k_index}
              />
            )
        )}
      </TableRow>
    </>
  )
}
