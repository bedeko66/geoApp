$(document).ready(function () {
    $('#submit').click(function () {
        if ($('#query').val() === '') {

            $('#query').attr("placeholder", "Please type a city name here...");
            $('#query').append('<style>#query::placeholder{color:red}</style>')

        } else {

            $.ajax({
                url: "libs/php/getData.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    from: 'geoWiki',
                    lang: $('#selLanguage').val(),
                    query: sanitizeString($('#query').val())
                },
                success: function (result, status) {
                    if (status === "success") {
                        $("#location").text("");
                        $("#query").text("");
                        let tbhHTML = '<thead class="thead-dark">' +
                            '<tr>' +
                            '<th scope="col">Title</th>' +
                            '<th scope="col">Elevation</th>' +
                            '<th scope="col">Feature</th>' +
                            '<th scope="col">Lat</th>' +
                            '<th scope="col">Lng</th>' +
                            '<th scope="col">Image</th>' +
                            '<th scope="col">Summary</th>' +
                            '<th scope="col">Click for more to Wiki Page</th>' +
                            '</tr>' +
                            '</thead>' +
                            '<tbody>' +
                            '</tbody>' +
                            '</table>';

                        let trHTML = '';

                        $.each(result, function (i) {
                            trHTML += '<tr><td>' +
                                result[i]['title'] + '</td><td>' +
                                result[i]['elevation'] + '</td><td>' +
                                result[i]['feature'] + '</td><td>' +
                                Math.round(result[i]['lat']) + '</td><td>' +
                                Math.round(result[i]['lng']) + '</td><td><img src="' +
                                result[i]['thumbnailImg'] + '" alt="' + result[i]['title'] + '"></td><td class="longtxt">' +
                                result[i]['summary'] + '</td><td class="link">' +
                                result[i]['wikipediaUrl'] + '</td></tr>';
                        });
                        $('#location').append(tbhHTML);
                        $('#location').append(trHTML);
                        $('#query').val('');

                        $("tbody").on("click", 'td', function () {
                            if ($(this).attr('class') == 'link') {
                                window.open('http://' + $(this).text(), '_blank');
                            }
                        });
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
                        alert('Unknow Error occured. Please try again.');
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