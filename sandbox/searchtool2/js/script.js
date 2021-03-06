var app = {
  inputMin: 3,
  cards: []
};

// CIBLAGE
var textSearch        = document.getElementById('txtSearch');
var searchResults     = document.getElementById('searchResults');
var nbResults         = document.getElementById('nbResults');

// EVENEMENTS
textSearch.addEventListener('keyup', function(e) {
  searchResults.innerHTML = '';
  nbResults.innerHTML = '';

  if (this.value.length >= app.inputMin) {

    var searchedValue = this.value.toLowerCase();

    // To Do: requête ajax pour obtenir données filtrées par serveur
    // filtrage
    var url = 'search.php?s=' + searchedValue;
    promise.get(url).then(function(err, res, xhr) {
      // instructions à éxécuter lorsque la réponse
      // du serveur nous parvient
      app.cards = JSON.parse(res); // conversion de la chaîne
      // de caractères json en tableau JS

      displayResults(); // affichage des resultats dans le DOM

      // affichage du nombre de cartes trouvées
      nbResults.innerHTML =
        '<strong>' + app.cards.length + '</strong>  carte(s) trouvée(s)';

    });

  }

});

textSearch.addEventListener('click', function() {
  this.value = '';
});

// FONCTIONS
function displayResults() {
  // affichage des résultats de la recherche
  app.cards.forEach(function(card) {
    // à chaque itération, créatin d'un node li
    var li = document.createElement('li');
    li.innerHTML = cardMarkup(card);
    var spanCardName = li.childNodes[0].childNodes[1];
    spanCardName.addEventListener('mouseover', displayBigCardImg);
    spanCardName.addEventListener('mouseleave', displayBigCardImg);
    searchResults.appendChild(li); // insérer dans le DOM
  });
}

function cardMarkup(card) {
  var markup = '';
  markup += '<div class="card">';
  markup += '<img class="small" alt="" src="img/cards/'+ card.img +'">';
  markup += '<span class="cardName">'+ card.name +'</span>';
  markup += '<img class="big"  alt="" src="img/cards/'+ card.img +'">';
  markup += '</div>';
  return markup;
}

function displayBigCardImg() {
  var img = this.nextSibling;
  var display = img.style.display;

  img.style.display =
    (display == 'none' || display == '') ? 'inline' : 'none';
}

function init() {
  textSearch.value = 'Chercher une carte...';
}


// DEMARRAGE
init();








//
