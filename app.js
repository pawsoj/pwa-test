const main = document.querySelector('#articles-container');
const apiKey = '776f4d37958b4e47b501ad9fadac4518'
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'abc-news'

window.addEventListener('load', async e => {
  updateNews();
  await updateSources();
  sourceSelector.value = defaultSource;

  sourceSelector.addEventListener('change', e => {
    updateNews(e.target.value);
  });

  if('serviceWorker' in navigator){
    try {
      navigator.serviceWorker.register('sw.js');
      console.log("SW registered");
    } catch (error) {
      console.log("SW not registered");
    }
  }
});

async function updateSources() {
  const res = await fetch('https://newsapi.org/v2/sources?apiKey=' + apiKey)
  const json = await res.json();

  sourceSelector.innerHTML = json.sources.map(src => `<option value=${src.id}>${src.name}</option>'`).join('\n');
}

async function updateNews(source = defaultSource) {
  const res = await fetch(`https://newsapi.org/v2/everything?sources=${source}&apiKey=${apiKey}`)
  const json = await res.json();

  main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
  return `
  <div class="col-lg-4 d-flex align-items-stretch">
  <div class="card">
  <img class="card-img-top" src="${article.urlToImage}" alt="${article.title}">
  <div class="card-body">
    <h5 class="card-title">${article.title}</h5>
    <p class="card-text">${article.description}</p>
    <a href="${article.url}" class="btn btn-primary">More</a>
  </div>
</div>
</div>
    `;
}