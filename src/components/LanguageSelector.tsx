import React from "react";
import { useTranslation } from "react-i18next";

import { lngs } from "../pages/SignUpPage";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  return (
    <>
      {Object.keys(lngs).map((lng: any) => (
        <button
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          disabled={i18n.resolvedLanguage === lng}
        >
          <img
            src={`https://countryflagsapi.com/png/${
              lng === "en" ? "gb" : "pl"
            }`}
            alt={lng === "en" ? "English Flag" : "Polish Flag"}
            width={50}
          />
        </button>
      ))}
    </>
  );
};

export default LanguageSelector;
