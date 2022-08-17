import { Link as RouterLink } from "react-router-dom"
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { startGoogleSingIn, startLoginWithEmailPassword } from "../../store/auth"
import { useMemo } from "react"


const formData = {
  email : "",
  password : ""
}


export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData);

  const isAuthentic = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault()


    dispatch(startLoginWithEmailPassword({ email, password }))
  }

  const onGoogleSigIn = () => {


    dispatch(startGoogleSingIn())
    
  }


  return (
    <>
      <AuthLayout title="Login" >
        <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }} md={12}>
              <TextField label="Correo" type="email" placeholder="correo@gmai.com" fullWidth name="email" value={email} onChange={onInputChange} />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }} md={12}>
              <TextField label="Contraseña" type="password" placeholder="contraseña" fullWidth name="password" value={password} onChange={onInputChange} />
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }} display={!!errorMessage ? "" : "none"}>
            <Alert severity="error"> {errorMessage} </Alert>
          </Grid>

          <Grid container spacing={1} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12} >
              <Button variant="contained" fullWidth type="submit" disabled={isAuthentic}> Login </Button>
            </Grid>

            <Grid item xs={12} sm={12} sx={{ mb: 2 }}>

              <Button variant="contained" fullWidth onClick={onGoogleSigIn} disabled={isAuthentic}>
                <Google />
                <Typography sx={{ ml: 1 }}> Google </Typography>
              </Button>
            </Grid>

            <Grid container direction="row" justifyContent="end" >
              <Link component={RouterLink} color="inherit" to="/auth/register"> Crea una cuenta </Link>
            </Grid>

          </Grid>

        </form>
      </AuthLayout>

    </>
  )
}



/// VIDEO 285 
