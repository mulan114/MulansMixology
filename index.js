'use strict';

const apikey='1';


function makesameformat(drinkName) {
  console.log('in makesameformat');
  console.log(drinkName);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => {
        console.log(responseJson);
        return responseJson
      })
      .catch(error => alert('Sorry, this cocktail is not in our database. Please try again.'))
}


function displayRecipe(recipe) {
  console.log('displaying recipe in DOM')
  $('#options').addClass("hidden");
  $('#finalize').addClass("hidden");
  $('#cocktailrecipe').removeClass("hidden");
  console.log(recipe.strIngredient1);
  if (recipe.strIngredient1===undefined) {
    console.log('inside the if statement');
    console.log(recipe.strDrink);
    recipe = makesameformat(recipe.strDrink);
    recipe = recipe.drinks[0];
    console.log(recipe);
  }
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


function showOptions(options) {
  console.log('showing options');
  console.log(options);
  console.log(options.drinks.length);
  $('#options').removeClass("hidden");
  $('#cocktailoptions').addClass("hidden");
  $('#ingredientoptions').addClass("hidden");
  $('#options-list').empty(); //empty the screen of old results
  for (let i=0; i<(options.drinks.length); i++) {
    console.log(i);
    $('#options-list').append(
      `<input type="radio" name="whichcocktail" value=${i}> ${options.drinks[i].strDrink}<br>`)
  }
  $('#finalize').removeClass("hidden");
  $('#finalselect').click(event => {
    console.log('finalizing selection');
    event.preventDefault();
    let selection = $('input[name="whichcocktail"]:checked').val();
    console.log(selection);
    displayRecipe(options.drinks[selection]);
  })
}

function getRecipes() {
  console.log('getting Recipe');
  $('#cocktailoptions').removeClass("hidden");
  $('#introduction').addClass("hidden");
  $('#cocktailsearch').click(event => {
    console.log('getting input');
    event.preventDefault();
    let cocktail= $('input[name="cocktailname"]').val();
    console.log(cocktail);
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

function getList() {
  console.log('getting List');
  $('#ingredientoptions').removeClass("hidden");
  $('#introduction').addClass("hidden");
  $('#ingredientsearch').click(event => {
    console.log('getting input');
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

function watchForm() {
  $('#initialselect').click(event => {
    console.log('selecting option');
    event.preventDefault();
    console.log($('input[name="whichoption"]:checked').val());
    let option = $('input[name="whichoption"]:checked').val();
    if (option === "0") {
      console.log("goto getRecipes");
      getRecipes();
    } else if (option === "1") {
      console.log("goto getList");
      getList();
    }
  })
}


$(function() {
  console.log('Cocktails App loaded. Waiting for submit!')
  watchForm();
});