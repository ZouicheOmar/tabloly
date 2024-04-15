/** @format */

"use client"
import {useEffect, useState} from "react"
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
        // <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <div className="w-full grid grid-cols-2  lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {list.map((item, index) => (
            <TableCard className="" card={item} key={index} />
          ))}
        </div>
      )}
    </>
  )
}

// async function getList() {
//   fetch("/tables")
//     .then(async (res) => {
//       const json = await res.json()
//       console.log("json.list", json.list)
//       console.log("json", json)
//       return JSON.parse(json.list)
//     })
//     .catch((err) => {
//       return ["no data"]
//     })
// }

// async function getList() {
//   const res = await fetch("http://localhost:3000/tables")
//   if (!res.ok) {
//     throw new Error("failed to fetc data")
//   }

//   const json = await res.json()
//   console.log("json.list", json.list)
//   console.log("json", json)
//   return JSON.parse(json.list)
// }

// export default async function List() {
//   const list = await getList()
//   console.log("list", list)

//   return (
//     <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
//       {list.map((item, index) => {
//         return <TableCard key={index} />
//       })}
//     </div>
//   )
// }
