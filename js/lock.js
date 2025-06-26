document.addEventListener("DOMContentLoaded", function () {
  // Tự động focus vào ô đầu tiên
  document.querySelector(".digit").focus();

  // Tạo trái tim bay
  createFloatingHearts();
});

function createFloatingHearts() {
  const container = document.getElementById("floatingHearts");
  const heartCount = 15;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    heart.style.animationDuration = Math.random() * 10 + 10 + "s";
    heart.style.animationDelay = Math.random() * 5 + "s";
    container.appendChild(heart);
  }
}

function checkCode() {
  const inputs = document.querySelectorAll(".digit");
  const enteredCode = Array.from(inputs)
    .map((input) => input.value)
    .join("");
  const correctCode = "2606"; // Mã mở khóa

  const messageEl = document.getElementById("lockMessage");
  const lockImg = document.querySelector(".heart-lock");
  const container = document.querySelector(".lock-container");

  if (enteredCode === correctCode) {
    messageEl.innerHTML =
      "❤️ Mở khóa thành công! Vào bữa tiệc thôi ❤️";
    messageEl.style.color = "var(--dark-color)";
    // lockImg.classList.add("unlock-success");
    container.classList.add("animate__pulse");

    // Thêm hiệu ứng pháo hoa
    createFireworks();

    // Chuyển trang sau 2 giây
    setTimeout(() => {
      window.location.href = "celebration.html";
    }, 1000);
  } else {
    messageEl.innerHTML = "❌ Mã sai rồi, thử lại nào! Em có chắc là em nhớ k?";
    messageEl.style.color = "var(--dark-color)";

    // Hiệu ứng rung
    inputs.forEach((input) => {
      input.classList.add("shake");
      setTimeout(() => {
        input.classList.remove("shake");
      }, 600);
    });
  }
}

function createFireworks() {
  const colors = ["#ff6b8b", "#ff8e9e", "#ffb3c1", "#ffd6de", "#ffffff"];
  const container = document.querySelector(".lock-container");

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = "6px";
    particle.style.height = "6px";
    particle.style.borderRadius = "50%";
    particle.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = "50%";
    particle.style.top = "50%";
    particle.style.pointerEvents = "none";
    container.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 3 + Math.random() * 3;
    const distance = 50 + Math.random() * 100;

    const animation = particle.animate(
      [
        {
          transform: "translate(-50%, -50%)",
          opacity: 1,
        },
        {
          transform: `translate(${Math.cos(angle) * distance - 50}%, ${
            Math.sin(angle) * distance - 50
          }%)`,
          opacity: 0,
        },
      ],
      {
        duration: 1000 + Math.random() * 500,
        easing: "cubic-bezier(0.1, 0.8, 0.2, 1)",
      }
    );

    animation.onfinish = () => particle.remove();
  }
}

// Tự động chuyển ô khi nhập
document.querySelectorAll(".digit").forEach((input, index) => {
  input.addEventListener("input", function () {
    this.value = this.value.slice(0, 1);
    if (this.value.length === 1) {
      const next = this.nextElementSibling;
      if (next && next.classList.contains("digit")) {
        next.focus();
      }
    }
  });

  // Xử lý phím Backspace
  input.addEventListener("keydown", function (e) {
    if (e.key === "Backspace" && this.value.length === 0) {
      const prev = this.previousElementSibling;
      if (prev && prev.classList.contains("digit")) {
        prev.focus();
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Tạo trái tim bay
  createFloatingHearts();

  const envelope = document.getElementById("envelope");
  const continueBtn = document.querySelector(".continue-btn");

  // Mở thư khi click
  envelope.addEventListener("click", function () {
    this.classList.toggle("open");

    if (this.classList.contains("open")) {
      createConfetti();
    }
  });

  // Chuyển trang khi click tiếp tục
  continueBtn.addEventListener("click", function () {
    // Hiệu ứng trước khi chuyển trang
    envelope.classList.add("animate__hinge");
    document.body.style.backgroundColor = "var(--primary-color)";

    setTimeout(() => {
      alert("Đây chỉ là demo, bạn có thể thay đổi URL chuyển hướng");
      // window.location.href = "lock.html";
    }, 1500);
  });

  // Hiệu ứng hover
  envelope.addEventListener("mouseenter", function () {
    if (!this.classList.contains("open")) {
      this.style.transform = "translateY(-10px)";
    }
  });

  envelope.addEventListener("mouseleave", function () {
    if (!this.classList.contains("open")) {
      this.style.transform = "";
    }
  });
});

function createFloatingHearts() {
  const container = document.getElementById("floatingHearts");
  const heartCount = 15;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    heart.style.animationDuration = Math.random() * 10 + 10 + "s";
    heart.style.animationDelay = Math.random() * 5 + "s";
    container.appendChild(heart);
  }
}

function createConfetti() {
  const envelope = document.getElementById("envelope");
  const colors = ["#ff6b8b", "#ff8e9e", "#ffb3c1", "#ffd6de", "#ffffff"];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = Math.random() * 100 + "%";
    confetti.style.width = Math.random() * 8 + 5 + "px";
    confetti.style.height = Math.random() * 8 + 5 + "px";
    confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
    envelope.appendChild(confetti);

    const animation = confetti.animate(
      [
        {
          transform: "translateY(0) rotate(0deg)",
          opacity: 1,
        },
        {
          transform: `translateY(${Math.random() * 200 - 100}px) rotate(${
            Math.random() * 360
          }deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 1000 + Math.random() * 1000,
        easing: "cubic-bezier(0.1, 0.8, 0.2, 1)",
      }
    );

    animation.onfinish = () => confetti.remove();
  }
}
