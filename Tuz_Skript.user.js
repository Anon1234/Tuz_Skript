// ==UserScript==
// @name        Tuz Skript
// @namespace   https://github.com/Anon1234/
// @include     http://tuzach.in/
// @include     http://tuzach.in/#*
// @grant       none
// @version     2.9.8
// @updateURL   https://github.com/Anon1234/Tuz_Skript/raw/master/Tuz_Skript.user.js
// @icon        https://github.com/Anon1234/Tuz_Skript/raw/master/blue_tuz.png
// ==/UserScript==


// ---------- Общие стили ----------
var css_style = document.createElement('style');
css_style.type = "text/css";
css_style.innerHTML = '' +
    '.r4{border-radius:8px}' +
    '.tuz_hack{font-family:Courier New;font-size:11px;color:white;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAWCAYAAAABxvaqAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAQklEQVQYVxXEoQ5AAAAFwDebTRAURVEkRZIURVEUQbDZ/P9HcOEuSYpfSlWq1ahVp16DRk2atWjVpl2HTl269ej9AJF0BE7FA3MyAAAAAElFTkSuQmCC)}' +
    '.cvet{display:none}' +
    '.disabled{opacity:.9!important}' +
    '.semi_transparent{background:rgba(255,255,255,0.882);padding:18px}' +
    '.dot{text-decoration:none!important;border-bottom:1px dotted}' +
    '.length{word-wrap: normal !important; width: 40px}' +
    '#mess {z-index: 9999;}' +
    '.new_post {color: orange;}' +
    '.img-full { float: left; margin: 2px 10px; max-width: none; position: fixed; \
        z-index: 9999; background-color: #ccc; border: 1px solid black; }'
document.getElementsByTagName('head')[0].appendChild(css_style);



