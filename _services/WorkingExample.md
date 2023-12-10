---
title: "Демонстрація роботи"
date: 2019-02-28T15:15:34+10:00
weight: 4
description: Демонстрація роботи автоінформатора для кращого розуміння як це працює.
---
Привіт, це маленька демонстрація яка моделює ситуацію вхідного виклику. 

Уявіть що до вас телефонує наш інформатор та слідкуйте за інструкціями. Коли ви натиснете "Відповісти", відтвориться голосовий файл, **тож відрегулюйте звук на вашому пристрої**. 


<style>
    .calculator-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    #output {
      width: 300px;
      text-align: center;
      font-size: 1.2em;
      border: 1px solid #e5261f;
      border-radius: 5px;
      margin-bottom: 10px;
      transition: transform 0.3s ease; /* Додавання анімації transform для підпригування */
    }

    .input-bounce {
      animation: bounce 0.5s infinite; /* Зробив анімацію безкінечною */
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-20px);
      }
      60% {
        transform: translateY(-10px);
      }
    }

     @keyframes blink {
    0%, 100% {
      background-color: rgba(0, 255, 0, 0.5);
    }
    50% {
      background-color: rgba(0, 255, 0, 1);
    }
  }

    button {
      margin: 5px;
      padding: 15px;
      font-size: 1.2em;
      cursor: pointer;
      border: 1px solid #e5261f;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.8);
      transition: background-color 0.3s ease;
    }

   .btn-circle {
      margin: 8px;
      padding: 33px;
      font-size: 1.2em;
      cursor: pointer;
      border: 1px solid #e5261f;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      transition: background-color 0.3s ease;
      width: 2.5em;
      height: 2.5em;
      display: flex;
      align-items: center;
      justify-content: center;
    }


    .btn-circle:hover {
      background-color: #e5261f;
       color: white;
    }

    button:hover {
      background-color: #e5261f;
       color: white;
    }

    input {
      margin: 5px;
      padding: 10px;
      font-size: 1em;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .message-box {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
  </style>

<div class="calculator-container">
<div id="messageBox" class="message-box"></div>
  <input id="output" class="form-control input-bounce" value="Здається нам телефонують" readonly>
  <div class="row mt-3">
    <button class="btn btn-primary btn-block btn-circle" onclick="appendToOutput('1')">1</button>
    <button class="btn btn-primary btn-block btn-circle" onclick="appendToOutput('2')">2</button>
    <button class="btn btn-primary btn-block btn-circle" onclick="appendToOutput('3')">3</button>
  </div>

  <div class="row mt-3">
    <button class="btn btn-primary btn-block btn-circle" onclick="appendToOutput('4')">4</button>
    <button class="btn btn-primary btn-block btn-circle" onclick="appendToOutput('5')">5</button>
    <button class="btn btn-primary btn-block btn-circle" onclick="appendToOutput('6')">6</button>
  </div>

  <div class="row mt-3">
    <button class="btn btn-primary btn-block btn-circle" onclick="appendToOutput('7')">7</button>
    <button class="btn btn-primary btn-block btn-circle" onclick="appendToOutput('8')">8</button>
    <button class="btn btn-primary btn-block btn-circle" onclick="appendToOutput('9')">9</button>
  </div>

  <div class="row mt-3">
    <button class="btn btn-primary btn-block btn-circle" onclick="appendToOutput('0')">0</button>
    <!-- <button class="btn btn-danger btn-block" onclick="clearOutput()">C</button> -->
  </div>
   <div class="row mt-3">
    <button class="btn btn-success btn-block blink-button" onclick="respond()">Відповісти</button>
    <button class="btn btn-danger btn-block" onclick="reject()">Відхилити</button>
  </div>
</div>
<br>

<script>
 let callAnswered = false;
  let respondButtonClicked = false;

  function appendToOutput(value) {
    const output = document.getElementById('output');

    if (!callAnswered) {
      if (output.value === "Здається нам телефонують") {
        showMessage("Натисніть кнопку відповісти");
        // Додайте клас анімації для кнопки "Відповісти"
        startBlinkAnimation();
        return;
      }
      if (output.value === "Дзвінок відхилено") {
        showMessage("Ви відхилили дзвінок :(");
        return;
      }

      output.value = ''; // Якщо цифри вводяться, очистити значення
      output.value += value;
    }
  }

  function respond() {
    const output = document.getElementById('output');

    if (!respondButtonClicked) {
      output.classList.remove('input-bounce');
      output.value = '...';

      // Додатковий код для обробки відповіді

      // Встановлюємо флаг, що кнопку відповісти натиснуто
      respondButtonClicked = true;

      // Показати кнопку "Замовити дзвінок ще раз"
      showRetryButton();
      
      // Зупинити анімацію миготіння після натискання кнопки "Відповісти"
      stopBlinkAnimation();
    } else {
      // Перевірити, чи користувач хоче замовити дзвінок ще раз
      const wantToRetry = confirm("Ви вже відповіли на дзвінок. Хочете замовити дзвінок ще раз?");
      if (wantToRetry) {
        // Якщо користувач хоче замовити дзвінок ще раз, викликати функцію для перезапуску
        retryCall();
      }
    }
  }

  function reject() {
    const output = document.getElementById('output');

    output.classList.remove('input-bounce');
    output.value = 'Дзвінок відхилено';

    // Додатковий код для обробки відхилення
  }

  function showMessage(message) {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
    messageBox.style.display = 'block';

    // Через 3 секунди приховати повідомлення
    setTimeout(() => {
      messageBox.style.display = 'none';
      // Приховати кнопку "Замовити дзвінок ще раз" після приховання повідомлення
      hideRetryButton();
    }, 3000);
  }

  function showRetryButton() {
    const retryButton = document.getElementById('retryButton');
    retryButton.style.display = 'block';
    // Додайте клас анімації для кнопки "Замовити дзвінок ще раз"
    startBlinkAnimation(retryButton);
  }

  function hideRetryButton() {
    const retryButton = document.getElementById('retryButton');
    retryButton.style.display = 'none';
  }

  function retryCall() {
    // Перезавантаження стану
    resetState();
  }

  function resetState() {
    const output = document.getElementById('output');
    output.value = 'Здається нам телефонують';
    callAnswered = false;
    respondButtonClicked = false;
    // Відновлення анімації та дозвіл вводу
    restoreAnimationAndInput();
  }

  function restoreAnimationAndInput() {
    const output = document.getElementById('output');
    output.classList.add('input-bounce');
    output.style.animation = '';
  }

</script>

  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/js/bootstrap.min.js"></script>