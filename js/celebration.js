document.addEventListener("DOMContentLoaded", function () {
  // Khởi tạo slider siêu cấp với phiên bản Swiper mới
  const swiper = new Swiper(".swiper-container", {
    // Hiệu ứng coverflow
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 100,
      depth: 200,
      modifier: 2,
      slideShadows: true,
    },
    // Tự động chuyển slide
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    // Phân trang
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // Vòng lặp
    loop: true,
    // Parallax effect
    parallax: true,
    // Tốc độ chuyển động
    speed: 800,
    // Khoảng cách giữa các slide
    spaceBetween: 30,
    // Khởi tạo
    init: true,
    // Callback khi khởi tạo xong
    on: {
      init: function () {
        console.log("Swiper initialized");
      },
      slideChange: function () {
        console.log("Slide changed");
      },
    },
  });

  // Đặt tên người được chúc mừng
  const birthdayPerson = document.getElementById("birthday-person");
  birthdayPerson.textContent = "Đoàn Diệu Mai"; // Thay bằng tên thật

  // Các phần tử bánh và nến
  const flames = document.querySelectorAll(".flame");
  const candles = document.querySelectorAll(".candle");
  const blowInstruction = document.querySelector(".blow-instruction");
  const audioPlayer = document.getElementById("birthday-song");

  // Kiểm tra hỗ trợ microphone
  if (window.AudioContext || window.webkitAudioContext) {
    let audioContext;
    let microphone;
    let analyser;
    let isBlowing = false;
    let blownCandles = 0;

    // Khởi tạo AudioContext khi có tương tác
    function initAudioContext() {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Yêu cầu quyền truy cập microphone
        navigator.mediaDevices
          .getUserMedia({ audio: true, video: false })
          .then(function (stream) {
            microphone = audioContext.createMediaStreamSource(stream);
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            microphone.connect(analyser);

            // Bắt đầu phát hiện thổi
            detectBlowing();
          })
          .catch(function (err) {
            console.error("Không thể truy cập microphone:", err);
            setupClickToBlow();
          });
      }
    }

    // Phát hiện thổi
    function detectBlowing() {
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function checkVolume() {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;

        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }

        const average = sum / bufferLength;

        // Ngưỡng phát hiện thổi
        if (average > 60 && !isBlowing) {
          isBlowing = true;
          blowCandle();
        } else if (average <= 60 && isBlowing) {
          isBlowing = false;
        }

        if (blownCandles < candles.length) {
          requestAnimationFrame(checkVolume);
        }
      }

      checkVolume();
    }

    // Thổi nến
    function blowCandle() {
      if (blownCandles < candles.length) {
        const candle = candles[blownCandles];
        const flame = flames[blownCandles];

        // Hiệu ứng thổi nến
        flame.style.display = "none";
        candle.classList.add("blown");

        // Phát âm thanh
        const blowSound = new Audio("assets/sounds/blow.mp3");
        blowSound.play();

        blownCandles++;

        // Kiểm tra nếu đã thổi hết nến
        if (blownCandles === candles.length) {
          allCandlesBlown();
        }
      }
    }

    // Khi tất cả nến đã tắt
    function allCandlesBlown() {
      blowInstruction.textContent = "Giỏi quá ! Chúc Mai bếu sinh nhật vui vẻ";

      // Phát nhạc
      audioPlayer.play();

      // Hiệu ứng confetti
      document.querySelectorAll(".confetti").forEach((confetti) => {
        confetti.style.animation = "confetti 5s ease-in-out forwards";
      });

      // Hiệu ứng cho bánh
      document.querySelector(".cake").style.animation = "none";
      setTimeout(() => {
        document.querySelector(".cake").style.transform =
          "translateY(0) rotate(0deg)";
      }, 1000);
    }

    // Kích hoạt khi có tương tác đầu tiên
    document.body.addEventListener("click", initAudioContext, { once: true });
  } else {
    setupClickToBlow();
  }

  // Thiết lập click để thổi nến (fallback)
  function setupClickToBlow() {
    blowInstruction.textContent = "Nhấn vào đây rồi thổi nến!";

    candles.forEach((candle, index) => {
      candle.addEventListener("click", function () {
        if (!this.classList.contains("blown")) {
          const flame = this.querySelector(".flame");
          flame.style.display = "none";
          this.classList.add("blown");

          // Kiểm tra nếu đã thổi hết nến
          const allBlown = Array.from(candles).every((c) =>
            c.classList.contains("blown")
          );
          if (allBlown) {
            blowInstruction.textContent =
              "Chúc mừng! Bạn đã thổi nến thành công!";
            audioPlayer.play();
            document.querySelectorAll(".confetti").forEach((confetti) => {
              confetti.style.animation = "confetti 5s ease-in-out forwards";
            });
          }
        }
      });
    });
  }
});
