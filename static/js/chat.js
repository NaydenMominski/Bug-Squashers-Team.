'use strict';

$(() => {

    const socket = io.connect('http://localhost:3005');
    $.ajax({
        url: 'http://localhost:3005/user',
        dataType: 'json',
        success: (res) => {
            result(res.user);
        },
        error: (err) => {
            error(err);
        },
        type: 'GET',
    });

    const me = {};
    const you = {};
    you.avatar = '../pictures/img/default-user.png';

    function result(user) {
        me.avatar = '/static/pictures/img/' + user.avatar;
        me.fromUserId = user.id;
        me.toUserId = '';
    }

    function formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;

        return strTime;
    }

    //-- No use time. It is a javaScript effect.
    function insertChat(who, text, time = 0) {
        let control = "";
        let date = formatAMPM(new Date());

        if (who == "me") {

            control = '<li style="width:100%">' +
                '<div class="msj macro">' +
                '<div class="avatar"><img class="img-circle" style="height: 75%; width:100%;" src="' + me.avatar + '" /></div>' +
                '<div class="text text-l">' +
                '<p>' + text + '</p>' +
                '<p><small>' + date + '</small></p>' +
                '</div>' +
                '</div>' +
                '</li>';
        } else {
            control = '<li style="width:100%;">' +
                '<div class="msj-rta macro">' +
                '<div class="text text-r">' +
                '<p>' + text + '</p>' +
                '<p><small>' + date + '</small></p>' +
                '</div>' +
                '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="' + you.avatar + '" /></div>' +
                '</li>';
        }

        setTimeout(
            function() {
                $("ul.list-messages").append(control);
            }, time);
        $('ul.list-messages').animate({ scrollTop: $('ul.list-messages').prop("scrollHeight") }, 500);
    }

    function resetChat() {
        $("ul").empty();
    }

    // Events
    $(".message-text").on("keyup", (e) => {
        const $input = $(".message-text");
        if (e.which === 13) {
            let $text = $input.val();
            if ($text !== "") {
                me.message = $text;
                socket.emit('add-message', me);
                insertChat("me", $text);
                $input.val('');
            }
        }
    });

    $('table.table-users>tbody>tr').on('click', (e) => {
        debugger;
        const user = e.target.parentElement;
        const $tr = $(user);
        const $id = $(user).attr('data-id');
        const $fullname = $(user).find('.fullname').text();

        $('table.table-users tr').removeClass('selected-user');
        $tr.addClass('selected-user');
        me.toUserId = $id;
        $('.col-md-5.frame.well').removeClass('hidden');
        $('.username-chat').html($fullname);

    })
});
