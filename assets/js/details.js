// Função para verificar se existem parâmetros de URL e carregar detalhes do Pokémon
function hasUrlParams(){
    const params = new URLSearchParams(window.location.search);

    if(params.size < 1 || params.get('pokemon') == ''){
        return window.location.href = "/";
    }

    loadPokemonDetails(params.get('pokemon'))
}
// Função para carregar detalhes do Pokémon de forma assíncrona
async function loadPokemonDetails(pokemonName){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        const data = await response.json();

        // Extraindo detalhes da resposta
        const name = data.name;
        const type = data.types[0].type.name;
        const image = data.sprites.other.dream_world.front_default;

        // Atualizando o conteúdo HTML com detalhes do Pokémon
        document.querySelector('.content').classList.add(type)
        document.querySelector('.pokemon_title').textContent = capitalizarPrimeiraLetra(name)
        document.querySelector('.pokemon_photo').src = image
        document.querySelector('.pokemon_photo').alt = capitalizarPrimeiraLetra(name)
        document.querySelector('.pokemon_types').innerHTML = `${data.types.map((pokemon) => `<span class="pokemon_type ${pokemon.type.name}">${pokemon.type.name}</span>`).join('')}`
        document.querySelector('.about_abilities').innerHTML += `${data.abilities.map((pokemon) => `<td>${capitalizarPrimeiraLetra(pokemon.ability.name)}</td>`).join('')}`
        document.querySelector('.about_height').innerHTML += `<td>${data.height / 10}m</td>`
        document.querySelector('.about_weight').innerHTML += `<td>${data.weight / 10}kg</td>`
        document.querySelector('.about_egg_cycle').innerHTML += `<td>${capitalizarPrimeiraLetra(type)}</td>`

        console.log(data)

    }catch(error){
        console.log("Erro ao obter detalhes do pokemon: ", error);
    }
}
// Função para alterar o conteúdo com base no índice de navegação
function changeContent(index) {
    for (let i = 1; i <= 4; i++) {
        document.getElementById('content' + i).style.display = 'none';
    }

    const links = document.getElementsByClassName('nav-link');
    for (let i = 0; i < links.length; i++) {
        links[i].classList.remove('active');
    }

    document.getElementById('content' + (index + 1)).style.display = 'block';

    links[index].classList.add('active');
}
// Função para colocar a primeira letra de uma string em maiúscula
function capitalizarPrimeiraLetra(str) {
    if (str.length === 0) {
        return str;
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
}

hasUrlParams()
changeContent(0)