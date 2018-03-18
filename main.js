import { consonants, vowels, phonemes } from './RP_segments_api.js';

$(document).ready(() => {

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

    const movement = (el, direction, elClass1, elClass2) => {
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
            target.addClass(elClass1);
            el.removeClass(elClass1);
            if (elClass2) {
                target.addClass(elClass2);
                el.removeClass(elClass2);
            }
        }
    }

    $('table > tr:first > td:first').addClass('pacman right');

    $(document).keydown(function (e) {
        let $pacman = $('.pacman');
        let elClass2;
        if (e.keyCode > 36 && e.keyCode < 41) {
            e.preventDefault();
            $pacman.removeClass('left right up down');
            switch(e.keyCode) {
                case 37:
                    elClass2 = 'left';
                    break;
                case 38:
                    elClass2 = 'up';
                    break;
                case 39:
                    elClass2 = 'right';
                    break;
                default:
                    elClass2 = 'down';
            }
            $pacman.addClass(elClass2);
            movement($pacman, e.keyCode, 'pacman', elClass2);
        }
    });

    const get_phonemes_with_prop = (prop, value) => {
        return phonemes.filter(x => x[prop] === value);
    }

    const generate_random_phoneme = (category) => {
        let random_number;
        if (category === "C") {
            random_number = Math.floor(Math.random() * consonants.length);
            return consonants[random_number];
        }
        if (category === "V") {
            random_number = Math.floor(Math.random() * vowels.length);
            return vowels[random_number];
        } else {
            random_number = Math.floor(Math.random() * phonemes.length);
            return phonemes[random_number];
        }
    }

    const generate_random_position = () => {
        return [Math.floor(Math.random() * 20) + 1, Math.floor(Math.random() * 30) + 1];
    }

    const put_a_phoneme_on_the_board = (phoneme) => {
        let pos = generate_random_position();
        let pickedTd = $table.find("tr:nth-child("+pos[0]+")").find("td:nth-child("+pos[1]+")");

        while (pickedTd.hasClass('.pacman')) {
            pos = generate_random_position();
            pickedTd = $table.find("tr:nth-child("+pos[0]+")").find("td:nth-child("+pos[1]+")");
        }

        pickedTd.html(phoneme.ipa).addClass(phoneme.sampa).addClass("phoneme");
    }

    

});