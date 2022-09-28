let cardContainer = document.querySelector(".card-container");
let card = document.querySelector(".card");
let limit = 150;

async function getPokemon() {
    let url = "https://pokeapi.co/api/v2/pokemon?limit="+limit;

    let res = await fetch(url);
    let pokemons = await res.json();

    for(let i = 0; i < pokemons.results.length; i++){
        
        let response = await fetch(pokemons.results[i].url);
        let pokemon = await response.json();
        //console.log(pokemon.types);

        let pokemonTitle = pokemon.name;
        let pokemonSkin = pokemon.sprites.front_default;
        let types = pokemon.types
        //console.log(types.length);
        
        let cloned = card.cloneNode(true)

        cloned.classList.remove("hidden");
        cloned.querySelector(".pokemon-name").innerHTML = pokemonTitle;
        cloned.querySelector(".pokemon-img").src = pokemonSkin;

        if(types.length > 1) {
            let type1 = pokemon.types[0].type.name;
            let type2 = pokemon.types[1].type.name;
            cloned.querySelector(".pokemon-type1").innerHTML = type1;
            cloned.querySelector(".pokemon-type1").classList.add(type1);
            cloned.querySelector(".pokemon-type2").innerHTML = type2;
            cloned.querySelector(".pokemon-type2").classList.add(type2);

        } else {
            let type1 = pokemon.types[0].type.name;
            cloned.querySelector(".pokemon-type1").innerHTML = type1;
            cloned.querySelector(".pokemon-type1").classList.add(type1);
        }
        
        //console.log(card.cloneNode(true));
        cardContainer.appendChild(cloned);

    }

}

getPokemon()