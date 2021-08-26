import { useState, useCallback } from "react";

export function useForm(initialState) {
    const [fields, setValues] = useState(initialState);

    // Function to handle form values
    const handleFormState = useCallback(
        (event) => {
            setValues((prev) => ({
                ...prev,
                [event.target.name]: event.target.value,
            }));
        },
        [fields]
    );

    // Function to handle object, array in fields
    const handleState = useCallback(
        (key, value) => {
            setValues((prev) => ({
                ...prev,
                [key]: value,
            }));
        },
        [fields]
    );
    return [fields, handleFormState, handleState];
}
