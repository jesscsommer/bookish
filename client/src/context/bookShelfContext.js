import { useEffect, useReducer, createContext } from "react"

const BookShelfContext = createContext()

const initialState = []

const reducer = (state, action) => {
    switch (action.type) {
        case "fetch":
            return action.payload
        case "add":
            return [action.payload, ...state]
        case "patch":
            return state.map(bookShelf => bookShelf.id === action.payload.id ? 
                            action.payload : bookShelf)
        case "remove":
            return state.filter(bookShelf => bookShelf.id !== action.payload)
        default:
            return state;
    }
}

const BookShelfProvider = ({ children }) => {
    const [bookShelves, dispatch] = useReducer(reducer, initialState)

    return (
        <BookShelfContext.Provider value={{ bookShelves, dispatch }}>
            { children }
        </BookShelfContext.Provider>
    )
}

export { BookShelfContext, BookShelfProvider }