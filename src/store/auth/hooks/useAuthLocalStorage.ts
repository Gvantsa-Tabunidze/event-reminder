// import {useEffect, useState} from 'react'
// import type { Session } from '@supabase/supabase-js';



// interface IAuthLocalStorage {
//     storage_key:string
// }


// export const useAuthLocalStorage = ({storage_key}:IAuthLocalStorage)=> {
// // Initialize state from localStorage
// const [userSession, setUserSession] = useState<Session | null>(()=>{
//     const sessionString = localStorage.getItem(storage_key)
//     return sessionString ? (JSON.parse(sessionString) as Session) : null
// })

// // Sync state with localStorage
// useEffect(()=> {
//     if(userSession){
//         localStorage.setItem(storage_key, JSON.stringify(userSession))
//     } else {
//         localStorage.removeItem(storage_key)
//     }

//     return ()=> {
//         localStorage.removeItem(storage_key)
//     }
// },[userSession, storage_key])

// return { userSession, setUserSession };
// }
