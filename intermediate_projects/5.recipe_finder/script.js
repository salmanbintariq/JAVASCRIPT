// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const mealsContainer = document.getElementById("meals");
const resultHeading = document.getElementById("resultHeading");
const errorContainer = document.getElementById("errorContainer");
const mealDetails = document.getElementById("mealDetails");
const mealDetailsContent = document.querySelector(".meal-details-content");
const backBtn = document.getElementById("backBtn");

// URL's
const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";
const SEARCH_URL = `${BASE_URL}search.php?s=`;
const LOOKUP_URL = `${BASE_URL}lookup.php?i=`;

searchBtn.addEventListener("click",searchMeal);
mealsContainer.addEventListener("click",handleMealClick);
backBtn.addEventListener("click", ()=> mealDetails.classList.add("hidden"));
searchInput.addEventListener("keypress",(e)=>{
  if(e.key == "Enter") searchMeal();
});

async function searchMeal(){
  const searchTerm = searchInput.value.trim();

  if (!searchTerm){
    errorContainer.textContent = "Please enter a search term!";
    errorContainer.classList.remove("hidden");
    return
  };

  try{
    resultHeading.textContent = `Searching for "${searchTerm}"...`;
    mealsContainer.innerHTML = "";
    errorContainer.classList.add("hidden");

    const res = await fetch(`${SEARCH_URL}${searchTerm}`);
    // Check HTTP status
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status} ${res.statusText}`);
    }

    // Parse response
    const data = await res.json();

    // Check if meals were found
    if (!data.meals){
      resultHeading.textContent = "";
      mealsContainer.innerHTML = "";
      errorContainer.textContent = `No meals found for "${searchTerm}". Try a different search term.`;
      errorContainer.classList.remove("hidden");
      return;
    }
    resultHeading.textContent = `Search results for "${searchTerm}"...`;
    displayMeals(data.meals);
    searchInput.value = "";
    // console.log("Data is here",data);


  }catch (error){
    // console.log("Error fetching meals:",error);
    resultHeading.textContent = "";
    errorContainer.textContent = "Failed to fetch meals. Please try again later.";
    errorContainer.classList.remove("hidden");
  }
}

// Display meals
function displayMeals(meals){
  mealsContainer.innerHTML = "";
  meals.forEach(meal => {
    mealsContainer.innerHTML += `
    <div class="meal" data-meal-id="${meal.idMeal}">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}"
      <div class="meal-info">
        <h3 class="meal-title">${meal.strMeal}</h3>
        <div class="meal-category">${meal.strCategory}</div>
      </div>
    </div>
    `;
  }); 
};

async function handleMealClick(e){
  const mealEl = e.target.closest(".meal");
  if(!mealEl) return

  const mealId = mealEl.getAttribute("data-meal-id");

  try {
    const res = await fetch(`${LOOKUP_URL}${mealId}`);
    // Check HTTP status
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status} ${res.statusText}`);
    };
    const data = await res.json();
    if (data.meals && data.meals[0]){
    const meal = data.meals[0]

    const ingredients = [];
    for (let i=0; i<=20; i++){
      if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`].trim()!==""){
        ingredients.push({
          ingredient: meal[`strIngredient${i}`],
          measure: meal[`strMeasure${i}`]
        })
      }
    };

    // Generate HTML for meal details
      mealDetailsContent.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-details-img">
        <h2 class="meal-details-title">${meal.strMeal}</h2>
        
        <div class="meal-details-category">
          <span>${meal.strCategory}</span>
        </div>
        
        <div class="meal-details-instruction">
          <h3>Instructions</h3>
          <p>${meal.strInstructions}</p>
        </div>
        
        <div class="ingredients-section">
          <h3>Ingredients (${ingredients.length})</h3>
          <ul class="ingridients-list">
            ${ingredients.map(item => `
              <li>
                <i class="fas fa-check-circle"></i>
                ${item.measure ? `${item.measure} of` : ""} ${item.ingredient}
              </li>
            `).join("")}
          </ul>
        </div>
        
        ${meal.strYoutube ? `
          <a href="${meal.strYoutube}" target="_blank" class="youtube-link">
            <i class="fab fa-youtube"></i> Watch on YouTube
          </a>
        ` : ""}
      `;

      mealDetails.classList.remove("hidden");
      mealDetails.scrollIntoView({behavior:"smooth"});
  };
  console.log(data)

  } catch (error) {
    errorContainer.textContent = "Failed to fetch meals. Please try again later.";
    errorContainer.classList.remove("hidden");
    // Show error in details container
    mealDetailsContent.innerHTML = `
      <div class="error">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Failed to load meal details</p>
      </div>
    `;

  }
};