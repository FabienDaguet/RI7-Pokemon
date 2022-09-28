import { appear, translateCard } from "./css.js";
let pokemonPromises=[]

export function drawPokemon(pokemons) {
    console.log('list pokemon: '+pokemons.results);
    for(let i = 0; i < pokemons.results.length; i++){
        pokemonPromises.push(
            fetch(pokemons.results[i].url)
                .then(response => response.json())
                .then(data =>data)
        )   
    }    
    Promise.all(pokemonPromises).then(allPokemons => {
        for(let pokemon of allPokemons) {
            drawTemplate(pokemon);
        }
        //console.log('result',allPokemons)
        pokemonPromises=[]
    })
}

//Fonction qui va chainer les appels a l'api pokemon pour 1 pokemon 


function drawTemplate(pokemon) {    
    let template = document.querySelector(".template");
    let templateClone = document.importNode(template.content, true)

    let cardContainer = document.querySelector(".card-container");
    let cardShow = templateClone.querySelector('.fade-in');
    let card = templateClone.querySelector('.card')
    let pokemonTitle = pokemon.name;
    let pokemonSkin = pokemon.sprites.front_default;
    let types = pokemon.types
    let type1 = pokemon.types[0].type.name;
    let life = pokemon.stats[0].base_stat;
    let attack = pokemon.stats[1].base_stat;
    let defense = pokemon.stats[2].base_stat;
    let sAttack = pokemon.stats[3].base_stat;
    let speed = pokemon.stats[5].base_stat;
    //console.log(pokemon);

    //templateClone.classList.remove("hidden");
    templateClone.querySelector(".pokemon-name").innerHTML = pokemonTitle;
    templateClone.querySelector(".pokemon-life").innerHTML = "HP: "+life;
    templateClone.querySelector(".pokemon-attack").innerHTML = "ATTACK: "+attack;
    templateClone.querySelector(".pokemon-defense").innerHTML = "DEFENSE: "+defense;
    templateClone.querySelector(".pokemon-s-attack").innerHTML = "SPECIAL ATTACK: "+sAttack;
    templateClone.querySelector(".pokemon-speed").innerHTML = "SPEED: "+speed;
    templateClone.querySelector(".pokemon-img").src = pokemonSkin;

    if(types.length > 1) {
        let type2 = pokemon.types[1].type.name;
        //console.log(pokemon.types);
        templateClone.querySelector(".pokemon-type1").innerHTML = type1;
        templateClone.querySelector(".pokemon-type1").classList.add(type1);
        templateClone.querySelector(".card").classList.add(type1+"-background");
        templateClone.querySelector(".pokemon-type2").innerHTML = type2;
        templateClone.querySelector(".pokemon-type2").classList.add(type2);
    } else {
        templateClone.querySelector(".pokemon-type1").innerHTML = type1;
        templateClone.querySelector(".pokemon-type1").classList.add(type1);
        templateClone.querySelector(".card").classList.add(type1+"-background");
    }

    appear(cardShow);   

    //card.addEventListener("click", zoom);
    card.addEventListener("click", translateCard);
    
    //console.log(card.cloneNode(true));
    cardContainer.appendChild(templateClone);
}
