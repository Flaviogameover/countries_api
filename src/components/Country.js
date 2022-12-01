import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { format_number, format_link } from "../functions/index";
import api from "./../services/";

export const Country = ({ darkMode }) => {
    const [country, setCountry] = useState(null);
    const [border, setBorder] = useState([]);
    const params = useParams();

    useEffect(() => {
        try {
            (async () => {
                setCountry(null);
                setBorder([]);
                const response = await api.get(
                    `${process.env.REACT_APP_API_URL}name/${format_link(
                        params.country,
                        true
                    )}?fullText=true`
                );

                response.data[0].borders?.map(async (i) => {
                    const response_border = await api.get(
                        `${process.env.REACT_APP_API_URL}/${i}`
                    );
                    setBorder((val) => [
                        ...val,
                        response_border.data[0].name.common,
                    ]);
                });
                setCountry(response.data[0]);
            })();
        } catch (e) {
            console.error(e);
        }
    }, [params.country]);
    
    return (
        <main className="country-page">
            <Link
                className={`back-btn ${
                    darkMode ? "darkmode-text darkmode-light" : ""
                }`}
                to="/"
            >
                <BsArrowLeft /> Back
            </Link>
            {country && (
                <div className="country-page-display">
                    {country?.flags.png && (
                        <img
                            className="country-flag"
                            src={country?.flags.png}
                            alt={`${country?.name.common} country flag`}
                        />
                    )}
                    <div className="country-page-info">
                        <h1>{country?.name.common}</h1>
                        <div className="info-flex">
                            <div className="info-left">
                                <p>
                                    <span>Native Name:</span>{" "}
                                    {country?.altSpellings[1]}
                                </p>
                                <p>
                                    <span>Population:</span>{" "}
                                    {country?.population &&
                                        format_number(country?.population)}
                                </p>
                                <p>
                                    <span>Region:</span> {country?.region}
                                </p>
                                <p>
                                    <span>Sub Region:</span>{" "}
                                    {country?.subregion}
                                </p>
                                <p>
                                    <span>Capital:</span> {country?.capital}
                                </p>
                            </div>
                            <div className="info-right">
                                <p>
                                    <span>Top Level Domain:</span>{" "}
                                    {country?.tld[0]}
                                </p>
                                <p>
                                    <span>Currencies:</span>{" "}
                                    {country?.currencies &&
                                        Object.values(country?.currencies)
                                            .map((val) => val.name)
                                            .join(", ")}
                                </p>
                                <p>
                                    <span>Languages:</span>{" "}
                                    {country?.languages &&
                                        Object.values(country?.languages)
                                            .map((val) => val)
                                            .join(", ")}
                                </p>
                            </div>
                        </div>
                        {border.length > 0 && (
                            <div className="info-border border-countries">
                                <h3>Border Countries:</h3>
                                {border?.map((val, index) => (
                                    <Link
                                        className={`${
                                            darkMode
                                                ? "darkmode-text darkmode-light"
                                                : ""
                                        }`}
                                        to={`/${format_link(
                                            val.toLowerCase(),
                                            true
                                        )}`}
                                        key={index}
                                    >
                                        {val}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
};
