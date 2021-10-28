
from bs4 import BeautifulSoup
import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC

import csv



def get_html(URL):
    def scrollDown(browser, numberOfScrollDowns):
        body = browser.find_element_by_tag_name("body")
        while numberOfScrollDowns >=0:
            body.send_keys(Keys.PAGE_DOWN)
            numberOfScrollDowns -= 1
        return browser
    options = Options()
    options.add_argument("start-maximized")
    options.add_argument("disable-infobars")
    options.add_argument("--disable-extensions")
    options.add_argument('--headless')
    driver = webdriver.Chrome(options=options)
    driver.get(URL)
    browser = scrollDown(driver, 200)
    html = browser.page_source
    browser.quit()
    return html


def get_recipe(URL):
    html = get_html(URL)
    soup = BeautifulSoup(html, features="html.parser")
    results = soup.find(class_="ingredients-list-group row-noGutter-column")
    recipe = results.find_all("div", class_="ingredients-list-group__card")
    title = soup.find('h1', class_="recipe-header__title").text
    ingredients = [re.sub(' +', ' ',ingredient.text.replace('\n','').strip()) for ingredient in recipe]
    return title, ingredients

def parse_recipes(URL):
    html = get_html(URL)
    soup = BeautifulSoup(html, features="html.parser")
    results = soup.find_all("a", class_="js-track-listing-recipe", href=True)
    hrefs = set([a['href'] for a in results])
    recipe_dict = {}
    for href in hrefs:
        title, ingredients = get_recipe(href)
        recipe_dict[title] = ingredients
        print(title, ingredients)
    return recipe_dict


def recipe_to_csv(recipe_dict):
    path= "/home/erikh/killer-app/database/recipes.csv"
    rows_added = 0
    with open(path, 'wb+') as csv_file:  
        writer = csv.writer(csv_file)
        for key, value in recipe_dict.items():
            writer.writerow([key, value])
            rows_added+=1
    print(f"Rows added: {rows_added}")
    return True


URL = "https://www.ica.se/recept/"

recipe_dict = parse_recipes(URL)
recipe_to_csv(recipe_dict)

