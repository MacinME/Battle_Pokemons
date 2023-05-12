// import { startPokemons } from './functions.js';

class PokeAPI {
    
    constructor(){
        this.url = `https://pokeapi.co/api/v2/pokemon?limit=100`;
    }

    // Get Method for get API
    async getPokemons(){
        try {
            const answer = await fetch(this.url);
            const result = await answer.json();
            // Return the results
            return result.results;
        } catch (error) {
            console.log(error);
            console.log('Fetch Failed')
        }
    }

    // Get two random pokemons 
    async getTwoPokemons(random){
        this.urlForTwo = `https://pokeapi.co/api/v2/pokemon/${random}`
        const answer = await fetch(this.urlForTwo);
        const result = await answer.json();
        
        return result;
    }


}

export default PokeAPI;