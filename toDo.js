let pending=[],finish=[];

const pendingList_ul=document.querySelector(".pendingList"),
      finistList_ul=document.querySelector(".finishList"),
      form=document.querySelector(".form-task"),
      input=form.querySelector("input");
const PEND="pend",FIN="fin",DEL="delete",PEND_LS="pend_localStorage",FIN_LS="fin_localStorage";

function printList(text,where){ //해당 li에 추가 후 list추가, localStorage에 추가d
    createEle(text,where);
    if(where===PEND){
        input.value="";
        const newToDo={
            id:pending.length + 1,
            text:text
        }
        pending.push(newToDo);  
        saveToDo(PEND);
    }
    else if(where===FIN){
        const newToDo={
            id:finish.length + 1,
            text:text
        }
        finish.push(newToDo);  
        saveToDo(FIN);
    }
}


function handleBtn(event){
    const btn=event.target;
    const li=btn.parentNode;
    const span=li.querySelector("span");
    if(li.className===PEND){
        //pend에서 지우기
        pendingList_ul.removeChild(li);
        const cleanToDo=pending.filter(function(pendToDo){
            return pendToDo.id!==parseInt(li.id);
        })
        pending=cleanToDo;
        saveToDo(PEND);
        if(btn.className===PEND){
            printList(span.innerText,FIN);
        }
    }
    else if(li.className===FIN){
        //fin에서 지우기
        finistList_ul.removeChild(li);
        const cleanToDo=finish.filter(function(finToDo){
            return finToDo.id!==parseInt(li.id);
        })
        finish=cleanToDo;
        saveToDo(FIN);
        if(btn.className===FIN){
            printList(span.innerText,PEND);
        }
    }

}
function createEle(text,where){//해당 li에 추가
    const li=document.createElement("li");
    const span = document.createElement("span");
    const delBtn=document.createElement("button");
    const subBtn=document.createElement("button");

    subBtn.innerText=(where===PEND?'✅':'⏪');
    span.innerText=text;
    delBtn.innerText='❌';

    const newId=(where===PEND?pending.length:finish.length)+1;
    delBtn.addEventListener("click",handleBtn);
    subBtn.addEventListener("click",handleBtn);
    delBtn.classList.add(DEL);
    li.id=newId;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(subBtn);
    
    if(where===PEND){
        li.classList.add(PEND);
        subBtn.classList.add(PEND);
        pendingList_ul.appendChild(li);
    }
    else if(where===FIN){
        li.classList.add(FIN);
        subBtn.classList.add(FIN);
        finistList_ul.appendChild(li);
    }
}
function saveToDo(where){//localStorage에 추가
    if(where===PEND){
        localStorage.setItem(PEND_LS,JSON.stringify(pending));      
    }
    else if(where===FIN){
        localStorage.setItem(FIN_LS,JSON.stringify(finish));   
    }
}
function handleInputSubmit(event){//input 제출했을 때
    event.preventDefault();
    const newInput=input.value;
    if(newInput!==""){
        printList(newInput,PEND);
    }
}
function loadList(){
    const loaded_PendList=localStorage.getItem(PEND_LS);
    const loaded_finList=localStorage.getItem(FIN_LS);

    if(loaded_PendList!==null){
        const parse_PendList=JSON.parse(loaded_PendList);
        parse_PendList.forEach(function(toDo) {
            printList(toDo.text,PEND);
        });
    }    
    if(loaded_finList!==null){
        const parse_FinList=JSON.parse(loaded_finList);
        parse_FinList.forEach(function(toDo) {
            printList(toDo.text,FIN);
        });
    }
}
function init(){
    loadList();
    form.addEventListener("submit",handleInputSubmit);
}
init();