import { Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/HomePage"
import { CartasPage } from "../pages/CartasPage"
import { NavbarComponent } from "../ui/NavbarComponent"
import { Footer } from "../ui/Footer"
import { BanListPage } from "../pages/BanListPage"
import { DeckListPage } from "../pages/DeckListPage"
import { ProductsPage } from "../pages/ProductsPage"
import { DeckCreatePage } from "../pages/DeckCreatePage"

export const AppRouter = () => {
  return (
    <>
        <NavbarComponent/>
        <Routes>
            <Route path="/home" element={ <HomePage/> }/>
            <Route path="/cartas" element={ <CartasPage/> }/>
            <Route path="/banlist" element={ <BanListPage/> }/>
            <Route path="/decklist" element={ <DeckCreatePage/> }/>
            {/* <Route path="/products" element={ <DeckCreatePage/> }/> */}
            <Route path="/*" element={ <HomePage/> }/>
        </Routes>
        <Footer/>
    </>
  )
}
