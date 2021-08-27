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
    const setFormState = (key, value) => {
        if (typeof value === "function") {
            const newValue = value(fields[key]);
            console.log(newValue);
            setValues((prev) => ({
                ...prev,
                [key]: newValue,
            }));
        } else {
            setValues((prev) => ({
                ...prev,
                [key]: value,
            }));
        }
    };

    return [fields, handleFormState, setFormState];
}
