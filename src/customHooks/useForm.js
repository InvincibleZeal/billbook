import { useState } from "react";

export function useForm(initialState) {
    const [fields, setValues] = useState(initialState);

    return [
        fields,
        function (event) {
            setValues((prev) => ({
                ...prev,
                [event.target.name]: event.target.value,
            }));
        },
        function (key, value) {
            setValues((prev) => ({
                ...prev,
                [key]: value,
            }));
        },
    ];
}
