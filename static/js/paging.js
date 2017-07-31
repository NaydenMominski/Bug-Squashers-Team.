$(function() {
    $('#sellTable').pageMe({
        pagerSelector: '#pagerSell',
        activeColor: 'blue',
        prevText: 'Prev',
        nextText: 'Next',
        showPrevNext: true,
        hidePageNumbers: false,
        perPage: 1
    });

    $('#rentTable').pageMe({
        pagerSelector: '#pagerRent',
        activeColor: 'blue',
        prevText: 'Prev',
        nextText: 'Next',
        showPrevNext: true,
        hidePageNumbers: false,
        perPage: 1
    });
});
