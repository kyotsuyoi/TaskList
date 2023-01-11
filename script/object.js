const table_object_body = document.getElementById('table_object_body')
var temp_object_list = new Array()
var selected_object_position = -1

function showObjects() {

    table_object_body.innerHTML = ''
    if (temp_object_list == null) {
        temp_object_list = new Array()
        return
    }

    temp_object_list.forEach(item => {
        const pos = temp_object_list.indexOf(item)

        var line = document.createElement("tr")
        var td_id = document.createElement("td")
        var td_name = document.createElement("td")
        var td_check_eqz = document.createElement("td")
        var td_check_test_act = document.createElement("td")
        var td_check_test_prd = document.createElement("td")
        var td_link_bamboo = document.createElement("td")
        var td_link_git = document.createElement("td")
        
        var s_description = item["object_name"]
        var isTFSFile = false
        var str = s_description.split('.')
        str = str[1]

        if(str == null || str == undefined){
            str = ''
        }
        if(str.length>0){
            isTFSFile = true
        }

        if(s_description.length > 30){
            var c = s_description.length - 28
            s_description = '...'+s_description.substring(c,s_description.length)
        }

        var t_id = document.createTextNode(`${pos}`)
        var t_name = document.createTextNode(s_description)
        var t_link_git
        
        // var a = document.createElement('a');
        // var linkText = document.createTextNode("LINK")
        // a.appendChild(linkText)
        // a.title = "LINK"
        // a.href = "http://bamboo/"+item["object_name"]
        // var t_link_bamboo = a

        var a = document.createElement('a');
        var linkText = document.createTextNode("LINK")
        a.appendChild(linkText)
        a.title = "LINK"
        a.href = "http://git/"+item["object_name"]
        var t_link_git = a

        if(isTFSFile){
            t_link_git = document.createTextNode('')
        }

        var check_eqz = item["check_eqz"]
        var el_eqz_check = document.createElement("INPUT")
        el_eqz_check.setAttribute("type", "checkbox")
        el_eqz_check.setAttribute('onclick', `checkObjectEqz(${pos})`)
        el_eqz_check.checked = check_eqz    
        
        var check_test_act = item["check_test_act"]
        var el_test_act_check = document.createElement("INPUT")
        el_test_act_check.setAttribute("type", "checkbox")
        el_test_act_check.setAttribute('onclick', `checkObjectTestACT(${pos})`)
        el_test_act_check.checked = check_test_act   

        var check_test_prd = item["check_test_prd"]
        var el_test_prd_check = document.createElement("INPUT")
        el_test_prd_check.setAttribute("type", "checkbox")
        el_test_prd_check.setAttribute('onclick', `checkObjectTestPRD(${pos})`)
        el_test_prd_check.checked = check_test_prd        

        td_id.appendChild(t_id)
        td_name.appendChild(t_name)
        td_check_eqz.appendChild(el_eqz_check)
        td_check_test_act.appendChild(el_test_act_check)
        td_check_test_prd.appendChild(el_test_prd_check)
        //td_link_bamboo.appendChild(t_link_bamboo)
        td_link_git.appendChild(t_link_git)

        line.appendChild(td_id)
        line.appendChild(td_name)
        line.appendChild(td_check_eqz)
        line.appendChild(td_check_test_act)
        line.appendChild(td_check_test_prd)
        //line.appendChild(td_link_bamboo)
        line.appendChild(td_link_git)        

        line.setAttribute('onclick', `selectedObject(${pos})`)

        table_object_body.appendChild(line)
    })
}

function selectedObject(position){
    var item = temp_object_list[position]

    selected_object_position = position

    object_name.value = item.object_name  
}

function addObject() {
    if (object_name.value == ""){
        alert("Insira o nome do objeto/aplicação")
        return
    }  

    if (temp_object_list == null) {
        temp_object_list = new Array()
    }
    
    json_array = {}
    json_array["object_name"] = object_name.value
    json_array["check_eqz"] = false
    json_array["check_test_act"] = false
    json_array["check_test_prd"] = false

    temp_object_list.push(json_array)

    object_name.value = ''

    showObjects()
    LocalStorageSave(2)
    calculateProgress()
}

function deleteObject() {
    if (selected_object_position == -1 || selected_object_position > temp_object_list.length-1) {
        return
    }

    temp_object_list.splice(selected_object_position, 1)
    LocalStorageSave(2)
    showObjects()

    selected_object_position = -1

    lib.value = ''
    calculateProgress()
}

function checkObjectEqz(position){
    var item = temp_object_list[position]

    var checked = item.check_eqz  
    if(checked){
        item.check_eqz = false
    }else{
        item.check_eqz = true
    }

    temp_object_list[position] = item
    LocalStorageSave(2)

    calculateProgress()
}

function checkObjectTestACT(position){
    var item = temp_object_list[position]

    var checked = item.check_test_act  
    if(checked){
        item.check_test_act = false
    }else{
        item.check_test_act = true
    }

    temp_object_list[position] = item
    LocalStorageSave(2)

    calculateProgress()
}

function checkObjectTestPRD(position){
    var item = temp_object_list[position]

    var checked = item.check_test_prd  
    if(checked){
        item.check_test_prd = false
    }else{
        item.check_test_prd = true
    }

    temp_object_list[position] = item
    LocalStorageSave(2)

    calculateProgress()
}
