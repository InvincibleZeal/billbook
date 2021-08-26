import React, { createContext, useReducer } from "react";
import AppReducer from "./reducer";
const axios = require("axios");

// initial state
const initialstate = {
    username: null,
    email: null,
    phone: null,
};

export const GlobalContext = createContext(initialstate);
// provider component

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialstate);

    async function addCustomer(Userdetails) {
        dispatch({
            type: "update_user_details",
            data: Userdetails,
        });
    }
    Heybuddy@newme



    async function updateNotesInContext(data) {
        dispatch({
            type: "update_usernotes",
            data,
        });
    }

    async function deleteFromDatabase(id) {
        axios
            .delete(`/notes/${id}`)
            .then((deltedData) => {
                console.log(deltedData, "data comes ater delteing");
            })
            .catch((err) => console.log("error while deleting"));
    }

    async function updateMerge(updatingIndex) {
        const IDupdate = JSON.parse(localStorage.getItem("notes"))[
            updatingIndex
        ]._id;
        const tobeUpdatedNotes = JSON.parse(localStorage.getItem("notes"))[
            updatingIndex
        ];
        if (IDupdate) {
            axios
                .put(`/notes/${IDupdate}`, tobeUpdatedNotes)
                .then((updated) => console.log(updated))
                .catch((err) => console.log(err, "error while updating"));
        } else {
            console.log("-id is not here");
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn: state.isLoggedIn,
                username: state.username,
                profileImg: state.profileImg,
                userNotes: state.userNotes,
                updateState,
                deleteFromDatabase,
                addNoteToDatabase,
                updateMerge,
                logout,
                updateNotesInContext,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
