let value = "";
let stopUpdate = false;
//let currentId;

$(document).ready(function () {
    renderGUI();
    let intervalPeriod = 1000;

    setInterval(function () {

        renderGUI();

    }, intervalPeriod);


    $(document).on('click', '.htmlFlipper', function (e) {

        console.log(e.target.id);

        var url = "/flipValue/" + e.target.id;
        console.log("Here");

        $.ajax({
            type: 'GET',
            url: url,
            success: function (result) {
                console.log(result);
            }
        });

    });


});


function renderGUI() {
    if(!stopUpdate){
            $.ajax({
            type: 'POST',
            url: 'listOfVariables',
            success: function (result) {
                let html = '';

                html += '<table>' +
                        '<tr>' +
                        '   <th>Namn</th>' +
                        '   <th>Värde</th>' +
                        '</tr>';

                for (id in result) {
                    //currentId = id;

                    html += '<tr>' +
                            '   <td> ' + result[id]['name'] + '</td>' +
                            '   <td>';


                    if(result[id]["type"] === "bool"){

                        html += '<button type="button" onfocus="" class="htmlFlipper" id="' + id +'">' + boolToString(result[id]['value']) + '</button>';
                    }
                    else if(result[id]["type"] === "percent"){

                        html += '<input type="text" ' +
                                'id="valueOf_' + id + '"' +
                                'onfocus="stop()" ' +
                                'placeholder="' + result[id]["value"] + '" ' +
                                'onkeydown="return checkChar(event);" ' +
                                '">';


                    }
                    else{

                        html += result[id]["value"];
                    }

                    html += '</td> </tr>';

                }

                html += '</table>';

                $('#units').html(html);

                }
            });
        }
}

function flipValue(result, id) {
    var url = "/flipValue/id=" + id + "&o=write&v";

    if(result[id]['value'] === '0'){
        url += '1'
    }
    else if(result[id]['value'] === '1'){
        url += '0'
    }
    else{
        return
    }

    $.ajax({
        type: 'POST',
        url: url,
        success: function () {
            console.log("Wrote " + url)
        }
    })
}

function setValue(id, value){
    var url = "/internalVariable/id=" + id + "&o=write&v=" + value;

    console.log(url);
    $.ajax({
        type: 'POST',
        url: url,
        success: function () {
            console.log("Wrote " + url)
        }
    })
}

function stop() {
    stopUpdate = true;

    console.log("Stop");

}

function start() {
    stopUpdate = false;
    console.log("Start");
}

function printStuff() {
    console.log("Ompa lompa didilidoo")
}

function updateValue() {
    let value = document.getElementById("valueOf_" + id).value;
    start();
    console.log(value)

    if(value === ""){

    }
    else if(isNaN(parseInt(value))){

    }
    else if(parseInt(value) > 100 || parseInt(value) < 0){

    }
    else{
        setValue(id, value);
    }


}

function checkChar(e) {
    if(e.keyCode == 13){

        updateValue();

    }
}

function boolToString(boolean){
    if(boolean === '0'){
        return "OFF";
    }
    else if(boolean === '1'){
        return "ON";
    }
    else
        return "";
}

function renderPlaceholder(e, result) {
    return result[id]["value"];
}