var script = document.createElement('script');
script.type = "text/javascript";
var main = (function main() {


//-----------------------------------------------------------------------------
//                        Плагины

// scrollTo
(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);


//-----------------------------------------------------------------------------
//                        Утилиты

function deleteMessage(id){
    $('#msg' + id).find(".somemsg_id").after('&nbsp;<span class="label label-important">Удалено</span>');
}

var delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

function ls_set(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

function ls_get(key){
    var value = localStorage.getItem(key);
    return value && JSON.parse(value);
}

$("#chat .alert").remove();

$btn_row= $('#anal').parent();

IGNORED_MSGS = [];


//-----------------------------------------------------------------------------
//                Функции подсчета времени до трека

String.prototype.zfill = function (width) {
    // Расширяет строку до заданого размера
    // "1".zfill(3) => "001"
    // "10".zfill(3) => "010"
    var str = '' + this;
    while (str.length < width) str = '0' + str;
    return str;
}

function tts(s) {
    // "[hh:]mm:ss" в секунды
    var t = s.split(":");
    if (t.length == 3)
        return parseInt(t[0]) * 3600 + parseInt(t[1]) * 60 + parseInt(t[2]);
    else
        return parseInt(t[0]) * 60 + parseInt(t[1]);
}

function stt(seconds) {
    // Секунды в "[hh:]mm:ss"
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds - (h * 3600)) / 60);
    var s = seconds - (h * 3600) - (m * 60);
    if (h)
        return h + ":" +
               m.toString().zfill(2) + ":" +
               s.toString().zfill(2);
    else
        return m + ":" +
               s.toString().zfill(2);
}

function count_time_to(track){
    // Считаем длительность всех треков перед заданным
    var total = 0;
    $(track).prevAll().each(
        function(i, e) {
            total += tts($(e).find(".length").text());
            total -= 2; // Поправка на кроссфейд
        }
    );
    var time = total + Math.ceil((sec_total - sec_past) - sec_total);
    time = (time > 0) ? time : 0;
    return "+" + stt(time);
}


//-----------------------------------------------------------------------------
//                        Имя релейтед хуита

function uid_to_name(uid) {
    return localStorage[uid] ? localStorage[uid] : uid.slice(0, 4);
}

function update_name(uid) {
    $("." + uid).each(
        function() {
            $(this).text(uid_to_name(uid));
        }
    );
}

function name_prompt(uid) {
    var text = "Введите новое имя для " + uid_to_name(uid) + " (" + uid + "):";
    var name = prompt(text, uid_to_name(uid));
    if (name) {
        localStorage[uid] = name;
        update_name(uid);
    }
}


//-----------------------------------------------------------------------------
//                        Просмотр истории сообщений

$('body').append(
    '<div id="history_modal" class="modal hide fade">' +
        '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4>История сообщений <span id="history_name"></span></h4>' +
        '</div>' +
        '<div style="padding: 0;" class="modal-body">' +
        '</div>' +
    '</div>'
);

function find_posts(uid) {
    var posts = "";
    $('.' + uid).each(function (i) {
        posts += $(this).parents('.somemsg')[0].outerHTML;
    });
    return posts;
}

function show_history(uid) {
    $('#history_modal .modal-body').html(find_posts(uid));
    $('#history_modal .modal-body').find('.msg-actions').remove();
    $('#history_modal .modal-body').find('img').css('cursor', 'default').removeAttr('onclick');
    $('#history_name').html(uid_to_name(uid));
    $('#history_modal').modal();
}

$('#history_modal').on('hide', function() {
    $('#history_modal .modal-body').html("");
    $('#history_name').html('');
});


//-----------------------------------------------------------------------------
//                      Расширение стандартных опций

aCfg = parseInt(get_cookie('anal'));

$('body').append(
    '<div id="opts_modal" class="modal hide fade">' +
        '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4>Настройки</h4>' +
        '</div>' +
        '<div class="modal-body">' +
            addOpt('Убрать хедер и футер', 0x100000) +
            addOpt('Смишнявые надписи', 0x200000) +
            addOpt('Убрать плеер', 0x400000) +
            addOpt('Переместить инфу в ряд кнопок', 0x800000) +
            addOpt('Включить анимешные фоны', 0x1000000) +
            addOpt('Убрать плейлист', 0x2000000) +
            addOpt('Убрать только вторую кнопку из плеера', 0x4000000) +
            addOpt('Не показывать UID', 0x8000000) +
            addOpt('Отключить автоскроллинг когда не в фокусе', 0x10000000) +
            addOpt('Не показывать ответы на заигнореные посты', 0x20000000) +
            //addOpt('Opt 10', 0x40000000) +
            analCfg() +
        '</div>' +
    '</div>'
);

$('#opts_modal .btn').click(function() {
    $('#opts_modal').modal('hide');
});

$('#anal').off();
$('#anal').attr('id', 'opts');
$('#opts').attr({'data-toggle': 'modal', 'data-target': '#opts_modal'});


//-----------------------------------------------------------------------------
//                        Туз_Скрипт Меню

$('body').append(
    '<div id="tuz_modal" class="modal hide fade">' +
        '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h3>Tuz Skript</h3>' +
        '</div>' +
        '<div style="padding: 0;" class="modal-body">' +
            // баян
            '<div class="accordion" id="accordion2">' +
                 // начало группы
                '<div class="accordion-group"> ' +
                    '<div class="accordion-heading">' +
                        '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' +
                            'LocalStorage' +
                        '</a>' +
                    '</div>' +
                    '<div id="collapseOne" class="accordion-body collapse">' +
                        '<div id="ls_here" class="accordion-inner">' +
                            // содержимое
                        '</div>' +
                    '</div>' +
                //конец группы
                // начало группы
                '<div class="accordion-group"> ' +
                    '<div class="accordion-heading">' +
                        '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">' +
                            'Статистика' +
                        '</a>' +
                    '</div>' +
                    '<div id="collapseTwo" class="accordion-body collapse in">' +
                        '<div id="stats_here" class="accordion-inner">' +
                            // содержимое
                        '</div>' +
                    '</div>' +
                //конец группы
                '</div>' +
            '</div>' +
            // конец баяна
        '</div>' +
    '</div>'
);

function showLocalStorage() {
    var ls = "" +
    '<table class="table table-hover table-condensed">' +
        '<thead>' +
            '<tr>' +
                '<th>Ключ</th>' +
                '<th>Значение</th>' +
                '<th> </th>' +
            '</tr>' +
        '</thead>' +
        '<tbody>';

    for (var k in localStorage) {
        if (typeof localStorage[k] == "function")
            continue;
        ls += '<tr>';
        ls += '' +
        '<td>' + k + '</td>' +
        '<td>' + localStorage[k] + '</td>' +
        '<td><button class="btn btn-warning btn-mini" type="button" onclick="delete localStorage[\'' + k + '\']; $(this).parents(\'tr\').remove();">Удалить</button></td>';
        ls += '</tr>';
    }

    ls += '' +
        '</tbody>' +
    '</table>';

    ls += "<button class='btn btn-danger btn-mini' onclick='localStorage.clear(); $(this).parent().html(\"\"); return false'>Удалить все</button>";

    $('#ls_here').html(ls);
    $('#stats_here').html(get_graph_img());
    $('#tuz_modal').modal();
}

function get_graph_img() {
    var dict = {};
    $("#chat .somemsg").each(function(i) {
        var name = $(this).attr('name');
        if (name in dict)
            ++dict[name];
        else
            dict[name] = 1;
    });

    var chl = [];
    var chd = [];
    var chco = [];
    for (k in dict) {
        chl.push(uid_to_name(k));
        chd.push(dict[k]);
        chco.push(k);
    }
    return (
        '<img style="display: block; margin-left: auto; margin-right: auto;" class="img-rounded" src="' +
        'http://chart.apis.google.com/chart?cht=p3&chs=510x300&chtt=Анонимусы говорят&' +
        'chl=' + chl.join("|") +
        '&chco=' + chco.join() +
        '&chd=t:' + chd.join() +
        '">'
    );
}

$btn_row.append('<button class="btn btn-mini" onclick="showLocalStorage()"><i class="icon-list-alt"></i></button>');


//-----------------------------------------------------------------------------
//                        Установка кастомного фона

function prompt_bg_image(){
    url = prompt('Введите url картинки:', '');
    if (url) {
        document.body.style.backgroundImage = 'url("' + url + '")';
        ls_set('background_image', url);
    }
}

if (!(aCfg & 0x1000000)) {
    $(function() {
        url = ls_get('background_image');
        if (url)
            document.body.style.backgroundImage = 'url("' + url + '")';
    });
}

BACKGROUNDS = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.gif", "12.jpg", "13.gif", "14.gif", "15.gif", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.gif", "21.jpg", "22.gif", "23.jpg", "24.jpg", "25.jpg", "26.jpg", "27.gif", "28.jpg", "29.jpg", "30.jpg", "31.gif", "32.gif", "33.jpg", "34.gif", "35.jpg", "36.jpg", "37.jpg", "38.jpg", "39.jpg", "40.jpg", "41.gif", "42.jpg", "43.gif", "44.jpg", "45.jpg", "46.gif", "47.jpg", "48.jpg", "49.gif", "50.gif", "51.jpg", "52.jpg", "53.gif", "54.jpg", "55.jpg", "56.jpg", "57.jpg", "58.gif", "59.gif", "60.gif", "61.jpg", "62.gif", "63.jpg", "64.jpg", "65.gif", "66.gif", "67.jpg", "68.jpg", "69.gif", "70.gif", "71.jpg", "72.jpg", "73.gif", "74.gif", "75.gif", "76.jpg", "77.jpg", "78.gif", "79.jpg", "80.gif", "81.jpg", "82.gif", "83.jpg", "84.jpg", "85.gif", "86.jpg", "87.jpg", "88.gif", "89.jpg", "90.gif", "91.gif", "92.jpg", "93.gif", "94.jpg", "95.gif", "96.jpg", "97.gif", "98.gif", "99.jpg", "100.jpg", "101.jpg", "102.jpg", "103.gif", "104.jpg", "105.gif", "106.jpg", "107.jpg", "108.jpg", "109.jpg", "110.gif", "111.gif", "112.jpg", "113.jpg", "114.jpg", "115.jpg", "116.gif", "117.jpg", "118.jpg", "119.gif", "120.jpg", "121.jpg", "122.jpg", "123.gif", "124.jpg", "125.jpg", "126.jpg", "127.gif", "128.jpg", "129.jpg", "130.jpg", "131.jpg", "132.gif", "133.jpg", "134.gif", "135.jpg", "136.gif", "137.jpg", "138.jpg", "139.gif", "140.gif", "141.jpg", "142.jpg", "143.jpg", "144.jpg", "145.gif", "146.jpg", "147.jpg", "148.jpg", "149.jpg", "150.jpg", "151.jpg", "152.gif", "153.jpg", "154.jpg", "155.jpg", "156.jpg", "157.jpg", "158.gif", "159.gif", "160.gif", "161.gif", "162.gif", "163.gif", "164.jpg", "165.gif", "166.gif", "167.jpg", "168.jpg", "169.jpg", "170.gif", "171.jpg", "172.jpg", "173.jpg", "174.jpg", "175.jpg", "176.jpg", "177.jpg", "178.gif", "179.jpg", "180.gif", "181.jpg", "182.jpg", "183.jpg", "184.jpg", "185.jpg", "186.gif", "187.gif", "188.gif", "189.jpg", "190.jpg", "191.jpg", "192.gif", "193.gif", "194.jpg", "195.gif", "196.jpg", "197.gif", "198.jpg", "199.jpg", "200.jpg", "201.gif", "202.gif", "203.gif", "204.jpg", "205.gif", "206.gif", "207.jpg", "208.jpg", "209.jpg", "210.jpg", "211.jpg", "212.jpg", "213.jpg", "214.gif", "215.gif", "216.jpg", "217.jpg", "218.jpg", "219.jpg", "220.gif", "221.jpg", "222.jpg", "223.gif", "224.gif", "225.jpg", "226.jpg", "227.gif", "228.gif", "229.jpg", "230.gif", "231.jpg", "232.gif", "233.gif", "234.gif", "235.gif", "236.gif", "237.gif", "238.jpg", "239.jpg", "240.jpg", "241.gif", "242.jpg", "243.gif", "244.jpg", "245.jpg", "246.jpg", "247.gif", "248.jpg", "249.jpg", "250.gif", "251.gif", "252.gif", "253.jpg", "254.gif", "255.jpg", "256.jpg", "257.jpg", "258.jpg", "259.gif", "260.gif", "261.gif", "262.gif", "263.gif", "264.gif", "265.jpg", "266.gif", "267.gif", "268.gif", "269.gif", "270.jpg", "271.jpg", "272.gif", "273.jpg", "274.jpg", "275.jpg", "276.jpg", "277.jpg", "278.jpg", "279.jpg", "280.jpg", "281.jpg", "282.jpg", "283.jpg", "284.jpg", "285.gif", "286.jpg", "287.gif", "288.gif", "289.gif", "290.gif", "291.jpg", "292.gif", "293.gif", "294.gif", "295.jpg", "296.jpg", "297.jpg", "298.jpg", "299.jpg", "300.jpg", "301.jpg", "302.jpg", "303.jpg", "304.gif", "305.gif", "306.gif", "307.gif", "308.jpg", "309.jpg", "310.jpg", "311.jpg", "312.jpg", "313.jpg", "314.jpg", "315.jpg", "316.jpg", "317.jpg", "318.jpg", "319.jpg", "320.jpg", "321.jpg", "322.jpg", "323.jpg", "324.gif", "325.jpg", "326.gif", "327.gif", "328.gif", "329.jpg", "330.jpg", "331.jpg", "332.jpg", "333.jpg", "334.gif", "335.jpg", "336.gif", "337.jpg", "338.jpg", "339.gif", "340.gif", "341.jpg", "342.gif", "343.jpg", "344.jpg", "345.jpg", "346.jpg", "347.gif", "348.jpg", "349.jpg", "350.gif", "351.gif", "352.gif", "353.gif", "354.gif", "355.jpg", "356.gif", "357.jpg", "358.gif", "359.jpg", "360.jpg", "361.jpg", "362.jpg", "363.jpg", "364.jpg", "365.jpg", "366.jpg", "367.jpg", "368.jpg", "369.jpg", "370.gif", "371.gif", "372.gif", "373.gif", "374.gif", "375.jpg", "376.jpg", "377.gif", "378.gif", "379.gif", "380.gif", "381.jpg", "382.jpg", "383.jpg", "384.gif", "385.gif", "386.jpg", "387.jpg", "388.jpg", "389.jpg", "390.gif", "391.jpg", "392.jpg", "393.jpg", "394.jpg", "395.jpg", "396.jpg", "397.jpg", "398.jpg", "399.gif", "400.gif", "401.jpg", "402.jpg", "403.jpg", "404.jpg", "405.jpg", "406.jpg", "407.jpg", "408.jpg", "409.jpg", "410.jpg", "411.jpg", "412.jpg", "413.jpg", "414.gif", "415.gif", "416.gif", "417.gif", "418.png", "419.gif", "420.gif", "421.gif", "422.gif", "423.gif", "424.gif", "425.gif", "426.jpg", "427.gif", "428.jpg", "429.gif", "430.gif", "431.gif", "432.gif", "433.gif", "434.gif", "435.gif", "436.gif", "437.gif", "438.gif", "439.gif", "440.jpg", "441.jpg", "442.jpg", "443.jpg", "444.jpg", "445.gif", "446.gif", "447.gif", "448.gif", "449.jpg", "450.gif", "451.gif", "452.jpg", "453.gif", "454.gif", "455.gif", "456.gif", "457.jpg", "458.jpg", "459.gif", "460.gif", "461.gif", "462.jpg", "463.jpg", "464.jpg", "465.jpg", "466.jpg", "467.jpg", "468.jpg", "469.gif", "470.jpg", "471.jpg", "472.png", "473.png", "474.png", "475.png", "476.png", "477.png", "478.gif", "479.png", "480.png", "481.png", "482.png", "483.png", "484.png", "485.png", "486.gif", "487.png", "488.png", "489.png", "490.jpg", "491.png", "492.png", "493.png", "494.png", "495.png", "496.png", "497.png", "498.png", "499.png", "500.png", "501.png", "502.png", "503.png", "504.png", "505.jpg", "506.png", "507.png", "508.png", "509.png", "510.png", "511.png", "512.png", "513.png", "514.png", "515.png", "516.png", "517.png", "518.png", "519.png", "520.png", "521.png", "522.png", "523.png", "524.png"];
BG_BASE_URL = "http://bglabs.evade.netdna-cdn.com/45875kli90/";

