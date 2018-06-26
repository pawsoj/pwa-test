const main = document.querySelector('main');
const apiKey = '776f4d37958b4e47b501ad9fadac4518'
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'abc-news'

window.addEventListener('load', async e => {
    updateNews(); 
    await updateSources();
    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener('change', e => {
      updateNews(e.target.value);
    })
});

async function updateSources(){
  const res = await fetch('https://newsapi.org/v2/sources?apiKey=' + apiKey)
  const json = await res.json();

  sourceSelector.innerHTML = json.sources.map(src=>`<option value=${src.id}>${src.name}</option>'`).join('\n');
}

async function updateNews(source = defaultSource){
    const res = await fetch(`https://newsapi.org/v2/everything?sources=${source}&apiKey=${apiKey}`)
    const json = await res.json();

    main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
    return `
      <div class="article">
        <a href="${article.url}">
          <h4>${article.title}</h4>
          <img class="img-thumbnail" src="${article.urlToImage}" alt="${article.title}">
          <p>${article.description}</p>
        </a>
      </div>
    `;
  }