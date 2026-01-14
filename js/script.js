const sensorData = {
    temperature: {
        icon: '🌡️',
        title: 'Temperature Sensor',
        description: 'The DS18B20 is a waterproof digital temperature sensor that provides accurate readings crucial for crab survival. Mud crabs thrive in water temperatures between 25-32°C. Temperatures outside this range can cause stress, reduced feeding, and increased mortality.',
        specs: [
            { label: 'Range', value: '-55°C to +125°C' },
            { label: 'Accuracy', value: '±0.5°C' },
            { label: 'Resolution', value: '12-bit' },
            { label: 'Optimal', value: '25-32°C' }
        ]
    },
    ph: {
        icon: '⚗️',
        title: 'pH Level Sensor',
        description: 'The PH-4502C module measures water acidity/alkalinity levels. Crabs require a pH range of 7.5-8.5 for optimal health. Sudden pH changes can affect shell hardening, molting success, and overall immune response in crustaceans.',
        specs: [
            { label: 'Range', value: '0-14 pH' },
            { label: 'Accuracy', value: '±0.1 pH' },
            { label: 'Response', value: '<1 minute' },
            { label: 'Optimal', value: '7.5-8.5 pH' }
        ]
    },
    turbidity: {
        icon: '💧',
        title: 'Turbidity Sensor',
        description: 'The SEN0189 measures water clarity by detecting suspended particles. High turbidity reduces oxygen levels and can indicate pollution or algae blooms. Clear water ensures proper light penetration essential for the pond ecosystem.',
        specs: [
            { label: 'Output', value: '0-4.5V' },
            { label: 'Mode', value: 'Analog' },
            { label: 'Response', value: '<500ms' },
            { label: 'Optimal', value: '<50 NTU' }
        ]
    },
    salinity: {
        icon: '🧂',
        title: 'Salinity Sensor',
        description: 'The TDS (Total Dissolved Solids) meter monitors salt concentration in brackish water ponds. Mud crabs are euryhaline species requiring salinity levels of 15-25 ppt. Proper salinity is critical during molting and reproduction cycles.',
        specs: [
            { label: 'Range', value: '0-1000 ppm' },
            { label: 'Accuracy', value: '±2%' },
            { label: 'Probe', value: 'Waterproof' },
            { label: 'Optimal', value: '15-25 ppt' }
        ]
    },
    esp32: {
        icon: '🔌',
        title: 'ESP32 Microcontroller',
        description: 'The ESP32 serves as the central processing unit, collecting data from all sensors every 30 seconds and transmitting it to Firebase via WiFi. It features dual-core processing, built-in WiFi/Bluetooth, and low power consumption ideal for 24/7 pond monitoring.',
        specs: [
            { label: 'CPU', value: 'Dual-Core 240MHz' },
            { label: 'WiFi', value: '802.11 b/g/n' },
            { label: 'GPIO', value: '34 Pins' },
            { label: 'Memory', value: '520KB SRAM' }
        ]
    }
};

function showSensorInfo(sensorId) {
    const sensor = sensorData[sensorId];
    const panel = document.getElementById('sensorPanel');
    const panelIcon = document.getElementById('panelIcon');
    const panelTitle = document.getElementById('panelTitle');
    const panelContent = document.getElementById('panelContent');
    const panelSpecs = document.getElementById('panelSpecs');

    // Remove active class from all cards
    document.querySelectorAll('.sensor-card').forEach(card => {
        card.classList.remove('active');
    });

    // Add active class to clicked card
    const clickedCard = document.querySelector(`[data-sensor="${sensorId}"]`);
    if (clickedCard) {
        clickedCard.classList.add('active');
    }

    // Update panel content
    panelIcon.textContent = sensor.icon;
    panelTitle.textContent = sensor.title;
    panelContent.innerHTML = `<p>${sensor.description}</p>`;

    // Build specs HTML
    let specsHTML = '';
    sensor.specs.forEach(spec => {
        specsHTML += `
            <div class="spec-item">
                <div class="spec-label">${spec.label}</div>
                <div class="spec-value">${spec.value}</div>
            </div>
        `;
    });
    panelSpecs.innerHTML = specsHTML;

    // Animate panel
    panel.style.animation = 'none';
    panel.offsetHeight; // Trigger reflow
    panel.style.animation = 'panelPop 0.3s ease-out';
}

function closeSensorPanel() {
    const panelIcon = document.getElementById('panelIcon');
    const panelTitle = document.getElementById('panelTitle');
    const panelContent = document.getElementById('panelContent');
    const panelSpecs = document.getElementById('panelSpecs');

    // Remove active class from all cards
    document.querySelectorAll('.sensor-card').forEach(card => {
        card.classList.remove('active');
    });

    // Reset panel
    panelIcon.textContent = '👆';
    panelTitle.textContent = 'Select a Sensor';
    panelContent.innerHTML = '<p class="panel-prompt">Click on any sensor above to discover how it helps monitor crab pond conditions.</p>';
    panelSpecs.innerHTML = '';
}

