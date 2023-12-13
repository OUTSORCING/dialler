let callAnswered = false;
  let respondButtonClicked = false;
    let audioPlayer; // Змінна для відтворення аудіо

  function appendToOutput(value) {
    const output = document.getElementById('output');

    if (!callAnswered) {
      if (output.value === "Здається нам телефонують") {
        showMessage("Натисніть кнопку відповісти");
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
    
    // Зміни в цьому місці: перевірка та зупинка попереднього аудіо
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }

    // Зміни в цьому місці: перевірка для відтворення нового аудіофайлу '2.mp3'
    if (output.value === '1') {
      playAudio("/dialler/records/2.mp3");
    }
    if (output.value === '2') {
    const wantToRetry = confirm ("УРА! Ловіть промокод на 10%! Просто скажіть менеджеру слово ДІАЛЛЕР!");
    }
    if (value === '5') {
      window.open('/dialler/cost.html', '_blank');
    }
    if (value === '8') {
    playAudio("/dialler/records/3.mp3");
    }
  }

  function respond() {
    const output = document.getElementById('output');

    if (!respondButtonClicked) {
      output.classList.remove('input-bounce');
      output.value = '...';
     
      // Зміни в цьому місці: перевірка та зупинка попереднього аудіо
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }

      // Зміни в цьому місці: перевірка для відтворення нового аудіофайлу '2.mp3'
      if (output.value === '1') {
        playAudio("/dialler/records/2.mp3");
      } else {
        playAudio("/dialler/records/1.mp3");
      }

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

  // Функція для відтворення аудіо
  function playAudio(filename) {
    audioPlayer = new Audio(filename);
    audioPlayer.play();
  }

  function reject() {
    const output = document.getElementById('output');

    output.classList.remove('input-bounce');
    output.value = 'Дзвінок відхилено';
          if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }
    
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
    }, 4000);
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

