var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "henk", "dreamhack", "twitch", "bazza87", "lirik"];
 
$('document').ready(function() {                    
    $.each(channels, function( index, channel ) {
    // Create url with parameters needed
        function makeUrl(type, channel) {
            return "https://wind-bow.gomix.me/twitch-api/" + type + "/" + channel + '?callback=?';
        }
 
        // Get channel info
        $.getJSON(makeUrl("streams", channel), function(data) {
            var game, status;
            if (data.stream === null) {
                game = "Offline";
                status = "offline";
            } else if (data.stream === undefined) {
                game = "Account Closed";
                status = "offline";
            } else {
                game = data.stream.game;
                status = "online";
            };
            
            // Get channel info from Api
            $.getJSON(makeUrl("channels", channel), function(data) {
                $('#channels').append (
                    "<a href='" + data.url + "' target='_blank' class='channel_list " + status + "'>" +
                        "<div class='left clearfix'><div id='image' class='pull-left'>" +
                            "<img src='" + (data.logo === null ? "https://goo.gl/c5CP66" : data.logo) + " 'id='img' class='rounded-circle' width='70px' height='70px'/>" +
                        "</div>" +
                        "<div id='title' class='clearfix'>" +
                            "<h4>" + data.display_name + "</h4>" +
                            "<p>" + (data.game === null ? "___" : data.game) + "</p>" +
                            "<p class='game'>" + game + "</p>" +
                        "</div>" +
                    "</div><hr></a>" 
                )
            });     
        });
    });

    $('#greenBtn').click(function() {
    $('.online').show();
    $('.offline').hide();
});

$('#redBtn').click(function() {
    $('.offline').show();
    $('.online').hide();
});

$('#allBtn').click(function() {
    $('.online, .offline').show();
});

$('#faLeft').click(function() {
    window.location.href = "";
});

$('#faRight').click(function() {
    $('.search').toggle(500);
});

$('#search').keyup(function(){
   var valThis = $(this).val().toLowerCase();
    if(valThis == ""){
        $('.channel_list').show();           
    } else {
        $('.channel_list').each(function(){
            var text = $(this).text().toLowerCase();
            (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
   };
});
});