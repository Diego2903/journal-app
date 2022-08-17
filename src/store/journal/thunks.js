import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addEmptyNotes, savingNewNote, setActiveNote, setNotes, setPhotosActiveNote, setSaving, upDateNote } from "./journalSlice";

export const starNewNote = () => {

    return async (dispatch, getState) => {

        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            title: "",
            body: "",
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id

        dispatch(addEmptyNotes(newNote));
        dispatch(setActiveNote(newNote));

    }

}

export const startLoadingNotes = () => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        if (!uid) throw new Error("El UID del error no se encuentra en vigencia");

        const notes = await loadNotes(uid)

        dispatch(setNotes(notes));


    }

}

export const startSavedNote = () => {

    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active } = getState().journal;

        const noteToFireStore = { ...active };
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${active.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch(upDateNote(active));
    }

}

export const startUpLoadingFile = (files = []) => {

    return async (dispatch) => {
        dispatch(setSaving());

        // await fileUpload(files[0]);

        const fileUploadPromises = [];
        for (const file of files) {
           fileUploadPromises.push( fileUpload( file ));

        }
        const photosUrls = await Promise.all( fileUploadPromises);
       
        dispatch( setPhotosActiveNote( photosUrls ));
    }

}