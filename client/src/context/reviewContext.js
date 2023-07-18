import { useEffect, useReducer, createContext } from "react"

const ReviewContext = createContext()

const initialState = []

const reducer = (state, action) => {
    switch (action.type) {
        case "fetch":
            return action.payload
        case "add":
            return [action.payload, ...state]
        case "patch":
            return state.map(review => review.id === action.payload.id ? 
                            action.payload : review)
        case "remove":
            return state.filter(review => review.id !== action.payload)
        case "reset":
            return initialState
        default:
            return state;
    }
}

const ReviewProvider = ({ children }) => {
    const [reviews, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        (async () => {
            const res = await fetch("/me")
            // debugger
            if (res.ok) {
                const data = await res.json()
                dispatch({ type: "fetch", payload: data.user?.reviews })
            } 
        })();
    }, [])

    return (
        <ReviewContext.Provider value={{ reviews, dispatch }}>
            { children }
        </ReviewContext.Provider>
    )
}

export { ReviewContext, ReviewProvider }