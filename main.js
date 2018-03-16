$(document).ready(() => {
    
    // Build the board

    let $board = $('#container');
    let $table = $('<table>');
    for (i = 0; i < 20; i++) {
        let $tr = $('<tr>');
        for (j = 0; j < 30; j++) {
            let $td = $('<td>').addClass('cell');
            $tr.append($td);
        }
        $table.append($tr);
    }
    $board.append($table);

    // Movement functions

    const UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39;

    const moveLeft = (el => el.prev());
    const moveRight = (el => el.next());
    const moveUp = (el => el.parent().prev().find('td').eq(el.index()));
    const moveDown = (el => el.parent().next().find('td').eq(el.index()));

    function movement(el, direction, elClass) {
        let target = null;
        switch(direction) {
            case LEFT:
                target = moveLeft(el);
                break;
            case UP:
                target = moveUp(el);
                break;
            case RIGHT:
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

    

});