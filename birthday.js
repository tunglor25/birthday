// Parse dữ liệu từ query
function getData() {
  const params = new URLSearchParams(window.location.search);
  try {
    const data = params.get('data');
    if (!data) return null;
    const obj = JSON.parse(decodeURIComponent(escape(atob(data))));
    return obj;
  } catch {
    return null;
  }
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}`;
}

window.onload = function () {
  const info = getData() || {};
  if (info.e) document.getElementById('emoji').innerText = info.e;
  if (info.p) {
    const img = document.getElementById('photo');
    img.src = info.p;
    img.style.display = 'block';
  }
  document.getElementById('name').innerText = info.n || 'Bạn thân mến';
  document.getElementById('date').innerText = info.d ? 'Sinh nhật: ' + formatDate(info.d) : '';

  // Hiệu ứng confetti
  confetti();
  // Tự động play nhạc
  setTimeout(()=>{document.getElementById('music').play().catch(()=>{})}, 800);
}

// Confetti effect (simple)
function confetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let W = window.innerWidth, H = window.innerHeight;
  canvas.width = W; canvas.height = H;
  const colors = ['#ff7eb3','#ff758c','#ffe3ec','#f7aaff','#fff8f0','#b168a6','#FFD700','#40C9FF'];
  const particles = Array.from({length: 100}).map(()=>({
    x: Math.random()*W,
    y: Math.random()*-H,
    r: 7+Math.random()*8,
    d: Math.random()*Math.PI*2,
    color: colors[Math.floor(Math.random()*colors.length)],
    tilt: Math.random()*10,
    tiltAngle: 0
  }));

  function draw() {
    ctx.clearRect(0,0,W,H);
    particles.forEach(p=>{
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.r, p.r/2, p.tilt, 0, 2*Math.PI);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    update();
    requestAnimationFrame(draw);
  }
  function update() {
    for (let p of particles) {
      p.y += 2+Math.random()*2;
      p.x += Math.sin(p.d)*1.8;
      p.tilt += 0.04;
      p.d += 0.01;
      if (p.y > H+30) {
        p.x = Math.random()*W; p.y = -16; p.tilt = Math.random()*10;
      }
    }
  }
  draw();
  window.addEventListener('resize', ()=>{W = window.innerWidth; H = window.innerHeight; canvas.width=W; canvas.height=H});
}