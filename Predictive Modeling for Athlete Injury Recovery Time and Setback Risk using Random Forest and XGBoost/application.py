from flask import Flask, session
from flask_session import Session
from flask import Flask, render_template, request
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
import requests
import json

app = Flask(__name__)

engine = create_engine('postgres://gzpdseeqgilgmc:f8612aed7a618933700c870247c15f70961b0a366796095091c46b8be75790b8@ec2-107-21-99-237.compute-1.amazonaws.com:5432/dasmon190o3648', echo = True)
db = scoped_session(sessionmaker(bind=engine))

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/logout")
def logout():
    session.pop('user_field', None)
    session.pop('user_mob', None)
    session.pop('sys_otp', None)
    return render_template("index.html")



#======================================      EXTERNAL PAGE LINKING      ==========================================================
#======================================      ---------------------      ==========================================================
@app.route('/equipment')
def equipment():
    return render_template("external-page/equipment.html")

@app.route('/selection')
def selection():
    return render_template("external-page/selection.html")

@app.route("/onlinecoaching")
def onlinecoaching():
    return render_template("external-page/onlinecoaching.html")

@app.route('/academy')
def academy():
    return render_template("external-page/academy.html")

@app.route('/job')
def job():
    return render_template("external-page/job.html")

@app.route('/injury_recovery')
def injury_recovery():
    return render_template("external-page/injury_recover.html")

@app.route('/portfolio')
def portfolio():
    return render_template("external-page/portfolio.html")

@app.route('/injury_remedies')
def injury_remedies():
    return render_template("external-page/injuries.html")

@app.route('/tournament')
def tournament():
    return render_template("external-page/localt.html")


@app.route('/sportcategory')
def sportcategory():
    return render_template("external-page/sportswise.html")

#======================================      MACHINE LEARNING injury_recovery LINKING      ==========================================================
import pandas as pd
@app.route("/submit_data", methods=["POST"])
def submit_data():
    if request.method == 'POST':
        injury = int(request.form.get('injury'))
        
        age = int(request.form.get('age'))
        calorie = int(request.form.get('calorie'))
        
        gender = int(request.form.get('gender'))
        weight = int(request.form.get('weight'))
        type1 = int(request.form.get('type'))
        X_test=[calorie,age,weight,0.5,gender,type1]
        for i in range(0,8):
            rem=injury%10
            X_test.insert(5,rem)
            injury=injury/10
        
        df = pd.read_csv("injury1.csv")



        dummies = pd.get_dummies(df.Injury)
        df_dummies= pd.concat([df,dummies],axis='columns')

        df_dummies.drop('Injury',axis='columns',inplace=True)
        df_dummies.drop('Ankle Injury',axis='columns',inplace=True)

        dummies_gender = pd.get_dummies(df.Gender)
        df_dummies= pd.concat([df_dummies,dummies_gender],axis='columns')

        df_dummies.drop('M',axis='columns',inplace=True)

        df_dummies.drop('Gender',axis='columns',inplace=True)

        dummies_type = pd.get_dummies(df.Type)
        df_dummies= pd.concat([df_dummies,dummies_type],axis='columns')

        df_dummies.drop('major',axis='columns',inplace=True)

        df_dummies.drop('Type',axis='columns',inplace=True)



        X=df_dummies.drop('Recovery_Period', axis='columns',inplace=True)
        X=df_dummies
        y=df.Recovery_Period
        

        from sklearn.svm import SVR
        regressor = SVR(kernel='rbf')
        regressor.fit(X,y)
        y_pred = regressor.predict([X_test])
        ans =int(round(y_pred[0]))

        import numpy as np
        import matplotlib.pyplot as plt

        return render_template("external-page/injury_recover.html", data=ans*7)
        

@app.route('/certificate')
def certificate():
    return "your certificate"

#======================================      CATEGORY WISE SPORT PAGE LINKING      ==========================================================
@app.route('/hockey')
def hockey():
    return render_template('external-page/sportcategory/fieldhockey1.html')


#======================================      EQUIPMENT PAGE LINKING      ==========================================================
@app.route('/kit_cricket')
def kit_cricket():
    return render_template("external-page/kits/cricketkits.html")

@app.route('/kit_hockey')
def kit_hockey():
    return render_template("external-page/kits/hockeykit.html")

@app.route('/kit_football')
def kit_football():
    return render_template("external-page/kits/footballkits.html")

@app.route('/kit_kabaddi')
def kit_kabaddi():
    return render_template("external-page/kits/kabaddikit.html")


