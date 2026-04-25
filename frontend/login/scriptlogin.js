const button = document.getElementById("enterBtn");
const inputlogin = document.getElementById("inputlogin");
const inputsenha = document.getElementById("inputsenha");
const error = document.getElementById("error-message");

const usuariocorreto = "Diego";
const senhacorreta = "mindunuts";

button.addEventListener("click", () => {
 const login = inputlogin.value.trim();
 const senha = inputsenha.value.trim();

 if (login === "" || senha === "") {
    error.textContent = "preencha todos os campos";
    error.style.display = "block";
    return;
 }

 if (login === usuariocorreto && senha === senhacorreta) {
  error.style.display = "none";
  console.log("Login correto");

   window.location.href = "../index.html.html";
 } else{
   error.textContent = "login ou senha incorretos";
   error.style.display = "block";
 }
});