import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import SPANISH from "../languages/EN-mx.json";
import ENGLISH from "../languages/es-US.json";
import App from "../App";
const context = React.createContext();

const local = navigator.language;

let lang;

if (local === "en-US") {
    lang = ENGLISH;
} else lang = SPANISH;

const Wrapper = (props) => {
    const [locale, setLocale] = useState(local);
    const [messsage, setMessage] = useState(lang);

    function selectLang(e) {
        console.log(e.target);
        const newlocale = e.target.value;
        setLocale(newlocale);
        if (newlocale === "en-US") {
            setMessage(ENGLISH);
        } else setMessage(SPANISH);
    }

    return (
        <context.Provider value={{ locale, selectLang }}>
            <IntlProvider messages={messsage} locale={local}>
                <button
                    className="btn m-4"
                    onClick={(e) => setMessage(ENGLISH)}
                >
                    ENGLISH
                </button>
                <button
                    className="btn m-4"
                    onClick={(e) => setMessage(SPANISH)}
                >
                    ESPAÑOLA
                </button>
                <App />
            </IntlProvider>
        </context.Provider>
    );
};

export default Wrapper;