function switch_bg(dir) {
    bg_list_index = ls_get('bg_list_index') || 0;
    bg_list_index += dir;

    if (bg_list_index < 0) {
        bg_list_index = BACKGROUNDS.length + dir;
    }
    else if (bg_list_index > BACKGROUNDS.length - 1) {
        bg_list_index = 0;
    }

    ls_set('bg_list_index', bg_list_index);
    ls_set('background_image', BG_BASE_URL + BACKGROUNDS[bg_list_index]);
    document.body.style.backgroundImage = 'url("' + BG_BASE_URL + BACKGROUNDS[bg_list_index] + '")';
}

if (!(aCfg & 0x1000000)) {
    $btn_row.append(
        '<span class="btn-group">' +
            '<button class="btn btn-mini" onclick="switch_bg(-1)"><i class="icon-arrow-left"></i></button>' +
            '<button class="btn btn-mini" onclick="prompt_bg_image(); return false;"><i class="icon-th-large"></i> Фон</button>' +
            '<button class="btn btn-mini" onclick="switch_bg(1)"><i class="icon-arrow-right"></i></button>' +
        '</span>'
    );
}


// ---------- Перемещение инфы в ряд кнопок ----------
if (aCfg & 0x800000 ) {
    $("#speed").parent().remove();
    $btn_row.append(
        '<a id="usercnt" class="btn btn-mini disabled"></a>' +
        '<a id="speed" class="btn btn-mini disabled"></a>'
    );
}

