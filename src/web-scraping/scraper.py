from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import csv

def start_browser(URL):
    options = Options()
    options.add_argument("start-maximized")
    options.add_argument("disable-infobars")
    options.add_argument("--disable-extensions")
    options.add_argument('--headless')
    browser = webdriver.Chrome(options=options)
    browser.get(URL)
    return browser

def append_to_csv(title, ingredients_table, nutrient_table, recipe_url):
    headers = [th.text for th in ingredients_table.select("tr th")]
    with open("recipes.csv", "a") as f:
        print('Writing to csv...')
        wr = csv.writer(f)
        wr.writerow(headers)
        wr.writerow([title])
        wr.writerow([recipe_url])
        wr.writerows([[td.text for td in row.find_all("td")] for row in ingredients_table.select("tr + tr")])
        wr.writerows([[td.text for td in row.find_all("td")] for row in nutrient_table.findAll("tr", class_="smallRows")])
    return True

def get_ingredients_table(browser):
    html = browser.page_source
    soup = BeautifulSoup(html, features="html.parser")
    ingredients_table = soup.find("div", id="ingredient_nutri")
    return ingredients_table

def get_nutrient_table(browser):
    html = browser.page_source
    soup = BeautifulSoup(html, features="html.parser")
    nutrient_table = soup.find("table", class_="highlight striped")
    return nutrient_table

def get_title(browser):
    html = browser.page_source
    soup = BeautifulSoup(html, features="html.parser")
    title = soup.find("h3").text
    return title

def generate_recipe_database(URL):
    browser = start_browser(URL)
    browser.find_element_by_css_selector("#test1 > form > div.input-group-btn.input-group-append > center > input").click()
    WebDriverWait(browser, 20).until(EC.presence_of_element_located((By.CSS_SELECTOR, "#mainBodyHeading"))).click()
    html = browser.page_source
    soup = BeautifulSoup(html, features="html.parser")
    for a in soup.find_all("a", target="_blank", href=True):
        if a['href'].startswith("/recipedb/search_recipeInfo"):
            recipe_url = URL+a['href'].replace('/recipedb/', '')
            browser.get(recipe_url)
            browser.find_element_by_css_selector("body > div.container > div:nth-child(3) > div > div:nth-child(1) > ul > li:nth-child(2) > a").click()
            title = get_title(browser)
            ingredients_table = get_ingredients_table(browser)
            nutrient_table = get_nutrient_table(browser)
            append_to_csv(title, ingredients_table, nutrient_table, recipe_url)
    browser.quit()

URL = "https://cosylab.iiitd.edu.in/recipedb/"
generate_recipe_database(URL)
