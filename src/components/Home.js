import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { BiError } from "react-icons/bi";
import { format_number, format_link } from "../functions/index";

import { useState, useEffect } from "react";
import api from '../services/';

export const Home = ({ darkMode }) => {
    const [countries, setCountries] = useState(null);
    const [filteredCountries, setFilteredCountries] = useState(null);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        try {
            (async () => {

                const response = await api.get('all');
                setCountries(response.data);
                setFilteredCountries(response.data);
            })();
        } catch (e) {
            console.error(e);
        }
    }, []);

    window.onscroll = (e) => {
        if (document.documentElement.scrollTop > 100) setScroll(true);
        else setScroll(false);
    };
    const handleSearch = (e) => {
        let new_arr = countries?.filter((country) =>
            country.name.common
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        );
        setSearch(e.target.value);
        setError(() => {
            if (new_arr?.length > 0) {
                return null;
            } else {
                return "Sorry, no results were found!";
            }
        });
        setFilteredCountries(new_arr);
    };

    const handleFilter = (e) => {
        let new_arr = countries.filter((country) =>
            country.region.toLowerCase().includes(e.target.value.toLowerCase())
        );
        document.querySelector("[name='filter_input']").value = "";
        setError(null);
        setFilteredCountries(new_arr);
    };

    const handleReset = () => {
        setSearch("");
        setError(null);
        setFilteredCountries(countries);
    };

    const handleScroll = () => {
        document
            .getElementsByTagName("html")[0]
            .scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className="home">
            {countries && (
                <>
                    {scroll && (
                        <BsFillArrowUpCircleFill
                            onClick={handleScroll}
                            className={`scroll ${
                                darkMode ? "darkmode-bg" : ""
                            }`}
                        />
                    )}
                    <div className="filter">
                        <div
                            className={`filter-input ${
                                darkMode ? "darkmode-input" : ""
                            }`}
                        >
                            <AiOutlineSearch className="search" />
                            <input
                                onChange={handleSearch}
                                value={search}
                                name="filter_input"
                                type="text"
                                placeholder="Search for a country..."
                            />
                            {search && (
                                <AiOutlineCloseCircle
                                    onClick={handleReset}
                                    className={`close-input`}
                                />
                            )}
                        </div>
                        <div className="filter-select">
                            <select
                                name="filter_select"
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
                    {error && (
                        <div
                            className={`error ${
                                darkMode ? "darkmode-light" : ""
                            }`}
                        >
                            <p>
                                <BiError /> {error} <BiError />
                            </p>
                        </div>
                    )}
                    <div className="countries">
                        {filteredCountries?.map((val, index) => (
                            <div
                                key={index}
                                className={`country-single ${
                                    darkMode ? "darkmode-light" : ""
                                }`}
                            >
                                <img
                                    className="country-img"
                                    src={val.flags.png}
                                    alt={`${val.name.common} country flag`}
                                />
                                <div className={`country-info`}>
                                    <Link
                                        title={val.name.common}
                                        to={`/${format_link(
                                            val.name.common.toLowerCase(),
                                            false
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
                </>
            )}
        </main>
    );
};
