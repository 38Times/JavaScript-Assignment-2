$(document).ready(function () {


    const MAX_TIME = 30;
    var timeElapsed = 0;
    var timer;
    var quizCompleted = false;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var correctAnswersKey = [];


    var quiz = [
        {
            question: 'What year was Volkswagen founded?',
            options: ['1930', '1936', '1937', '1942'],
            answer: 3
        },
        {
            question: 'What is the best selling Vehicle in America 2018?',
            options: ['Honda CR-V', 'Honda Civic', 'Chevrolet Silverado', 'Ford F-Series'],
            answer: 4
        },
        {
            question: 'Who was the first woman to win the FIA Production Car Cup for Drivers of 2WD?',
            options: ['Ramona Karlsson', 'Louise Cook', 'Burcu Çetinkaya', 'Michèle Mouton'],
            answer: 2
        },
        {
            question: 'What is the best selling sports car in America?',
            options: ['Ford Mustang', 'Chevy Camaro', 'Chevy Corvette', 'Nissan GT-R'],
            answer: 1
        },
        {
            question: 'What is the worst American made Vehicle?',
            options: ['2003 SATURN ION', '1982 CADILLAC CIMARRON', '2000 PONTIAC AZTEK', '2001 CHRYSLER PT CRUISER'],
            answer: 3
        },
        {
            question: 'What company did John DeLorean work for prior to DeLorean Motor Company?',
            options: ['Tesla, Inc.', 'General Motors', 'Bugatti', 'Lamborghini'],
            answer: 2
        },
        {
            question: 'Who is the Godmother of Automotive Design?',
            options: ['Mary Barra', 'Patrice Banks', 'Pamela Fletcher', 'Helene Rother'],
            answer: 4
        },
        {
            question: 'Who made the first production vehicle',
            options: ['Karl Benz', 'Gottlieb Daimler', 'Wilhelm Maybach', 'Siegfried Marcus'],
            answer: 1
        }
    ];



    for (var i = 0; i < quiz.length; i++) {
        var answer = i + 1;
        var form = $('<form>');
        form.append($('<h4>').text(quiz[i].question));
        for (var j = 0; j < quiz[i].options.length; j++) {
            var value = j + 1;
            var div = $('<div>').addClass('form-check-inline');
            var label = $('<label for="q' + answer + value + '">').addClass('form-check-label');

            var radio = $('<input>').attr({
                type: 'radio',
                id: 'q' + answer + value,
                name: 'answer' + answer,
                value: value
            });
            radio.addClass('form-check-input');
            label.append(radio);
            label.append(quiz[i].options[j]);
            div.append(label);
            form.append(div);
        }

        form.insertBefore("#btnDone");
        correctAnswersKey.push(quiz[i].answer);
    }



    $('#btnStart').click(gameStart);

    function gameStart() {
        console.log('Game started');

        $('#colBtnStart').hide();

        $('#timeRemain').text(MAX_TIME);
        $('#timer').show();

        $('#quizContainer').show();

        timer = setInterval(eachSecond, 1000);
    }

    function eachSecond() {

        timeElapsed++;
        console.log('Time Elapsed (s): ' + timeElapsed);

        $('#timeRemain').text(MAX_TIME - timeElapsed);

        if ((timeElapsed >= MAX_TIME) || (quizCompleted)) {
            clearInterval(timer);
            showResult();
        }
    }


    $('#btnDone').click(userDone);

    function userDone() {
        console.log('User has pressed the button DONE.');
        quizCompleted = true;
    }

    function showResult() {
        console.log('Showing the result...');

        $('#timer').hide();
        $('#quizContainer').hide();

        for (var i = 0; i < correctAnswersKey.length; i++) {
            var index = i + 1;
            var answer = $("input[name='answer" + index + "']:checked").val();
            if (answer == correctAnswersKey[i]) {
                correct++;
            } else if (answer == undefined) {
                unanswered++;
            } else {
                incorrect++;
            }
        }

        $('#correct').text(correct);
        $('#incorrect').text(incorrect);
        $('#unanswered').text(unanswered);

        $('#resultContainer').show();
    }

});