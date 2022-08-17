
import { async } from '@firebase/util';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseAuth } from './config';


const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {

    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credential =  GoogleAuthProvider.credentialFromResult( result )

        const { displayName, email, photoURL, uid } = result.user;


        return {
            ok: true,

            displayName, email, photoURL, uid
        }

    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}


export const registerUserWithEmailPassword = async ({ email, password, displayName, displaySurname }) => {



    try {


        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;


        await updateProfile(FirebaseAuth.currentUser, {
            displayName, displaySurname
        });

        return {
            ok: true,
            uid, photoURL, email, displayName, displaySurname
        }

    } catch (error) {
        // console.log(error);
        return { ok: false, errorMessage: "Este usuario ya se encuentra en uso, por favor elija otro usuario" }
    }
}

export const loginWithEmailPassword = async ({ email, password }) => {

    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL, displayName, displaySurname } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName, displaySurname
        }

    } catch (error) {
        // console.log(error);
        return { ok: false, errorMessage: "Por favor verifique los datos de su usuario" }
    }


}

export const logoutFirebase = async () => {

    return await (FirebaseAuth.signOut());

}