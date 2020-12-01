$(document).ready(function () {
    $('#submit2').click(function () {
        if ($('#query2').val() === '') {

            $('#query2').attr("placeholder", "Please type any place name here...");
            $('#query2').append('<style>#query2::placeholder{color:red}</style>')

        } else {

            $.ajax({
                url: "libs/php/getData.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    from: 'geoNames',
                    query: sanitizeString($('#query2').val())
                },
                success: function (result, status) {
                    if (status === "success") {
                        $("#geonamesTbl").text("");
                        $("#query2").text("");
                        let tbhHTML = '<thead class="thead-dark">' +
                            '<tr>' +
                            '<th scope="col">Name</th>' +
                            '<th scope="col">Population</th>' +
                            '<th scope="col">CountryCode</th>' +
                            '<th scope="col">Lat</th>' +
                            '<th scope="col">Lng</th>' +
                            '</tr>' +
                            '</thead>' +
                            '<tbody>' +
                            '</tbody>' +
                            '</table>';

                        let trHTML = '';

                        $.each(result, function (i) {
                            trHTML += '<tr><td>' +
                                result[i]['name'] + '</td><td>' +
                                formatNum(result[i]['population']) + '</td><td>' +
                                result[i]['countryCode'] + '</td><td>' +
                                Math.round(result[i]['lat']) + '</td><td>' +
                                Math.round(result[i]['lng']) + '</td></tr>';
                        });
                        $('#geonamesTbl').append(tbhHTML);
                        $('#geonamesTbl').append(trHTML);
                        $('#query2').val('');
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if (XMLHttpRequest.status == 0) {
                        alert('Please check Your Network.');
                    } else if (XMLHttpRequest.status == 404) {
                        alert('Requested URL not found.');
                    } else if (XMLHttpRequest.status == 500) {
                        alert('Internal Server Error occured.');
                    } else {
                        alert('Unknow Error occured. Please try again.\n' + XMLHttpRequest.responseText);
                        $.ajax({
                            url: 'libs/php/clientLogger.php',
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                error: JSON.stringify({ err: XMLHttpRequest.responseText })
                            },
                            success: function (result, status) {
                                if (status === "success") alert('Error reported')
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                if (XMLHttpRequest.status == 0) {
                                    alert('Please check Your Network.');
                                } else if (XMLHttpRequest.status == 404) {
                                    alert('Requested URL not found.');
                                } else if (XMLHttpRequest.status == 500) {
                                    alert('Internal Server Error occured.');
                                } else {
                                    alert('Unknow Error occured. Please try again.' + XMLHttpRequest.responseText);
                                }
                            }
                        })
                    }
                }
            });
        }
    });
});

function sanitizeString(str) {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
    return str.trim().replace(/\s/g, '');
}

function formatNum(num) {
    return String(num).replace(/(.)(?=(\d{3})+$)/g, '$1,')
}