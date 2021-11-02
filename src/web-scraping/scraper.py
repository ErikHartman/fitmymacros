from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import csv
import time
import mysql.connector
import itertools


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

def generate_sql_values(title, ingredients_table, nutrient_table, recipe_url, instructions):
    ingredients_table = [[td.text for td in row.find_all("td")] for row in ingredients_table.select("tr + tr")]
    nutrient_table = [[td.text for td in row.find_all("td")] for row in nutrient_table.findAll("tr", class_="smallRows")]
    fat = nutrient_table[0][-1]
    carbohydrates = nutrient_table[1][-1]
    protein = nutrient_table[2][-1]
    energy = nutrient_table[3][-1]
    ingredient_headers = ['Quantity',	'Unit', 'State',	'Energy (kcal)',	'Carbohydrates (g)',	'Protein (g)',	'Total Lipid (Fat) (g)']
    sql_dict = {'title':title, 'url':recipe_url, 'ingredient-headers': ingredient_headers, 'ingredients':ingredients_table, 'fat':fat, 'protein':protein, 'carbohydrates':carbohydrates, 'kcal':energy, 'instructions': instructions}
    return sql_dict


def append_to_sql_table(sql_dict):
    def join_l(l, sep):
        li = iter(l)
        string = str(next(li))
        for i in li:
            string += str(sep) + str(i)
        string = string.replace('[','').replace(']','').replace('\'', '')
        return string
    mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="fitmymacros"
    )
    mycursor = mydb.cursor()
    sql = "INSERT INTO recipes (title, url, ingredients, kcal, protein, fat, carbohydrate, instructions) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    title = sql_dict["title"]
    url = sql_dict["url"]
    ingredients = join_l(list(itertools.chain(sql_dict["ingredients"])), '\n')
    kcal = sql_dict["kcal"]
    protein = sql_dict["protein"]
    carbohydrates = sql_dict["carbohydrates"]
    fat = sql_dict["fat"]
    instructions = sql_dict["instructions"]
    sql_vals = (f'{str(title)}',f'{str(url)}',f'{str(ingredients)}',f'{float(kcal)}',f'{float(protein)}',f'{float(fat)}',f'{float(carbohydrates)}',f'{str(instructions)}')
    mycursor.execute(sql, sql_vals)
    mydb.commit()

    print(mycursor.rowcount, "record inserted.")
    return True

def get_recipe_url(browser):
    html = browser.page_source
    soup = BeautifulSoup(html, features="html.parser")
    li_list = soup.find_all('li', class_='collection-item avatar')
    recipe_url = None
    for li in li_list:
        a = li.find_all('i', class_="fa fa-search circle")
        if (len(a) > 0):
            recipe_url = li.find('a', target='_blank')['href']
    return recipe_url

def get_ingredients_table(browser):
    browser.find_element_by_css_selector("body > div.container > div:nth-child(3) > div > div:nth-child(1) > ul > li:nth-child(2) > a").click()
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

def get_instructions(browser):
    browser.find_element_by_css_selector("body > div.container > div:nth-child(3) > div > div:nth-child(1) > ul > li:nth-child(4) > a").click()
    html = browser.page_source
    soup = BeautifulSoup(html, features="html.parser")
    instructions_div = soup.find("div", id="steps")
    paragraphs = instructions_div.find_all('p')
    instructions = ''
    for p in paragraphs:
        instructions += '\n' + ''.join(p.findAll(text = True))
    print(instructions)
    return instructions

def generate_recipe_database(URL):
    start = time.time()
    main_browser = start_browser(URL)
    sub_browser = start_browser(URL)
    main_browser.find_element_by_css_selector("#test1 > form > div.input-group-btn.input-group-append > center > input").click()
    sub_browser.find_element_by_css_selector("#test1 > form > div.input-group-btn.input-group-append > center > input").click()
    WebDriverWait(main_browser, 20).until(EC.presence_of_element_located((By.CSS_SELECTOR, "#mainBodyHeading"))).click() # now the browser sits on list page
    WebDriverWait(sub_browser, 20).until(EC.presence_of_element_located((By.CSS_SELECTOR, "#mainBodyHeading"))).click()
    has_next_page = True
    while has_next_page:
        html = main_browser.page_source
        soup = BeautifulSoup(html, features="html.parser")
        for a in soup.find_all("a", target="_blank", href=True):
            if a['href'].startswith("/recipedb/search_recipeInfo"):
                recipe_url = URL+a['href'].replace('/recipedb/', '')
                sub_browser.get(recipe_url)
                title = get_title(sub_browser)
                ingredients_table = get_ingredients_table(sub_browser)
                nutrient_table = get_nutrient_table(sub_browser)
                origin_url = get_recipe_url(sub_browser)
                instructions = get_instructions(sub_browser)
                if origin_url == None:
                    origin_url = recipe_url
                sql_values = generate_sql_values(title, ingredients_table, nutrient_table, origin_url, instructions)
                append_to_sql_table(sql_values)
        try:
            main_browser.find_element_by_css_selector("#nextpage").click()
            WebDriverWait(main_browser, 20).until(EC.presence_of_element_located((By.CSS_SELECTOR, "#mainBodyHeading"))).click()
        except NoSuchElementException:
            has_next_page = False
    main_browser.quit()
    sub_browser.quit()
    end = time.time()
    print(f'Done in {end-start} seconds')
    return True


URL = "https://cosylab.iiitd.edu.in/recipedb/"
generate_recipe_database(URL)


