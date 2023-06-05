import React, { useEffect, useState } from 'react';
import './Pokemon.css';
import axios from 'axios';

const Pokemon = ({ page, setDisableNext }) => {
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`);
                const results = response.data.results;
                const pokemonPromises = results.map(async (result) => {
                    const pokemonResponse = await axios.get(result.url);
                    return pokemonResponse.data;
                });
                const pokemonData = await Promise.all(pokemonPromises);
                if (isMounted) {
                    setPokemonData(pokemonData);
                    setError(false);
                    setDisableNext(pokemonData.length < 20);
                }
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.log('The axios request was cancelled.');
                } else {
                    console.error(e);
                    setError(true);
                }
            }
            setLoading(false);
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [page, setDisableNext]);

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    if (error) {
        return <p className="error">Error: Could not fetch data!</p>;
    }

    return (
        <div className="container">
            {pokemonData.map((pokemon) => (
                <div key={pokemon.id} className="pokemon-container">
                    <h1>{pokemon.name}</h1>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <p><strong>Moves:</strong> {pokemon.moves.length}</p>
                    <p><strong>Weight:</strong> {pokemon.weight}</p>
                    <p><strong>Abilities:</strong></p>
                    <ul>
                        {pokemon.abilities.map((ability, index) => (
                            <li key={index}>{ability.ability.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Pokemon;
