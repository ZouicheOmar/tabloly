/** @format */

import Table from "../components/table/Table"

export default function Page({params}) {
  const {table} = params
  return (
    <>
      <div className="w-full">
        <Table path={table} />
      </div>
    </>
  )
}
