
import { IconButton } from "@mui/material"
import { HomeLayout } from "../layout/HomeLayout"
import { NothingSelect } from "../views"
import { AddOutlined } from "@mui/icons-material"
import { NoteView } from "../views/NoteView"
import { useDispatch, useSelector } from "react-redux"
import { starNewNote } from "../../store/journal"


export const HomePage = () => {




  const dispatch = useDispatch();
  const { isSaving, active } = useSelector(state => state.journal)

  const onClickNewNote = () => {

    dispatch(starNewNote());

  }


  return (
    <HomeLayout>

      {
        (!!active) 
        ? <NoteView /> 
        : <NothingSelect />
      }

      
      
      <IconButton onClick={onClickNewNote}
        size="large" sx={{
        color: "white",
        backgroundColor: "error.main",
        ":hover": { backgroundColor: "error.main", opacity: 0.9 },
        position: "fixed",
        right: 50, 
        bottom: 50
        }}
        disabled={isSaving}>
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>


   

    </HomeLayout>




  )
}
