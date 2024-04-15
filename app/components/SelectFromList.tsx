/** @format */
"use client"
import {TrashIcon} from "@radix-ui/react-icons"
import {listStore} from "../stores/listStore"
import {Button} from "@/components/ui/button"
import {staticGenerationAsyncStorage} from "next/dist/client/components/static-generation-async-storage.external"

export default function SelectFromList() {
  const selectMode = listStore((state) => state.selectMode)
  const setSelectMode = listStore((state) => state.setSelectMode)
  const selected = listStore((state) => state.selected)
  const deleteSelected = listStore((state) => state.deleteSelected)
  const selectAll = listStore((state) => state.selectAll)
  return (
    <>
      {selected.length > 0 && (
        <Button variant="destructive" onPointerDown={deleteSelected}>
          <TrashIcon />
        </Button>
      )}
      {selectMode && (
        <Button variant="outline" onPointerDown={selectAll}>
          all
        </Button>
      )}
      <Button
        variant="outline"
        className={`${
          selectMode &&
          "text-blue-500 border-blue-500/40 bg-blue-50 hover:text-blue-600"
        }`}
        onPointerDown={setSelectMode}
      >
        select
      </Button>
    </>
  )
}
