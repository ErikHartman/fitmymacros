
from bs4 import BeautifulSoup
import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By



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
    browser = scrollDown(driver, 10)
    html = browser.page_source
    browser.quit()
    return html


def click_button(driver, xpath):
    python_button = driver.find_elements_by_xpath(xpath)[0]
    python_button.click()

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
    
    for href in hrefs:
        print(get_recipe(href))

URL = "https://www.ica.se/recept/"
parse_recipes(URL)

