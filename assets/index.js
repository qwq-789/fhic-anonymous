const signInForm = document.getElementById("signInForm");
const userAccountInput = document.getElementById("userAccount");
const userPasswordInput = document.getElementById("userPassword");

signInForm.addEventListener("submit" , function(e) {
    e.preventDefault();
    console.log(userAccountInput.value)
    console.log(userPasswordInput.value)

    const url = "https://script.google.com/macros/s/AKfycby7Ye6Q_FvcVhyf85afOeUAk96jdrUYCiE6jG_Kna31tpafpVpZJKk_3mlkz42E8vm8/exec"
    // Object {key1; value1, key2; value2, key3: value3}
    if (userAccountInput.value == "" || userPasswordInput.value == ""){
        alert("請輸入密碼")
        return;
    } 

    const data = {
        account: userAccountInput.value,
        password: userPasswordInput.value
    };

    const fetchOptions = {
        headers: {
            "Content-Type": "text/plain"
        },
        method: "POST",
        body: JSON.stringify(data),
    }
    fetch(url, fetchOptions).then(function(response){
        console.log(response);
        userAccountInput.value = "";
        userPasswordInput.value = "";
        return response.json();
    }).then(function(jsonPlan){
        console.log(jsonPlan)
    })
});