import { Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/HomePage"
import { CartasPage } from "../pages/CartasPage"
import { CartaPage } from "../pages/CartaPage"
import { Navbar } from "../ui/Navbar"
import { Footer } from "../ui/Footer"
import { BanListPage } from "../pages/BanListPage"

export const AppRouter = () => {
  return (
    <>
        <Navbar/>
        <Routes>
            <Route path="/home" element={ <HomePage/> }/>
            <Route path="/cartas" element={ <CartasPage/> }/>
            <Route path="/banlist" element={ <BanListPage/> }/>
            <Route path="/carta/:id" element={ <CartaPage/> }/>
            <Route path="/*" element={ <HomePage/> }/>
        </Routes>
        <Footer/>
    </>
  )
}
