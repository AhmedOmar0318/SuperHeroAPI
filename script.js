const randomSuperHero = document.getElementById('getSuperhero');
const heroImageDiv = document.getElementById('heroImage');
const searchButton = document.getElementById('searchButton');
const searchedHero = document.getElementById('hero');
const numberOfHeroes = 733;
const SUPERHERO_TOKEN = '3492498610968981';
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`;

const displaySuperHero = async (superhero) => {
  const url = `${BASE_URL}/${superhero.id}/powerstats`
  const name = `<p>Hero Name: ${superhero.name}</p>`;
  searchedHero.value = ''
  heroImageDiv.innerHTML = 
    `${name}<img src="${superhero.image.url}" alt='' height = 100 width = 100  />` 
  const response = await fetch(url)
  const data = await response.json()      
    heroImageDiv.innerHTML +=
        `<p>Powerstats<br><br> 
        Intelligence: ${data.intelligence}<br>
        Strength: ${data.strength}<br>
        Speed: ${data.speed}<br>
        Power: ${data.power}<br>
        Combat: ${data.combat}<br>
        Durability: ${data.durability}     
        </p>`  
}

const getSuperHeroById = async (id) => {
  const url = `${BASE_URL}/${id}`
  const response = await fetch(url)
    const data = await response.json()    
      displaySuperHero(data)    
}

const searchSuperHeroByName = async (name) => {
  const url = `${BASE_URL}/search/${name}`
  const response = await fetch(url)
    const data = await response.json()   
      const results = data.results;
      if (!results || results.length === 0) {    
        heroImageDiv.innerHTML = `<p>Can't find the searched superhero.</p>`;
        return
      }
      const superhero = results[0] 
      displaySuperHero(superhero)    
}

const getRandomSuperHero = () => {
  const randomId = Math.floor(Math.random() * numberOfHeroes) + 1;
  getSuperHeroById(randomId)
}

randomSuperHero.onclick = getRandomSuperHero;
searchButton.onclick = () => searchSuperHeroByName(searchedHero.value)

