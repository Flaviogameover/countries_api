import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { format_number, format_link } from "../functions/index";

import { useState, useEffect } from "react";
import axios from "axios";

export const Home = ({ darkMode }) => {
    const [countries, setCountries] = useState(null);
    const [filteredCountries, setFilteredCountries] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await axios.get(
                "https://restcountries.com/v3.1/all"
            );

            setCountries(response.data);
            setFilteredCountries(response.data);
        })();
    }, []);

    const handleSearch = (e) => {
        let new_arr = countries.filter((country) =>
            country.name.common
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        );
        setFilteredCountries(new_arr);
    };

    const handleFilter = (e) => {
        let new_arr = countries.filter((country) =>
            country.region.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredCountries(new_arr);
    };

    return (
        <section className="home">
            <div className="filter">
                <div
                    className={`filter-input ${
                        darkMode ? "darkmode-input" : ""
                    }`}
                >
                    <AiOutlineSearch />
                    <input
                        onChange={handleSearch}
                        type="text"
                        placeholder="Search for a country..."
                    />
                </div>
                <div className="filter-select">
                    <select
                        className={darkMode ? "darkmode-light" : ""}
                        onChange={handleFilter}
                    >
                        <option value="">Filter by Region</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">America</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
            </div>
            <div className="countries">
                {filteredCountries?.map((val, index) => (
                    <div
                        key={index}
                        className={`country-single ${
                            darkMode ? "darkmode-light" : ""
                        }`}
                    >
                        <div className="country-img">
                            <img src={val.flags.png} />
                        </div>
                        <div className={`country-info`}>
                            <Link
                                to={`/${format_link(
                                    val.name.common.toLowerCase(),
                                    true
                                )}`}
                            >
                                <h3
                                    className={`${
                                        darkMode ? "darkmode-text" : ""
                                    }`}
                                >
                                    {val.name.common}
                                </h3>
                            </Link>
                            <p>
                                <b>Population</b>:{" "}
                                {format_number(val.population)}
                            </p>
                            <p>
                                <b>Region</b>: {val.region}
                            </p>
                            <p>
                                <b>Capital</b>: {val.capital}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
