---
title: Демонстрація роботи автоінформатора
layout: page
description: Демонстрація роботи автоінформатора
---

<style>
    .calculator-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    #output {
      width: 300px;
      text-align: right;
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
  </style>

<div class="calculator-container">
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
    <button class="btn btn-success btn-block" onclick="respond()">Відповісти</button>
    <button class="btn btn-danger btn-block" onclick="reject()">Відхилити</button>
  </div>
</div>


<script>
  let callAnswered = false;

  function appendToOutput(value) {
    const output = document.getElementById('output');
    // Заборона вводу, якщо відповідь на виклик вже була надіслана
    if (!callAnswered) {
      // Заборона натискання цифрових кнопок, якщо умова виконується
      if (output.value === "Здається нам телефонують") {
        alert("Спочатку підійміть слухавку");
        return;
      }
      if (output.value === "Дзвінок відхилено"){
      alert("Ви відхилили дзвінок :(")
      return;
      }
      output.value = ''; // Якщо цифри вводяться, очистити значення
      output.value += value;
    }
  }

  function respond() {
    document.getElementById('output').classList.remove('input-bounce'); // Видаляємо клас анімації
    document.getElementById('output').value = '...'; // Перетворюємо текст на "..."
    // Додатковий код для обробки відповіді
    alert('Відповідь!');
  }

  function reject() {
    document.getElementById('output').classList.remove('input-bounce'); // Видаляємо клас анімації
    document.getElementById('output').value = 'Дзвінок відхилено'; // Перетворюємо текст на "..."
    // Додатковий код для обробки відхилення
    alert('Відхилити!');
  }
</script>

  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/js/bootstrap.min.js"></script>