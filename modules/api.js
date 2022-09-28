import { drawPokemon } from "./pokemonCard.js";
export let limit = 8;
export let offMultiplicator = 0;
export async function getPokemon(url) {
    let res = await fetch(url)
    let data = await res.json()
        
    drawPokemon(data)
    offMultiplicator +=1;
        
}