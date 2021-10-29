import mysql.connector


'''
Sets up an SQL database in the localhost (default username and password = root) called fitmymacros. 
Only has to be run once
'''
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="fitmymacros"
)

mycursor = mydb.cursor()

mycursor.execute("CREATE TABLE recipes (title TEXT, ingredients TEXT, url TEXT, kcal DOUBLE, protein DOUBLE, fat DOUBLE, carbohydrate DOUBLE, id INT AUTO_INCREMENT PRIMARY KEY)")