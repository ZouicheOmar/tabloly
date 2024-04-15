/** @format */

import Table from "../components/table/Table"

export default function Page({params}) {
  const {table} = params
  console.log("params", params)
  return (
    <>
      <div className="w-full">
        <Table path={table} />
      </div>
    </>
  )
}
