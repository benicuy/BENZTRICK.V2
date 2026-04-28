// ======================= DPI MASTER =======================
const dpiSlider = document.getElementById('dpiSliderMaster');
const ppiSlider = document.getElementById('ppiSliderMaster');
const liveDpi = document.getElementById('liveDpiPreview');
const livePpi = document.getElementById('livePpiPreview');
const customDpiInput = document.getElementById('customDpi');
const customPpiInput = document.getElementById('customPpi');
const dpiResult = document.getElementById('dpiResult');
const ffStatusDiv = document.getElementById('ffStatus');

// Update live preview
if (dpiSlider) {
    dpiSlider.addEventListener('input', () => {
        liveDpi.innerText = `DPI: ${dpiSlider.value}`;
        customDpiInput.value = dpiSlider.value;
    });
}
if (ppiSlider) {
    ppiSlider.addEventListener('input', () => {
        livePpi.innerText = `PPI: ${ppiSlider.value}`;
        customPpiInput.value = ppiSlider.value;
    });
}

// Fungsi ubah DPI (simulasi)
function changeDPI(dpi, ppi) {
    dpiResult.innerHTML = `✅ DPI berubah ke ${dpi} | PPI ke ${ppi} 🔥<br>⏳ Efek: Headshot lebih gampang, view luas!`;
    // Simulasi deteksi FF
    ffStatusDiv.innerHTML = `🎮 Free Fire terdeteksi! DPI ${dpi} diterapkan ke game.`;
    setTimeout(() => {
        ffStatusDiv.innerHTML = `✅ DPI aktif di Free Fire (PID tertangkap via stack list)`;
    }, 1000);
}

// Preset DPI
document.querySelectorAll('.preset-dpi, .ff-dpi').forEach(btn => {
    btn.addEventListener('click', () => {
        let dpi = parseInt(btn.getAttribute('data-dpi'));
        changeDPI(dpi, dpi);
        if (dpiSlider) dpiSlider.value = dpi;
        if (ppiSlider) ppiSlider.value = dpi;
        if (customDpiInput) customDpiInput.value = dpi;
        if (customPpiInput) customPpiInput.value = dpi;
    });
});

// Custom DPI
const applyCustomBtn = document.getElementById('applyCustomDpiBtn');
if (applyCustomBtn) {
    applyCustomBtn.addEventListener('click', () => {
        let dpi = parseInt(customDpiInput.value);
        let ppi = parseInt(customPpiInput.value);
        changeDPI(dpi, ppi);
    });
}

// Slider apply
const applySliderBtn = document.getElementById('applySliderDpiBtn');
if (applySliderBtn) {
    applySliderBtn.addEventListener('click', () => {
        changeDPI(dpiSlider.value, ppiSlider.value);
    });
}

// ======================= JOIN GAME + AUTO ID =======================
let selectedGame = 'ff';
let lastDownloaderCount = 15; // simulasi user terakhir download

// Generate ID 1 - lastDownloader
function generateIdList() {
    const idListDiv = document.getElementById('idList');
    if (!idListDiv) return;
    idListDiv.innerHTML = '';
    for (let i = 1; i <= lastDownloaderCount; i++) {
        const idSpan = document.createElement('span');
        idSpan.className = 'id-item';
        idSpan.innerText = `ID-${i}`;
        idListDiv.appendChild(idSpan);
    }
}
generateIdList();

document.querySelectorAll('.game-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.game-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        selectedGame = this.getAttribute('data-game');
    });
});

const joinBtn = document.getElementById('joinGameBtn');
const joinStatus = document.getElementById('joinStatus');
if (joinBtn) {
    joinBtn.addEventListener('click', () => {
        const perf = document.getElementById('performanceMode').value;
        let perfText = '';
        if (perf === 'ultra') perfText = 'Ultra 60 FPS, High Graphics';
        else if (perf === 'balanced') perfText = 'Balanced 30 FPS, Medium';
        else if (perf === 'power_save') perfText = 'Power Save 20 FPS, Low';
        else perfText = 'QUANTUM BOOST 120 FPS, Unlock All! 🌌';

        const randomId = Math.floor(Math.random() * lastDownloaderCount) + 1;
        joinStatus.innerHTML = `🔥 JOINING ke ${selectedGame === 'ff' ? 'Free Fire' : 'Free Fire MAX'} dengan ID-${randomId} | Performa: ${perfText}<br>✅ Berhasil masuk lobby! Auto Headshot aktif.`;
    });
}

// ======================= AUTO HEADSHOT (FLOATING WINDOW) =======================
const floatingIcon = document.getElementById('floatingIcon');
let autoHeadshotActive = false;

