/** @format */
import {tableStore} from "@/app/stores/tableStore"

import AddRow from "./AddRow"
import AddCol from "./AddCol"
import {Button} from "@/components/ui/button"

import TableSelectControls from "./TableSelectControls"
import SaveButton from "./SaveButton"

export default function TableControls() {
  const getState = tableStore((state) => state.getState)

  return (
    <div className="flex gap-2">
      <TableSelectControls />
      <AddRow />
      <AddCol />
      <Button variant="outline" onPointerDown={getState}>
        state
      </Button>
      <SaveButton />
    </div>
  )
}
