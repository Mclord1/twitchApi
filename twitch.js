var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "terakilobyte", "thomasballinger", "beohoff", "MedryBW", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "henk", "dreamhack", "twitch", "bazza87", "lirik"];

function getChannels() {
    $.each(channels, function (index, channel) {
        // Create url with parameters needed
        function makeUrl(type, channel) {
            return "https://wind-bow.gomix.me/twitch-api/" + type + "/" + channel + '?callback=?';
        }

        // Toggle status of channel from Api
        $.getJSON(makeUrl("streams", channel), function (data) {
            console.log(data.stream);
            if (data.stream === null) {
                $('.new').addClass('red')
            } else {
                $('.new').addClass('green');
            }
            console.log(data.stream);
        });

        // Get data from Api
        $.getJSON(makeUrl("channels", channel), function (data) {

            $('#channels').append(
                "<a href='" + data.url + "' target='_blank' class='channel'>" +
                "<div class='left clearfix'><div id='image' class='pull-left'>" +
                "<img src='" + (data.logo === null ? "https://goo.gl/c5CP66" : data.logo) + " 'id='img' class='rounded-circle' width='70px' height='70px'/>" +
                "</div>" +
                "<div id='title' class='clearfix'>" +
                "<h4>" + data.display_name + "</h4>" +
                "<p>" + (data.game === null ? "---" : data.game) + "</p>" +
                "<span class='new'></span>" +
                "</div>" +
                "</div><hr></a>"
            )
        });
    });
}

$('document').ready(function () {
    getChannels();
});

// $('#greenBtn').click(function () {
//     $('.list>.green').show();
//     $('.list>.red').hide();
// });
//
// $('#redBtn').click(function () {
//     $('.list>.red').show();
//     $('.list>.green').hide();
// });
//
// $('#allBtn').click(function () {
//     $('.list>.green, .red').show();
// });

$('#faLeft').click(function () {
    reload(true);
});

$('#faRight').click(function () {
    $('.search').toggle(500);
});

$('#search').keyup(function () {
    var valThis = $(this).val().toLowerCase();
    if (valThis === "") {
        $('.channel').show();
    } else {
        $('.channel').each(function () {
            var text = $(this).text().toLowerCase();
            (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
    }
});
