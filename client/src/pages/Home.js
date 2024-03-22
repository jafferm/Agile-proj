import React, { useEffect } from "react"
import { useCatalogContext } from "../hooks/useCatalogContext"

// components
import CatalogDetails from "../components/CatalogDetails"
import CatalogForm from "../components/UploadHouseForm"

const Home = () => {
  const { catalog, dispatch } = useCatalogContext()

  useEffect(() => {
    const fetchCatalog = async () => {
      const response = await fetch('/api/catalog')
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_CATALOG', payload: json })
      }
    }

    fetchCatalog()
  }, [dispatch])

  return (
    <div className="home">
      <div className="catalog">
        {catalog && catalog.map(catalog => (
          <CatalogDetails catalogId={catalog._id} key={catalog._id} />
        ))}
      </div>
      <CatalogForm />
    </div>
  )
}

export default Home
