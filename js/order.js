


        // Get product information from URL parameters
        function getUrlParameter(name) {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        }

        // Show message function
        function showMessage(type, text) {
            var successMsg = document.getElementById('successMessage');
            var errorMsg = document.getElementById('errorMessage');
            
            successMsg.style.display = 'none';
            errorMsg.style.display = 'none';
            
            if (type === 'success') {
                successMsg.style.display = 'block';
                setTimeout(function() {
                    successMsg.style.display = 'none';
                }, 5000);
            } else {
                document.getElementById('errorText').textContent = text;
                errorMsg.style.display = 'block';
                setTimeout(function() {
                    errorMsg.style.display = 'none';
                }, 5000);
            }
        }

        // Populate product information
        document.addEventListener('DOMContentLoaded', function() {
            var productName = getUrlParameter('product') || 'Product Name';
            var productPrice = getUrlParameter('price') || '$0.00';
            
            document.getElementById('productName').textContent = productName;
            document.getElementById('productPrice').textContent = productPrice;
            document.getElementById('hiddenProductName').value = productName;
            document.getElementById('hiddenProductPrice').value = productPrice;
        });

        // Handle form submission
        document.getElementById('orderForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            var submitBtn = document.querySelector('.btn-order');
            var originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending Order...';
            submitBtn.disabled = true;
            
            // Create FormData
            var formData = new FormData(this);
            
            // Send to Web3Forms
            fetch(this.action, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Success
                    showMessage('success');
                    
                    // Clear form
                    document.getElementById('orderForm').reset();
                    
                    // Repopulate product info
                    var productName = getUrlParameter('product') || 'Product Name';
                    var productPrice = getUrlParameter('price') || '$0.00';
                    document.getElementById('productName').textContent = productName;
                    document.getElementById('productPrice').textContent = productPrice;
                    document.getElementById('hiddenProductName').value = productName;
                    document.getElementById('hiddenProductPrice').value = productPrice;
                    
                    // Optional redirect
                    setTimeout(function() {
                        if (confirm('Would you like to continue shopping?')) {
                            window.location.href = 'index.html';
                        }
                    }, 3000);
                    
                } else {
                    showMessage('error', 'Failed to send order: ' + (data.message || 'Unknown error'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('error', 'Failed to send order. Please try again or contact us directly at ahaduhabesha2026@gmail.com');
            })
            .finally(function() {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
   