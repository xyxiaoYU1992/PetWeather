$(function() {
    var $h1 = $("h1");
    var $id = $("input[name='id']");
    $("form").on("submit", function(event) {
        // prevent default submit
        event.preventDefault();
        var zipCode = $.trim($zip.val());
        $h1.text("Loading...");
        
        var request = $.ajax({
            url: "/" + zipCode,
            dataType: "json"
        });
        request.done(function(data) {
            var temperature = data.temperature;
            $h1.html("You need an umbrella.");
        });
        request.fail(function() {
            $h1.text("Error!");
        });
    });
});