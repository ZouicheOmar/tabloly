/** @format */

"use client"

import {useRouter} from "next/navigation"
import {useState} from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"

export default function CreateTable() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")

  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleSubmit = async (e) => {
    const path = name.replaceAll(" ", "")

    const data = JSON.stringify({
      path: path,
      name: name,
      desc: desc,
    })

    fetch("/tables", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then(async (res) => {
        const json = await res.json()
        router.push(`/${path}.json`)
        setName("")
        setDesc("")
      })
      .catch((err) => {
        console.log(err)
      })

    setOpen(false)
    //refetch list
    e.preventDefault()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onPointerDown={handleOpenDialog}>
          + table
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>Create a new table</DialogHeader>
          <div className="space-y-1">
            <Label htmlFor="tableName" className="pl-1">
              Table name
            </Label>
            <Input
              id="tableName"
              type="text"
              placeholder="TODOs"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="desc">Your Message</Label>
            <Textarea
              placeholder="Type the table's description here"
              id="desc"
              className="resize-none"
              maxLength={113}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="submit">create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
