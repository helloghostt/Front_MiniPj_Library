import React from 'react';
import type {FC, PropsWithChildren} from 'react'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
// import {useAuth} from '../../contexts'


interface RequireAuthProps {
  children: React.ReactNode,
}


const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    // 여기에 인증 로직을 구현
    return <>{children}</>;
  };
  
  export default RequireAuth;

// type RequireAuthProps = {}
// const RequireAuth: FC<PropsWithChildren<RequireAuthProps>> = ({children}) => {
//   const {loggedUser} = useAuth()
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (!loggedUser) navigate(-1)
//   }, [loggedUser, navigate])

//   return <>{children}</>
// }

// export default RequireAuth
