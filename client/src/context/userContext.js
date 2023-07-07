import { useEffect, useReducer, createContext } from "react";
import Cookie from "js-cookie";

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
            const res = await fetch("/me", {
                method: "GET",
                credentials: "same-origin",
                headers: {
                    "X-CSRF-TOKEN": Cookie.get("csrf_access_token")
                }
            })
            if (res.ok) {
                const user = await res.json()
                dispatch({ type: "fetch", payload: user })
            } else {
                (async () => {
                    const res = await fetch("/refresh", {
                        method: "POST",
                        credentials: "same-origin",
                        headers: {
                            "X-CSRF-TOKEN": Cookie.get("csrf_refresh_token")
                        }
                    })
                    if (res.ok) {
                        const user = await res.json()
                        dispatch({ type: "fetch", payload: user })
                    } 
                })();
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