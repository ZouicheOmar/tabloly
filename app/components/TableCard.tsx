/** @format */
"use client"

import {useRouter} from "next/navigation"
import {listStore} from "../stores/listStore"

import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {CheckCircledIcon, CircleIcon} from "@radix-ui/react-icons"

const displayTime = (birthtime) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  const time = new Date(birthtime)
  const date = time.getDate()
  const month = months[time.getMonth()]
  const year = time.getFullYear()
  const hours = time.getHours()
  let minutes = time.getMinutes()
  minutes = String(minutes)
  minutes.length === 1 && (minutes = "0" + minutes)
  return `${month} ${date}th ${year} at ${hours}:${minutes}`
}

export default function TableCard({card, className}) {
  const router = useRouter()
  const {name, path, description} = card
  const selected = listStore((state) => state.selected)
  const setSelected = listStore((state) => state.setSelected)
  const selectMode = listStore((state) => state.selectMode)

  const birthtime = displayTime(card.birthtime)
  const mtime = displayTime(card.mtime)

  const handlePointerDown = () => {
    if (!selectMode) {
      router.push(`/${path}`)
    } else {
      setSelected(card)
    }
  }

  return (
    // <Link href={`/${path}`}>
    <Card
      className={`flex flex-col justify-between select-none overflow-hidden w-full  hover:shadow-lg hover:-translate-y-[0.3rem] transition-all ${
        selected.findIndex((file) => file.path === path) !== -1 &&
        "bg-blue-50 border-blue-500/40"
      } `}
      onPointerDown={handlePointerDown}
    >
      <CardHeader className="p-3 space-y-4">
        <div className="w-full flex">
          <CardTitle className="text-sm font-medium w-full self-stretch">
            {name}
          </CardTitle>
          {selectMode && (
            <span className="max-w-fit">
              {selected.findIndex((file) => file.path === path) !== -1 ? (
                <CheckCircledIcon className="text-blue-500" />
              ) : (
                <CircleIcon />
              )}
            </span>
          )}
        </div>
        <CardDescription className="text-xs text-primary leading-tight">
          {description ? (
            description
          ) : (
            <span className="text-muted-foreground/45">
              {" "}
              no description provided{" "}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardFooter className=" p-3 flex text-muted-foreground/75 flex-col items-start text-xs ">
        <p className="leading-none">created : {birthtime}</p>
        <p className="leading-none">modified : {mtime}</p>
      </CardFooter>
    </Card>
    // </Link>
  )
}
