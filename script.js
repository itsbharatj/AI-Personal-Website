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