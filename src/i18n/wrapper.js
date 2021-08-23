import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import SPANISH from "languages/es.json";
import ENGLISH from "languages/en.json";
import PropTypes from "prop-types";

export const context = React.createContext();

const local = navigator.language;

let lang;

if (local.startsWith("es")) {
    lang = SPANISH;
} else lang = ENGLISH;

function Wrapper(props) {
    const [locale, setLocale] = useState(local);
    const [message, setMessage] = useState(lang);

    function selectLang(e) {
        const newlocale = e.target.value;

        setLocale(newlocale);
        if (newlocale.startsWith("es")) {
            setMessage(SPANISH);
        } else setMessage(ENGLISH);
    }

    return (
        <context.Provider value={{ locale, selectLang }}>
            <IntlProvider messages={message} locale={local}>
                {console.log("Language", local)}
                {props.children}
            </IntlProvider>
        </context.Provider>
    );
}

Wrapper.propTypes = {
    children: PropTypes.any,
};

export default Wrapper;
