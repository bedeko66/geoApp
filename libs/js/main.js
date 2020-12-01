$(document).ready(function () {
    $('.btnmain').on("click", function () {
        let current_id = '#' + $(this).text();
        $('.sectmain').css("display", "none");
        $(current_id).css("display", "block");
    })

})