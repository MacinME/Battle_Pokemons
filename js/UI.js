import { getMoreInformation } from './functions.js';
import PokeAPI from './API.js';
import { pokemon_1, pokemon_2 } from './selectors.js';
import { colorTypes } from './type.js';


class UI {

    constructor(){
        this.pokeapi = new PokeAPI();
        console.log(this.pokeapi)
    }

    async displayAllPokemons(){

        // Get the all the pokemons available in the API 
        // This first endpoint will return just the name pokemon
        const pokemons = await this.pokeapi.getPokemons();
    
        // Obtain all the information for each pokemon,
        // and we'll wait until this resolve everything
        await Promise.all(pokemons.map( async (pokemon) => {
    
            const pokeInformation = await getMoreInformation(pokemon.url);
    
            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('bg-green-500', 'py-5', 'px-4', 'rounded-lg', 'w-full', 'flex', 'justify-center', 'flex-col','items-center');
    
            const nameElement = document.createElement('p');
            nameElement.textContent = pokemon.name;
    
            const picturePokemon = document.createElement('img');
            picturePokemon.classList.add('w-auto');
            picturePokemon.src = pokeInformation.sprites.other.home.front_default;
    
            pokemonCard.appendChild(picturePokemon);
            pokemonCard.appendChild(nameElement);
            resultElement.appendChild(pokemonCard);
    
        }));
    
    }

    // Method that render pokemons to fight
    renderOnePokemon(pokemon, reference){

        this.cleanHMTL();
    
        const { name, front_default, types, stats } = pokemon; 
    
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('w-98', 'h-full', 'px-4');
    
        const pokemonPicture = document.createElement('img');
        pokemonPicture.src = front_default;
    
        const pokemonType = document.createElement('div');
        pokemonType.classList.add('rounded-lg', 'flex', 'gap-2', 'py-1', 'px-3', 'justify-center');
    
        const pokemonStats = document.createElement('div');
        pokemonStats.classList.add('flex', 'gap-2', 'py-1', 'px-3', 'flex-col');
    
        const pokemonName= document.createElement('p');
        pokemonName.classList.add('text-white', 'text-3xl', 'text-center', 'font-semibold', 'tracking-wider')
        pokemonName.textContent = name;
    
        pokemonCard.appendChild(pokemonName)
        pokemonCard.appendChild(pokemonPicture);
        stats.forEach( ({ base_stat ,stat: { name }}) => {
            const statName = document.createElement('p');
            statName.classList.add('text-white', 'tracking-wider');
            statName.textContent = name;
    
            const baseStat = document.createElement('div');
            baseStat.classList.add('h-4', 'bg-gray-900', 'rounded-full', 'relative', 'w-full');
    
            const proggressBar = document.createElement('div');
            proggressBar.classList.add('h-4', 'bg-green-500', 'rounded-full', 'absolute', 'z-20', 'pl-2', 'left-0', 'top-0', 'text-sm');
            proggressBar.textContent = base_stat + '%';
            base_stat > 100 ? proggressBar.style.width = 100 + '%' : proggressBar.style.width = base_stat +'%';
    
            baseStat.appendChild(proggressBar); 
            pokemonStats.appendChild(statName);
            pokemonStats.appendChild(baseStat);
    
            pokemonCard.appendChild(pokemonStats);
        });
        types.forEach( ({type}) => {
    
            const { name } = type;
            const item = document.createElement('img');
            item.classList.add('w-10', 'rounded-full', 'p-1', 'shadow-lg', `${colorTypes[name][name]}`, `${colorTypes[name]['shadow']}`);
            item.src = `./icons/types/${name}.svg`;
    
            pokemonType.appendChild(item);
        });
        pokemonCard.appendChild(pokemonType);
        
        reference.appendChild(pokemonCard)
    
    }

    // Clear HTML elements
    cleanHMTL(){
        while(pokemon_1.firstChild && pokemon_2.firstChild){
            pokemon_1.removeChild(pokemon_1.firstChild);
            pokemon_2.removeChild(pokemon_2.firstChild)
        }
    }


}

export default UI;