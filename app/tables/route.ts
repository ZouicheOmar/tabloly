/** @format */

import {NextResponse} from "next/server"
import fs from "fs"
import {staticGenerationAsyncStorage} from "next/dist/client/components/static-generation-async-storage.external"

export async function GET(request: Request) {
  let list = []

  const dir = fs.readdirSync("app/donnee/tables")

  dir.forEach((file) => {
    const fileData = fs.readFileSync(`app/donnee/tables/${file}`, {
      encoding: "utf-8",
    })

    const stat = fs.statSync(`app/donnee/tables/${file}`)

    const name = JSON.parse(fileData).name
    const description = JSON.parse(fileData).description

    list.push({
      path: file,
      name: name,
      description: description,
      birthtime: stat.birthtime,
      mtime: stat.mtime,
    })
  })

  return NextResponse.json(
    {
      message: "liste des tableaux disponibles",
      list: JSON.stringify(list),
    },
    {status: 200}
  )
}

export async function POST(request: Request) {
  const json = await request.json()

  // const content = {
  //   name: json.name,
  //   columns: [{name: "colOne", type: "string"}],
  //   description: json.desc,
  //   rows: [
  //     {
  //       colOne: "hello",
  //     },
  //     {
  //       colOne: "table",
  //     },
  //   ],
  // }
  const content = {
    name: json.name,
    description: json.desc,
    columns: [],
    rows: [],
  }

  fs.writeFileSync(
    `app/donnee/tables/${json.path}.json`,
    JSON.stringify(content)
  )
  return NextResponse.json(
    {
      message: "fichier crée",
    },
    {status: 200}
  )
}
