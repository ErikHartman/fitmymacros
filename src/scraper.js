const cheerio = require("cheerio"),
    axios = require("axios"),
    url = "https://www.ica.se/recept/spokkaka-728550/";

axios.get(url).then(
    (response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            console.log(html);
        }
    },
    (error) => console.log(error)
);