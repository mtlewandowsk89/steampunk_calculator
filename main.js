$(function() {
  //set inputNumber to 1. This keeps track of how many operator keys have been pressed. It increments each time an operator is pressed.
  let inputNumber = 1;
  //set lastPress to 0. This makes sure you can't hit an operator button more than once in a row.
  let lastPress = 0;

  //switch statement for using the keyboard to click the calculator buttons.
  $("body").keyup(function (e) {
    e.preventDefault();
    //checks for keycode of the key you pressed as well as if the shift key was held down during the press.
    switch(e.which + '-' + e.shiftKey) {
      case '13-false': case '187-false':
        $('.equals').click();
        break;
      case '8-false': case '46-false': case '27-false':
        $('.clear').click();
        break;
      case '49-false': case '97-false':
        $('.one').click();
        break;
      case '50-false': case '98-false':
        $('.two').click();
        break;
      case '51-false': case '99-false':
        $('.three').click();
        break;
      case '52-false': case '100-false':
        $('.four').click();
        break;
      case '53-false': case '101-false':
        $('.five').click();
        break;
      case '54-false': case '102-false':
        $('.six').click();
        break;
      case '55-false': case '103-false':
        $('.seven').click();
        break;
      case '56-false': case '104-false':
        $('.eight').click();
        break;
      case '57-false': case '105-false':
        $('.nine').click();
        break;
      case '48-false': case '96-false':
        $('.zero').click();
        break;
      case '110-false': case '190-false':
        $('.decimel').click();
        break;
      case '107-false': case '187-true':
        $('.plus').click();
        break;
      case '109-false': case '189-false':
        $('.minus').click();
        break;
      case '106-false': case '56-true':
        $('.times').click();
        break;
      case '111-false': case '191-false':
        $('.divide').click();
        break;
      case '53-true':
        $('.percent').click();
      default:
        break;
    }
  });

  //any time a number is clicked, this function runs.
  $('.number').click(function() {
    //if there are already 10 numbers on the screen, number buttons will not work.
    if ($('.inputText').text().length >= 10) {
      return false;
    }
    //prevents multiple decimel points in any number
    if ($(this).attr('data-id') == '.' && $('.inputText').text().includes('.')) {
      return false;
    }
    //sets the value of lastPress to 2 to represent a number key being pressed last.
    lastPress = 2;
    //clears the input screen if you have pressed more than 2 operator keys and the value of hidden input total = the text on the input screen
    if ($('.inputText').text() == $('.total').val() && inputNumber > 2) {
      $('.inputText').text('');
    }
    //sets the value of num to the data-id of the number key you pressed. For example: Press key 2, variable num will equal 2.
    let num = $(this).attr('data-id');
    //send variable num into the createNumber function
    createNumber(num);
  })

  function createNumber(x) {
    //displays the value of num, which is the data-id of whatever key you pressed, on the input screen.
    $('.inputText').append(x);
    //sets num as the value of the hidden input that corresponds to how many operator keys have been pressed. Each time an operator is pressed the value of inputNumber increases by 1 and a new hidden input get the value.
    $('.num'+inputNumber).val($('.inputText').text());
  }

  //clears the calculator and resets everything
  $('.clear').click(function() {
    lastPress = 0;
    inputNumber = 1;
    $('.inputText').text('');
    $('.total').val('');
    $('.savedNum').val('');
    //removes any hidden inputs that were dynamically appended
    $('.temp').remove();
  })

  //runs when you click the +/- button
  $('.plusOrMinus').click(function() {
    //the function will not run if there are no characters on the input screen or if there are more than 11 characters on the input screen
    if (!$('.inputText').text() || $('.inputText').text().length > 11) {
      return false;
    }
    //this code only runs if there is a value in the total hidden input. In other words, this only runs if a computation has already happened.
    if ($('.total').val()) {
      //assigns variable newNumber to the value of total hidden input in decimel form
      let newNumber = parseFloat($('.total').val());
      //checks to see if newNumber is negative
      if(newNumber < 0) {
        //if newNumber is negative, switches it to positive and removes the negative sign from the input screen
        $('.total').val(Math.abs(newNumber));
        $('.inputText').text($('.inputText').text().substring(1));
      } else {
        //if newNumber is positive, sets it to negative and prepends a '-' onto the input screen
        $('.total').val(newNumber * -1);
        $('.inputText').prepend('-');
      }
    //this code only runs if there is no value in total yet. In other words, nothing has been calculated yet.
    } else {
      //checks to see if the current num hidden input value is negative
      if(parseFloat($('.num'+inputNumber).val()) < 0) {
        //if it is negative, this makes it positive and removes the '-' sign from the input screen
        $('.num'+inputNumber).val(Math.abs($('.num'+inputNumber).val()));
        $('.inputText').text($('.inputText').text().substring(1));
      } else {
        //if it is positive, this sets it to negative and prepends a '-' onto the input screen
        $('.num'+inputNumber).val($('.num'+inputNumber).val() * -1);
        $('.inputText').prepend('-');
      }
    }
  })

  //this runs when you click the % button
  $('.percent').click(function() {
    //function will not run if there is no text on the input screen or if there are more than 11 characters on the input screen
    if (!$('.inputText').text() || $('.inputText').text().length > 11) {
      return false;
    }
    //makes sure you didn't press the % key twice in a row. This code won't run if you pressed % key last
    if (lastPress != 3) {
      //sets lastPress to 3 which will make it so you can't press % again until you've pressed a different key type
      lastPress = 3;
      //if the hidden input of total has a value, this code runs.
      if ($('.total').val()) {
        //set newNumber to the value of total divided by 100 in decimel form.
        let newNumber = parseFloat($('.total').val() / 100);
        //sets the value of newNumber to total and to the text on the input screen
        $('.inputText').text(newNumber);
        $('.total').val(newNumber);
      } else {
      //if hidden input of total has no value, this code runs.
        $('.num'+inputNumber).val($('.num'+inputNumber).val() / 100);
        //divides current num hidden input by 100 and places it onto the input screen
        $('.inputText').text($('.num'+inputNumber).val());
      }
    }
  })

  //this runs when any operator key is clicked. For example, '+' or '-' or '*'. This includes '='
  $('.operator').click(function() {
    //if there is no text on the input screen, exit the function and don't allow any operators to be pressed.
    if (!$('.inputText').text()) {
      return false;
    }
    //sets operatorNumber to the previous operator pressed. So that if you press "10 * 2" and then "-", the * will run instead of the -
    let operatorNumber = inputNumber - 1;
    //only run the rest of the code if an operator was not pressed last or if the previous operator pressed was "="
    if (lastPress != 1 || $('.operator'+operatorNumber).text() == 'equals') {
      //prevents you from pressing "=" twice in a row
      if ($(this).attr('data-id') == 'equals' && $('.operator'+operatorNumber).text() == 'equals') {
        return false;
      }
      //sets lastPress to 1 so you can't press another operator directly after this
      lastPress = 1;
      //sets the most recent hidden input of operator to the value of the data-id of the operator button you pressed to fire this function
      $('.operator'+inputNumber).text($(this).attr('data-id'));
      //increments inputNumber and appends a number and operator hidden input onto the calculator to keep track of the previous button presses
      inputNumber++;
      $('.calculator').append('<input type="hidden" class="savedNum temp num' + inputNumber +'">');
      $('.calculator').append('<input type="hidden" class="temp operator' + inputNumber +'">');
      //rest of this code only runs if you have already pressed more than 2 operator keys and the previous one you pressed was not '='
      if (inputNumber > 2 && $('.operator'+operatorNumber).text() != 'equals') {
        //sets variables equal to the last 2 numbers that were pressed
        let newInputNumber = inputNumber - 2;
        let newInputNumber2 = inputNumber -1;
        //sets operator equal to the previous operator key pressed
        let operator = $('.operator'+newInputNumber).text();
        //this code runs if you are doing division (you hit divide key last)
        if (operator == 'divide') {
          //checks for a value in the hidden input total
          if ($('.total').val()) {
            //divides the 2 previous numbers and gets a new value set to newNumber. This is then set as the value of the hidden input total and displayed on the input screen.
            let newNumber = parseFloat($('.total').val()) / parseFloat($('.num'+newInputNumber2).val());
            //allow max of 10 characters to show on the input screen
            let shortenedString = (newNumber).toString().substring(0, 10);
            $('.inputText').text(shortenedString);
            $('.total').val(newNumber);
          } else {
            //this runs if there was no value in the hidden input total
            //divides the 2 previous numbers and gets a new value set to newNumber. This is then set as the value of the hidden input total and displayed on the input screen.
            let newNumber = parseFloat($('.num'+newInputNumber).val()) / parseFloat($('.num'+newInputNumber2).val());
            //allow max of 10 characters to show on the input screen
            let shortenedString = (newNumber).toString().substring(0, 10);
            $('.inputText').text(shortenedString);
            $('.total').val(newNumber);
          }
        //this code runs if you are doing multiplication (you hit times key last)
        } else if (operator == 'times') {
          //checks for a value in the hidden input total
          if ($('.total').val()) {
            //multiplies the 2 previous numbers and gets a new value set to newNumber. This is then set as the value of the hidden input total and displayed on the input screen.
            let newNumber = parseFloat($('.total').val()) * parseFloat($('.num'+newInputNumber2).val());
            //allow max of 10 characters to show on the input screen
            let shortenedString = (newNumber).toString().substring(0, 10);
            $('.inputText').text(shortenedString);
            $('.total').val(newNumber);
          } else {
            //this runs if there was no value in the hidden input total
            //multiplies the 2 previous numbers and gets a new value set to newNumber. This is then set as the value of the hidden input total and displayed on the input screen.
            let newNumber = parseFloat($('.num'+newInputNumber).val()) * parseFloat($('.num'+newInputNumber2).val());
            //allow max of 10 characters to show on the input screen
            let shortenedString = (newNumber).toString().substring(0, 10);
            $('.inputText').text(shortenedString);
            $('.total').val(newNumber);
          }
        //this code runs if you are doing subtraction (you hit minus key last)
        } else if (operator == 'minus') {
          //checks for a value in the hidden input total
          if ($('.total').val()) {
            //subtracts the 2 previous numbers and gets a new value set to newNumber. This is then set as the value of the hidden input total and displayed on the input screen.
            let newNumber = parseFloat($('.total').val()) - parseFloat($('.num'+newInputNumber2).val());
            //allow max of 10 characters to show on the input screen
            let shortenedString = (newNumber).toString().substring(0, 10);
            $('.inputText').text(shortenedString);
            $('.total').val(newNumber);
          } else {
            //this runs if there was no value in the hidden input total
            //subtracts the 2 previous numbers and gets a new value set to newNumber. This is then set as the value of the hidden input total and displayed on the input screen.
            let newNumber = parseFloat($('.num'+newInputNumber).val()) - parseFloat($('.num'+newInputNumber2).val());
            //allow max of 10 characters to show on the input screen
            let shortenedString = (newNumber).toString().substring(0, 10);
            $('.inputText').text(shortenedString);
            $('.total').val(newNumber);
          }
        //this code runs if you are doing addition (you hit plus key last)
        } else {
          //checks for a value in the hidden input total
          if ($('.total').val()) {
            //adds the 2 previous numbers and gets a new value set to newNumber. This is then set as the value of the hidden input total and displayed on the input screen.
            let newNumber = parseFloat($('.total').val()) + parseFloat($('.num'+newInputNumber2).val());
            //allow max of 10 characters to show on the input screen
            let shortenedString = (newNumber).toString().substring(0, 10);
            $('.inputText').text(shortenedString);
            $('.total').val(newNumber);
          } else {
            //this runs if there was no value in the hidden input total
            //adds the 2 previous numbers and gets a new value set to newNumber. This is then set as the value of the hidden input total and displayed on the input screen.
            let newNumber = parseFloat($('.num'+newInputNumber).val()) + parseFloat($('.num'+newInputNumber2).val());
            //allow max of 10 characters to show on the input screen
            let shortenedString = (newNumber).toString().substring(0, 10);
            $('.inputText').text(shortenedString);
            $('.total').val(newNumber);
          }
        }
      //this runs if you have only pressed 1 or 2 operator keys and '=' was not the last one. This clears the input screen to allow you to type a new number after hitting '+','*','-', or '/'
      } else {
        $('.inputText').text('');
      }
    }
  })
  
  $('.button').click(function() {
    if (!$('.gear').hasClass('spun')) {
      $('.gear').addClass('spin');
      $('.gear2').addClass('spin');
      $('.gear').addClass('spun');
      $('.gear').css('webkitAnimationPlayState', 'running');
      $('.gear2').css('webkitAnimationPlayState', 'running');
      setTimeout(function () {  
        $('.gear').removeClass('spun');
        $('.gear').css('webkitAnimationPlayState', 'paused');
        $('.gear2').css('webkitAnimationPlayState', 'paused');
      }, 1000);
    }
  })
})
