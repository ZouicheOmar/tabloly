/** @format */
import {tableStore} from "@/app/stores/tableStore"

import {TableCell} from "@/components/ui/table"

export default function Cell(props) {
  const {item, iitem, index, iindex} = props
  const rows = tableStore((state) => state.rows)
  const setCell = tableStore((state) => state.setCell)

  return (
    <TableCell className="p-0" key={iindex}>
      <input
        className="outline-none p-2 focus:bg-secondary transition-colors  w-full"
        type={typeof item[iitem]} //this seems sketchy, what about dates
        value={rows[index][iitem]}
        onChange={(e) =>
          setCell(index, iitem, e.target.value, typeof item[iitem])
        }
      />
    </TableCell>
  )
}
