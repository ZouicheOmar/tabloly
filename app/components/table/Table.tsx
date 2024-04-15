/** @format */
"use client"

import useTable from "@/app/hooks/useTable"
import {Suspense} from "react"
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
import {CheckboxIcon} from "@radix-ui/react-icons"
import TableSkeleton from "./components/TableSkeleton"

export default function Table({path}) {
  useTable(path)
  const columns = tableStore((state) => state.columns)
  const rows = tableStore((state) => state.rows)
  const selectMode = tableStore((state) => state.selectMode)
  const selectRow = tableStore((state) => state.selectRow)
  const selectedRows = tableStore((state) => state.selectedRows)
  const selectAllRows = tableStore((state) => state.selectAllRows)
  const deleteSelectedRows = tableStore((state) => state.deleteSelectedRows)

  return (
    <>
      <div className="w-full py-2 flex justify-between items-center gap-2">
        <Breadcrumb />
        <TableControls />
      </div>
      {columns.length > 0 ? (
        <div className="rounded-md border overflow-hidden">
          <ShadcnTable>
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
              {rows.map((item, index) => (
                <TableRow key={index}>
                  {selectMode && (
                    <TableCell role="checkbox">
                      <Checkbox
                        onCheckedChange={() => selectRow(item)}
                        checked={
                          selectedRows.findIndex(
                            (selectedRow) => selectedRow.id === item.id
                          ) !== -1
                        }
                      />
                    </TableCell>
                  )}
                  {Object.keys(item).map(
                    (iitem, iindex) =>
                      //if diffrent than id
                      iitem !== "id" && (
                        <Cell
                          item={item}
                          iitem={iitem}
                          index={index}
                          iindex={iindex}
                          key={iindex}
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
