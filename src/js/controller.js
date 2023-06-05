// import icons from '../img/icons.svg'; // Parcel 1

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as modal from './modal';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
// import { async } from 'regenerator-runtime';

const recipeContainer = document.querySelector('.recipe');

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    //Loading Spinner
    recipeView.renderSpinner();

    // loadRecipe
    await modal.loadRecipe(id);

    // 2) Render recipe
    recipeView.render(modal.state.recipe);

    // recipeContainer.innerHTML = '';
    // recipeContainer.insertAdjacentHTML('afterbegin', markeup);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query);
    await modal.loadSearchResults(query);

    resultsView.render(modal.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
