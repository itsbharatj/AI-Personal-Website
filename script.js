// Add particles.js configuration
const particlesConfig = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#ffffff"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5,
      random: false
    },
    size: {
      value: 3,
      random: true
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1
        }
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles.js
    particlesJS('particles-js', particlesConfig);

    // Mouse tracking effect
    const cursor = document.createElement('div');
    cursor.className = 'cursor-effect';
    document.body.appendChild(cursor);

    // Array to store trail elements
    const trails = [];
    const numTrails = 20;

    // Create trail elements
    for (let i = 0; i < numTrails; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0,
            delay: i * 2
        });
    }

    // Mouse move handler
    let mouseX = 0;
    let mouseY = 0;
    let frameCount = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update main cursor
        cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
        cursor.style.background = `radial-gradient(circle at center, 
            rgba(${Math.sin(frameCount * 0.05) * 127 + 128}, 
            ${Math.sin(frameCount * 0.08) * 127 + 128}, 
            ${Math.sin(frameCount * 0.11) * 127 + 128}, 1), 
            rgba(0,0,0,0))`;
    });

    // Animation loop
    function animate() {
        frameCount++;

        // Update trails
        trails.forEach((trail, index) => {
            const targetX = mouseX - 5;
            const targetY = mouseY - 5;

            // Smooth following with delay
            trail.x += (targetX - trail.x) * 0.1;
            trail.y += (targetY - trail.y) * 0.1;

            // Apply position with delay based on index
            const delayedX = trail.x - index * 3;
            const delayedY = trail.y - index * 3;

            trail.element.style.transform = `translate(${delayedX}px, ${delayedY}px)`;
            trail.element.style.background = `radial-gradient(circle at center, 
                rgba(${Math.sin((frameCount + index) * 0.05) * 127 + 128}, 
                ${Math.sin((frameCount + index) * 0.08) * 127 + 128}, 
                ${Math.sin((frameCount + index) * 0.11) * 127 + 128}, 0.5), 
                rgba(0,0,0,0))`;
        });

        requestAnimationFrame(animate);
    }

    animate();

    const setupForm = document.getElementById('setupForm');
    const setupWizard = document.getElementById('setupWizard');
    const personalWebsite = document.getElementById('personalWebsite');
    
    setupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        const generateBtn = setupForm.querySelector('.generate-btn');
        const btnText = generateBtn.querySelector('span');
        const loader = generateBtn.querySelector('.loader');
        btnText.style.display = 'none';
        loader.style.display = 'block';
        
        // Get form data
        const data = {
            linkedin: document.getElementById('linkedinUrl').value,
            twitter: document.getElementById('twitterUrl').value,
            github: document.getElementById('githubUrl').value,
            additional: document.getElementById('additionalInfo').value
        };

        try {
            // Here you would normally make an API call to your backend
            // For now, we'll simulate the delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Generate the website content
            const websiteContent = await generateWebsite(data);
            
            // Hide setup wizard and show the website
            setupWizard.style.display = 'none';
            personalWebsite.style.display = 'block';
            personalWebsite.innerHTML = websiteContent;
            
        } catch (error) {
            console.error('Error generating website:', error);
            alert('There was an error generating your website. Please try again.');
            
            // Reset button state
            btnText.style.display = 'block';
            loader.style.display = 'none';
        }
    });
});

async function generateWebsite(data) {
    // This function would normally make API calls to scrape data
    // For now, we'll return a basic template
    return `
        <div class="container">
            <div class="profile-section">
                <div class="profile-photo">
                    <img src="https://via.placeholder.com/200" alt="Profile Photo">
                </div>
                <h1>Your Name</h1>
                <div class="social-links">
                    <a href="${data.linkedin}" class="social-button linkedin" target="_blank">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="${data.twitter}" class="social-button twitter" target="_blank">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="${data.github}" class="social-button github" target="_blank">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>

            <div class="content-section">
                <div class="bio">
                    <h2>About Me</h2>
                    <p>${data.additional || 'Professional with expertise in technology and innovation.'}</p>
                </div>
            </div>
        </div>
    `;
} 