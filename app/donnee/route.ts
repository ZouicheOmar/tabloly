/** @format */

import {readFileSync} from "fs"
import {NextResponse} from "next/server"
import fs from "fs"

export async function GET(request: Request) {
  let data = readFileSync("app/donnee/tables/tableA.json", {
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

export async function POST(request: Request) {
  const json = await request.json()
  fs.writeFileSync(
    "app/donnee/tables/tableA.json",
    JSON.stringify(json),
    (err) => {
      console.log(err)

      //what's this ??
      // return NextResponse.json(
      //   {
      //     message: "problem saving data",
      //   },
      //   {status: 400}
      // )
    }
  )
  return NextResponse.json(
    {
      message: "bien recu",
    },
    {status: 200}
  )
}
