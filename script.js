
function validate(){
    let fullName = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let pan = document.getElementById('pan').value;
    let loanAmount = document.getElementById('lAmount').value;
    let inputCaptcha = document.getElementById('captcha').value;

    let fullNameCheck = /^[A-Za-z ]{3,50}$/;
    let emailCheck = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,}.[A-Za-z.]{2,}$/;
    let panCheck = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
    let loanAmountCheck = /^[0-9]{1,9}$/;

    if (fullNameCheck.test(fullName)){
        document.getElementById('nameError').innerHTML = "";
    } else {
        document.getElementById('nameError').innerHTML = "* invalid name";
        return false;
    }
    if (emailCheck.test(email)){
        document.getElementById('emailError').innerHTML = "";
    } else {
        document.getElementById('emailError').innerHTML = "* invalid email";
        return false;
    }
    if (panCheck.test(pan)){
        document.getElementById('panError').innerHTML = "";
    } else {
        document.getElementById('panError').innerHTML = "* invalid pan number";
        return false;
    }
    if (loanAmountCheck.test(loanAmount)){
        document.getElementById('amountError').innerHTML = "";
    } else {
        document.getElementById('amountError').innerHTML = "* amount must be in 9 digits only";
        return false;
    }
    if (inputCaptcha == captcha){
        document.getElementById('captchaError').innerHTML = "";
    } else {
        document.getElementById('captchaError').innerHTML = "* incorrect CAPTCHA";
        return false;
    }
}
function generateCaptcha(){
    const min = 10;
    const max = 99;
    let diff = max - min;
    let rand = Math.floor((Math.random())* diff);
    rand = rand + min;
    return rand;
}
function setCaptcha(){
    window.captcha = generateCaptcha();
    if(captcha % 2 == 0){
        let half = captcha / 2;
        let a = half + 2;
        let b = half - 2;
        document.getElementById('showCaptcha').innerHTML = a+" + "+b+" =";
    } else {
        let tempCaptcha = captcha + 1;
        let half = tempCaptcha / 2;
        let a = half + 2;
        let b = half - 3;
        document.getElementById('showCaptcha').innerHTML = a+" + "+b+" =";
    }
}

function intoTheWords(){
    let amountInput = document.getElementById('lAmount').value;
    let oneToTwenty = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ',
        'eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    let tenth = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

    if(amountInput.toString().length > 9){
        document.getElementById('lAmountWords').innerHTML = "Value exceeds its limit..!";
    } else if (amountInput.toString().length <=9 && amountInput.toString().length > 0){
        let number = ('000000000'+amountInput).slice(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);

        let words = number[1] != 0 ? (oneToTwenty[Number(number[1])] || (tenth[number[1][0]] +' '+ oneToTwenty[number[1][1]]))+' crore ' : '';
        words += number[2] != 0 ? (oneToTwenty[Number(number[2])] || (tenth[number[2][0]] +' '+ oneToTwenty[number[2][1]]))+' lakh ' : '';
        words += number[3] != 0 ? (oneToTwenty[Number(number[3])] || (tenth[number[3][0]] +' '+ oneToTwenty[number[3][1]]))+' thousand ' : '';
        words += number[4] != 0 ? (oneToTwenty[Number(number[4])] || (tenth[number[4][0]] +' '+ oneToTwenty[number[4][1]]))+' hundred ' : '';
        words += number[5] != 0 ? (oneToTwenty[Number(number[5])] || (tenth[number[5][0]] +' '+ oneToTwenty[number[5][1]])) : '';
        document.getElementById('lAmountWords').innerHTML = ""+words+" Rs.";
    } else {
        document.getElementById('lAmountWords').innerHTML = "";
    }
}

function getUrlParams(){
    let parameters = window.location.search;
    let urlParams = new URLSearchParams(parameters);
    let fullName = urlParams.get('name');
    let email = urlParams.get('email');
    let nameArray = fullName.split(" ");
    let firstName = nameArray[0];
    document.getElementById('userName').innerHTML = firstName;
    document.getElementById('displayEmail').innerHTML = email;

}
function sendVerificationOtp(){
    const min = 1000;
    const max = 9999;
    let diff = max - min;
    let rand = Math.floor((Math.random())* diff);
    window.otp = rand + min;
    window.count = 3;
    document.getElementById('counterMessage').innerHTML = " "+count+"attempts left."
    console.log("Verification Code : "+otp);
}
function verifyCode(){
    let inputOtp = document.getElementById('otp').value;

    if(otp == inputOtp){
        alert("Verified Successfully");
        window.location.replace("https://pixel6.co/");
    } else if(count==1) {
        alert("incorrect Verification Code..!");
        window.location.replace("https://pixel6.co/404");
    } else {
        alert("incorrect Verification Code..! try again");
        count--;
        document.getElementById('counterMessage').innerHTML = " "+count+"attempts left."
        document.getElementById('otp').innerHTML = "  ";
    }
}

