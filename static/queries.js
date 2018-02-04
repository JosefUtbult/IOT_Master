$(document).ready(function () {

    let intervalPeriod = 1000;

    setInterval(function () {
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

                    html += '<tr>' +
                            '   <td> ' + result[id]['name'] + '</td>' +
                            '   <td>';

                    //html += '<tr>Name: ' + result[id]['name'];

                    if(result[id]["type"] === "bool"){

                        //html += '<stack id="switch"></stack>'
                        html += '<button type="button" class="htmlFlipper" id="' + id +'">' + result[id]['value'] + '</button>';
                    }
                    else if(result[id]["type"] === "percent"){

                        //html += 'None';
                        html += '<input type="text" placeholder="' + result[id]["value"] + '">';
                    }
                    else{

                        html += result[id]["value"];
                        //html += ' ' + result[id]["value"];
                    }

                    html += '</td> </tr>';

                }

                html += '</table>';

                $('#units').html(html);

            }
        });
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
            console.log("Ja")
        }
    })
}