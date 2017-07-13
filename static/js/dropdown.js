$(function () {
    $('.has-dropdown .toggle').click(function (ev) {
        var shouldShow = $(this).next('.dropdown').hasClass('hidden');
        $('.has-dropdown .toggle + .dropdown').addClass('hidden');
        if(shouldShow) {
            $(this).next('.dropdown').removeClass('hidden');
        }
        
        ev.preventDefault();
        return false;
    });
}());