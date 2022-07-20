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

    // var phone = /^[6789]\d{9}$/;
    // if(phone.test(mobile))
    // {
    //  document.getElementById("mobile").innerHTML = "";
    //  return true;
    // }



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

    {
        var fup = document.getElementById('pdfname');
        var fileName = fup.value;
        var ext = fileName.substring(fileName.lastIndexOf('.') + 1);

        if (ext == "pdf" || ext == "PDF") {
            return true;
        } else {
            alert("Upload Pdf Images only");
            return false;
        }
    }
}









// form.addEventListener('click', (e) => {
//     e.preventDefault()



// var today= new Date();
// var validMinDate=new Date(
//     today.getFullYear()-18,
//     today.getMonth(),
//     today.getDate(),
//     today.getHours(),
//     today.getMinutes());

// let dob = document.getElementById('dob').value;






// }if(!isNaN(last_name)){
//     alert("name should be in character");
//     return false;

// }if(!isNaN(mobile)){
//     alert("mobile can be in character");
//     return false;

// }if(mobile.length<10){
//     alert("mobile must be 10 digit")
//     return false

// }if(mobile.length>10){
//     alert("mobile must be 10 digit")
//     return false

// }if(dob>validMinDate){
//     alert("age must be greater then 18")
//     return false

// }if(zipcode.length<6){
//     alert ("please enter valid zipcode")
//     return false;
// }if(!isNaN(address)){
//     alert("address must be in character")
//     return false;








// const isEmail = (email) => {
//     var atSymbol = email.indexOf("@");
//     if (atSymbol < 1) return false;
//     var dot = email.indexOf('.');
//     if (dot <= atSymbol + 3) return false;
//     if (dot === email.length - 1) return false;
//     return true;
// }
// //validate function

// const validate = () => {

//     const email = email.value.trim();
//     const password = password.value.trim();

//     //validate email
//     if (email === "") {
//         setErrorMsg(email, 'email can not be blank');
//     } else if (!isEmail(email)) {
//         setErrorMsg(email, 'email is not valid');
//     } else {
//         setSuccessMsg(email);
//     }



// }

// function setErrorMsg(input, errormsg) {
//     const formGroup = input.parentElement;
//     const small = formGroup.querySelector('small');
//     formControl.className = "form-group error";
//     small.innerText = errormsg;



// }

// function validate() {
//     var pass = document.getElementById("password").value;
//     //check empty password field
//     if (pass == "") {
//         document.getElementById("message").innerHTML = "Fill the password Field!";
//         return false;
//     }

//     //minimum password length validation
//     if (pass.length < 6) {
//         document.getElementById("message").innerHTML = "Password length must be 6 characters";
//         return false;
//     }

//     //maximum length of password validation
//     if (pass.length > 6) {
//         document.getElementById("message").innerHTML = "Password length must be 6 characters";
//         return false;
//     }
// var a = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/;
//   if(a.test(email))
//   {
//     document.getElementById("chemail").innerHTML = "";
//      return true;
//   }