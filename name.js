const printName=document.querySelector(".greetings");
const formName=document.querySelector(".form-name");
const inputName=formName.querySelector(".input");
const NAME="userName";
const SHOWING="showing";
//const currentName=localStorage.getItem(NAME);

function saveName(name){
    localStorage.setItem(NAME,name);
}
function handleInputName(eventName){
    eventName.preventDefault();
    console.log("here");
    const newName=inputName.value;
    if(newName!==""){
        greeting(newName);
        saveName(newName);
    }
}

function greeting(name){
    printName.innerText=`Hello ${name}!`;
    formName.classList.remove(SHOWING);
    printName.classList.add(SHOWING);

}

function askName(){
    formName.classList.add(SHOWING);
    formName.addEventListener("submit",handleInputName);
}

function init(){
    const currentName=localStorage.getItem(NAME);
    if(currentName===null){
        //should input name
        askName();
    }
    else{
        //greeting 보이게
        greeting(currentName);
    }
}
init();