/** @format */

import {NextResponse} from "next/server"
import fs from "fs"

export async function POST(req: Request) {
  const data = await req.json()
  const files = data.files
  files.map((file) => {
    fs.rmSync(`app/donnee/tables/${file.path}`)
  })
  return NextResponse.json(
    {
      message: "files deleted",
    },
    {status: 200}
  )
}
