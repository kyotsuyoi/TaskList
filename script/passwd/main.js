const listElement = document.querySelector('ul')
const inputElement = document.querySelector('input')

var id = document.getElementById('id')
var description = document.getElementById('description')
var combobox_environment = document.getElementById('combobox_environment')
var label_window = document.getElementById('label_window')

var combobox_environment = document.getElementById('combobox_environment')

showType()
setComboEnvironmentOptions()

function downloadFile() {
    json_array = {}
    json_array["pass_type_list"] = type_list
    var json_string = JSON.stringify(json_array)
    
    var date = new Date()
    var day = date.getDate();              // 1-31
    //var day_week = date.getDay();        // 0-6 (zero=domingo)
    var month = date.getMonth();           // 0-11 (zero=janeiro)
    //var year_2 = date.getYear();         // 2 dígitos
    var year_4 = date.getFullYear();       // 4 dígitos
    var hour = date.getHours();            // 0-23
    var min = date.getMinutes();           // 0-59
    var sec = date.getSeconds();           // 0-59
    //var msec = date.getMilliseconds();   // 0-999
    //var tz = date.getTimezoneOffset();   // em minutos

    var str_date = year_4 + '-' + doubleDigit((month+1)) + '-' + doubleDigit(day);
    var str_time = doubleDigit(hour) + '-' + doubleDigit(min) + '-' + doubleDigit(sec);

    let file_name = "passwd_" + str_date + "_" + str_time;
    let blob = new Blob([json_string], { type: "text/plain;charset=utf-8" });
    saveAs(blob, file_name + ".txt");
}

document.getElementById('inputFile').addEventListener('change', function() {
    var file = new FileReader()
    file.onload = () => {    
        var json_passwd_list = JSON.parse(file.result)
        type_list = json_passwd_list.pass_type_list
        LocalStorageSave(2, type_list)
        showType()
        type_list.length
    }
    file.readAsText(this.files[0])
});

function onlyNumber(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    //var regex = /^[0-9.,]+$/;
    var regex = /^[0-9.]+$/;
    if( !regex.test(key) ) {
       theEvent.returnValue = false;
       if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

function doubleDigit(number){
    if (number <= 9){
        return "0"+number
    }else{
        return number
    }
}

function buttonHidePasswordlist(){
    if (div_passwdlist.style.display === "none") {
        div_passwdlist.style.display = 'inline'
    }else{
        div_passwdlist.style.display = 'none'
    }
}

function buttonHidePass(){
    hidePass = !hidePass
    showPassWD()
}

function clear(){
    id.innerText = ''
    description.value = ''
    combobox_environment.value = ''

    clearPassWD()
    showType()
}

function setComboEnvironmentOptions(){
    var UAT = document.createElement('option')
    UAT.text = 'UAT'
    UAT.value = 'U'
    combobox_environment.add(UAT)

    var PRD = document.createElement('option')
    PRD.text = 'PRD'
    PRD.value = 'P'
    combobox_environment.add(PRD)
}

function closePassWD(){
    window.location.href='desktop.html';
}