#======================================      ACADEMY PAGE LINKING      ==========================================================
@app.route('/coach1')
def coach1():
    return render_template("external-page/coach/coach1.html")

#======================================      ACADEMY PAGE LINKING      ==========================================================
@app.route('/coaching_cricket')
def coaching_cricket():
    return render_template("external-page/coaching/cricket.html")

@app.route('/coaching_hockey')
def coaching_hockey():
    return render_template("external-page/coaching/hockey.html")


#======================================      NOTIFICATION SYSTEM      ==========================================================
#======================================      -------------------      ==========================================================

@app.route("/send_notification/<string:sender>",methods=["POST"])
def send_notification(sender):
    receiver = request.form.get('recepient')
    msg = request.form.get('msg')
    # storing to database
    db.execute("INSERT INTO gov_message (msg,receiver) VALUES (:s1,:s2)",
                    {"s1":msg,"s2":receiver})
    db.commit()
    if(receiver=='player'):
        raw = db.execute("SELECT number FROM player").fetchall()
    else:
        raw = db.execute("SELECT number FROM applicant").fetchall()

    URL = 'http://www.way2sms.com/api/v1/sendCampaign'
              
    for x in raw:
        response = sendPostRequest(URL, 'CX97133NP0QNNM9MSNSE0QR7A05GS72A', 'MDV7RXBWBZL593EX', 'stage', x, '1', msg )
    

    applicant = db.execute("SELECT * FROM applicant where status='n'").fetchall
    return render_template("dashboards/dash_goverment.html",applicant=applicant)
#======================================      LOGIN SYSTEM      ==========================================================
#======================================      ------------      ==========================================================


@app.route("/signin")
def signin():
    msg = "Enter your registered mobile number and password"
    return render_template('login-system/signin.html',msg=msg)

@app.route('/signup')
def signup():
    msg = "Mobile No Verification"
    return render_template("login-system/signup.html",msg=msg)

@app.route("/send_otp", methods=["POST"])
def send_otp():
    if request.method == 'POST':
        field = request.form.get('field')
        session['user_field'] = field
        mob_no = request.form.get('number')
        session['user_mob'] = mob_no
        
        #here we send msg to user mobile

        import random

        otp = random.randint(1000,9999)
        session['sys_otp'] = otp
        

        URL = 'http://www.way2sms.com/api/v1/sendCampaign'
              
        # get response
        response = sendPostRequest(URL, 'CX97133NP0QNNM9MSNSE0QR7A05GS72A', 'MDV7RXBWBZL593EX', 'stage', mob_no, '1', otp )

        msg = "Enter The One Time Password (OTP)"
        return render_template("login-system/verify.html",msg=msg)

@app.route("/verify_otp", methods=['POST'])
def verify_otp():
    if request.method == 'POST':
        #here we match sended opt and user otp
        user_otp = int(request.form.get('otp'))
        otp = session.get('sys_otp')
        if user_otp == otp:
            #if otp successful user fill detail
            msg = "Create New Account !"
            user_mob = session.get('user_mob')
            user_field = session.get('user_field')
            if user_field=='student':
                return render_template("login-system/signup_student.html",msg=msg,number=user_mob,field=user_field)
            elif user_field=='player':
                return render_template("login-system/signup_player.html",msg=msg,number=user_mob,field=user_field)
            elif user_field=='applicant':
                return render_template("login-system/signup_applicant.html",msg=msg,number=user_mob,field=user_field)
            elif user_field=='goverment':
                return render_template("login-system/signup_goverment.html",msg=msg,number=user_mob,field=user_field)
            else:
                return 'field not match'
        else:
            #if otp not match user redirect to verify.html to retype otp"
            msg = "otp not match try again or change you mobile number"
            return render_template("login-system/verify.html",msg=msg)


