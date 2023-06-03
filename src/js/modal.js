export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    //Fetch recipe
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    // console.log(res, data);

    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      source_url: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    console.log(error);
  }
};
