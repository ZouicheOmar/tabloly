/** @format */
import {useEffect} from "react"
import {tableStore} from "../stores/tableStore"

export default function useTable(path: string) {
  const setCols = tableStore((state) => state.setCols)
  const setRows = tableStore((state) => state.setRows)
  const setPath = tableStore((state) => state.setPath)
  const setName = tableStore((state) => state.setName)

  return useEffect(() => {
    fetch(`/donnee/${path}`)
      .then(async (res) => {
        const json = await res.json()
        setPath(path)
        setName(JSON.parse(json.table).name)
        setCols(JSON.parse(json.table).columns)
        setRows(JSON.parse(json.table).rows)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
}