// ---------- Удаление плеера ----------
if (aCfg & 0x400000) {
    $("#lsn-btn").parents('.mb').remove();
    //auto_resize()
}

// ---------- Убрать плейлист ----------
if (aCfg & 0x2000000) {
    $('.span4').remove();
    $('.span8').removeClass('span8').addClass('span12');
}

// ---------- Убрать только вторую кнопку из плеера ----------
if ((aCfg & 0x4000000) && !(aCfg & 0x400000)) {
    $("#lsn-btn").parent().find('a.btn').remove();
    $("#lsn-btn").css("width", $(".span4").width());
 }

// ---------- Удаление хедера и футера ----------
if (aCfg & 0x100000) {
    $('.navbar').remove();
    $('.nav').remove();
    $('.push').remove();
    $('.footer').remove();
    $('.container').css('padding-top', '15px');
    $('.btn.btn-small.btn-inverse.dropdown-toggle').remove();
    auto_resize();
}


//-----------------------------------------------------------------------------
//                        Фиксы интерфейса

$btn_row.wrap('<div id="btns" class="btn-toolbar" />');
$(".span8 .clearfix").css('margin-bottom', '5px');
$('link[rel="shortcut icon"]').addClass('favicon');
$(".dropdown-toggle").remove();


//-----------------------------------------------------------------------------
//                    Переключение и фикс стилей

