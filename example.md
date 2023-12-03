---
title: Демонстрація роботи автоінформатора
layout: page
description: Демонстрація роботи автоінформатора
---

  <!-- ## wrapper -->
  <div class="wrapper">
    <!-- ## phone area -->
    <div class="phone">
      <!-- ## phone area -->
      <div class="phone-container">
        <input type="text" maxlength="11" class="number-input" id="numberInput" value="" onchange="playAudio()" placeholder="Здається нам телефонують"/>
        <!-- ## keyboard -->
        <div class="keyboard">
          <div class="number">
            <span data-number="1"><i>1</i></span>
            <span data-number="2"><i>2</i></span>
            <span data-number="3"><i>3</i></span>
            <span data-number="4"><i>4</i></span>
            <span data-number="5"><i>5</i></span>
            <span data-number="6"><i>6</i></span>
            <span data-number="7"><i>7</i></span>
            <span data-number="8"><i>8</i></span>
            <span data-number="9"><i>9</i></span>
            <span data-number="0"><i>0</i></span>
          </div>
           <div class="controls">
          <button class="accept-call" onclick="acceptCall()">Відповісти</button>
          <button class="reject-call" onclick="rejectCall()">Відхилити</button>
        </div>
        </div>
      </div>
    </div>
  </div>
  
<style>
  * {
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
}
body {
  font-family: 'Open Sans', sans-serif;
  font-size:14px;
}
input {
  font-size:20px;
  color:#e5261f;
  font-weight:400;
  &.number-input {
    width:100%;
    height:55px;
    line-height:55px;
    text-align:center;
    padding:0 20px;
    border-radius:10px;
    border:1px solid #e5261f;
    -webkit-box-shadow: 0px 0px 17px -1px rgba(132,132,132,0.15);
    -moz-box-shadow: 0px 0px 17px -1px rgba(132,132,132,0.15);
    box-shadow: 0px 0px 17px -1px rgba(132,132,132,0.15);
  }
}
.controls {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.accept-call,
.reject-call {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.accept-call:hover,
.reject-call:hover {
  background-color: #4CAF50;
  color: white;
}

@keyframes incomingCall {
  0% {
    box-shadow: 0 0 10px rgba(229, 38, 31, 0.7);
  }
  50% {
    box-shadow: 0 0 20px rgba(229, 38, 31, 0.9);
  }
  100% {
    box-shadow: 0 0 10px rgba(229, 38, 31, 0.7);
  }
}

.incoming-call {
  animation: incomingCall 1.5s infinite;
}


.wrapper {
  width:100%;
  .phone {
    width:350px;
    margin:40px auto 0 auto;
    position: relative;
    span.title {
      font-weight:700;
      letter-spacing: 2px;
      display:block;
      text-align:center;
    }
    .phone-container {
      width:100%;
      margin-top:30px;
      .keyboard {
        width:90%;
        margin-left:5%;
        margin-top:40px;
        .number {
          width:100%;
          font-size:0;
          text-align:center;
          &.aling-right {
            text-align:right;
            width:100%;
          }
          span {
            font-size:24px;
            color:#e5261f;
            display:inline-block;;
            width:33%;
            text-align:center;
            margin-bottom:25px;
            
            &.call-button {
              opacity:0;
              transition:250ms;
              &.show {
                opacity:1;
              }
              img {
                display:inline-block;
                vertical-align:middle;
              }
            }
            
            i {
              display:inline-block;
              width:80px;
              height:80px;
              line-height:80px;
              background:white;
              cursor:pointer;
              border-radius:100%;
              border: 1px solid #e5261f;
              transition:250ms;
               -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

              -webkit-box-shadow: 8px 8px 24px 0px rgba(132,132,132,0.09);
              -moz-box-shadow: 8px 8px 24px 0px rgba(132,132,132,0.09);
               box-shadow: 8px 8px 24px 0px rgba(132,132,132,0.09);
              &.delete {
                background:transparent;
                box-shadow:0 0 0 0;
                -webkit-box-shadow:0 0 0 0;
                -moz-box-shadow:0 0 0 0;
                -ms-box-shadow:0 0 0 0;
                color:#E4BF88;
                img {
                  display:inline-block;
                  vertical-align:middle;
                }                
              }
            }
             &:hover {
              i {
                color:black;
              }
            }
            &:active {
              i {
              transform: translateY(1px);

              -webkit-box-shadow: 5px 5px 24px 0px rgba(132,132,132,0.18);
-moz-box-shadow: 5px 5px 16px 0px rgba(132,132,132,0.18);
box-shadow: 5px 5px 16px 0px rgba(132,132,132,0.18);
                &.delete {
                  box-shadow:0 0 0 0;
                  -webkit-box-shadow:0 0 0 0;
                  -moz-box-shadow:0 0 0 0;
                  -ms-box-shadow:0 0 0 0;
                  transform: translateY(0px);
                  img {
                    transtiion:250ms;
                  }
                  &:active {
                    img {
                      transform: translateY(2px);

                    }
                  }
                }
              }
            } 
          }
        }
      }
    }
  }
}
.ringing {
  animation: ringingAnimation 1s infinite;
}

@keyframes ringingAnimation {
  0% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(5px);
  }
}

  .keyboard {
    /* Ваші поточні стилі для клавіатури */
  }

  .controls {
    text-align: center;
    margin-top: 20px;
  }

  .accept-call,
  .reject-call {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #4caf50; /* Колір для кнопки "Відповісти" */
    border: none;
    border-radius: 5px;
    margin-right: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .reject-call {
    background-color: #f44336; /* Колір для кнопки "Відхилити" */
  }

  .accept-call:hover,
  .reject-call:hover {
    background-color: #45a049; /* Колір при наведенні на кнопку "Відповісти" або "Відхилити" */
  }
</style>
<script>
if (!$(".number-input").hasClass("ringing")) {
  $(".number-input").addClass("ringing");
}

// Очищення класу "ringing" при натисканні на кнопки "Відповісти" або "Відхилити"
$(".accept-call, .reject-call").on('click', function() {
  $(".number-input").removeClass("ringing");
});


 $(".number-input").keyup(function(e){
    if($(this).val().length >= 11)
         $(".call-button").addClass("show");  
    if(e.which == 8)
       $(".call-button").removeClass("show");
  })

  $(".number-input").keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      //display error message
      return false;
    }
  });

  $("[data-number]").on('click', function(){
    if($(".number-input").val().length < 11){
      var phoneNumber = $(".number-input").val() + $(this).data("number");
      $(".number-input").val(phoneNumber);
    }
    if($(".number-input").val().length == 11)
       $(".call-button").addClass("show");  
  });

  $(".delete").on('click', function(){
    var phoneNumber = $(".number-input").val().slice(0, -1);
    $(".number-input").val("");
    $(".number-input").val(phoneNumber);
    $(".call-button").removeClass("show");
  });
