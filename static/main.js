function validation() {

    let email = document.getElementById('em').value;
    let password = document.getElementById('pw').value;
    let user_name = document.getElementById('uname').value;


    if (email == "" && user_name == "" && password == "") {
        alert("please filled missing field first")
        return false;

    }
    if (email.indexOf('@') <= 0) {
        alert("invalid position of @ in email")
        return false;

    }
    if (password.length < 6) {
        alert("Password length must be 6 characters");
        return false;
    } else {

        return true;

    }

}


$(document).ready(function () {
    $('#example').DataTable();
});



function validate() {

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (email == "" && password == "") {
        alert("please filled missing field first")
        return false;
    }
    if (email.indexOf('@') <= 0) {
        alert("invalid position of @ in email")
        return false;

    }
    if (password.length < 6) {
        alert("Password length must be 6 characters");
        return false;

    } else {
        return true;

    }

}

function datevalidation() {
    var userinput = document.getElementById("dob").value;
    var dob = new Date(userinput);
    if (userinput == null || userinput == '') {
        document.getElementById("date").innerHTML = "Choose a date first";
        return false;
    } else {
        var month_diff = Date.now() - dob.getTime();
        var age_dt = new Date(month_diff);
        var year = age_dt.getUTCFullYear();
        var age = Math.abs(year - 1970);
        if (age < 18) {
            document.getElementById("date").innerHTML = "Age Must be more than 18 years. ";
            return false;
        }
        if (age > 50) {
            document.getElementById("date").innerHTML = "Age Must be less than 50 years. ";
            return false;
        } else {
            document.getElementById("date").innerHTML = "";
            return true;
        }
    }
}

function dobvalidation() {
    var userinput = document.getElementById("dob").value;
    var dob = new Date(userinput);
    if (userinput == null || userinput == '') {
        document.getElementById("date").innerHTML = "Choose a date first";
        return false;
    } else {
        var month_diff = Date.now() - dob.getTime();
        var age_dt = new Date(month_diff);
        var year = age_dt.getUTCFullYear();
        var age = Math.abs(year - 1970);
        if (age < 18) {
            document.getElementById("date").innerHTML = "Age Must be more than 18 years. ";
            return false;
        }
        if (age > 50) {
            document.getElementById("date").innerHTML = "Age Must be less than 50 years. ";
            return false;
        } else {
            document.getElementById("date").innerHTML = "";
            return true;
        }
    }

}

function pwdvisible() {
    var x = document.getElementById("password");
    var y = document.getElementById("hide1");
    var z = document.getElementById("hide2");

    if (x.type === 'password') {
        x.type = "text";
        y.style.display = "inline-block";
        z.style.display = "none"
    } else {
        x.type = "password";
        y.style.display = "none";
        z.style.display = "inline-block"
    }
}

function confirmpassword() {

    var newpassword = document.getElementById("npassword").value
    var confirmpwd = document.getElementById("conpassword").value

    if (newpassword.length < 6) {
        alert("Password length must be 6 characters");
        return false;

    }
    if (newpassword == confirmpwd) {
        alert("Password Updated Sucessfully!");
        return true;
    } else {
        alert("Password Do Not Match Please Try Again !!");
        return false;

    }
}



function uservalidation() {
    var username = document.getElementById("uname").value;
    var exp = /^[A-Za-z._@0-9]{6,20}$/;
    var userstyle = document.getElementById("uname")
    if (exp.test(username)) {
        userstyle.style.outline = "1px solid green";
        userstyle.style.border = "none";
        return true;
    } else {

        userstyle.style.outline = "2px solid red";
        userstyle.style.border = "none";
        return false;
    }
}



function editvalidate() {
    let mobile = document.getElementById("mobile").value;
    let first_name = document.getElementById("firstname").value;
    let last_name = document.getElementById("lastname").value;
    let address = document.getElementById("address").value;
    let zipcode = document.getElementById("zipcode").value;
    let city = document.getElementById("city").value;
    if (mobile.length < 10 || mobile.length > 10) {
        alert("mobile must be 10 digit");
        return false;
    }
    if (first_name.length < 2) {
        alert("name must be more then 4 character")
        return false;

    }
    if (!isNaN(first_name)) {
        alert("name should be in character");
        return false;

    }
    if (last_name.length < 2) {
        alert("name must be more then 4 character");
        return false;;
    }
    if (!isNaN(last_name)) {
        alert("name should be in character");
        return false;

    }
    if (address.length < 6) {
        alert("address must be more then 6 character");
        return false;

    }
    if (!isNaN(address)) {
        alert("address should be in character");
        return false;

    }
    if (zipcode.length < 6) {
        alert("please Enter valid zipcode")
        return false;

    }
    if (!isNaN(city)) {
        alert("city should be in character");
        return false;

    } else {
        alert("profile Updated")
        return true;
    }
}

var male = document.getElementById("male");
var female = document.getElementById("female");
var checked = document.getElementById("select").innerHTML;
if (checked == "Male") {
    male.click()
} else if (checked == "Female") {
    female.click()
} else {}

var selectstate = document.getElementById('selectstate').value
console.log(selectstate)

function allow() {
    var fileInput = document.getElementById("pdfname");
    if (fileInput.files[0].size >= 20971520) {
        document.getElementById("date").innerHTML = "File size should be less than or Equal to 20 MB";
        return false;
    } else {
        return true;
    }
}