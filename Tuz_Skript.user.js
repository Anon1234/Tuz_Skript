// ==UserScript==
// @name        Tuz Skript
// @namespace   https://github.com/Anon1234/
// @include     http://tuzach.in/
// @include     http://tuzach.in/#*
// @grant       none
// @version     2.8.23
// @updateURL   https://github.com/Anon1234/Tuz_Skript/raw/master/Tuz_Skript.user.js
// @icon        https://github.com/Anon1234/Tuz_Skript/raw/master/blue_tuz.png
// ==/UserScript==

$(document).ajaxSuccess(function(event, xhr, settings) {
    if (settings.url.indexOf("/?app=chat") !== -1) {
        var res = $.parseJSON(xhr.responseText);
        if (res.count) {
            $msgs = $("[data-tuz]:last ~ .somemsg");
            $new_posts = (($msgs.length)? $msgs : $(".somemsg"));
            $new_posts.attr("data-tuz", "tuz");
        };


    }


    else if (settings.url === "/?app=playlist") {

    }


});