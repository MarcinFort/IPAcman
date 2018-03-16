import { consonants, vowels } from './RP_segments_api.js';

$(document).ready(() => {
    console.log(consonants);
    // Build the board

    let $board = $('#container');
    let $table = $('<table>');
    for (let i = 0; i < 20; i++) {
        let $tr = $('<tr>');
        for (let j = 0; j < 30; j++) {
            let $td = $('<td>').addClass('cell');
            $tr.append($td);
        }
        $table.append($tr);
    }
    $board.append($table);

    // Movement functions

    const moveLeft = (el => el.prev());
    const moveRight = (el => el.next());
    const moveUp = (el => el.parent().prev().find('td').eq(el.index()));
    const moveDown = (el => el.parent().next().find('td').eq(el.index()));

    function movement(el, direction, elClass) {
        let target = null;
        switch(direction) {
            case 37:
                target = moveLeft(el);
                break;
            case 38:
                target = moveUp(el);
                break;
            case 39:
                target = moveRight(el);
                break;
            default:
                target = moveDown(el);
        }
        if (target.length > 0) {
            target.addClass(elClass);
            el.removeClass(elClass);
        }
    }

    $('table > tr:first > td:first').addClass('pacman');

    $(document).keydown(function (e) {
        let $pacman = $('.pacman');
        if (e.keyCode > 36 && e.keyCode < 41) {
            e.preventDefault();
            movement($pacman, e.keyCode, 'pacman');
        }
    });
    

    

});