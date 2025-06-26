document.addEventListener('DOMContentLoaded', function() {
            // Tạo trái tim bay
            createFloatingHearts();
            
            const envelope = document.getElementById('envelope');
            const continueBtn = document.querySelector('.continue-btn');
            
            // Mở thư khi click
            envelope.addEventListener('click', function() {
                this.classList.toggle('open');
                
                if (this.classList.contains('open')) {
                    createConfetti();
                }
            });
            
            // Chuyển trang khi click tiếp tục
            continueBtn.addEventListener('click', function() {
                // Hiệu ứng trước khi chuyển trang
                envelope.classList.add('animate__hinge');
                document.body.style.backgroundColor = 'var(--primary-color)';
                
                setTimeout(() => {
                    alert("Đây chỉ là demo, bạn có thể thay đổi URL chuyển hướng");
                    // window.location.href = "lock.html";
                }, 1500);
            });
            
            // Hiệu ứng hover
            envelope.addEventListener('mouseenter', function() {
                if (!this.classList.contains('open')) {
                    this.style.transform = 'translateY(-10px)';
                }
            });
            
            envelope.addEventListener('mouseleave', function() {
                if (!this.classList.contains('open')) {
                    this.style.transform = '';
                }
            });
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

        function createConfetti() {
            const envelope = document.getElementById('envelope');
            const colors = ['#ff6b8b', '#ff8e9e', '#ffb3c1', '#ffd6de', '#ffffff'];
            
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = Math.random() * 100 + '%';
                confetti.style.width = (Math.random() * 8 + 5) + 'px';
                confetti.style.height = (Math.random() * 8 + 5) + 'px';
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                envelope.appendChild(confetti);
                
                const animation = confetti.animate([
                    { 
                        transform: 'translateY(0) rotate(0deg)',
                        opacity: 1 
                    },
                    { 
                        transform: `translateY(${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg)`,
                        opacity: 0 
                    }
                ], {
                    duration: 1000 + Math.random() * 1000,
                    easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
                });
                
                animation.onfinish = () => confetti.remove();
            }
        }