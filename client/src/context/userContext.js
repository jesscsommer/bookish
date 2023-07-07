import { useEffect, useReducer, createContext } from "react"

const UserContext = createContext()

const initialState = null

const reducer = (state, action) => {
    switch (action.type) {
        case "fetch":
            return action.payload.user
        case "remove":
            return initialState
        default:
            return state;
    }
}

const UserProvider = ({ children }) => {
    const [user, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        (async () => {
            const res = await fetch("/me")
            if (res.ok) {
                const user = await res.json()
                dispatch({ type: "fetch", payload: user })
            } else {
                // add error handling
            }
        })();
    }, [])

    return (
        <UserContext.Provider value={{ user, dispatch }}>
            { children }
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }