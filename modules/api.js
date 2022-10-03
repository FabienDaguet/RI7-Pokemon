export let limit = 64;
export let offMultiplicator = 0;
export function getPokemon(url) {
    let res = fetch(url).then(result => result.json());
    offMultiplicator += 1;
    return res;
}
