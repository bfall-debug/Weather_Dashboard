var cities = ["Austin","Chicago","New York","Orlando","San Francisco","Seattle","Denver","Atlanta"];

cities.forEach(function(city){
    NewSearch(city);
})

$(".btn").click(function(){
    var textbox = $(this).parent().siblings("#textbox")
    var search = textbox.val()
    textbox.val("");

    NewSearch(search);
});

function NewSearch(citySearch){
    var city = $("<div>");
    city.addClass("col-12 city py-2");
    city.text(citySearch)
    $(".left-container").append(city);

    

    

    var header = $("<h3>");
        header.text(citySearch + " (8/15/2019)");
    var temperature = $("<p>");
        temperature.text("Temperature: ");
    var humidity = $("<p>");
        humidity.text("Humidity: ");
    var windSpeed = $("<p>");
        windSpeed.text("Wind Speed: ");
    var UV = $("<p>");
        UV.text("UV Index: ");

    var details = $("<div>");
        details.addClass("details")
        details.append(header,temperature,humidity,windSpeed,UV);

    var forecastHeader = $("<h4>");
        forecastHeader.addClass("mt-3")
        forecastHeader.text("5-Day Forecast:")
    var days = $("<div>");
        days.addClass("row justify-content-between mx-1")
    
    for( i = 0; i < 5; i++ ){
        var day = $("<div>");
        day.addClass("col-2 day px-1 pt-2");

        var date = $("<h6>");
        date.text("8/16/2019");
        var icon = $("<img>");
        var temp = $("<p>");
        temp.text("Temp: ");
        var humid = $("<p>");
        humid.text("Humidity: ");

        day.append(date,icon,temp,humid);
        days.append(day)
    }

    var forecast = $("<div>");
        forecast.append(forecastHeader, days)


    var rightContainer = $(".right-container");
    rightContainer.empty();
    rightContainer.append(details,forecast);
}