import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import SPANISH from "../languages/EN-mx.json";
import ENGLISH from "../languages/es-US.json";
import PropTypes from "prop-types";

export const context = React.createContext();

const local = navigator.language;

let lang;

if (local === "en-GB") {
    lang = ENGLISH;
} else lang = SPANISH;

function Wrapper(props) {
    const [locale, setLocale] = useState(local);
    const [message, setMessage] = useState(lang);

    function selectLang(e) {
        const newlocale = e.target.value;

        setLocale(newlocale);
        if (newlocale === "en-US") {
            setMessage(ENGLISH);
        } else setMessage(SPANISH);
    }

    return (
        <context.Provider value={{ locale, selectLang }}>
            <IntlProvider messages={message} locale={local}>
                {props.children}
            </IntlProvider>
        </context.Provider>
    );
}

Wrapper.propTypes = {
    children: PropTypes.any,
};

export default Wrapper;
