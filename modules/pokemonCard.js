import { appear } from "./css.js";

export function drawPokemon(pokemons) {

    let template = document.querySelector(".template");

    for(let i = 0; i < pokemons.results.length; i++){
        let templateClone = document.importNode(template.content, true)

        fetch(pokemons.results[i].url)
        .then(response => response.json())
        .then(data => {
            data;
            drawTemplate(data, templateClone)
        });
    }    
}

function drawTemplate(pokemon, templateClone) {    

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


    function zoom(event) {
        let myTarget = event.currentTarget;
        if (myTarget.classList.contains('up')) {
            myTarget.classList.add('move')
            myTarget.classList.remove('up')
        } else {
            myTarget.classList.remove('move')
            myTarget.classList.add('up')
        }
    }

    card.addEventListener("click", zoom);
    
    //console.log(card.cloneNode(true));
    cardContainer.appendChild(templateClone);
}
