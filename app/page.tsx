/** @format */
import Image from "next/image"
import INPUT from "./components/INPUT"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full">
        <p>Tably</p>
        <INPUT />
      </div>
    </main>
  )
}
