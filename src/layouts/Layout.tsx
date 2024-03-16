import React from "react"
import { Header } from "../components/Header"

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col max-w-screen-lg bg-slate-100 m-auto h-screen">
      <Header />
      <main className=" bg-green-400">{children}</main>
    </div>
  )
}
