/** @format */

import {cp} from "fs"
import {readFileSync} from "fs"
import {NextResponse} from "next/server"
import fs from "fs"

export async function GET(request: Request) {
  let data = readFileSync("app/donnee/tables/tableA.json", {
    encoding: "utf-8",
  })
  console.log(data)
  return NextResponse.json(
    {
      message: "ceci est un message du backend, premiers pas",
      table: data,
    },
    {status: 200}
  )
}
