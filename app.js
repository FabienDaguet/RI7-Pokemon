import {getPokemon, limit, offMultiplicator} from './modules/api.js'
import { drawPokemon } from './modules/pokemonCard.js';

let lesPokemons

function load() {
    console.log('lesPokemons',lesPokemons)
    let url = "https://pokeapi.co/api/v2/pokemon?limit="+limit+"&offset="+(limit*offMultiplicator);
    //console.log(url);
    let pokemons = getPokemon(url)
    pokemons.then(res => lesPokemons = res).then(() => drawPokemon(lesPokemons))
}

window.onscroll = function() {

    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
        console.log('tets', limit, offMultiplicator, "https://pokeapi.co/api/v2/pokemon?limit="+limit+"&offset="+(limit*offMultiplicator));
        load()
        
    }
}

window.onload = load;