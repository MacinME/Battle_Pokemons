import PokeAPI from './API.js';
import UI from './UI.js';
import { pokemon_1, pokemon_2, getButton } from './selectors.js';

const pokeapi = new PokeAPI();
const ui = new UI();

// Get all the information for each pokemon
export const getMoreInformation = async (url) => {
    const answer = await fetch(url);
    const response = await answer.json();
    return response;
}

// Function that creates a 2 random number
export const handleFightPokemon = () => {
    const valueRandom = 600;
    const firstPokemon = Math.ceil( Math.random() * valueRandom);
    const secondPokemon = Math.ceil( Math.random() * valueRandom);

    return{
        firstPokemon,
        secondPokemon
    }
}

// Function for display only two pokemons
export const displayTwoPokemons = (getTwoPokemons) => {
    const results = getTwoPokemons.map( (pokemon) => {
        const { forms: [ { name } ], sprites: { other:{ home: { front_default }  } }, types, stats } = pokemon;
        return {  
            name, 
            front_default, 
            types,
            stats
        };
    });
    ui.renderOnePokemon(results[0], pokemon_1);
    ui.renderOnePokemon(results[1], pokemon_2);
}

// Function for choose another difference pokemons
export const handleFigherPokemons = async (random) => {
    const { firstPokemon, secondPokemon } = random;
    // console.log(firstPokemon, secondPokemon);

    const results = await Promise.all([
        await pokeapi.getTwoPokemons(firstPokemon),
        await pokeapi.getTwoPokemons(secondPokemon)
    ]);
    
    displayTwoPokemons(results);

}

// Handle pokemons
export const startPokemons = async () => {
    try {
        // Afert loading all pokemons, we need to fight 
        const { firstPokemon, secondPokemon} = handleFightPokemon();

        // call a new fuction for fight two pokemons
        await handleFigherPokemons({ firstPokemon, secondPokemon});
    } catch (error) {
        console.log(error);
        console.log('App Failed')
    }   
}

// Add Event Listeners
getButton.addEventListener('click', async () => {
    // Call the startPokemon function again once the button will be clicked
    await startPokemons();
});