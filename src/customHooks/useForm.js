import { useState } from "react";

export function useForm(initialState) {
    const [fields, setValues] = useState(initialState);

    // Function to handle form values
    const handleFormState = (event) => {
        setValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    // Function to handle object, array in fields
    const handleState = (key, callback) => {
        ((value) => {
            setValues((prev) => ({
                ...prev,
                [key]: value,
            }));
        })();
    };

    return [fields, handleFormState, handleState];
}
