// AI-themed particle system
class AIParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.connections = [];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > window.innerHeight) this.speedY *= -1;
    }

    draw(ctx) {
        ctx.fillStyle = '#3B82F6';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class AIParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.maxConnections = 3;
        this.connectionDistance = 100;

        // Initialize canvas
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '1';
        this.canvas.style.pointerEvents = 'none';
        document.body.appendChild(this.canvas);

        // Set canvas size
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Initialize particles
        this.initParticles();

        // Start animation
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new AIParticle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height
            ));
        }
    }

    updateConnections() {
        this.particles.forEach(particle => {
            particle.connections = [];
            this.particles.forEach(other => {
                if (particle === other) return;

                const distance = Math.hypot(
                    particle.x - other.x,
                    particle.y - other.y
                );

                if (distance < this.connectionDistance &&
                    particle.connections.length < this.maxConnections) {
                    particle.connections.push({
                        particle: other,
                        distance: distance
                    });
                }
            });
        });
    }

    drawConnections() {
        this.ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
        this.ctx.lineWidth = 1;

        this.particles.forEach(particle => {
            particle.connections.forEach(connection => {
                const opacity = 1 - (connection.distance / this.connectionDistance);
                this.ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.2})`;

                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(connection.particle.x, connection.particle.y);
                this.ctx.stroke();
            });
        });
    }

    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });

        // Update and draw connections
        this.updateConnections();
        this.drawConnections();

        // Continue animation
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the particle system when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIParticleSystem();
});
