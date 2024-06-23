const input = document.querySelector("#input");
const pokeContainer = document.querySelector(".pokemon-container");

let pokes = 50;

const poke = async () => {
  for (let i = 1; i <= pokes; i++) {
    await pokeCall(i);
  }
};

const pokeCall = async (id) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let response = await fetch(url);
  let data = await response.json();
  pokeCard(data);
};

const pokeCard = (data) => {
  const name = data.name[0].toUpperCase() + data.name.slice(1);
  const id = data.id.toString().padStart(3, "0");
  const type = data.types[0].type.name;

  const pokeBox = document.createElement("div");
  pokeBox.className = "poke-box";
  pokeBox.innerHTML = `
  <img
          class="poke-img"
          src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png"
          alt=""
        />
        <h4 class="poke-names">${name}</h4>
        <p class="poke-id">#${id}</p>
        <p class="poke-type">Type: ${type}</p>
  `;
  pokeContainer.appendChild(pokeBox);
};
poke();

input.addEventListener("input", function (e) {
  const pokemons = document.querySelectorAll(".poke-names");
  const values = input.value.toLowerCase().trim();

  pokemons.forEach((pokemon) => {
    pokemon.parentElement.style.display = "block";

    if (!pokemon.innerHTML.toLocaleLowerCase().includes(values)) {
      pokemon.parentElement.style.display = "none";
    }
  });
});
