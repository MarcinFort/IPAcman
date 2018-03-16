$(document).ready(() => {
    
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


});