function jsonify(str) {
    var obj = {};
    str.split("\n").forEach((line) => {
        var key = line.split(" = ")[0];
        var value = line.split(" = ")[1];
        obj[key] = value;
    });
    return obj;
}

function get_ingredient_list(url) {
    const cheerio = require("cheerio"),
        axios = require("axios"),
        ingredient_list = [];
    axios.get(url).then(
        (response) => {
            if (response.status === 200) {
                const $ = cheerio.load(response.data);
                $("div.ingredients-list-group__card").each((index, element) => {
                    const qty = $(element)
                        .children()
                        .first()
                        .text()
                        .replace(/\n/g, "")
                        .replace(/ /g, "");
                    const ingr = $(element)
                        .children()
                        .last()
                        .text()
                        .replace(/\n/g, "")
                        .replace(/ /g, "");
                    ingredient_list[index] = { qty, ingr };
                });

                console.log(ingredient_list);
            }
        },
        (error) => console.log(error)
    );
}

function parse_recipes(url) {
    const cheerio = require("cheerio"),
        axios = require("axios"),
        recipe_list = [];
    axios.get(url).then(
        (response) => {
            if (response.status === 200) {
                const $ = cheerio.load(response.data);
                $("").each((index, element) => {
                    // THIS DOESN'T WORK
                    const first = $(element).children().first().text();
                    recipe_list[index] = { first };
                });

                console.log(recipe_list);
            }
        },
        (error) => console.log(error)
    );
}

// now we need a function to parse through all recipies on ICA
parse_recipes("https://www.ica.se/recept/");
//get_ingredient_list("https://www.ica.se/recept/spokkaka-728550/");