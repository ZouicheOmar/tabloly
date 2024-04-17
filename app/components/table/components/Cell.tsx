/** @format */
import {tableStore} from "@/app/stores/tableStore"
import {Checkbox} from "@/components/ui/checkbox"

import {TableCell} from "@/components/ui/table"

export default function Cell(props) {
  const {row, prop, rowindex, pindex} = props
  const rows = tableStore((state) => state.rows)
  const columns = tableStore((state) => state.columns)
  const setCell = tableStore((state) => state.setCell)

  const getType = (iitem) => {
    const obj = columns.find((item) => item.name === iitem)
    return obj.type
  }
  const type = getType(prop)

  return (
    <TableCell className="p-0">
      {type !== "checkbox" && (
        <input
          className="bg-inherit outline-none p-2 w-full  transition-colors"
          type={type}
          value={rows[rowindex][prop]}
          onChange={(e) => setCell(rowindex, prop, e.target.value, type)}
          checked={Boolean(row[prop])}
          placeholder={type === "url" ? "https://" : `...`}
        />
      )}
      {type === "checkbox" && (
        <span className="flex justify-center">
          <Checkbox
            checked={Boolean(row[prop])}
            value={rows[rowindex][prop]}
            onCheckedChange={(e) => setCell(rowindex, prop, e, type)}
          />
        </span>
      )}
    </TableCell>
  )
}
