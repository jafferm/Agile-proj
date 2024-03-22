import { CatalogContext } from "../context/CatalogContext"
import { useContext } from "react"

export const useCatalogContext = () => {
  const context = useContext(CatalogContext)

  if(!context) {
    throw Error('useCatalogContext must be used inside an CatalogContextProvider')
  }

  return context
}