// Drag & drop floating window
let isDragging = false;
let offsetX, offsetY;
if (floatingIcon) {
    floatingIcon.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - floatingIcon.offsetLeft;
        offsetY = e.clientY - floatingIcon.offsetTop;
        floatingIcon.style.transition = 'none';
    });
    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        let left = e.clientX - offsetX;
        let top = e.clientY - offsetY;
        left = Math.min(Math.max(left, 0), window.innerWidth - floatingIcon.offsetWidth);
        top = Math.min(Math.max(top, 0), window.innerHeight - floatingIcon.offsetHeight);
        floatingIcon.style.left = left + 'px';
        floatingIcon.style.top = top + 'px';
        floatingIcon.style.right = 'auto';
        floatingIcon.style.bottom = 'auto';
    });
    window.addEventListener('mouseup', () => {
        isDragging = false;
        floatingIcon.style.transition = '';
    });

    // Klik untuk auto headshot
    floatingIcon.addEventListener('click', (e) => {
        if (isDragging) return;
        autoHeadshotActive = !autoHeadshotActive;
        if (autoHeadshotActive) {
            floatingIcon.style.boxShadow = '0 0 30px red';
            floatingIcon.style.background = 'radial-gradient(circle, red, darkred)';
            joinStatus.innerHTML += '<br>🔫 AUTO HEADSHOT AKTIF! Setiap musuh di aimlock + tembak otomatis ke kepala.';
            // Simulasi headshot tiap 2 detik
            if (window.headshotInterval) clearInterval(window.headshotInterval);
            window.headshotInterval = setInterval(() => {
                if (autoHeadshotActive) {
                    console.log('💀 HEADSHOT! Musuh mati.');
                    joinStatus.innerHTML = joinStatus.innerHTML.replace('Standby', '💀 HEADSHOT EKSEKUSI 💀');
                }
            }, 2000);
        } else {
            floatingIcon.style.boxShadow = '0 0 20px #ff00ff';
            floatingIcon.style.background = 'radial-gradient(circle, #ff00ff, #ff0055)';
            if (window.headshotInterval) clearInterval(window.headshotInterval);
            joinStatus.innerHTML += '<br>⛔ Auto Headshot OFF.';
        }
    });
}

// ======================= ESP ALL PLAYER =======================
const espBtn = document.getElementById('enableEspBtn');
const espStatus = document.getElementById('espStatus');
if (espBtn) {
    espBtn.addEventListener('click', () => {
        if (espStatus.innerText.includes('OFF')) {
            espStatus.innerHTML = 'ESP: AKTIF 🟢<br>👁️ Wallhack: Box, Line, Nama, Health, Jarak';
            espStatus.style.color = '#0f0';
            joinStatus.innerHTML += '<br>👁️ ESP ALL PLAYER ON - semua pemain kebaca tembok!';
        } else {
            espStatus.innerHTML = 'ESP: OFF 🔴';
            espStatus.style.color = '#f00';
        }
    });
}

// ======================= SENSITIVITY =======================
const applySens = document.getElementById('applySensBtn');
if (applySens) {
    applySens.addEventListener('click', () => {
        let gen = document.getElementById('genSen').value;
        let red = document.getElementById('redSen').value;
        let scope = document.getElementById('scopeSen').value;
        joinStatus.innerHTML += `<br>🎮 Sensitivity injected: Gen ${gen}% | RedDot ${red}% | Scope ${scope}%`;
    });
}

// ======================= CACHE CLEANER =======================
const cleanBtn = document.getElementById('cleanCacheBtn');
const cacheStatus = document.getElementById('cacheStatus');
if (cleanBtn) {
    cleanBtn.addEventListener('click', () => {
        cacheStatus.innerHTML = '🧹 Cache dibersihkan! +15% performa🔥';
        setTimeout(() => cacheStatus.innerHTML = '', 2000);
    });
}

// ======================= ROG MONITOR =======================
let rogInterval;
const startRog = document.getElementById('startRogBtn');
const rogStats = document.getElementById('rogStats');
if (startRog) {
    startRog.addEventListener('click', () => {
        if (rogInterval) clearInterval(rogInterval);
        rogInterval = setInterval(() => {
            let cpu = Math.floor(Math.random() * 60) + 20;
            let ram = (Math.random() * 4 + 2).toFixed(1);
            let suhu = Math.floor(Math.random() * 20) + 35;
            rogStats.innerHTML = `CPU: ${cpu}% | RAM: ${ram}GB | Suhu: ${suhu}°C | 🔥 ROG BOOST`;
        }, 1500);
    });
}

// ======================= FPS EMULATOR =======================
const fpsBtn = document.getElementById('fpsEmuBtn');
const fpsDisplay = document.getElementById('fpsDisplay');
if (fpsBtn) {
    fpsBtn.addEventListener('click', () => {
        let selected = document.getElementById('fpsEmuSelect').value;
        let fps = parseInt(selected);
        fpsDisplay.innerHTML = `FPS: ${fps} (Emulated BlueStack) 📊`;
        joinStatus.innerHTML += `<br>📊 FPS Visual: ${fps}`;
    });
}

// ======================= TASK MANAGER =======================
const killBg = document.getElementById('killBgBtn');
const taskList = document.getElementById('taskList');
if (killBg && taskList) {
    const mockTasks = ['com.android.chrome', 'com.whatsapp', 'com.instagram', 'com.discord', 'system_server'];
    taskList.innerHTML = mockTasks.map(t => `<li>${t} 🔄</li>`).join('');
    killBg.addEventListener('click', () => {
        taskList.innerHTML = '<li>✅ Semua proses background dihentikan!</li>';
        joinStatus.innerHTML += '<br>⚙️ Task Manager: killed 5 background apps';
    });
}

// Init FF status
setTimeout(() => {
    ffStatusDiv.innerHTML = '✅ Free Fire/FF MAX terdeteksi! PID: 28473 (foreground via dumpsys)';
}, 2000);
