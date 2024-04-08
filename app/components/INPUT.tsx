/** @format */

"use client"
import {useState} from "react"

export default function INPUT() {
  const [value, setValue] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault()

    fetch("/donnee")
      .then(async (res) => {
        const data = await res.json()
        console.log(JSON.parse(data.table))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <p>some input here</p>
      <div className="mt-1 w-full flex flex-col gap-2 ">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            name="donnée"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="bg-inherit px-2 py-1 border rounded"
          />
          <button
            type="submit"
            className="border rounded px-2 hover:bg-neutral-800 transition-colors "
          >
            add
          </button>
        </form>
      </div>
    </>
  )
}
