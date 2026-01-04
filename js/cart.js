  // Read URL parameters and populate product info
        window.addEventListener('DOMContentLoaded', function() {
            const urlParams = new URLSearchParams(window.location.search);
            const productName = urlParams.get('name');
            const productPrice = urlParams.get('price');

            if (productName && productPrice) {
                // Update visible product info
                document.getElementById('productName').textContent = decodeURIComponent(productName);
                document.getElementById('productPrice').textContent = decodeURIComponent(productPrice);
                
                // Update hidden form fields
                document.getElementById('hiddenProductName').value = decodeURIComponent(productName);
                document.getElementById('hiddenProductPrice').value = decodeURIComponent(productPrice);
            }
        });