/** @format */
import {tableStore} from "@/app/stores/tableStore"
import {Checkbox} from "@/components/ui/checkbox"

import {TableCell} from "@/components/ui/table"

export default function Cell(props) {
  const {item, iitem, index, iindex} = props
  const rows = tableStore((state) => state.rows)
  const columns = tableStore((state) => state.columns)
  const setCell = tableStore((state) => state.setCell)

  const getType = (iitem) => {
    const obj = columns.find((item) => item.name === iitem)
    return obj.type
  }
  const type = getType(iitem)

  return (
    <TableCell className="p-0">
      {type !== "checkbox" && (
        <input
          className="bg-inherit outline-none p-2 w-full  transition-colors"
          type={type}
          value={rows[index][iitem]}
          onChange={(e) => setCell(index, iitem, e.target.value, type)}
          checked={Boolean(item[iitem])}
          placeholder={type === "url" ? "https://" : `...`}
        />
      )}
      {type === "checkbox" && (
        <span className="flex justify-center">
          <Checkbox
            checked={Boolean(item[iitem])}
            value={rows[index][iitem]}
            onCheckedChange={(e) => setCell(index, iitem, e, type)}
          />
        </span>
      )}
    </TableCell>
  )
}
