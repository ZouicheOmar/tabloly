/** @format */
import {tableStore} from "@/app/stores/tableStore"
import {Checkbox} from "@/components/ui/checkbox"

import {TableCell} from "@/components/ui/table"
import Textcell from "./Textcell"

export default function Cell(props) {
  const {row, rowProp, rowIndex} = props
  const rows = tableStore((state) => state.rows)
  const columns = tableStore((state) => state.columns)
  const setCell = tableStore((state) => state.setCell)

  const getType = (iitem) => {
    const obj = columns.find((item) => item.name === iitem)
    return obj.type
  }
  const type = getType(rowProp)
  console.log(type)

  switch (type) {
    case "text":
      return <Textcell rowProp={rowProp} rowIndex={rowIndex} />
    case "checkbox":
      return (
        <TableCell role="checkbox p-0">
          <Checkbox
            checked={Boolean(row[rowProp])}
            value={rows[rowIndex][rowProp]}
            onCheckedChange={(e) => setCell(rowIndex, rowProp, e, type)}
          />
        </TableCell>
      )
    case "string":
    case "url":
    case "number":
    case "date":
      return (
        <TableCell className="align-top p-0">
          <input
            className={`bg-inherit outline-none p-2 ${
              type === "number" ? " max-w-[120px]" : "min-w-fit"
            } transition-colors`}
            type={type}
            value={rows[rowIndex][rowProp]}
            onChange={(e) => setCell(rowIndex, rowProp, e.target.value, type)}
            checked={Boolean(row[rowProp])}
            placeholder={type === "url" ? "https://" : `...`}
          />
        </TableCell>
      )
  }
}
