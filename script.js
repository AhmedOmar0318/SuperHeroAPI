const randomSuperHero = document.getElementById('getSuperhero');
const heroImageDiv = document.getElementById('heroImage');
const searchButton = document.getElementById('searchButton');
const searchedHero = document.getElementById('hero');
const numberOfHeroes = 733;
const SUPERHERO_TOKEN = '3492498610968981';
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`;

const displaySuperhero = (superhero) => {
  const name = `<p>Hero Name: ${superhero.name}</p>`;
  searchedHero.value = '';
  heroImageDiv.innerHTML = 
    `${name}<img src="${superhero.image.url}" alt='' height = 100 width = 100  />`;
  fetch(`${BASE_URL}/${superhero.id}/powerstats`)
    .then(response => response.json())
    .then(powerstats => {    
      heroImageDiv.innerHTML +=
        `<p>Powerstats:<br> 
        Intelligence: ${powerstats.intelligence}<br>
        Strength: ${powerstats.strength}<br>
        Speed: ${powerstats.speed}<br>
        Power: ${powerstats.power}<br>
        Combat: ${powerstats.combat}<br>
        Durability: ${powerstats.durability}     
        </p>`;
    });
};

const getSuperHeroById = (id) => {
  fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(superhero => {
      displaySuperhero(superhero);
    });
};

const searchSuperHeroByName = (name) => {
  fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
      const results = json.results;
      if (!results || results.length === 0) {    
        heroImageDiv.innerHTML = `<p>Can't find the searched superhero.</p>`;
        return;
      }
      const superhero = results[0]; 
      displaySuperhero(superhero);
    });
};

const getRandomSuperHero = () => {
  const randomId = Math.floor(Math.random() * numberOfHeroes) + 1;
  getSuperHeroById(randomId);
};

randomSuperHero.onclick = getRandomSuperHero;
searchButton.onclick = () => searchSuperHeroByName(searchedHero.value);
