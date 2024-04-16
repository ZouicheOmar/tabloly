/** @format */
import List from "./components/List"
import CreateTable from "./components/CreateTable"
import SelectFromList from "./components/SelectFromList"
import InputTypes from "./components/inputtypes"

export default function Home() {
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="p-2 w-full flex justify-between items-center ">
          <span className="text-lg font-medium">TABLOLY</span>
          <div className="flex gap-2 items-center">
            <SelectFromList />
            <CreateTable />
          </div>
        </div>
        <List />
        {/* <InputTypes /> */}
      </div>
    </>
  )
}
