export const increment = (payload:number) => {
    return {
        type: "INCREMENT_COUNTER",
        payload
    }
}

export const decrement = (payload:number) => {
    return {
        type: "DECREMENT_COUNTER",
        payload
    }
}