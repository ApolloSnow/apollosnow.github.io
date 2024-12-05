document.addEventListener('DOMContentLoaded', function() {
    // Keep existing progress bars animation
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    setTimeout(() => {
        progressBars.forEach((bar, index) => {
            const finalWidth = index === 0 ? '95%' : '92%';
            bar.style.width = finalWidth;
        });
    }, 500);

    // Keep existing time display
    function updateTime() {
        const timeDisplay = document.getElementById('time-display');
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        timeDisplay.textContent = timeString;
    }
    updateTime();
    setInterval(updateTime, 1000);

    // Keep existing messages
    const messages = [
        "INITIALIZING INTERFACE...",
        "SECURITY PROTOCOLS ACTIVE",
        "SCANNING FOR THREATS...",
        "ALL SYSTEMS NOMINAL",
        "WELCOME TO THE SYSTEM",
        "APOLLO INTERFACE READY"
    ];

    function showMessages() {
        let currentMessage = 0;
        const messageElement = document.getElementById('bot-message');
        
        function displayMessage() {
            if (currentMessage < messages.length) {
                messageElement.style.opacity = 0;
                messageElement.classList.remove('typing');
                
                setTimeout(() => {
                    messageElement.textContent = messages[currentMessage];
                    messageElement.style.opacity = 1;
                    messageElement.classList.add('typing');
                    currentMessage++;
                    if (currentMessage < messages.length) {
                        setTimeout(displayMessage, 4000);
                    }
                }, 500);
            }
        }
        displayMessage();
    }

    // Keep manual log entry function
    window.addManualLogEntry = function(logMessage) {
        const logContainer = document.querySelector('.log-entries');
        const newEntry = document.createElement('div');
        newEntry.classList.add('log-entry', 'new');
        
        const time = new Date().toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        newEntry.textContent = `[ ${time} ] ${logMessage}`;
        logContainer.insertBefore(newEntry, logContainer.firstChild);
        
        setTimeout(() => {
            newEntry.classList.remove('new');
        }, 500);
        
        if (logContainer.children.length > 5) {
            logContainer.removeChild(logContainer.lastChild);
        }
    };

    // Keep security items hover
    const securityItems = document.querySelectorAll('.security-item');
    securityItems.forEach(item => {
        const originalContent = item.innerHTML;
        const detailsContent = item.getAttribute('data-details');
        
        item.addEventListener('mouseenter', () => {
            if (detailsContent) {
                item.innerHTML = detailsContent;
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.innerHTML = originalContent;
        });
    });

    // Initialize messages
    showMessages();

    // New Enhanced Canvas Animation based on CyberSphere
    const canvas = document.getElementById('bot-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 400;
    canvas.height = 400;
    
    const baseRadius = 100;
    let frameCount = 0;
    let mousePos = { x: canvas.width / 2, y: canvas.height / 2 };
    
    // Create particles with enhanced properties
    function createParticles(count) {
        const particles = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 80;
            particles.push({
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 1.5 + 0.5,
                color: "rgba(6, 182, 180, 0.7)"
            });
        }
        return particles;
    }

    const particles = createParticles(100);

    function drawSphere() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Clear with fade effect
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Create sphere gradient
        const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, baseRadius
        );
        gradient.addColorStop(0, 'rgba(6, 182, 180, 0.05)');
        gradient.addColorStop(0.7, 'rgba(6, 182, 180, 0.08)');
        gradient.addColorStop(0.9, 'rgba(6, 182, 180, 0.15)');
        gradient.addColorStop(1, 'rgba(6, 182, 180, 0)');

        // Draw base sphere
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw sphere border
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(6, 182, 180, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Update and draw particles
        particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Contain particles within sphere
            const distance = Math.sqrt(particle.x * particle.x + particle.y * particle.y);
            if (distance > baseRadius - 5) {
                const angle = Math.atan2(particle.y, particle.x);
                particle.x = (baseRadius - 5) * Math.cos(angle);
                particle.y = (baseRadius - 5) * Math.sin(angle);
                
                // Bounce effect
                const normalX = particle.x / distance;
                const normalY = particle.y / distance;
                const dotProduct = particle.vx * normalX + particle.vy * normalY;
                particle.vx -= 2 * dotProduct * normalX;
                particle.vy -= 2 * dotProduct * normalY;
            }

            // Draw particle
            ctx.beginPath();
            ctx.arc(
                centerX + particle.x,
                centerY + particle.y,
                particle.size,
                0,
                Math.PI * 2
            );
            const particleOpacity = 0.2 + Math.sin(frameCount * 0.05) * 0.1;
            ctx.fillStyle = `rgba(6, 182, 180, ${particleOpacity})`;
            ctx.fill();

            // Draw connections between nearby particles
            particles.slice(index + 1).forEach(other => {
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 30) {
                    ctx.beginPath();
                    ctx.moveTo(centerX + particle.x, centerY + particle.y);
                    ctx.lineTo(centerX + other.x, centerY + other.y);
                    const lineOpacity = (1 - distance / 30) * 0.15;
                    ctx.strokeStyle = `rgba(6, 182, 180, ${lineOpacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });

        frameCount++;
        requestAnimationFrame(drawSphere);
    }

    // Handle mouse movement
    canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        mousePos = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    });

    // Handle window resize
    function resizeCanvas() {
        canvas.width = canvas.parentElement.clientWidth || 400;
        canvas.height = canvas.parentElement.clientHeight || 400;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Start animation
    drawSphere();
});