import {getPokemon, limit, offMultiplicator} from './modules/api.js'
let url = "https://pokeapi.co/api/v2/pokemon?limit="+limit+"&offset="+(limit*offMultiplicator);

/* function loadScript(src){
    return new Promise ((resolve, reject) => {
        let script = document.createElement('script');
        script.sre = src;
        document.head.append(script);
        script.onload = () =>resolve('Fichier + sre + bien chargé');
        script.onerror = () => reject(new Error('Echec de chargement de '+ src));
    });
}
    let promessel = loadScript ('modules/api.js');
    let promesse2 = loadScript ('modules/pokemonCard.js');
    console.log(promessel)
    console.log(promesse2) */
    

function firstload() {
    getPokemon(url);
}

window.onscroll = function() {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
        getPokemon("https://pokeapi.co/api/v2/pokemon?limit="+limit+"&offset="+(limit*offMultiplicator))
    }
}

window.onload = firstload;