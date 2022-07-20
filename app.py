

from crypt import methods
from csv import unregister_dialect
from ctypes import addressof
from fileinput import filename


from itertools import count
import math
from multiprocessing.sharedctypes import Value
from operator import truediv
from optparse import Values
import profile
from shutil import register_unpack_format
from sqlite3 import Row
from sre_constants import SUCCESS
from tarfile import RECORDSIZE
from unittest import result
from flask import Flask, render_template, request, session, redirect, url_for, flash
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import mimetypes

import datetime
import os
import io

from flask_mysqldb import MySQL

UPLOAD_FOLDER = 'static/picture'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
UPLOAD_FOLDER_PDF = 'static/pdf'


# conn=mysql.connector.connect(host='localhost',port='3306',database='mydb_1', user='root',password='')
# cursor=conn.cursor()
app = Flask(__name__)
app.secret_key = "super secret key"


app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'mydb_1'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['UPLOAD_FOLDER_PDF'] = UPLOAD_FOLDER_PDF

mysql = MySQL(app)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/login', methods=['GET', 'POST'])
def login():

    if request.method == 'POST':

        userDetails = request.form

        email = userDetails['email']
        password = userDetails['password']
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM admin_login WHERE email='" +
                    email+"' AND password='"+password+"'")
        result = cur.fetchall()
        mysql.connection.commit()
        count = cur.rowcount

        cur.execute("SELECT * FROM user_login WHERE email='"+email+"'")
        result1 = cur.fetchone()
        mysql.connection.commit()
        count1 = cur.rowcount

        if count == 1:
            session['username'] = email
            flash("Login successfully")

            return redirect('/users')
        elif count1 == 1:
            password_rs = result1[3]
            sucess = check_password_hash(password_rs, password)
            if sucess:
               
                
                session['uid'] = result1[0]
                return redirect("/user_deshboard")
            else:
                error = "Invalid credentials"
                return render_template('index.html', error=error)
        else:

            error = "Incorrect username/password"
            return render_template('index.html', error=error)
    else:

        return render_template('index.html')


@app.route('/users')
def users():
    if session["username"]:

        cur = mysql.connection.cursor()
        cur.execute(
            "SELECT * FROM user_profile,user_login WHERE user_login.id = user_profile.user_id ORDER BY user_profile.user_id DESC")
        result = cur.fetchall()
        if result:
            return render_template('users.html', result=result)
    else:
        return redirect('login')


@app.route('/user_deshboard')
def user_deshboard():
    if session["uid"]:
        user_id = session['uid']
        cur = mysql.connection.cursor()
        cur.execute(
            f"SELECT * FROM user_login,user_profile where user_login.id = '{user_id}' and user_profile.user_id='{user_id}'")
        userdetails = cur.fetchone()
        return render_template('user_deshboard.html', value=userdetails)
    else:
        return redirect('login')


@app.route('/') 
def index():
    
    if 'username' in session:
        return redirect(url_for('users'))
    elif 'uid' in session:
        return redirect(url_for('user_deshboard'))
    else:
        return redirect(url_for('login'))


@app.route('/insert', methods=['GET', 'POST'])
def insert():
    if request.method == 'POST':
        userDetails = request.form
        email = userDetails['email']
        user_name = userDetails['user_name']
        password = userDetails['password']
        hash_pwd = generate_password_hash(password)
        cur = mysql.connection.cursor()
        mysql.connection.commit()
        cur.execute(
            f"""INSERT INTO user_login (email,user_name,password) VALUES('{email}','{user_name}','{hash_pwd}')""")
        cur.execute("SELECT max(id) FROM user_login")
        new_id = cur.fetchone()

        cur.execute(
            f"""INSERT INTO user_profile (user_id)VALUES('{new_id[0]}')""")
        mysql.connection.commit()
        cur.close()

        return redirect('/users')


@app.route('/edit', methods=['GET', 'POST'])
def edit():
    if request.method == 'POST':
        userDetails = request.form
        user_id = userDetails['user_id']
        first_name = userDetails['first_name']
        last_name = userDetails['last_name']
        date_of_birth = userDetails['date_of_birth']
        mobile_no = userDetails['mobile_no']
        gender = userDetails['gender']
        address = userDetails['address']
        city = userDetails['city']
        state = userDetails['state']
        zipcode = userDetails['zipcode']
        date_modified = datetime.date.today()
        cur = mysql.connection.cursor()
        cur.execute("UPDATE user_profile SET first_name='"+first_name+"',last_name=+'"+last_name+"', date_of_birth='"+date_of_birth+"',mobile_no='" +
                    mobile_no+"',gender='"+gender+"', city='"+city+"',address='"+address+"',state='"+state+"',zipcode='"+zipcode+"' WHERE user_id='"+user_id+"'")
        mysql.connection.commit()
        cur.close()
        return redirect('/users')


