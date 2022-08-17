import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { useCheckAuth } from "../hooks/useCheckAuth"
import { HomeRoutes } from "../journal/routes/HomeRoutes"
import { CheckingAuth } from "../ui/"


export const AppRouter = () => {
  
const {status} = useCheckAuth();

  if (status === "checking") {
    return <CheckingAuth />
  }
  
  return (
    <>
        <Routes>

          {
            (status === "authentic")
            ? <Route path="/*" element= { <HomeRoutes />}/>
            :  <Route  path="/auth/*" element = { <AuthRoutes />}/>
          }


          < Route path="/*" element= {<Navigate to="/auth/login" />}/>
            {/* Login
            <Route  path="/auth/*" element = { <AuthRoutes />}/> */}


            {/* Journal App */}

            {/* <Route path="/*" element= { <HomeRoutes />}/> */}

        </Routes>

    </>
  )
}
