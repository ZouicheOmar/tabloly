/** @format */
import Link from "next/link"
import {tableStore} from "@/app/stores/tableStore"

export default function Breadcrumb() {
  const name = tableStore((state) => state.name)
  return (
    <div>
      <Link href="/">
        <span className="text-lg font-medium"> ~ / </span>
      </Link>
      <span className="text-lg font-medium">{name}</span>
    </div>
  )
}