@app.route("/register", methods=["POST"])
def register():

    if request.method == 'POST':
        
        user_field = session.get('user_field')
        number = int(session.get('user_mob'))
        #getting signup form information
        if user_field=='student':
            name = str(request.form.get('name'))
            sex = str(request.form.get('sex'))
            dob = str(request.form.get('dob'))
            email = str(request.form.get('email'))
            number = int(session.get('user_mob'))
            aadhar = int(request.form.get('aadhar'))
            pincode = int(request.form.get('pincode'))
            qualification = str(request.form.get('qualification'))
            game = str(request.form.get('game'))
            password = str(request.form.get('password'))
            if db.execute("SELECT number FROM student WHERE number = :stu_no", {"stu_no": number}).rowcount == 0:
                db.execute("INSERT INTO student (name,sex,dob,email,number,aadhar,pincode,qualification,game,password) VALUES (:s1,:s2,:s3,:s4,:s5,:s6,:s7,:s8,:s9,:s10)",
                    {"s1":name,"s2":sex,"s3":dob,"s4":email,"s5":number,"s6":aadhar,"s7":pincode,"s8":qualification,"s9":game,"s10":password})
                db.commit()
                return render_template('signin.html',msg='Account create successfull, Signin now!')
            else:
                return render_template('signin.html',msg="Your account exist, Signin now!")
        elif user_field=='player':
            name = str(request.form.get('name'))
            sex = str(request.form.get('sex'))
            dob = str(request.form.get('dob'))
            email = str(request.form.get('email'))
            aadhar = int(request.form.get('aadhar'))
            pincode = int(request.form.get('pincode'))
            game = str(request.form.get('game'))
            level = str(request.form.get('level'))
            achivement = str(request.form.get('achivement'))
            job = str(request.form.get("job"))
            password = str(request.form.get('password'))
            if db.execute("SELECT number FROM player WHERE number = :ply_no", {"ply_no": number}).rowcount == 0:
                db.execute("INSERT INTO player (name,sex,dob,email,number,aadhar,pincode,game,level,achievement,job,password) VALUES (:s1,:s2,:s3,:s4,:s5,:s6,:s7,:s8,:s9,:s10,:s11,:s12)",
                    {"s1":name,"s2":sex,"s3":dob,"s4":email,"s5":number,"s6":aadhar,"s7":pincode,"s8":game,"s9":level,"s10":achivement,"s11":job,"s12":password})
                db.commit()
                return render_template('login-system/signin.html',msg='Account create successfull, Signin now!')
            else:
                return render_template('login-system/signin.html',msg="Your account exist, Signin now!")
        elif user_field=='applicant':
            name = str(request.form.get('name'))
            sex = str(request.form.get('sex'))
            dob = str(request.form.get('dob'))
            email = str(request.form.get('email'))
            number = int(session.get('user_mob'))
            aadhar = int(request.form.get('aadhar'))
            pincode = int(request.form.get('pincode'))
            qualification = str(request.form.get('qualification'))
            area = str(request.form.get("area"))
            exprience = str(request.form.get('experience'))
            achievement = str(request.form.get('achievement'))
            password = str(request.form.get('password'))
            if db.execute("SELECT number FROM student WHERE number = :app_no", {"app_no": number}).rowcount == 0:
                db.execute("INSERT INTO applicant (name,sex,dob,email,number,aadhar,pincode,qualification,area,exprience,achievement,password) VALUES (:s1,:s2,:s3,:s4,:s5,:s6,:s7,:s8,:s9,:s10,:s11,:s12)",
                    {"s1":name,"s2":sex,"s3":dob,"s4":email,"s5":number,"s6":aadhar,"s7":pincode,"s8":qualification,"s9":area,"s10":exprience,"s11":achievement,"s12":password})
                db.commit()
                return render_template('login-system/signin.html',msg='Account create successfull, Signin now!')
            else:
                return render_template('login-system/signin.html',msg="Your account exist, Signin now!")

        elif user_field=='goverment':
            name = str(request.form.get('name'))
            email = str(request.form.get('email'))
            number = int(session.get('user_mob'))
            aadhar = int(request.form.get('aadhar'))
            pincode = int(request.form.get('pincode'))
            password = str(request.form.get('password'))
            if db.execute("SELECT number FROM goverment WHERE number = :gov_no", {"gov_no": number}).rowcount == 0:
                db.execute("INSERT INTO goverment (name,email,number,aadhar,pincode,password) VALUES (:s1,:s2,:s3,:s4,:s5,:s6)",
                    {"s1":name,"s2":email,"s3":number,"s4":aadhar,"s5":pincode,"s6":pincode})
                db.commit()
                return render_template('login-system/signin.html',msg='Account create successfull, Signin now!')
            else:
                return render_template('login-system/signin.html',msg="Your account exist, Signin now!")


        else:
              return "field not match in signup.html"
    else:
        return "something went wrong"

   
