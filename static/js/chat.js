'use strict';

import userService from 'service';

$(function() {
    let messages = [];
    userService.get('http://localhost:3005/user')
        .then((data) => {
            const socket = io.connect();
            let user = data.user;
            let users = [];
            let username = user.username;
            let text;

            socket.emit('join', {
                user,
            });

            socket.emit('get-users');

            socket.on('all-users', (data) => {
                users = data.filter((user) => {
                    return user.username !== username;
                });

                users.forEach((user) => {
                    allUsers(user);
                });
            });

            socket.on('message-recieved', (data) => {
                if (data.message.username !== username) {
                    insertChat('you', data.message);
                } else {
                    insertChat('me', data.message);
                }
                });
                // Events
                $('#messageSend').on('submit', () => {

                const entityMap = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    '\'': '&#39;',
                    '/': '&#x2F;',
                    '`': '&#x60;',
                    '=': '&#x3D;',
                }
                function escapeHtml(string) {
                    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
                        return entityMap[s];
                    });
                };

                const $message = $(".message-text").val();
                text = escapeHtml($message);
                let data = sendMessage(text, user);
                socket.emit('send-message', data);
                $(".message-text").val('');
            });

            $('.table-users').on('click', 'tr', (e) => {
                const user = e.target.parentElement;
                const $tr = $(user);
                const $id = $(user).attr('data-id');
                const $username = $(user).find('.username').text();

                $('table.table-users tr').removeClass('selected-user');
                $tr.addClass('selected-user');
                $('.col-md-5.frame.well').removeClass('hidden');
                $('.username-chat').html($username);

            });
        })
        .catch((err) => {
            console.log(err);
        });

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

    function allUsers(data) {
        $('.table-users tbody').empty();
        let content = `
        <tr data-id=${data.socketId} class=${data.username}>
            <td width="10" align="center" data-id="">
                <img class="pull-left img-circle nav-user-photo" width='50' src='/static/pictures/img/${data.avatar}'/>
            </td>
            <td class='username'>
                    ${data.username}<br><i class="fa fa-envelope"></i>
            </td>
            <td>
                ${data.usertype}
            </td>
            <td align="center">
                <span class='green-dot'></span>
            </td>
        </tr>`;
        $('.table-users tbody').append(content);

    }


    //-- No use time. It is a javaScript effect.
    function insertChat(who, user, time = 0) {
        let control = "";
        let date = formatAMPM(new Date());

        if (who == "me") {

            control = '<li style="width:100%">' +
                '<div class="msj macro">' +
                '<div class="avatar"><img class="img-circle" style="height: 75%; width:100%;" src="/static/pictures/img/' + user.avatar + '" /></div>' +
                '<div class="text text-l">' +
                '<p>' + user.message + '</p>' +
                '<p><small>' + date + '</small></p>' +
                '</div>' +
                '</div>' +
                '</li>';
        } else {
            control = '<li style="width:100%;">' +
                '<div class="msj-rta macro">' +
                '<div class="text text-r">' +
                '<p>' + user.message + '</p>' +
                '<p><small>' + date + '</small></p>' +
                '</div>' +
                '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="/static/pictures/img/' + user.avatar + '" /></div>' +
                '</li>';
        }

        setTimeout(
            function() {
                $("ul.list-messages").append(control);
            }, time);
        $('ul.list-messages').animate({ scrollTop: $('ul.list-messages').prop("scrollHeight") }, 500);
    }

    function resetChat() {
        $("ul.list-messages").empty();
    }

    function sendMessage(message, user) {
        if (message === '' || message === null) {
            alert(`Message can't be empty.`);
        } else {

            if (message === '') {
                alert(`Message can't be empty.`);
            } else {
                let date = formatAMPM(new Date());
                const data = {
                    message: message,
                    username: user.username,
                    time: date,
                    avatar: user.avatar,
                }
                messages.push(data);
                return data;
            }
        }
    };

});
