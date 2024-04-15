/** @format */
import {useState} from "react"
import {tableStore} from "@/app/stores/tableStore"

import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AddCol() {
  const addCol = tableStore((state) => state.addCol)
  const columns = tableStore((state) => state.columns)

  const [open, setOpen] = useState(false)
  const [colName, setColName] = useState("")
  const [dataType, setDataType] = useState("")

  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleSubmit = (e) => {
    addCol(colName, dataType)
    //add this col to all data
    //placeholder : no colName provided
    setOpen(false)
    setColName("")
    setDataType("")
    e.preventDefault()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`${
            columns.length === 0 &&
            !open &&
            "animate-bounce bg-green-700 text-green-200 border-green-200 hover:border-border"
          }`}
          onPointerDown={handleOpenDialog}
        >
          + col
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>Add a new column</DialogHeader>
          <div>
            <Label htmlFor="colName" className="pl-1">
              column name
            </Label>
            <Input
              id="colName"
              type="text"
              placeholder="todo"
              required
              value={colName}
              onChange={(e) => setColName(e.target.value)}
            />
          </div>

          <div>
            <Select required onValueChange={(e) => setDataType(e)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Select a data type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="string">text</SelectItem>
                <SelectItem value="number">number</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="submit">create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
