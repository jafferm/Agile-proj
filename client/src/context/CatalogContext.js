import { createContext, useReducer } from 'react'

export const CatalogContext = createContext()

export const catalogReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CATALOG':
      return { 
        catalog: action.payload 
      }
    case 'CREATE_CATALOG':
      return { 
        catalog: [action.payload, ...state.catalog] 
      }
    case 'DELETE_CATALOG':
      return { 
        catalog: state.catalog.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const CatalogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(catalogReducer, { 
    catalog: [] // Initialize as an empty array
  })
  
  return (
    <CatalogContext.Provider value={{ ...state, dispatch }}>
      { children }
    </CatalogContext.Provider>
  )
}