import { useState } from "react";

export function useForm(initialState, validationSchema) {
    // State Variables
    const [fields, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});

    // For Handling  form related changes
    const handleFieldChange = (event) => {
        setValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    // For Handling other changes wrt to arrays and objects
    const setState = (key, value) => {
        let newValue = value;
        if (typeof value === "function") {
            newValue = value(fields[key]);
        }
        setValues((prev) => ({
            ...prev,
            [key]: newValue,
        }));
    };

    // Function to Validate fields
    const validate = () => {
        const results = validationSchema.validate(fields);
        setErrors(results);
        return !results;
    };

    return {
        fields,
        handleFieldChange,
        setState,
        validate,
        errors,
    };
}