function switch_style() {
    var style = get_cookie("style");
    style == 'default' ? set_stylesheet('neutron') : set_stylesheet('default');
}

function fix_styles() {
    try {
        for (var i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].href.indexOf("dark.css") > -1) {
                var dark = document.styleSheets[i];
                dark.insertRule(".alert-on td, .track:hover td { background-color: #3a3f44 !important; }", dark.cssRules.length);
                var dark_fixed = true;
            }
            else if (document.styleSheets[i].href.indexOf("custom.css") > -1) {
                var light = document.styleSheets[i];
                light.insertRule(".alert-on td, .track:hover td { background-color: #e7ffaa !important; }", light.cssRules.length);
                light.insertRule(".somemsg { border-bottom: none !important; }", light.cssRules.length);
                var light_fixed = true;
            };
        };
    }
    catch (e) {
        if (!(dark_fixed && light_fixed)) {
            setTimeout(fix_styles, 500);
        }
    }
}

fix_styles();


// ---------- Добавление кнопок справа (история треков, реформал...) ----------
$btn_row.append(
    '<div class="pull-right">' +
        '<a title="История треков" href="/?app=history" class="btn btn-mini"><i class="icon-time"></i></a>' +
        '<a title="Лучшие треки" href="/?app=top" class="btn btn-mini"><i class="icon-star-empty"></i></a>' +
        '<a title="Баги и идеи" href="http://tuzach.reformal.ru/" class="btn btn-mini"><i class="icon-tasks"></i></a>' +
        '<button title="Переключить стиль" class="btn btn-mini" onclick="switch_style()"><i class="icon-adjust"></i></button>' +
        //'<span style="margin-right: ' + ($(".msg table td:eq(2)").width() + 3) + 'px;"></span>' +
    '</div>'
);


