/** @format */

import {NextResponse} from "next/server"
import fs from "fs"

export async function GET(request: Request, {params}) {
  let data = fs.readFileSync(`app/donnee/tables/${params.tableau}`, {
    encoding: "utf-8",
  })
  return NextResponse.json(
    {
      message: "ceci est un message du backend, premiers pas",
      table: data,
    },
    {status: 200}
  )
}

export async function POST(request: Request, {params}) {
  const json = await request.json()
  const path = `app/donnee/tables/${json.path}`

  const oldData = JSON.parse(
    fs.readFileSync(path, {
      encoding: "utf-8",
    })
  )

  const newData = {...oldData, ...{columns: json.columns, rows: json.rows}}

  fs.writeFileSync(path, JSON.stringify(newData), (err) => {
    console.log(err)
  })

  return NextResponse.json(
    {
      message: "file saved",
    },
    {status: 200}
  )
}
