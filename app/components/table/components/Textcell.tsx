/** @format */
"use client"
import {useEffect, useRef} from "react"
import {tableStore} from "@/app/stores/tableStore"

import {TableCell} from "@/components/ui/table"

export default function Textcell({rowProp, rowIndex}) {
  const rows = tableStore((state) => state.rows)
  const setCell = tableStore((state) => state.setCell)

  const ref = useRef(null)
  useEffect(() => {
    ref.current.innerText = rows[rowIndex][rowProp].trim()
  }, [rows])

  return (
    <>
      <TableCell
        className="min-w-[200px] w-fit max-w-[500px] outline-none text-wrap "
        contentEditable
        suppressContentEditableWarning
        ref={ref}
        onBlur={(e) => {
          setCell(rowIndex, rowProp, e.currentTarget.innerText, "string")
        }}
      />
    </>
  )
}