//-----------------------------------------------------------------------------
//                        Установка прозрачности

var OPACITY = ls_get('opacity') || 100;

function change_op() {
    var step = 10;
    OPACITY -= step;
    if (OPACITY - step < 0)
        OPACITY = 100;
    $(".container").fadeTo(500, OPACITY / 100);
    ls_set('opacity', OPACITY);
}

$(".container").fadeTo(500, OPACITY / 100);
$btn_row.find(".btn:eq(3)").after('<button class="btn btn-mini" onclick="change_op()"><i class="icon-tint"></i></button>');



//-----------------------------------------------------------------------------
//                        Установка фонов из аниме

function set_anime_bg() {
    document.body.style.backgroundImage = 'url("http://tuzach.in/w.php?' + Math.random() + '")';
}

function switch_anime_bg() {
    delete_cookie('wall');
    set_anime_bg();
}

if (aCfg & 0x1000000) {
    $("body").css("background-size", "cover");
    set_anime_bg();
    $btn_row.find(".btn:eq(4)").after('<button class="btn btn-mini" onclick="switch_anime_bg()"><i class="icon-refresh"></i></button>');
}


//-----------------------------------------------------------------------------
//                        Уведомление о треке

function check_time_to_track() {
    var $track = $('.alert-on');
    if ($track.length) {
        var ttt = tts(count_time_to($track).substr(1));
        if (ttt <= 10) {
            clearInterval(TTT_INTERVAL);
            $('#audio_alert')[0].play();
            if (typeof Notification !== 'undefined') {
                new Notification("Скоро заиграет!", {
                    "icon": $track.find('img').attr("src"),
                    "body": $track.find('.title').text()
                });
            }
        }
    }
    else {
        clearInterval(TTT_INTERVAL);
    }
}

TTT_INTERVAL = setInterval(check_time_to_track, 2000);

$('body').append(
    '<audio id="audio_alert" preload="auto">' +
        '<source src="https://github.com/Anon1234/Tuz_Skript/raw/master/kurly.ogg">' +
    '</audio>'
);
$('#audio_alert')[0].volume = 0.8;

// ---------- Использование нативных уведомлений ----------
if (typeof Notification !== 'undefined' && Notification.permission !== "granted") {
    Notification.requestPermission(function(p) {
        if (p === "granted") {
            new Notification("Спасибо, браток.", {
                "icon": "https://github.com/Anon1234/Tuz_Skript/raw/master/blue_tuz.png"
            });
        };
    });
};


//-----------------------------------------------------------------------------
//                        Уведомление о новых сообщениях
ICON_ON = true;
BLANK_ICON = 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII=';
ORIG_ICON = $('.favicon').attr('href');
NEW_POSTS = 0;

function favicon_off_on() {
    $('.new_fav').remove()
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.className = "new_fav";

    if (ICON_ON) {
        link.href = BLANK_ICON;
        ICON_ON = false;
    }
    else {
        link.href = ORIG_ICON;
        ICON_ON = true;
    }

    document.getElementsByTagName('head')[0].appendChild(link);

}

function new_msg_show() {

    favicon_off_on();
    if (document.title[document.title.length - 1] == "#") {
        document.title = '[' + NEW_POSTS + '] ' + default_title;
    }
    else {
        document.title = '[' + NEW_POSTS + '] ## ' + default_title + ' ##';
    }
}

function new_msg_stop(){
    if (int_timer != -1) {
        clearInterval(int_timer);
    }
    int_timer = -1;
    ICON_ON = false;
    favicon_off_on();
    document.title = default_title;
    NEW_POSTS = 0;
    var can_scroll = check_position();
    if (can_scroll) {
        $('#chat').scrollTo($(".new_post:eq(0)").parent(), 1000);
    };
    setTimeout(function() {
        if (!leaved) {
            $('.new_post').removeClass('new_post');
        }
    }, 4000)
}


// ---------- Убирает надписи у кнопок ----------
$("#btns button").each(
    function(i, e) {
        $(this).contents().filter(
            function() {
                return this.nodeType == 3; //Node.TEXT_NODE
            }
        ).remove();
    }
);


