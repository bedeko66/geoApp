$(document).ready(function () {

    $('#btnthree').click(function () {

        $.ajax({
            url: "libs/php/getData.php",
            type: 'POST',
            dataType: 'json',
            data: {
                from: 'geoCountries'
            },
            success: function (result, status) {
                if (status === "success") {

                    $("#continents").change(function () {

                        let selectedContinent = $(this).val();
                        let countriesByContinent = result.filter(function (e) {
                            return e['continent'] === selectedContinent;
                        });
                        let countries = countriesByContinent.map(function (c) {
                            return c.countryName
                        })

                        $.each(countries, function (country) {
                            $('#countries').append('<option value=' + countries[country] + '>' + countries[country] + '</option>')
                        })

                        $("#countries").change(function () {
                            let selectedCountry = $(this).val();
                            let countryObj = result.filter(function (e) {
                                return e['countryName'] == selectedCountry;
                            });

                            let geoCountriesTblBodyHTML = '<thead class="thead-dark">' +
                                '<tr><th scope="col">Continent Name:</th>' +
                                '<td>' + countryObj[0]['continentName'] + '</td></tr>' +
                                '<tr><th scope="col">Country Name:</th>' +
                                '<td>' + countryObj[0]['countryName'] + '</td></tr>' +
                                '<tr><th scope="col">Country Code:</th>' +
                                '<td>' + countryObj[0]['countryCode'] + '</td></tr>' +
                                '<tr><th scope="col">Capital:</th>' +
                                '<td>' + countryObj[0]['capital'] + '</td></tr>' +
                                '<tr><th scope="col">Population</th>' +
                                '<td>' + formatNum(countryObj[0]['population']) + '</td></tr>' +
                                '<tr><th scope="col">Languages:</th>' +
                                '<td>' + countryObj[0]['languages'] + '</td></tr>' +
                                '<tr><th scope="col">Area in SqKm:</th>' +
                                '<td>' + countryObj[0]['areaInSqKm'] + '</td></tr>' +
                                '<tr><th scope="col">Postal code format</th>' +
                                '<td>' + countryObj[0]['postalCodeFormat'] + '</td></tr>' +
                                '<tr><th scope="col">Currency Code:</th>' +
                                '<td>' + countryObj[0]['currencyCode'] + '</td></tr>' +
                                '<tr><th scope="col">South:</th>' +
                                '<td>' + Math.round(countryObj[0]['south']) + '</td></tr>' +
                                '<tr><th scope="col">North:</th>' +
                                '<td>' + Math.round(countryObj[0]['north']) + '</td></tr>' +
                                '<tr><th scope="col">East:</th>' +
                                '<td>' + Math.round(countryObj[0]['east']) + '</td></tr>' +
                                '<tr><th scope="col">West:</th>' +
                                '<td>' + Math.round(countryObj[0]['west']) + '</td></tr></thead>';

                            $('#geoCountriesTbl').append(geoCountriesTblBodyHTML);
                        });

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
                    alert('Unknow Error occured. Please try again.\n' + XMLHttpRequest.responseText);
                }
            }
        })
    });

});

function formatNum(num) {
    return String(num).replace(/(.)(?=(\d{3})+$)/g, '$1,')
}