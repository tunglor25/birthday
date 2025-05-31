const form = document.getElementById('birthdayForm');
const qrSection = document.getElementById('qrResult');
const qrBox = document.getElementById('qrBox');
const birthdayLink = document.getElementById('birthdayLink');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const date = formData.get('date');
  const emoji = formData.get('emoji');
  let photoUrl = '';

  // Handle image
  const file = formData.get('photo');
  if (file && file.size) {
    photoUrl = await toBase64(file);
  }

  // Encode data
  const data = {
    n: name,
    d: date,
    e: emoji,
    p: photoUrl
  };
  const encodeData = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  const url = `${window.location.origin}${window.location.pathname.replace('index.html','')}birthday.html?data=${encodeData}`;

  // Sửa lỗi: dùng số 3 thay vì QRCode.CorrectLevel.H nếu bị lỗi
  qrBox.innerHTML = '';
  try {
    new QRCode(qrBox, {
      text: url,
      width: 220,
      height: 220,
      colorDark : "#222",
      colorLight : "#FFF8F0",
      correctLevel : (window.QRCode && QRCode.CorrectLevel && QRCode.CorrectLevel.H) ? QRCode.CorrectLevel.H : 3 // fallback
    });
  } catch(e) {
    // fallback nếu vẫn lỗi
    new QRCode(qrBox, {
      text: url,
      width: 220,
      height: 220,
      colorDark : "#222",
      colorLight : "#FFF8F0",
      correctLevel : 3
    });
  }

  // Trang trí quanh QR
  qrBox.innerHTML += `<div class="qr-decoration">
    <span class="qr-cake">🎂</span>
    <span class="qr-balloons">🎈🎈🎈</span>
    <span class="qr-confetti">✨🎉✨</span>
  </div>`;

  // Hiện link
  birthdayLink.href = url;

  qrSection.style.display = 'block';
  form.style.display = 'none';
});

function toBase64(file) {
  return new Promise((resolve,reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
