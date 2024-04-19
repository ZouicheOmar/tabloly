/** @format */

"use client"
import {useEffect} from "react"
import {listStore} from "../stores/listStore"

import TableCard from "./TableCard"

export default function List() {
  const list = listStore((state) => state.list)
  const setList = listStore((state) => state.setList)
  //c'est quoi localhost:3000 ???
  useEffect(() => {
    fetch("http://localhost:3000/tables")
      .then(async (res) => {
        const json = await res.json()
        const newList = JSON.parse(json.list)
        setList(newList)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      {list.length === 0 && (
        <p className="font-medium text-muted-foreground text-lg mt-2 p-2">
          There are no tables yet, start by creating one
        </p>
      )}
      {list.length > 0 && (
        <div className="w-full grid grid-cols-2  lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {list.map((item, index) => (
            <TableCard className="" card={item} key={index} />
          ))}
        </div>
      )}
    </>
  )
}
