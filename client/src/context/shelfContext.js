import { useEffect, useReducer, createContext, useContext } from "react"
import { UserContext } from "./userContext"

const ShelfContext = createContext()

const initialState = []

const reducer = (state, action) => {
    switch (action.type) {
        case "fetch":
            return action.payload
        case "set":
            return action.payload
        case "add":
            return [action.payload, ...state]
        case "patch":
            return state.map(shelf => shelf.id === action.payload.id ? 
                            action.payload : shelf)
        case "remove":
            return state.filter(shelf => shelf.id !== action.payload)
        case "reset":
            return initialState
        default:
            return state;
    }
}

const ShelfProvider = ({ children }) => {
    const [shelves, dispatch] = useReducer(reducer, initialState)

    return (
        <ShelfContext.Provider value={{ shelves, dispatch }}>
            { children }
        </ShelfContext.Provider>
    )
}

export { ShelfContext, ShelfProvider }