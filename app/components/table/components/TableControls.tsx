/** @format */
import {tableStore} from "@/app/stores/tableStore"

import AddRow from "./AddRow"
import AddCol from "./AddCol"
import {Button} from "@/components/ui/button"

import TableSelectControls from "./TableSelectControls"
import SaveButton from "./SaveButton"

const StateButton = () => {
  const getState = tableStore((state) => state.getState)

  return (
    <Button variant="outline" onPointerDown={getState}>
      state
    </Button>
  )
}

export default function TableControls() {
  return (
    <div className="flex gap-2">
      <TableSelectControls />
      <AddRow />
      <AddCol />
      {/* <StateButton /> */}
      <SaveButton />
    </div>
  )
}
