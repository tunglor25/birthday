        document.addEventListener('DOMContentLoaded', function() {
            // Tự động focus vào ô đầu tiên
            document.querySelector('.digit').focus();
            
            // Tạo trái tim bay
            createFloatingHearts();
        });
        
        function createFloatingHearts() {
            const container = document.getElementById('floatingHearts');
            const heartCount = 15;
            
            for (let i = 0; i < heartCount; i++) {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.innerHTML = '❤️';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
                heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
                heart.style.animationDelay = Math.random() * 5 + 's';
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

                messageEl.innerHTML = "❤️ Mở khóa thành công! Trái tim em thuộc về anh rồi ❤️";
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
                inputs.forEach(input => {
                    input.classList.add('shake');
                    setTimeout(() => {
                        input.classList.remove('shake');
                    }, 600);
                });
            }
        }
        
        function createFireworks() {
            const colors = ['#ff6b8b', '#ff8e9e', '#ffb3c1', '#ffd6de', '#ffffff'];
            const container = document.querySelector('.lock-container');
            
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = '6px';
                particle.style.height = '6px';
                particle.style.borderRadius = '50%';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.left = '50%';
                particle.style.top = '50%';
                particle.style.pointerEvents = 'none';
                container.appendChild(particle);
                
                const angle = Math.random() * Math.PI * 2;
                const velocity = 3 + Math.random() * 3;
                const distance = 50 + Math.random() * 100;
                
                const animation = particle.animate([
                    { 
                        transform: 'translate(-50%, -50%)',
                        opacity: 1 
                    },
                    { 
                        transform: `translate(${Math.cos(angle) * distance - 50}%, ${Math.sin(angle) * distance - 50}%)`,
                        opacity: 0 
                    }
                ], {
                    duration: 1000 + Math.random() * 500,
                    easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
                });
                
                animation.onfinish = () => particle.remove();
            }
        }

        // Tự động chuyển ô khi nhập
        document.querySelectorAll(".digit").forEach((input, index) => {
            input.addEventListener("input", function() {
                this.value = this.value.slice(0, 1);
                if (this.value.length === 1) {
                    const next = this.nextElementSibling;
                    if (next && next.classList.contains('digit')) {
                        next.focus();
                    }
                }
            });
            
            // Xử lý phím Backspace
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Backspace' && this.value.length === 0) {
                    const prev = this.previousElementSibling;
                    if (prev && prev.classList.contains('digit')) {
                        prev.focus();
                    }
                }
            });
        });