//-----------------------------------------------------------------------------
//                        Замер скорости аплоада трека
(function set_file_handler() {
    var $added = $("[name=added]");
    var form_reseted = (!!$added.data("events") && ($added.data("events").change.length < 2));
    if (form_reseted && $added.length) {
        $added.on('change', function(event) {
            var f = event.target.files[0];
            var start = (new Date).getTime();
            $('#upload_song+iframe')[0].contentWindow.document.body.innerHTML = "";
            (function check_progress() {
                var iframe = $('#upload_song+iframe')[0].contentWindow.document.body;
                var res = !!iframe && iframe.innerHTML;
                if (res) {
                    var load_time = Math.ceil(((new Date).getTime() - start) / 1000);
                    var speed = (f.size / 1024 / 1024 / load_time).toFixed(2);
                    var human_speed = ((speed < 1) ? speed * 1024 + " KiB/s" : speed + " MiB/s");
                    var info = " (Время загрузки: " + stt(load_time) + ", скорость: " + human_speed + ")";
                    (function add_info() {
                        if ($(".alert").length && !$(".alert:last").hasClass("seen")) {
                            $(".alert:last").text($(".alert:last").text() + info).addClass("seen");
                        }
                        else {
                            setTimeout(add_info, 100);
                        };
                    })();
                    set_file_handler();
                }
                else {
                    setTimeout(check_progress, 100);
                }
            })();
        });
    }
    else {
        setTimeout(set_file_handler, 500);
    }
})();


//-----------------------------------------------------------------------------
//              Просмотр изображений как в куклоскрипте

function $event(el, events) {
    for(var key in events) {
        el.addEventListener(key, events[key], false);
    }
    return el;
}

function $revent(el, events) {
    for(var key in events) {
        el.removeEventListener(key, events[key], false);
    }
}

function expandimg(postnum, imgurl, thumburl, imgw, imgh, thumbw, thumbh) {

    var firefox = (/Firefox/i.test(navigator.userAgent));
        wHeight = window.innerHeight,
        wWidth = document.documentElement.clientWidth,
        tmpH = tmpW = 0;

    var elMove, elStop, newW, newH, srcH, scrW = wWidth;

    newW = imgw < scrW ? imgw : scrW - (tmpW = 22); // 2*10px margin + 2*1px border
    newH = newW * imgh / imgw;
    if(newH > (scrH = wHeight)) {
        newH = scrH - (tmpH = 6); // 2*2px margin + 2*1px border
        newW = newH * imgw / imgh;
    }

    var $thumb = $('#msg' + postnum +' div.pct img');
    $thumb.after('<img class="img-full" src="' + imgurl + '" alt="' +
            imgurl + '" width="' + newW + '" height="' + newH + '">');
    full = $('.img-full')[0];
    full.style.cssText = 'left: ' + (scrW - newW - tmpW) / 2 + 'px; top: ' + (scrH - newH - tmpH) / 2 + 'px;';

    full.addEventListener(firefox ? 'DOMMouseScroll' : 'mousewheel', function(e) {
        var curX = e.clientX,
            curY = e.clientY,
            oldL = parseInt(this.style.left, 10),
            oldT = parseInt(this.style.top, 10),
            oldW = parseFloat(this.style.width || this.width),
            oldH = parseFloat(this.style.height || this.height),
            d = firefox ? -e.detail : e.wheelDelta,
            newW = oldW * (d > 0 ? 1.25 : 0.8),
            newH = oldH * (d > 0 ? 1.25 : 0.8);
        e.preventDefault();
        this.style.width = newW + 'px';
        this.style.height = newH + 'px';
        this.style.left = parseInt(curX - (newW/oldW) * (curX - oldL), 10) + 'px';
        this.style.top = parseInt(curY - (newH/oldH) * (curY - oldT), 10) + 'px';
    }, false);

    elMove = function(e) {
        full.style.left = e.clientX - full.curX + 'px';
        full.style.top = e.clientY - full.curY + 'px';
        full.moved = true;
    };

    elStop = function() {
        $revent(document.body, {'mousemove': elMove, 'mouseup': elStop});
    };

    full.onmousedown = function(e) {
        e.preventDefault();
        full.curX = e.clientX - parseInt(full.style.left, 10);
        full.curY = e.clientY - parseInt(full.style.top, 10);
        $event(document.body, {'mousemove': elMove, 'mouseup': elStop});
    };

    full.addEventListener('click', function(e) {
        if (this.moved) {
            this.moved = false;
        }
        else {
            $(this).remove();
        }
    }, true);
}


//-----------------------------------------------------------------------------
//                        Обработка ajax