// Fullscreen functionality
function enterFullscreen() {
    const elem = document.documentElement;
    const btn = document.getElementById('fullscreenBtn');

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { // Safari
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE11
        elem.msRequestFullscreen();
    }

    // Hide the button after entering fullscreen
    btn.style.opacity = '0';
    setTimeout(() => {
        btn.style.display = 'none';
    }, 300);

    // Add fullscreen class to body
    document.body.classList.add('is-fullscreen');
}

// Show button when exiting fullscreen
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('msfullscreenchange', handleFullscreenChange);

function handleFullscreenChange() {
    const btn = document.getElementById('fullscreenBtn');
    const isFullscreen = document.fullscreenElement ||
                        document.webkitFullscreenElement ||
                        document.msFullscreenElement;

    if (!isFullscreen) {
        // Show button when exiting fullscreen
        btn.style.display = 'flex';
        setTimeout(() => {
            btn.style.opacity = '1';
        }, 10);
        // Remove fullscreen class
        document.body.classList.remove('is-fullscreen');
    } else {
        // Ensure class is added (backup)
        document.body.classList.add('is-fullscreen');
    }
}

// Optional: Press ESC to show exit fullscreen hint
let escPressCount = 0;
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (document.fullscreenElement || document.webkitFullscreenElement)) {
        escPressCount++;
        if (escPressCount === 1) {
            // You can add a tooltip here if needed
        }
    }
});

// YouTube Player API - Carousel Version
let players = [];
let currentSlide = 0;
let playersReady = 0;
const totalPlayers = 3;

const videoData = [
    { id: 'player1', videoId: 'KFiajfeublU' },
    { id: 'player2', videoId: '6a7X20gfNGc' },
    { id: 'player3', videoId: 'aDIUY0V-xMw' }
];

// Log video IDs for debugging
console.log('Video IDs configured:', videoData.map(v => v.videoId));

// This function is called by the YouTube API when it's ready
function onYouTubeIframeAPIReady() {
    console.log('YouTube API Ready - Creating players...');
    videoData.forEach((video, index) => {
        console.log(`Creating player ${index + 1}: ${video.id} with videoId: ${video.videoId}`);
        players[index] = new YT.Player(video.id, {
            height: '500',
            width: '100%',
            videoId: video.videoId,
            playerVars: {
                'playsinline': 1,
                'controls': 1,
                'rel': 0,
                'modestbranding': 1,
                'fs': 1,
                'enablejsapi': 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
                'onError': onPlayerError
            }
        });
    });
}

function onPlayerReady(event) {
    playersReady++;
    console.log(`Player ${playersReady} ready`);
    if (playersReady === totalPlayers) {
        console.log('All YouTube players ready!');
    }
}

function onPlayerError(event) {
    console.error('YouTube Player Error:', event.data);
    console.error('Error codes: 2=Invalid ID, 5=HTML5 error, 100=Not found, 101/150=Embedding disabled');

    // If error is embedding disabled (101 or 150), show a message
    if (event.data === 101 || event.data === 150) {
        const playerIndex = players.indexOf(event.target);
        console.error(`Video ${playerIndex + 1} has embedding restrictions`);
    }
}

function onPlayerStateChange(event) {
    const analyzeBtn = document.getElementById('analyzeBtn');

    // Only update button if the state change is from the current active player
    if (event.target === players[currentSlide]) {
        if (event.data === YT.PlayerState.PLAYING) {
            analyzeBtn.innerHTML = '<span class="btn-icon">⏸️</span><span class="btn-text">Pause Demo</span>';
        } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
            analyzeBtn.innerHTML = '<span class="btn-icon">▶️</span><span class="btn-text">Play Demo</span>';
        }
    }
}

// Carousel Navigation
function showSlide(index) {
    const slides = document.querySelectorAll('.video-slide');
    const currentVideoSpan = document.getElementById('currentVideo');

    // Pause all videos
    players.forEach(player => {
        if (player && player.pauseVideo) {
            player.pauseVideo();
        }
    });

    // Update slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });

    currentSlide = index;
    currentVideoSpan.textContent = index + 1;

    // Update button to Play state
    const analyzeBtn = document.getElementById('analyzeBtn');
    analyzeBtn.innerHTML = '<span class="btn-icon">▶️</span><span class="btn-text">Play Demo</span>';
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalPlayers;
    showSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = (currentSlide - 1 + totalPlayers) % totalPlayers;
    showSlide(prevIndex);
}

// Handle all button clicks
document.addEventListener('DOMContentLoaded', () => {
    // Play/Pause button
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', () => {
            if (playersReady < totalPlayers) {
                console.log('Players not ready yet');
                return;
            }

            const btnText = analyzeBtn.querySelector('.btn-text').textContent;
            const currentPlayer = players[currentSlide];

            if (btnText === 'Play Demo') {
                currentPlayer.playVideo();
            } else if (btnText === 'Pause Demo') {
                currentPlayer.pauseVideo();
            }
        });
    }

    // Navigation arrows
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
});
