/** @format */
"use client"

import useTable from "@/app/hooks/useTable"
import {tableStore} from "@/app/stores/tableStore"

import Cell from "./components/Cell"
import Breadcrumb from "./components/Breadcrumb"
import TableControls from "./components/TableControls"
import EmptyTableMessage from "./components/EmptyTableMessage"

import {Checkbox} from "@/components/ui/checkbox"
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Table({path}) {
  useTable(path)
  const columns = tableStore((state) => state.columns)
  const rows = tableStore((state) => state.rows)
  const selectMode = tableStore((state) => state.selectMode)
  const selectRow = tableStore((state) => state.selectRow)
  const selectedRows = tableStore((state) => state.selectedRows)
  const selectAllRows = tableStore((state) => state.selectAllRows)

  return (
    <>
      <div className="w-full py-2 flex justify-between items-center gap-2">
        <Breadcrumb />
        <TableControls />
      </div>
      {columns.length > 0 ? (
        <div className="rounded-md border overflow-auto ">
          <ShadcnTable className="min-w-[1000px]">
            <TableHeader>
              <TableRow>
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
                  <TableHead key={index}>{item.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, rowindex) => (
                <TableRow key={rowindex} className="divide-x-[1px]">
                  {selectMode && (
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
                  )}
                  {Object.keys(row).map(
                    (prop, pindex) =>
                      //if diffrent than id
                      //another way to assign each cell to the right columns
                      prop !== "id" && (
                        <Cell
                          row={row}
                          prop={prop}
                          rowindex={rowindex}
                          pindex={pindex}
                          key={pindex}
                        />
                      )
                  )}
                </TableRow>
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
