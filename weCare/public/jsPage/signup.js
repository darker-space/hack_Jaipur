$(".as").on("change", function() {
    // alert("yo yo");

    if ($("#doctor").is(":checked")) {
        $("#doc").removeClass("d-none");
        $("#icon").removeClass("d-lg-block");
    } else {
        $("#doc").addClass("d-none");
        $("#icon").addClass("d-lg-block");
    }
});