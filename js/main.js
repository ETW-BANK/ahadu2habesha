// ============================================
// HAMBURGER MENU FUNCTIONALITY
// ============================================
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (!hamburger || !navMenu) return; // Exit if elements don't exist on the page

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// CART/PRODUCT FUNCTIONALITY
// ============================================
function initCartButtons() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const actionBtn = card.querySelector('.action-btn');
        
        if (!actionBtn) return; // Skip if no action button

        actionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get product details from the card
            const productName = card.querySelector('.product-name')?.textContent || 'Product';
            const productPrice = card.querySelector('.current-price')?.textContent || '$0';
            
            // Build URL with parameters
            const url = `Contact.html?name=${encodeURIComponent(productName)}&price=${encodeURIComponent(productPrice)}`;
            
            // Navigate to contact form
            window.location.href = url;
        });
    });
}

// ============================================
// CONTACT FORM AUTO-POPULATION
// ============================================
function initContactFormPopulation() {
    // Check if we're on the contact page
    const productNameElement = document.getElementById('productName');
    const productPriceElement = document.getElementById('productPrice');
    
    if (!productNameElement || !productPriceElement) return; // Exit if not on contact page

    // Read URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');
    const productPrice = urlParams.get('price');

    if (productName && productPrice) {
        // Update visible product info
        productNameElement.textContent = decodeURIComponent(productName);
        productPriceElement.textContent = decodeURIComponent(productPrice);
        
        // Update hidden form fields
        const hiddenNameField = document.getElementById('hiddenProductName');
        const hiddenPriceField = document.getElementById('hiddenProductPrice');
        
        if (hiddenNameField) hiddenNameField.value = decodeURIComponent(productName);
        if (hiddenPriceField) hiddenPriceField.value = decodeURIComponent(productPrice);
    }
}

// ============================================
// INITIALIZE ALL FUNCTIONALITY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initHamburgerMenu();
    initCartButtons();
    initContactFormPopulation();
});
