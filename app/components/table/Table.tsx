/** @format */
"use client"

import useTable from "@/app/hooks/useTable"
import {tableStore} from "@/app/stores/tableStore"

import Breadcrumb from "./components/Breadcrumb"
import TableControls from "./components/TableControls"
import EmptyTableMessage from "./components/EmptyTableMessage"

import Row from "./components/Row"
import {Checkbox} from "@/components/ui/checkbox"
import {
  Table as ShadcnTable,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Table({path}) {
  useTable(path)
  const columns = tableStore((state) => state.columns)
  const rows = tableStore((state) => state.rows)
  const selectMode = tableStore((state) => state.selectMode)
  const selectedRows = tableStore((state) => state.selectedRows)
  const selectAllRows = tableStore((state) => state.selectAllRows)

  return (
    <>
      <div className="w-full py-2 flex justify-between items-center gap-2">
        <Breadcrumb />
        <TableControls />
      </div>
      {columns.length > 0 ? (
        <div className="rounded-md border w-fit overflow-auto ">
          <ShadcnTable className="">
            <TableHeader>
              <TableRow className="divide-x-[1px]">
                {selectMode && (
                  <TableHead role="checkbox">
                    <Checkbox
                      onCheckedChange={selectAllRows}
                      checked={
                        rows.length !== 0 && selectedRows.length === rows.length
                      }
                    />
                  </TableHead>
                )}
                {columns?.map((item, index) => (
                  <TableHead
                    key={index}
                    className={`${
                      item.type === "number" ? "max-w-[100px]" : "min-w-[200px]"
                    }`}
                  >
                    {item.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, index) => (
                <Row row={row} index={index} key={index} />
              ))}
            </TableBody>
          </ShadcnTable>
        </div>
      ) : (
        <EmptyTableMessage />
      )}
    </>
  )
}