$(document).ready(function() {
    if (!$(".number-input").hasClass("ringing")) {
      $(".number-input").addClass("ringing");
    }

    $(".accept-call").on('click', function() {
      $(".number-input").removeClass("ringing");
      // Замінюємо текст плейсхолдера на "..."
      $(".number-input").attr("placeholder", "...");
    });

    $(".reject-call").on('click', function() {
      $(".number-input").removeClass("ringing");
      // Замінюємо текст плейсхолдера на "Відхилено"
      $(".number-input").attr("placeholder", "Відхилено");
    });
  });
</script>

<!-- Add this script for audio handling -->
<script>
const audioPlayer = new Audio();

function playAudio(filename) {
    audioPlayer.src = filename;
    audioPlayer.play().catch(error => {
        console.error("Error playing audio:", error);
    });
}

function acceptCall() {
    playAudio('/dialler/records/1.mp3');
    $(".number-input").removeClass("ringing").attr("placeholder", "...");
}

function rejectCall() {
    playAudio('reject.mp3'); // Add a reject sound file
    $(".number-input").removeClass("ringing").attr("placeholder", "Відхилено");
}

$(document).ready(function() {
    if (!$(".number-input").hasClass("ringing")) {
        $(".number-input").addClass("ringing");
    }

    $(".accept-call").on('click', function() {
        acceptCall();
    });

    $(".reject-call").on('click', function() {
        rejectCall();
    });

    $(".number-input").keypress(function(e) {
        if (e.which === 49) { // Key '1' is pressed
            playAudio('/dialler/records/2.mp3'); // Play the second audio file
        } else if (e.which === 48) { // Key '0' is pressed
            rejectCall();
        } else if (e.which === 50) { // Key '2' is pressed
            $(".number-input").val("Додаткова інформація");
        }
    });
});
</script>