$(document).ajaxSuccess(function(event, xhr, settings) {


//-----------------------------------------------------------------------------
//                        Обработка чата

    if (settings.url.indexOf("/?app=chat") !== -1) {
        var res = $.parseJSON(xhr.responseText);
        if (res.count) {

            // ---------- Пополнение списка номеров заигнореных постов ----------
            $.each(res.data, function(i, e) {
                if (e.type === "msg" && (ignoreArray.indexOf(e.user_id) > -1)) {
                    IGNORED_MSGS.push(e.id);
                };
            });

            // ---------- Обработка постов ----------
            $(".somemsg:not([data-tuz])").each(function() {
                var $post = $(this);
                var uid = $post.attr("name");
                if (!(aCfg & 0x8000000)) {
                    $post.find('.msg-actions').prepend('&nbsp;<i class="icon-book" onclick="show_history(\'' + uid + '\')" title="История постов"></i>');
                    $post.find('.somemsg_id').after('&nbsp;<span onclick="name_prompt(\'' + uid + '\')" class="tuz_hack r4" style="background-color: #' + uid + ';">&nbsp;<span class="' + uid + '">' + uid_to_name(uid) + '</span>&nbsp;</span>&nbsp;');
                };
                if (leaved) {
                    NEW_POSTS += 1;
                    $post.find('.somemsg_id').addClass('new_post');
                };

                // ---------- Удалить пост, если это ответ заигнореному ----------
                if (aCfg & 0x20000000) {
                    $post.find('.qt').each(function() {
                        var post_id = $(this).attr('href').slice(4);
                        if (IGNORED_MSGS.indexOf(post_id) > -1) {
                            $post.remove();
                            if (leaved) { NEW_POSTS -= 1; };
                        };
                    });
                };

            }).attr("data-tuz", "tuz");

        };

        // ---------- Замена надписей ----------
        if (aCfg & 0x200000) {
            if (res.user_cnt > 2) {
                $('#usercnt').html('В чятике ' + res.user_cnt + ' котят');
            };
            $('#speed').html(res.speed + ' п/ч');
            $('#lsnrs').parent().html($('#lsnrs').parent().html().replace('Слушают', 'Лохи'))
            $('#upload_song').html($('#upload_song').html().replace('Загрузить трек в плейлист', 'Насрать в плейлист'));
            if (!(aCfg & 0x400000)) {
                $('#lsn-btn').html($('#lsn-btn').html().replace('Слушать радио на сайте', 'Покушать здеся'));
                $('.pull-left a.btn').html($('.pull-left a.btn').html().replace('Слушать в плеере (mp3, 192 кбит)', 'Покушать из тапки'));
            };
        };
    }


//-----------------------------------------------------------------------------
//                        Обработка плейлиста

    else if (settings.url === "/?app=playlist") {
        var res = $.parseJSON(xhr.responseText);
        if (!res) { return };

        if (aCfg & 0x200000) {
            $('#fill').html($('#fill').html().replace('Плейлист заполнен', 'Плейлист засран'));
        }

        // ---------- Детализация голосования ----------
        var p_votes = (parseInt(res.votes) + parseInt(res.score)) / 2;
        var n_votes = parseInt(res.votes) - p_votes;
        $("#voting .sub").attr("title", "За: " + p_votes + "  Против: " + n_votes).tooltip({placement: "bottom"});

        // ---------- Подсчет времени до трека ----------
        $(".playlist tr").each(function(i) {
            if (i) {
                $(this).addClass("track")
                    .attr("data-track-id", res.songs[i].id)
                    .attr("data-track-length", res.songs[i].length)
                    .hover(
                        function() {
                            $(this).find('.length').html(count_time_to(this));
                        },
                        function() {
                            $(this).find('.length').html($(this).attr('data-track-length'));
                    })
                    .click(function(event) {

                        if (event.target == this.getElementsByTagName("img")[0]) { return; };

                        var $this = $(this);
                        if (!$this.hasClass('alert-on')) {
                            ls_set('alert_on', $this.attr('data-track-id'));
                            if ($('.alert-on').length) {
                                $('.alert-on').removeClass('alert-on');
                                clearInterval(TTT_INTERVAL)
                            }
                            $this.addClass('alert-on');
                            TTT_INTERVAL = setInterval(check_time_to_track, 2000);
                        }
                        else {
                            $this.removeClass('alert-on');
                            delete localStorage['alert_on'];
                            clearInterval(TTT_INTERVAL)
                        }
                    });
            };
        });

        $('.track[data-track-id=' + ls_get('alert_on') + ']').addClass('alert-on');

        // ---------- Показ текущего трека при скрытом плейлисте ----------
        if (aCfg & 0x2000000) {
            if (!$("#now_playing").length) {
                $btn_row.find(".pull-right").before('<a id="now_playing" class="btn btn-mini disabled"></a>');
            };
            $("#now_playing").text(res.songs[0].str);
        };

    }
});


}).toString();
script.innerHTML = main.substr(17, main.length - 18);
document.getElementsByTagName('head')[0].appendChild(script);
