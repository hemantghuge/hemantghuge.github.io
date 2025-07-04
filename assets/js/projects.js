// Projects page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // --- Hash-based filter selection ---
    const hash = window.location.hash.replace('#', '');
    const validFilters = ['all', 'ai', 'product', 'research', 'robotics'];
    let defaultFilter = 'all';
    if (validFilters.includes(hash)) {
        defaultFilter = hash;
    }
    // Remove 'active' from all filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active', 'bg-primary', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-700');
    });
    // Add 'active' to the selected filter button
    const selectedBtn = document.getElementById(`filter-${defaultFilter}`);
    if (selectedBtn) {
        selectedBtn.classList.add('active', 'bg-primary', 'text-white');
        selectedBtn.classList.remove('bg-gray-100', 'text-gray-700');
    }
    // Filter projects on load
    const projectCards = document.querySelectorAll('.project-card');
    if (typeof filterProjects === 'function') {
        filterProjects(defaultFilter, projectCards);
    }
    // --- End hash-based filter selection ---

    initializeProjectFiltering();
    initializeProjectModals();
    initializeProjectAnimations();
    console.log('Projects page functionality initialized');
});

// Project filtering functionality
function initializeProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.id.replace('filter-', '');
            
            // Update active filter button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-primary', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            
            this.classList.add('active', 'bg-primary', 'text-white');
            this.classList.remove('bg-gray-200', 'text-gray-700');
            
            // Filter projects
            filterProjects(filter, projectCards);
            
            // Track filter usage
            trackEvent('project_filter', 'filter_clicked', filter);
        });
    });
}

// Filter projects based on category
function filterProjects(filter, cards) {
    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
            card.style.display = 'block';
            card.classList.remove('hidden');
            
            // Animate in
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Hide after animation
            setTimeout(() => {
                card.style.display = 'none';
                card.classList.add('hidden');
            }, 300);
        }
    });
    
    // Update results count
    updateResultsCount(filter, cards);
}

// Update results count
function updateResultsCount(filter, cards) {
    const visibleCards = Array.from(cards).filter(card => {
        const category = card.getAttribute('data-category');
        return filter === 'all' || category === filter;
    });
    
    // Create or update results counter
    let counter = document.getElementById('results-counter');
    if (!counter) {
        counter = document.createElement('div');
        counter.id = 'results-counter';
        counter.className = 'text-center text-gray-600 mt-4';
        document.getElementById('projects-grid').parentNode.appendChild(counter);
    }
    
    const count = visibleCards.length;
    const filterText = filter === 'all' ? 'projects' : `${filter} projects`;
    counter.textContent = `Showing ${count} ${filterText}`;
}

