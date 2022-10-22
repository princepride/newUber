from flask import Flask,request,jsonify
from flask_cors import CORS
from MyGoogleMap import GoogleMaps
import datetime
import json
import sqlite3

app = Flask(__name__)
CORS(app)

@app.route("/login",methods = ["POST"])
def login():
    req = request.get_json(silent=False, force=True)
    name = req['name']
    password = req['password']
    conn = sqlite3.connect('uberdb.db')
    print('Connected to the database.')
    cursor = conn.cursor()
    res = cursor.execute(
        "SELECT name,destination FROM userprofile WHERE name is ? AND password is ?"
        ,(name,password))
    data = res.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)

@app.route("/register",methods = ["POST"])
def register():
    req = request.get_json(silent=False, force=True)
    name = req['name']
    password = req['password']
    destination = req['destination']
    conn = sqlite3.connect('uberdb.db')
    print('Connected to the database.')
    cursor = conn.cursor()
    check = cursor.execute(
        "SELECT * FROM userprofile WHERE name is ?"
        ,(name,))
    checkData = check.fetchall()
    if len(checkData) > 0:
        cursor.close()
        conn.close()
        return jsonify(False)
    else:
        cursor.execute(
        "INSERT INTO userprofile (name, destination, password) VALUES (?, ?, ?)"
        ,(name,destination,password))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify(True)
    
@app.route("/updateDestination",methods = ["POST"])
def updateDestination():
    req = request.get_json(silent=False, force=True)
    name = req['name']
    destination = req['destination']
    conn = sqlite3.connect('uberdb.db')
    print('Connected to the database.')
    cursor = conn.cursor()
    res = cursor.execute(
        "UPDATE userprofile SET destination = ? WHERE name is ?"
        ,(destination,name))
    data = res.fetchall()
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify(data)

@app.route("/chatbot",methods = ["POST"])
def chatbot():
    req = request.get_json(silent=False, force=True)
    name = req['name']
    context = req['context']
    tag1 = req['tag1']
    tag2 = req['tag2']
    print(context)
    print(tag1)
    print(tag2)
    google_maps = GoogleMaps()
    res = ['',True,True]
    if tag1 == False and tag2 == False:
        result_recommendation_list = google_maps.obtain_address_recommendation(query= context)
        obj = json.dumps(result_recommendation_list[0]["formatted_address"],indent=6)
        string1 = obj+ '\n' + '\n' + 'Are you satisfied with this result? (Please input yes or not)'
        res = [string1,True,False]
    elif tag1 == True and tag2 == False:
        if context.upper() in ['YES','NOT','NO','Y','N']:
            if context.upper() in ['YES','Y']:
                res = ['Ok, we get your wanted drop-off location.',True,True]
            else:
                res = ['Please re-input your drop-off location.',False,False]
        else:
            res = ['Your input message format is wrong. Please re-input.',True,False]
    else:
        res = ['',True,True]
    table_name = name.replace(' ','_')+"_history"
    conn = sqlite3.connect('uberdb.db')
    print('Connected to the database.')
    cursor = conn.cursor()
    cursor.execute(
        'CREATE TABLE IF NOT EXISTS '+table_name+' (date TEXT,name TEXT,context TEXT)'
        )
    cursor.execute('INSERT INTO '+table_name+' (date, name, context) VALUES (?, ?, ?)',(datetime.datetime.now(),"user",context))
    cursor.execute('INSERT INTO '+table_name+' (date, name, context) VALUES (?, ?, ?)',(datetime.datetime.now(),"bot",res[0]))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify(res)
if __name__ == "__main__":
    app.run(debug=True)


#flask run
#flask run --host=0.0.0.0