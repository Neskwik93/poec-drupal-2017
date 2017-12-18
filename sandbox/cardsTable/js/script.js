var app = {
  cards: null,
  cardsFiltered: null,
  config: {
    searchDefaultText: 'Rechercher dans le nom...',
    searchMin: 3
  }
};

// CIBLAGE
var tableCards        = document.getElementById('tableCards');
var txtCardName       = document.getElementById('txtCardName');
var cbCaseSensivity   = document.getElementById('cbCaseSensivity');
var selectCardType    = document.getElementById('selectCardType');
var selectCardColor   = document.getElementById('selectCardColor');
var btnRemoveFilters  = document.getElementById('btnRemoveFilters');


// EVENEMENTS
txtCardName.addEventListener('click', function() {
  this.value = '';
})

// txtCardName.addEventListener('keyup', function(e) {
//   var searchedValue = this.value;
//   if (searchedValue.length >= app.config.searchMin) {
//     // filtrage par nom
//     app.cardsFiltered = app.cards.filter(function(card) {
//       // sensiblité à la casse
//
//       return (cbCaseSensivity.checked)
//         ? card.name.includes(searchedValue)
//         : card.name.toLowerCase().includes(searchedValue.toLowerCase());
//
//     });
//   } else {
//     app.cardsFiltered = app.cards;
//   }
//   displayCards();
// })


// filtrage par nom
txtCardName.addEventListener('keyup', filterCards);

// filrage par type
selectCardType.addEventListener('change', filterCards);

// filrage par couleur
selectCardColor.addEventListener('change', filterCards);

btnRemoveFilters.addEventListener('click', function() {
  filterReset();
  filterCards();
});

cbCaseSensivity.addEventListener('click', filterCards);


// FONCTIONS
function init() {

  filterReset();

  promise.get('search.php').then(function(err, res, xhr) {
    app.cards = JSON.parse(res);
    app.cardsFiltered = app.cards;
    displayCards();
  });
}

function displayCards() {
  tableCards.innerHTML = ''; // Nettoyage
  app.cardsFiltered.forEach(function(card, index) {
    var tr = document.createElement('tr');
    var html = '<td>' + (index+1) +'</td>';
    html += '<td>' + card.name + '</td>';
    html += '<td>' + card.type + '</td>';
    html += '<td>' + card.color + '</td>';
    tr.innerHTML = html;
    tableCards.appendChild(tr);
  });
}

function filterCards() {
  // fonction responsable du filtrage multiple

  var cond1 = true;
  var cond2 = true;
  var cond3 = true;

  var searchedName    = txtCardName.value;
  var searchedType    = selectCardType.value;
  var searchedColor   = selectCardColor.value;

  app.cardsFiltered = app.cards.filter(function(card) {

    if (searchedName.length >= app.config.searchMin &&
      searchedName !== app.config.searchDefaultText
    ) {
      // recherche de la valeur saisie dans le nom de la carte
      cond1 = (cbCaseSensivity.checked)
        ? card.name.includes(searchedName)
        : card.name.toLowerCase().includes(searchedName.toLowerCase());

    } else {
      cond1 = true;
    }

    cond2 = (searchedType == 0) ? true : (card.type == searchedType);
    cond3 = (searchedColor == 0) ? true: (card.color == searchedColor);

    return cond1 && cond2 && cond3;
  });

  displayCards(); // affichage des cartes filtrées

}

function filterReset() {
  // réinitialisation des champs de filtrage
  txtCardName.value = app.config.searchDefaultText;
  cbCaseSensivity.checked = false;
  selectCardType.value = 0;
  selectCardColor.value = 0;
}

// démarrage
init();












//
