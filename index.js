'use strict';

const apikey='1';


// since responseJson is different depending if the user has selected drink name or
// ingredient to start, makesameformat puts the response in the same format prior
// to being displayed
function makesameformat(drinkName) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName.strDrink}`)
	  .then(response => {
	    if (response.ok) {
	      return response.json();
	    }
	    throw new Error(response.statusText);
	  })
	  .then(responseJson => displayRecipe(responseJson))
      .catch(error => alert('Sorry, this cocktail is not in our database. Please try again.'))
}

// displays ingredients and instructions in the DOM
function displayRecipe(recipe) {
  $('#options').addClass("hidden");
  $('#finalize').addClass("hidden");
  $('#cocktailrecipe').removeClass("hidden");
  recipe = recipe.drinks[0];
  $('#cocktailrecipe').append(
    `<h3>${recipe.strDrink}</h3>
    <br>
    <h4>Ingredients</h4>`
    );
  $('#cocktailrecipe').append(
    `<ul>${recipe.strMeasure1} ${recipe.strIngredient1}</ul>
    <ul>${recipe.strMeasure2} ${recipe.strIngredient2}</ul>
    <ul>${recipe.strMeasure3} ${recipe.strIngredient3}</ul>
    <ul>${recipe.strMeasure4} ${recipe.strIngredient4}</ul>
    <ul>${recipe.strMeasure5} ${recipe.strIngredient5}</ul>
    <ul>${recipe.strMeasure6} ${recipe.strIngredient6}</ul>
    <ul>${recipe.strMeasure7} ${recipe.strIngredient7}</ul>
    <ul>${recipe.strMeasure8} ${recipe.strIngredient8}</ul>
    <ul>${recipe.strMeasure9} ${recipe.strIngredient9}</ul>
    <ul>${recipe.strMeasure10} ${recipe.strIngredient10}</ul>`
    );
  $('#cocktailrecipe').append(
    `<br>
    <h4>Instructions</h4>`
    );
  $('#cocktailrecipe').append(
    `<img src="${recipe.strDrinkThumb}">
    <p>${recipe.strInstructions}</p>`
    );
}

// displays list of possible drinks that meet the name or ingredient criteria
// selected by the user in the DOM
function showOptions(options) {
  $('#options').removeClass("hidden");
  $('#cocktailoptions').addClass("hidden");
  $('#ingredientoptions').addClass("hidden");
  $('#options-list').empty(); //empty the screen of old results
  for (let i=0; i<(options.drinks.length); i++) {
    $('#options-list').append(
      `<input type="radio" name="whichcocktail" value=${i}> ${options.drinks[i].strDrink}<br>`)
  }
  $('#finalize').removeClass("hidden");
  $('#finalselect').click(event => {
    event.preventDefault();
    let selection = $('input[name="whichcocktail"]:checked').val();
    makesameformat(options.drinks[selection]);
  })
}

// retrieves the list of drinks that meet the drink name criteria selected
// by the user via thecocktaildb.com api
function getRecipes() {
  console.log('getting Recipe');
  $('#cocktailoptions').removeClass("hidden");
  $('#introduction').addClass("hidden");
  $('#cocktailsearch').click(event => {
    event.preventDefault();
    let cocktail= $('input[name="cocktailname"]').val();
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => showOptions(responseJson))
      .catch(error => alert('Sorry, this cocktail is not in our database. Please try again.'))
  })
}

// retrieves the list of drinks that meet the ingredient criteria selected
// by the user via thecocktaildb.com api
function getList() {
  console.log('getting List');
  $('#ingredientoptions').removeClass("hidden");
  $('#introduction').addClass("hidden");
  $('#ingredientsearch').click(event => {
    event.preventDefault();
    let ingredient= $('input[name="ingredientname"]').val();
    console.log(ingredient);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => showOptions(responseJson))
      .catch(error => alert('Sorry, this ingredient is not in our database. Please try again.'))
  })
}

// landing page for Mulan's Mixology, offering options to search the database 
// using a cocktail name/keyword or by ingredient
function watchForm() {
  $('#initialselect').click(event => {
    event.preventDefault();
    let option = $('input[name="whichoption"]:checked').val();
    if (option === "0") {
      console.log("goto getRecipes");
      getRecipes();
    } else if (option === "1") {
      getList();
    }
  })
}


$(function() {
  console.log('Cocktails App loaded. Waiting for submit!')
  watchForm();
});