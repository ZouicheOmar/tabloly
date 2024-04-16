/** @format */
"use client"
import {Button} from "@/components/ui/button"
import {useState} from "react"

export default function InputTypes() {
  const [active, setActive] = useState(false)
  const [url, setUrl] = useState("")
  const [atag, setAtag] = useState(false)
  const [date, setDate] = useState(`2024-04-12`)
  return (
    <div className="rounded border flex flex-col gap-4 p-2">
      <div className="space-x-2">
        {atag ? (
          <a href={url} className="rounded border p-1 w-fit" target="blank">
            {url}
          </a>
        ) : (
          <input
            className="rounded border p-1 w-fit"
            type="url"
            disabled={active}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            size={url.length}
          />
        )}
        <Button onPointerDown={() => setAtag(!atag)} className="w-fit">
          on/off
        </Button>
      </div>
      <div className="space-x-2">
        <input
          className="rounded border p-1 w-fit"
          type="date"
          value={date}
          //   defaultValue="2024-05-17"
          onChange={(e) => setDate(e.target.value)}
        />
        <Button onPointerDown={() => console.log(date)} className="w-fit">
          date obj
        </Button>
      </div>
      <div>
        <input type="checkbox" />
      </div>
    </div>
  )
}
