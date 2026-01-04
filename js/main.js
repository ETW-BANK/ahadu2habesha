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
// PAGINATION FUNCTIONALITY
// ============================================
function initPagination() {
    const productsGrid = document.querySelector('.products-grid');
    const paginationContainer = document.getElementById('pagination');
    
    if (!productsGrid || !paginationContainer) return; // Exit if elements don't exist

    const productCards = Array.from(productsGrid.querySelectorAll('.product-card'));
    const itemsPerPage = 8; // Show 8 products per page
    let currentPage = 1;
    const totalPages = Math.ceil(productCards.length / itemsPerPage);

    // Hide all products initially
    function showPage(page) {
        currentPage = page;
        
        // Hide all products
        productCards.forEach((card, index) => {
            card.style.display = 'none';
        });
        
        // Show products for current page
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        for (let i = startIndex; i < endIndex && i < productCards.length; i++) {
            productCards[i].style.display = 'block';
        }
        
        // Update pagination buttons
        renderPagination();
        
        // Scroll to top of products section
        productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Render pagination buttons
    function renderPagination() {
        paginationContainer.innerHTML = '';
        
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'pagination-btn' + (currentPage === 1 ? ' disabled' : '');
        prevBtn.innerHTML = '&laquo; Previous';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) showPage(currentPage - 1);
        });
        paginationContainer.appendChild(prevBtn);
        
        // Page number buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'pagination-btn' + (i === currentPage ? ' active' : '');
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => showPage(i));
            paginationContainer.appendChild(pageBtn);
        }
        
        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'pagination-btn' + (currentPage === totalPages ? ' disabled' : '');
        nextBtn.innerHTML = 'Next &raquo;';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) showPage(currentPage + 1);
        });
        paginationContainer.appendChild(nextBtn);
    }

    // Initialize - show first page
    showPage(1);
}

// ============================================
// INITIALIZE ALL FUNCTIONALITY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initHamburgerMenu();
    initCartButtons();
    initContactFormPopulation();
    initPagination();
});
