import React from 'react'
import { useSelector } from 'react-redux'


export const Headers = () => {
    const token = useSelector(state => state.currentUser.token);

    let headers = {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
        }
    return (
        headers
    )
}