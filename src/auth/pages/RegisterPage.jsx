
import { Link as RouterLink } from "react-router-dom"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm";
import { useState,  useMemo } from "react";
import { useDispatch, useSelector} from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";



const dataForm = {
  email: "",
  password: "",
  displayName: "",
  displaySurname: ""
}

const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe de tener una @"],
  password: [(value) => value.length >= 6, "La contraseña debe de tener más de 6 caracteres"],
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
  displaySurname: [(value) => value.length >= 1, "El apellido es obligatorio"]
}




export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector( state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === "checking", [status])

  const { formState, displaySurname, displayName, email, password, onInputChange, isFormValid,
    displayNameValid, displaySurnameValid, emailValid, passwordValid } = useForm(dataForm, formValidations);



  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);


    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    <>

      <AuthLayout title="Registrarse" >

        <h1>FormValid : {isFormValid ? "Valido " : "Invalido"}</h1>
        <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }} md={12}>
              <TextField
                label="Nombres"
                type="text"
                placeholder="Nombres"
                fullWidth name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameValid && formSubmitted}
                helperText={displayNameValid} />
            </Grid>
          </Grid>


          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }} md={12}>
              <TextField
                error={!!displaySurnameValid && formSubmitted}
                fullWidth name="displaySurname"
                helperText={displaySurnameValid}
                label="Apellidos"
                onChange={onInputChange}
                placeholder="Apellidos"
                type="text"
                value={displaySurname} />
            </Grid>
          </Grid>


          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }} md={12}>
              <TextField
                error={!!emailValid && formSubmitted}
                fullWidth name="email"
                helperText={emailValid}
                label="Correo"
                onChange={onInputChange}
                placeholder="correo@gmai.com"
                type="email"
                value={email} />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }} md={12}>
              <TextField
                error={!!passwordValid && formSubmitted}
                fullWidth
                helperText={passwordValid}
                label="Contraseña"
                name="password"
                onChange={onInputChange}
                placeholder="contraseña"
                type="password"
                value={password} />
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ mb: 2, mt: 1 }}>

            <Grid item xs={12} sx={{ mb: 2 } } display={ !!errorMessage ? "" : "none"}>
              <Alert severity="error"> {errorMessage} </Alert>
            </Grid>
            
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Button
                disabled={ isCheckingAuthentication }  
                type="submit"
                variant="contained"
                fullWidth>
                Registrarse
              </Button>
            </Grid>




            <Grid container direction="row" justifyContent="end" >
              <Typography variant="p" sx={{ mr: 1 }}> ¿Ya tienes Cuenta? </Typography>
              <Link component={RouterLink} color="inherit" to="/auth/login"> Ingresar </Link>
            </Grid>

          </Grid>

        </form>
      </AuthLayout>

    </>
  )
}