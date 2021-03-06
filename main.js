import { consonants, vowels, phonemes } from './RP_segments_API.js';
import { questions } from './RP_questions_API.js';

$(document).ready(() => {

    // Build the board

    let $board = $('#container');
    let $table = $('<table>');
    for (let i = 0; i < 20; i++) {
        let $tr = $('<tr>');
        for (let j = 0; j < 30; j++) {
            let $td = $('<td>');
            $tr.append($td);
        }
        $table.append($tr);
    }
    $board.append($table);

    // Render Pacman

    const renderPacman = () => {
        $('table > tr:first > td:first').addClass('pacman right');
    }

    renderPacman();

    // Global variables

    let currently_searched;
    let score = 0;
    let lives = 3;
    let phonemeIndex = 0;
    let intervals = [];
    let phonemes_on_the_board = [];
    let pace = 1200;
    let game = false;
    $('input[value=1200]').prop('checked', true);

    // Starting game

    $(document).on("click", "#start_button", () => {
        if (!game) {
            startGame();
        } else {
            stopGame();
        }
    });

    const startGame = () => {
        if (!game) {
            game = true;
            $("select").attr("disabled", true);
            $("input").attr("disabled", true);
            for (let i = 0; i < 6; i++) {
                new_phoneme_on_the_board();
            }

            generate_random_question();
            $("#start_button").html("QUIT GAME");
        }
    }

    // Stopping game

    const stopGame = () => {
        if (game) {
            add_score_to_leaderboard();
            game = false;
            $("select").attr("disabled", false);
            $("input").attr("disabled", false);
            score = 0;
            $("#score_span").html(score);
            lives = 3;
            $("#lives_span").html(lives);
            $("#current_search").html("");
            phonemeIndex = 0;
            phonemes_on_the_board = [];
            intervals.forEach(x => clearInterval(x));
            intervals = [];
            $("td").removeClass().html("").removeAttr("index");
            renderPacman();
            currently_searched = [];
            $("#start_button").html("START GAME");
        }
    }

    // Leaderboard

    const add_score_to_leaderboard = () => {
        let best_score = JSON.parse(localStorage.getItem(`ipacman-best-score-${pace}`)) || [];
        let username = prompt(`GAME OVER. Your final score is ${score}. Name: `);
        if (!username) { username = "Anonymous" };
        best_score.push({user: username, score: score});
        best_score.sort((a, b) => b.score - a.score);
        localStorage.setItem(`ipacman-best-score-${pace}`, JSON.stringify(best_score));
        populate_leaderboard();
    }

    const populate_leaderboard = () => {
        for (let i = 0; i < 3; i++) {
            $("#leaderboard li:nth-child(" + (i + 1) + ")").text("Empty");
        }
        if (localStorage.getItem(`ipacman-best-score-${pace}`) !== null) {
            for (let i = 0; i < 3; i++) {
                if (JSON.parse(localStorage.getItem(`ipacman-best-score-${pace}`))[i] != undefined) {
                    $("#leaderboard li:nth-child(" + (i + 1) + ")").text((JSON.parse(localStorage.getItem(`ipacman-best-score-${pace}`))[i].user) + ": " + (JSON.parse(localStorage.getItem(`ipacman-best-score-${pace}`))[i].score));
                }
            }
        }
    }

    populate_leaderboard();

    $('input').on('change', () => {
        if ($('input:checked').val()) {
            pace = $('input:checked').val();
        } else {
            pace = undefined;
        }
        populate_leaderboard();
    });

    // Movement functions

    const moveLeft = el => el.prev();
    const moveRight = el => el.next();
    const moveUp = el => el.parent().prev().find('td').eq(el.index());
    const moveDown = el => el.parent().next().find('td').eq(el.index());
    const moveUpLeft = el => el.parent().prev().find('td').eq(el.index() - 1);
    const moveUpRight = el => el.parent().prev().find('td').eq(el.index() + 1);
    const moveDownLeft = el => el.parent().next().find('td').eq(el.index() - 1);
    const moveDownRight = el => el.parent().next().find('td').eq(el.index() + 1);

    const movement = (el, direction) => {

        // General movement mechanics

        let target = null;
        switch(direction) {
            // The first four cases are relevant for Pacman, so we use keycodes; the remaining ones apply to phonemes only
            case 37:
                target = moveLeft(el);
                break;
            case 72:
                target = moveLeft(el);
                break;
            case 38:
                target = moveUp(el);
                break;
            case 75:
                target = moveUp(el);
                break;
            case 39:
                target = moveRight(el);
                break;
            case 76:
                target = moveRight(el);
                break;
            case 40:
                target = moveDown(el);
                break;
            case 74:
                target = moveDown(el);
                break;
            case 'UpLeft':
                target = moveUpLeft(el);
                break;
            case 'UpRight':
                target = moveUpRight(el);
                break;
            case 'DownLeft':
                target = moveDownRight(el);
                break;
            case 'DownRight':
                target = moveDownRight(el);
                break;
            default:
                return;
        }

        // Block movement in some cases

        if ((target.length === 0) && (el.hasClass("pacman")) || target.hasClass("pacman")) {
            return;
        }

        // Handle Pacman vs. Phoneme contact

        const check_if_phoneme_current = () => {
            let class_list = target[0].className.split(" ");
            return currently_searched.some(x => class_list.includes(x));
        }

        const eat_a_phoneme = () => {
            target.removeClass();
            target.html("");
            let index = target.attr("index");
            clearInterval(intervals[index]);
            phonemes_on_the_board[index] = null;
            new_phoneme_on_the_board();
        }

        if (el.hasClass('pacman') && target.hasClass('phoneme')) {
            
            if (check_if_phoneme_current()) {
                score++;
                $("#score_span").html(score);
                eat_a_phoneme();
                $('.pacman').addClass('success');
                setTimeout(() => $('.pacman').removeClass('success'), 250);       
                generate_random_question();
            } else {
                lives--;
                $("#lives_span").html(lives);
                eat_a_phoneme();
                $('.pacman').addClass('failure');
                setTimeout(() => $('.pacman').removeClass('failure'), 250);       
                if (lives === 0) {
                    stopGame();
                }
            }

        }

        // Generate a new direction

        const get_a_new_direction = (elDirection) => {
            let random_number = (Math.floor(Math.random()*3));
            let newDirection;
            switch (elDirection) {
                case '37':
                    if (random_number === 0) {
                        newDirection = 'UpRight';
                    } else if (random_number === 1) {
                        newDirection = 39;
                    } else {
                        newDirection = 'DownRight';
                    }
                    break;
                case '38':
                    if (random_number === 0) {
                        newDirection = 'DownLeft';
                    } else if (random_number === 1) {
                        newDirection = 40;
                    } else {
                        newDirection = 'DownRight';
                    }
                    break;
                case '39':
                    if (random_number === 0) {
                        newDirection = 'UpLeft';
                    } else if (random_number === 1) {
                        newDirection = 37;
                    } else {
                        newDirection = 'DownLeft';
                    }
                    break;
                case '40':
                    if (random_number === 0) {
                        newDirection = 'UpLeft';
                    } else if (random_number === 1) {
                        newDirection = 38;
                    } else {
                        newDirection = 'UpRight';
                    }
                    break;
                case 'UpLeft':
                    if (random_number === 0) {
                        newDirection = 'DownRight';
                    } else if (random_number === 1) {
                        newDirection = 39;
                    } else {
                        newDirection = 40;
                    }
                    break;
                case 'UpRight':
                    if (random_number === 0) {
                        newDirection = 'DownLeft';
                    } else if (random_number === 1) {
                        newDirection = 40;
                    } else {
                        newDirection = 37;
                    }
                    break;
                case 'DownLeft':
                    if (random_number === 0) {
                        newDirection = 'UpRight';
                    } else if (random_number === 1) {
                        newDirection = 38;
                    } else {
                        newDirection = 39;
                    }
                    break;
                case 'DownRight':
                    if (random_number === 0) {
                        newDirection = 'UpLeft';
                    } else if (random_number === 1) {
                        newDirection = 38;
                    } else {
                        newDirection = 37;
                    }
                    break;
            }
            return newDirection;
        }
        // Handle phoneme vs. wall contact

        if (target.length === 0 && el.hasClass("phoneme")) {
            let elIndex = el.attr("index");
            let elDirection = el.attr("direction");
            clearInterval(intervals[elIndex]);
            let newDirection = get_a_new_direction(elDirection);
            el.attr("direction", newDirection);
            set_movement_interval(el, newDirection, pace);
            return;
        }

        // Handle phoneme vs. phoneme contact
        
        if (el.hasClass("phoneme") && target.hasClass("phoneme")) {
            let elDirection = el.attr("direction");
            let targetDirection = target.attr("direction");
            let newElDirection = get_a_new_direction(elDirection);
            let newTargetDirection = get_a_new_direction(targetDirection);
            el.attr("direction", newElDirection);
            target.attr("direction", newTargetDirection);
            let elIndex = el.attr("index");
            clearInterval(intervals[elIndex]);
            let targetIndex = target.attr("index");
            clearInterval(intervals[targetIndex]);
            set_movement_interval(el, newElDirection, pace);
            set_movement_interval(target, newTargetDirection, pace);
            return;
        }

        // Default

        if (!el.hasClass('pacman')) {
            let content = el.html();
            el.html("");
            target.html(content);
        }

        let classes = el.attr("class").split(" ");

        classes.forEach(cssClass => {
            target.addClass(cssClass);
            el.removeClass(cssClass);
        });

        if (el.attr("index")) {
            let index = el.attr("index");
            el.attr("index", null);
            target.attr("index", index);
        }

        if (el.attr("direction")) {
            let direction = el.attr("direction");
            el.attr("direction", null);
            target.attr("direction", direction);
        }
    }

    // Bind Pacman keycodes

    $(document).keydown(e => {
        if (game) {
            let $pacman = $('.pacman');
            let elClass2;
            if ((e.keyCode > 36 && e.keyCode < 41) || (e.keyCode === 72) || (e.keyCode > 73 && e.keyCode < 77)) {
                e.preventDefault();
                $pacman.removeClass('left right up down');
                switch(e.keyCode) {
                    case 37:
                        elClass2 = 'left';
                        break;
                    case 72:
                        elClass2 = 'left';
                        break;  
                    case 38:
                        elClass2 = 'up';
                        break;
                    case 75:
                        elClass2 = 'up';
                        break;
                    case 39:
                        elClass2 = 'right';
                        break;
                    case 76:
                        elClass2 = 'right';
                        break;
                    case 74:
                        elClass2 = 'down';
                        break;
                    default:
                        elClass2 = 'down';
                }
                $pacman.addClass(elClass2);
                movement($pacman, e.keyCode);
            }
        }
    });

    // Movement interval function

    const set_movement_interval = (el, direction, pace) => {
        let index = el.attr("index");
        let interval = setInterval(() => {
            movement (el, direction);
            el = $table.find('td[index='+index+']');
        }, pace, el);
        intervals[index] = interval;
    };

    // Phoneme functions

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

        while (pickedTd.hasClass('.pacman') || pickedTd.hasClass('.phoneme')) {
            pos = generate_random_position();
            pickedTd = $table.find("tr:nth-child("+pos[0]+")").find("td:nth-child("+pos[1]+")");
        }
        
        for (let prop in phoneme) {
            pickedTd.addClass(phoneme[prop]);
        }
        pickedTd.html(phoneme.ipa).addClass("phoneme").attr("index", phonemeIndex);
        phonemes_on_the_board[phonemeIndex] = phoneme;
        if (pace) {
            set_a_phoneme_in_motion(pickedTd)
        };
        phonemeIndex++;
    }

    const generate_random_question = () => {
        let classes_of_phonemes_on_the_board = [];
        phonemes_on_the_board.forEach(x => {
            for (let prop in x) {
                classes_of_phonemes_on_the_board.push(x[prop]);
            }
        });
        let index = Math.floor(Math.random()*questions.length);
        while (!classes_of_phonemes_on_the_board.some(
            x => questions[index]["classes"].indexOf(x) > -1
        )) {
            index = Math.floor(Math.random()*questions.length);
        }
        $('#current_search').html(questions[index]["question"]);
        currently_searched = questions[index]["classes"];
    }

    const set_a_phoneme_in_motion = (phoneme) => {
        let random_movement = Math.floor(Math.random() * 8);
        let direction;
        switch(random_movement) {
            case 0:
                direction = 37;
                break;
            case 1:
                direction = 38; 
                break;
            case 2:
                direction = 39;
                break;
            case 3:
                direction = 40;
                break;
            case 4:
                direction = 'UpLeft';
                break;
            case 5:
                direction = 'UpRight';
                break;
            case 6:
                direction = 'DownLeft';
                break;
            default:
                direction = 'DownRight';
        }
        phoneme.attr("direction", direction);
        set_movement_interval(phoneme, direction, pace);
    }

    const new_phoneme_on_the_board = () => {
        put_a_phoneme_on_the_board(generate_random_phoneme("any"));
    }

});
