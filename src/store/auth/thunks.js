import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal/journalSlice"
import { checkinCrediantals, login, logout } from "./authSlice"

export const checkingAuthentic = () => {

    return async (dispatch) => {
        dispatch(checkinCrediantals())
    }

}

export const startGoogleSingIn = () => {

    return async (dispatch) => {
        dispatch(checkinCrediantals())

        const result = await singInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));

    }

}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName, displaySurname }) => {

    return async (dispatch) => {

        dispatch(checkinCrediantals());

        const result = await registerUserWithEmailPassword({ email, password, displayName, displaySurname });


        if (!result.ok) {
            return dispatch(logout(result.errorMessage));
        }

        dispatch(login(result));
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {

    return async (dispatch) => {
        dispatch(checkinCrediantals());
        const result = await loginWithEmailPassword({ email, password })
        console.log(result);

        if (!result.ok)
            return dispatch(logout(result))

        dispatch(login(result))
    }


}

export const starLogout = () => {


    return async (dispatch) => {
        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout())
    }
}




