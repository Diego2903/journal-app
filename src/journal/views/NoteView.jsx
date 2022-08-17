import { useDispatch, useSelector } from "react-redux";
import { useMemo, useEffect, useRef } from "react";

import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css'

import { ImageGalery } from "../components";
import { useForm } from "../../hooks/useForm";
import { setActiveNote, startSavedNote, startUpLoadingFile } from "../../store/journal";
import { startDeletingNote } from "../../store/auth";






export const NoteView = () => {

    const dispatch = useDispatch();

    const { active, messageSaved, isSaving } = useSelector(state => state.journal);

    const { body, title, date, onInputChange, formState } = useForm(active)

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date])

    const fileInputRef = useRef();

    useEffect(() => {

        dispatch(setActiveNote(formState));

    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire("Nota actualizada", messageSaved, "success")
        }
    }, [messageSaved])


    const onSavedNote = () => {

        dispatch(startSavedNote())
    }

    const onFileInputChange = ({ target }) => {
        if (target.file === 0) return;
        dispatch( startUpLoadingFile(target.files))
    }

    const onDelete = () => {
        dispatch( startDeletingNote());
    }



    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight="light"> {dateString}</Typography>
            </Grid>

            <Grid item>
                <input
                    type="file"
                    multiple
                    onChange={onFileInputChange}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                />

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                    className="tooltip"
                >
                    <span className="tooltip-content">Cargar imagenes</span>
                    <UploadOutlined />
                </IconButton>



                <Button color="primary" sx={{ padding: 2 }} disabled={isSaving} onClick={onSavedNote}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>


            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label="Titulo"
                    sx={{ border: "none", mt: 2, mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Que sucedio en el día de hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />

            </Grid>
            <Grid container justifyContent="end">
                <Button onClick={ onDelete } sx={{ mt: 2 }} color="error">
                    <DeleteOutline /> 
                    Borrar
                </Button>
            </Grid>

            <ImageGalery images={ active.imageUrls }/>
        </Grid>
    )
}
