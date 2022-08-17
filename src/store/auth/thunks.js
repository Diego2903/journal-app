import { async } from "@firebase/util"
import { deleteDoc, doc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout, deleteNoteById } from "../journal/journalSlice"
import { checkinCrediantals, login, logout } from "./authSlice"

export const checkingAuthentic = (email, password) => {

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

export const startDeletingNote = () => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { active } = getState().journal;
        
        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${active.id}`);
        await deleteDoc(docRef);

        dispatch( deleteNoteById(active.id));

    }
}


