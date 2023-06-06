// import icons from '../img/icons.svg'; // Parcel 1

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as modal from './modal';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

import { async } from 'regenerator-runtime';

const recipeContainer = document.querySelector('.recipe');

// if (module.hot) {
//   module.hot.accept();
// }

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

    //Test
    // controlServings();

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

    resultsView.render(modal.getSearchResultPage());

    //Render initial pagination buttons
    paginationView.render(modal.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(modal.getSearchResultPage(goToPage));
  //Render New pagination buttons
  paginationView.render(modal.state.search);
};

const controlServings = function (newServings) {
  //Update the recipe servings(in State)
  modal.updateServings(newServings);
  // Update the recipe view
  recipeView.render(modal.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
