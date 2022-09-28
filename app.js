import {getPokemon, limit, offMultiplicator} from './modules/api.js'

let url = "https://pokeapi.co/api/v2/pokemon?limit="+limit+"&offset="+(limit*offMultiplicator);

function firstload() {
    getPokemon(url);
}

window.onscroll = function() {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
        getPokemon("https://pokeapi.co/api/v2/pokemon?limit="+limit+"&offset="+(limit*offMultiplicator))
    }
}

window.onload = firstload;