@app.route("/verify_signin", methods=["POST"])
def verify_signin():
    if request.method == 'POST':
        field = str(request.form.get('field'))
        number = int(request.form.get('mobile'))
        password = request.form.get('password')
        if field=='student':
            if db.execute("SELECT number FROM student WHERE number = :number", {"number": number}).rowcount == 0:
                return render_template('login-system/signup.html',msg="Enter mobile number not exist, Register first!")
            else:
                raw = db.execute("SELECT password,name FROM student WHERE number = :number", {"number": number}).fetchone()
                password_db = raw[0]
                if(password == password_db):
                    return 'tranfer student to academy or online video'
                else:
                    return render_template('login-system/signin.html',msg="Your enter incorrect password, Try again!")
        
        elif field=='player':
            if db.execute("SELECT number FROM player WHERE number = :number", {"number": number}).rowcount == 0:
                return render_template('login-system/signup.html',msg="Enter mobile number not exist, Register first!")
            else:
                raw_password = db.execute("SELECT password FROM player WHERE number = :number", {"number": number}).fetchone()
                password_db = raw_password[0]
                if(password == password_db):
                    player = db.execute("SELECT * FROM player WHERE number = :ply_no", {"ply_no": number}).fetchone()
                    msg = db.execute("SELECT msg FROM gov_message WHERE receiver = :name", {"name": 'player'}).fetchall()
                    count = db.execute("SELECT count(msg) FROM gov_message WHERE receiver = :name", {"name": 'player'}).fetchall()
                    return render_template('dashboards/dash_player.html',player=player,msg=msg,count=count[0])
                else:
                    return render_template("login-system/signin.html",msg="Your enter incorrect password, Try again!")

        elif field=='applicant':
            if db.execute("SELECT number FROM applicant WHERE number = :number", {"number": number}).rowcount == 0:
                return render_template('login-system/signup.html',msg="Enter mobile number not exist, Register first!")
            else:
                raw_password = db.execute("SELECT password FROM applicant WHERE number = :number", {"number": number}).fetchone()
                password_db = raw_password[0]
                if(password == password_db):
                    applicant = db.execute("SELECT * FROM applicant WHERE number = :stu_no", {"stu_no": number}).fetchone()
                    msg = db.execute("SELECT msg FROM gov_message WHERE receiver = :name", {"name": 'applicant'}).fetchall()
                    count = db.execute("SELECT count(msg) FROM gov_message WHERE receiver = :name", {"name": 'applicant'}).fetchall()
                    return render_template('dashboards/dash_applicant.html',applicant=applicant,msg=msg,count=count[0])
                else:
                    return render_template('login-system/signin.html',msg="Your enter incorrect password, Try again!")
        
        elif field=='goverment':
            if db.execute("SELECT number FROM goverment WHERE number = :number", {"number": number}).rowcount == 0:
                return render_template('login-system/signup.html',msg="Enter mobile number not exist, Register first!")
            else:
                raw = db.execute("SELECT password,name FROM goverment WHERE number = :number", {"number": number}).fetchone()
                password_db = raw[0]
                name = raw[1]
                if(password == password_db):
                    applicant = db.execute("SELECT * FROM applicant WHERE status = 'n'").fetchall()
                    return render_template('dashboards/dash_goverment.html',applicants=applicant,name = name)
                else:
                    return render_template('login-system/signin.html',msg="Your enter incorrect password, Try again!")
        else:
            return "field not match"
    else:
        return "Error! Fill the login form first"

@app.route("/gov_action/<int:id>", methods=["POST"])
def gov_action(id):
    if request.method == 'POST':
        act = request.form.get('action')
        if(act=='accept'):
            db.execute("UPDATE applicant SET status = 'y' WHERE applicant_id = :id", {"id": id})
            db.commit()
            no = db.execute("SELECT number FROM applicant where applicant_id = :id", {"id": id})
            URL = 'http://www.way2sms.com/api/v1/sendCampaign'
            response = sendPostRequest(URL, 'CX97133NP0QNNM9MSNSE0QR7A05GS72A', 'MDV7RXBWBZL593EX', 'stage', no, '1', 'your application is accepted we send interview date soon' )                        

        applicant = db.execute("SELECT * FROM applicant where status='n'").fetchall
        return render_template("dashboards/dash_goverment.html",applicants=applicant)
    else:
        return "something wrong"


# get request
def sendPostRequest(reqUrl, apiKey, secretKey, useType, phoneNo, senderId, textMessage):
    req_params = {
    'apikey':apiKey,
    'secret':secretKey,
    'usetype':useType,
    'phone': phoneNo,
    'message':textMessage,
    'senderid':senderId
    }
    return requests.post(reqUrl, req_params)


#======================================      MAIN FUNCTION       ==========================================================
#======================================      -------------       ==========================================================
if __name__ == '__main__':
    app.run(debug=True)
    app.config['SECRET_KEY'] = env_var('FLASK_SECRET_KEY')