// Initialize project modals
function initializeProjectModals() {
    // Create modal data
    const modalData = {
        'pickup-modal': {
            title: 'Pickup Assist GenAI',
            category: 'Product',
            image: 'assets/images/project-placeholder.svg',
            overview: 'Led the development of a GenAI-powered product that revolutionizes pickup operations across retail locations. The system uses advanced AI algorithms to optimize routing, predict demand, and improve customer experience.',
            achievements: [
                { label: 'Efficiency Gain', value: '30%' },
                { label: 'Locations', value: '1200+' },
                { label: 'Daily Optimizations', value: '50K+' },
                { label: 'Customer Satisfaction', value: '95%' }
            ],
            implementation: [
                'GenAI model development for demand prediction',
                'Real-time routing optimization algorithms',
                'Cross-functional team leadership and coordination',
                'User research and iterative product development',
                'Integration with existing retail management systems'
            ],
            impact: [
                '30% improvement in pickup efficiency across all locations',
                'Reduced average wait time from 15 minutes to 8 minutes',
                'Increased customer satisfaction scores by 25%',
                'Cost savings of $1.5M annually through optimized operations'
            ],
            technologies: ['GenAI', 'Python', 'React', 'Node.js', 'PostgreSQL', 'AWS']
        },
        'fire-modal': {
            title: 'Fire Rescue System for High-Rise Buildings',
            category: 'Research',
            image: 'assets/images/project-placeholder.svg',
            overview: 'ICCUBEA Best Paper Award winning research project that developed an automated fire rescue system for high-rise buildings using IoT sensors, real-time monitoring, and automated response protocols.',
            achievements: [
                { label: 'Award', value: 'Best Paper' },
                { label: 'Response Time', value: '60% Faster' },
                { label: 'Accuracy', value: '98.5%' },
                { label: 'Citations', value: '50+' }
            ],
            implementation: [
                'IoT sensor network design and deployment',
                'Real-time fire detection and monitoring system',
                'Automated rescue protocol development',
                'Integration with building management systems',
                'Comprehensive testing and validation'
            ],
            impact: [
                'Winner of ICCUBEA Best Paper Award',
                '60% reduction in emergency response time',
                '98.5% accuracy in fire detection and location',
                'Published research adopted by multiple institutions'
            ],
            technologies: ['IoT', 'Arduino', 'Raspberry Pi', 'Python', 'C++', 'MQTT']
        },
        'tarsyer-modal': {
            title: 'Tarsyer Bridge',
            category: 'AI & ML',
            image: 'assets/images/project-placeholder.svg',
            overview: 'Advanced computer vision bridge system that connects multiple AI models and data processing pipelines, enabling seamless integration of different AI capabilities in a unified platform.',
            achievements: [
                { label: 'Models Integrated', value: '20+' },
                { label: 'Processing Speed', value: '10x Faster' },
                { label: 'Accuracy', value: '99.2%' },
                { label: 'Scalability', value: '1000+ Concurrent' }
            ],
            implementation: [
                'Multi-model integration architecture design',
                'Real-time data processing pipeline development',
                'Scalable microservices architecture',
                'Performance optimization and monitoring',
                'Comprehensive API design and documentation'
            ],
            impact: [
                '10x improvement in processing speed',
                'Unified platform for 20+ AI models',
                '99.2% accuracy across all integrated models',
                'Scalable to handle 1000+ concurrent requests'
            ],
            technologies: ['TensorFlow', 'PyTorch', 'Docker', 'Kubernetes', 'Redis', 'PostgreSQL']
        },
        'bag-modal': {
            title: 'Automated Bag Counting System',
            category: 'AI & ML',
            image: 'assets/images/project-placeholder.svg',
            overview: 'Computer vision system for automated inventory counting in retail environments, using advanced object detection and counting algorithms to streamline inventory management processes.',
            achievements: [
                { label: 'Accuracy', value: '99.8%' },
                { label: 'Speed', value: '5x Faster' },
                { label: 'Cost Reduction', value: '40%' },
                { label: 'Deployments', value: '500+' }
            ],
            implementation: [
                'Custom object detection model development',
                'Real-time counting algorithm optimization',
                'Integration with inventory management systems',
                'Edge deployment for retail environments',
                'Comprehensive testing and validation'
            ],
            impact: [
                '99.8% accuracy in bag counting and identification',
                '5x faster than manual counting processes',
                '40% reduction in inventory management costs',
                'Deployed across 500+ retail locations'
            ],
            technologies: ['OpenCV', 'TensorFlow', 'Python', 'YOLO', 'Edge Computing']
        },
        'safety-modal': {
            title: 'PPE Safety Monitoring System',
            category: 'AI & ML',
            image: 'assets/images/project-placeholder.svg',
            overview: 'Edge AI system for monitoring Personal Protective Equipment (PPE) compliance using camera feeds, providing real-time alerts and comprehensive safety reporting.',
            achievements: [
                { label: 'Compliance Rate', value: '95%' },
                { label: 'Alert Time', value: '<2 Seconds' },
                { label: 'Accuracy', value: '97.5%' },
                { label: 'Incidents Prevented', value: '200+' }
            ],
            implementation: [
                'PPE detection model development and training',
                'Edge camera integration and optimization',
                'Real-time alert system development',
                'Compliance reporting dashboard creation',
                'Integration with existing safety protocols'
            ],
            impact: [
                '95% improvement in PPE compliance rates',
                'Real-time alerts within 2 seconds of violation',
                '97.5% accuracy in PPE detection',
                'Prevention of 200+ potential safety incidents'
            ],
            technologies: ['Computer Vision', 'Edge AI', 'TensorFlow', 'OpenCV', 'IoT']
        }
    };
    
    // Generate modal content dynamically
    Object.keys(modalData).forEach(modalId => {
        createModalContent(modalId, modalData[modalId]);
    });
}

// Create modal content
function createModalContent(modalId, data) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const modalContent = modal.querySelector('.bg-white');
    if (!modalContent) return;
    
    modalContent.innerHTML = `
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-900">${data.title}</h2>
                <button onclick="closeModal('${modalId}')" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            
            <div class="grid lg:grid-cols-2 gap-8">
                <div>
                    <div class="h-64 bg-gradient-to-br from-primary to-secondary rounded-lg mb-6 flex items-center justify-center">
                        <img src="${data.image}" alt="${data.title}" class="w-full h-full object-cover rounded-lg">
                    </div>
                    
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">Key Achievements</h3>
                    <div class="grid grid-cols-2 gap-4 mb-6">
                        ${data.achievements.map(achievement => `
                            <div class="text-center p-4 bg-primary/10 rounded-lg">
                                <div class="text-2xl font-bold text-primary">${achievement.value}</div>
                                <div class="text-sm text-gray-600">${achievement.label}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">Project Overview</h3>
                    <p class="text-gray-600 mb-6">${data.overview}</p>
                    
                    <h4 class="font-semibold text-gray-900 mb-3">Technical Implementation</h4>
                    <ul class="text-gray-600 space-y-2 mb-6">
                        ${data.implementation.map(item => `<li>• ${item}</li>`).join('')}
                    </ul>
                    
                    <h4 class="font-semibold text-gray-900 mb-3">Impact & Results</h4>
                    <ul class="text-gray-600 space-y-2 mb-6">
                        ${data.impact.map(item => `<li>• ${item}</li>`).join('')}
                    </ul>
                    
                    <div class="flex flex-wrap gap-2">
                        ${data.technologies.map(tech => `
                            <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">${tech}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Initialize project animations
function initializeProjectAnimations() {
    // Staggered animation for project cards
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Hover effects for project cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });
    
    // Filter button animations
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Project search functionality
function initializeProjectSearch() {
    const searchInput = document.getElementById('project-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', debounce(function() {
        const searchTerm = this.value.toLowerCase();
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const technologies = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          technologies.some(tech => tech.includes(searchTerm));
            
            if (matches) {
                card.style.display = 'block';
                card.classList.remove('hidden');
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
            }
        });
        
        // Track search
        if (searchTerm.length > 2) {
            trackEvent('project_search', 'search_query', searchTerm);
        }
    }, 300));
}

// Initialize project lazy loading
function initializeProjectLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Utility function for debouncing (if not already defined in main.js)
if (typeof debounce === 'undefined') {
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize additional features
initializeProjectSearch();
initializeProjectLazyLoading();