@app.route("/edit-profile/<int:user_id>")
def edit_user(user_id):
    if session['uid']:

        cur = mysql.connection.cursor()
        cur.execute(
            f"SELECT * FROM user_login,user_profile where user_login.id = '{user_id}' and user_profile.user_id = '{user_id}'")
        value = cur.fetchone()
        cur.close()
        return render_template("useredit.html", value=value)
    else:
        return redirect(url_for('user_deshboard'))


@app.route('/edituser', methods=['GET', 'POST'])
def edituser():
    if request.method == 'POST':
        userDetails = request.form
        id = userDetails['id']
        user_id = userDetails['user_id']
        first_name = userDetails['first_name']
        last_name = userDetails['last_name']
        date_of_birth = userDetails['date_of_birth']
        mobile_no = userDetails['mobile_no']
        editgender = userDetails['editgender']
        address = userDetails['address']
        city = userDetails['city']
        state = userDetails['state']
        date_update = datetime.date.today()
        zipcode = userDetails['zipcode']

        files = request.files.getlist('files[]')
        pdf = request.files['pdf[]']
        # print(files)
        for file in files:
            # file_like = io.BytesIO(files[16])
            # file = PIL.Image.open(file_like)
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                pname = secure_filename(pdf.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                pdf.save(os.path.join(app.config['UPLOAD_FOLDER_PDF'], pname))
                cur = mysql.connection.cursor()
                cur.execute(
                    f"SELECT * FROM user_login,user_profile where user_login.id = '{user_id}' and user_profile.user_id = '{user_id}'")
                values = cur.fetchone()

                sql_update_query = f"""Update user_profile 
                               set first_name='{first_name}', last_name='{last_name}', date_of_birth='{date_of_birth}',
                                   mobile_no='{mobile_no}', gender='{editgender}', address='{address}', city='{city}',
                                   state='{state}', zipcode='{zipcode}',image='{filename}',pdf='{pname}', profile_updated_date='{date_update}' where user_id='{user_id}'"""
                cur.execute(sql_update_query)
        # cur.execute(f"UPDATE user_profile SET first_name='"+first_name+"',last_name=+'"+last_name+"', date_of_birth='"+date_of_birth+"',mobile_no='"+mobile_no+"',gender='"+editgender+"', city='"+city+"',address='{address}',profile_updated_date='{date_update}',state='"+state+"',zipcode='"+zipcode+"' WHERE user_id='"+user_id+"'")
                mysql.connection.commit()
                cur.close()

                return redirect('user_deshboard')
            else:
                return render_template("user_deshboard.html")


@app.route('/delete/<int:user_id>/')
def delete(user_id):
    cur = mysql.connection.cursor()
    cur.execute(f"DELETE FROM user_profile WHERE user_id='{user_id}'")
    cur.execute(f"DELETE FROM user_login where id ='{user_id}'")
    mysql.connection.commit()
    cur.close()
    return redirect(url_for('users'))


@app.route('/adminlogout')
def adminlogout():
    session['username'] = False 
    return render_template("index.html")


@app.route('/userlogout')
def userlogout():
    session['uid'] = False
    return render_template("index.html")


@app.route("/cpassword", methods=['GET', 'POST'])
def cpassword():
    if request.method == 'POST':
        userDetails = request.form
        id = userDetails['id']
        password = userDetails['password']
        hash_pwd = generate_password_hash(password)
        cpassword = userDetails['cpassword']

        cur = mysql.connection.cursor()
        cur.execute("UPDATE user_login SET password='" +
                    hash_pwd+"' WHERE id='"+id+"'")
        mysql.connection.commit()
        cur.close()
        return redirect('/users')


@app.route("/insertvalidate", methods=['POST'])
def insertvalidate():
    if request.method == "POST":
        email = request.get_json()['email']
    return

    # cur = mysql.connection.cursor()
    # cur.execute("SELECT * FROM user_login where id = id")
    # values = cur.fetchone()
    # return render_template("conpassword.html", values=values)


# @app.route("/update-password/<email>", methods=["GET", "POST"])
# def updatepassword(email):
#         password = request.form.get("password")
#         cpassword = request.form.get("cpassword")
#         id = request.form.get("id")
#         if request.method == "POST":

#             if password == cpassword:
#                 confirmpassword()
#             else:
#                 error = "Password and Confirm password doesn't match..."
#                 cur = mysql.connection.cursor()
#                 cur.execute("SELECT * FROM user_login WHERE user_login.id = user_profile.user_id ORDER BY user_login.id DESC")
#                 values = cur.fetchone()
#                 return render_template("conpassword.html", values=values, error=error)

#         return redirect(url_for('users'))

# def confirmpassword():
#     cur = mysql.connection.cursor()
#     id = request.form.get("id")
#     password = request.form.get("password")
#     cur.execute(f"UPDATE user_login SET password='{password}' WHERE id ='{id}'")
#     mysql.connection.commit()
#     cur.close()
#     return redirect(url_for('users'))


if __name__ == "_main_":
    app.run(host='0.0.0.0', port=4000, debug=True)
