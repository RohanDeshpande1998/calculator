const DEFAULT_VALUE = "0";
const flagType={null:'', raisedTo:'^',product:'*',divide:'/',addition:'+',subtract:'-'}

let current_value = DEFAULT_VALUE;
let data = {previous_val:'', current_val:current_value}
let flag = null;
let dot_flag = false;

const buttons = document.querySelectorAll('button');
const current_display = document.getElementById('displayBottom');
const previous_display = document.getElementById('displayTop');

window.addEventListener('keydown', KeyboardInput)
buttons.forEach((button) =>{
    button.addEventListener('click',()=>{
        function_connector(button.id)
    })
})  
function display(){ 
    current_display.innerHTML = data.current_val;
    previous_display.innerHTML = data.previous_val + flagType[flag];
}

function function_connector(id){
    if (data.current_val === "WHY?" || data.current_val == "Infinity"){
        clearAll();
    }
    if (id == "signChange"){
        signChange();
    }else if(id == "backspace"){
        backspace();
    }else if(id == "clearAll"){
        clearAll();
    }else if(id == "raisedTo"){
        raisedTo();
        flag="raisedTo";
    }else if(id == "product"){
        product();
        flag="product";
    }else if(id == "divide"){
        divide();
        flag="divide";
    }else if(id == "addition"){
        addition();
        flag ="addition";
    }else if(id == "subtract"){
        subtract();
        flag="subtract";
    }else if(id == "equal"){
        equal();
    }else if(id == "dot"){
        dot();
    }else{
        appendNumber(id);
    }
    display();
}
function appendNumber(id){
    if (data.current_val == 0 && !dot_flag){data.current_val = String(id);}
    else{data.current_val += id}
}

function signChange(){
    if (data.current_val != ''){data.current_val = String(-parseFloat(data.current_val));}
}
function backspace(){
    if (data.current_val != ''){
        data.current_val = String(data.current_val).slice(0,-1);
    }
    if (data.current_val == '' || data.current_val=='-'){
        data.current_val = 0;
    }
}
function clearAll(){
    data.previous_val = '';
    data.current_val = 0;
    flag = null;
    dot_flag = false;
}
function raisedTo(){
    if (flag && (data.current_val != '')){
        mathOperation(flag);
    }else if(flag == null){
        data.previous_val = data.current_val;
    }
    data.current_val = '';
}
function product(){
    if(flag && (data.current_val != '')){
        mathOperation(flag)
        flag = null;
    }else if(flag == null){
        data.previous_val = data.current_val;
    }
    data.current_val = '';
}
function divide(){
    if (flag && (data.current_val != '')){
        mathOperation(flag);
        flag = null;
    }else if(flag == null){
        data.previous_val = data.current_val;
    }
    data.current_val = '';
}
function addition(){
    if (flag && (data.current_val != '')){
        mathOperation(flag);
        flag = null;
    }else if(flag == null){
        data.previous_val = data.current_val;
    }
    data.current_val = '';
}
function subtract(){
    if (flag && (data.current_val != '')){
        mathOperation(flag);
        flag = null;
    }else if(flag == null){
        data.previous_val = data.current_val;
    }
    data.current_val = '';
}
function equal(){
    if (data.current_val !=''){
        mathOperation(flag);
    }else if (data.previous_val != ''){
        data.current_val = data.previous_val;
    }else{
        clearAll;
    }
    flag = null;
}
function dot(){
    if (String(data.current_val).indexOf(".") ===-1){
        data.current_val += ".";
    }
    dot_flag = true;
}

function KeyboardInput(e){
    if (e.key>=0 && e.key<=9){function_connector(e.key)}
    else if(e.key == "*"){function_connector("product")}
    else if(e.key == "/"){function_connector("divide")}
    else if(e.key == "+"){function_connector("addition")}
    else if(e.key == "-"){function_connector("subtract")}
    else if(e.key == "Backspace"){function_connector("backspace")}
    else if(e.key == "."){function_connector("dot")}
    else if(e.key == "Enter"){function_connector("equal")}
    else if(e.key == "^"){function_connector("raisedTo")}
    else if(e.key == "Escape"){function_connector("clearAll")}
}
function mathOperation(flag){
    if (flag == "raisedTo"){
        if (parseFloat(data.previous_val) == 0 && parseFloat(data.current_val)<0){
            data.previous_val = "0";
            alert("Ooo' Tryin' to be smart eh???")
        }else{
            data.previous_val = parseFloat((parseFloat(data.previous_val)**parseFloat(data.current_val)).toFixed(5));
            data.current_val = data.previous_val;
        }
    }else if(flag == "product"){
        data.previous_val = parseFloat((parseFloat(data.previous_val)*parseFloat(data.current_val)).toFixed(5));
        data.current_val = data.previous_val;
    }else if(flag == "divide"){
        if (parseFloat(data.current_val) === 0){
            data.previous_val = "0"
            alert("Why are we here? Just to suffer?")
        }else{
            data.previous_val = parseFloat((parseFloat(data.previous_val)/parseFloat(data.current_val)).toFixed(5));
            data.current_val = data.previous_val;
        }
    }else if(flag == "addition"){
        data.previous_val = parseFloat((parseFloat(data.current_val) + parseFloat(data.previous_val)).toFixed(5));
        data.current_val = data.previous_val;
    }else if(flag== "subtract"){
        data.previous_val = parseFloat((parseFloat(data.previous_val) - parseFloat(data.current_val)).toFixed(5));
        data.current_val = data.previous_val;
    }else{
        data.previous_val = data.current_val;
    }
}
display();