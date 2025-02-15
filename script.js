// Main functionality
function toggleOptions() {
    const optionsContainer = document.getElementById('optionsContainer');
    const mainBtn = document.querySelector('.main-btn');
    
    optionsContainer.classList.toggle('show');
    mainBtn.style.transform = optionsContainer.classList.contains('show') 
        ? 'scale(0.9) rotate(360deg)'
        : 'translateY(-5px) scale(1.05)';
    
    createParticles();
}

function createParticles() {
    const particles = document.createElement('div');
    particles.className = 'particles';
    
    for(let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = particle.style.height = Math.random() * 5 + 2 + 'px';
        particle.style.animation = `move ${Math.random() * 3 + 2}s linear infinite`;
        
        particles.appendChild(particle);
    }
    
    document.body.appendChild(particles);
    
    setTimeout(() => {
        particles.remove();
    }, 10000);
}

document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const feature = this.dataset.feature;
        showFeature(feature);
    });
});

function showFeature(feature) {
    const modal = document.getElementById('featureModal');
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    
    let html = '';
    switch(feature) {
        case 'sorting':
            html = `
                <h2 style="color: var(--primary); margin-bottom: 1rem;">Sorting Visualizer</h2>
                <p>Choose an algorithm to visualize:</p>
                <div class="algo-btns">
                    <button class="algo-btn">Bubble Sort</button>
                    <button class="algo-btn">Quick Sort</button>
                    <button class="algo-btn">Merge Sort</button>
                </div>
            `;
            break;
        case 'searching':
            html = `
                <h2 style="color: var(--primary); margin-bottom: 1rem;">Search Visualizer</h2>
                <p>Select search technique:</p>
                <div class="search-btns">
                    <button class="search-btn">Binary Search</button>
                    <button class="search-btn">Linear Search</button>
                    <button class="search-btn">Hash Table</button>
                </div>
            `;
            break;
        case 'about':
            html = `
                <h2 style="color: var(--primary); margin-bottom: 1rem;">About Us</h2>
                <p>We're passionate about making complex algorithms understandable through visualization!</p>
                <div class="team">
                    <div class="member">
                        <i class="fas fa-user-astronaut"></i>
                        <h3>John Doe</h3>
                        <p>Lead Developer</p>
                    </div>
                </div>
            `;
            break;
    }
    
    content.innerHTML = html;
    modal.style.display = 'block';
    overlay.style.display = 'block';
}

function closeModal() {
    document.getElementById('featureModal').style.display = 'none';
    document.getElementById('modalOverlay').style.display = 'none';
}

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeToggle.innerHTML = document.body.classList.contains('light-theme') 
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
});

// Space Animation
const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = 150;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
class Particle {
    constructor() {
        this.reset();
        this.z = Math.random() * 4 + 1;
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.speed = Math.random() * 0.5 + 0.2;
        this.size = Math.random() * 1.5 + 0.5;
        this.angle = (Math.PI / 2) + (Math.random() - 0.5) * 0.4;
    }
    
    update() {
        const dx = Math.cos(this.angle) * this.speed;
        const dy = Math.sin(this.angle) * this.speed;
        
        this.x += dx * this.z;
        this.y += dy * this.z;
        
        if(this.y < -10 || this.x > canvas.width + 10 || this.x < -10) {
            this.reset();
        }
    }
    
    draw() {
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0, 
            this.x, this.y, this.size * 2
        );
        gradient.addColorStop(0, 'rgba(19, 204, 213, 0.8)');
        gradient.addColorStop(1, 'rgba(19, 204, 213, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particles
for(let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.fillStyle = 'rgba(15, 15, 31, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    requestAnimationFrame(animate);
}
animate();