export default (state, action) => {
    switch (action.type) {
        case "get_transaction":
            return { ...state };
        case "delete_this_id":
            return {
                ...state,
            };
        case "add_this":
            return {
                ...state,
            };
        case "update_user_details":
            return {
                ...state,
                username: action.data.username,
                profileImg: action.data.profileImageUrl,
                isLoggedIn: true,
                userNotes: action.data.notes,
            };

        case "update_usernotes":
            return {
                userNotes: action.data,
            };

        case "user_logout":
            return {
                ...state,
                username: null,
                profileImg: null,
                isLoggedIn: false,
                email: null,
                userNotes: [],
            };

        default:
            return state;
    }
};
