document.addEventListener('DOMContentLoaded', function() {
    const farmerSubmit = document.getElementById('farmer-submit');
    const farmerResponse = document.getElementById('farmer-response');
    
    farmerSubmit.addEventListener('click', function() {
        const landType = document.getElementById('land-type').value;
        const soilQuality = document.getElementById('soil-quality').value;
        
        if (!landType || !soilQuality) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate AI processing
        setTimeout(() => {
            const recommendations = {
                arable: {
                    high: "Best crops: Wheat, Barley, Canola. Consider crop rotation with legumes.",
                    medium: "Good crops: Oats, Rye, Flax. Add organic matter to improve soil.",
                    low: "Recommended: Sorghum, Millet. Implement soil restoration practices."
                },
                pastoral: {
                    high: "Ideal for: Alfalfa, Clover. Excellent for grazing or hay production.",
                    medium: "Suitable: Timothy grass, Fescue. Moderate fertilizer needed.",
                    low: "Hardy options: Rye grass, Brome grass. Focus on soil improvement."
                },
                mixed: {
                    high: "Diversify with: Corn-Soybean rotation, plus small livestock.",
                    medium: "Good mix: Oats with clover, plus poultry integration.",
                    low: "Resilient system: Millet with sheep grazing, agroforestry edges."
                },
                urban: {
                    high: "Premium crops: Microgreens, herbs, strawberries in raised beds.",
                    medium: "Good options: Cherry tomatoes, peppers, leafy greens in containers.",
                    low: "Easy crops: Radishes, beans, zucchini with compost amendments."
                }
            };
            
            const response = recommendations[landType][soilQuality];
            const responseHTML = `
                <p><strong>For ${landType} land with ${soilQuality} soil quality:</strong></p>
                <p>${response}</p>
                <p class="tip">Tip: Consider soil testing annually to monitor nutrient levels.</p>
            `;
            
            farmerResponse.innerHTML = responseHTML;
            farmerResponse.style.display = 'block';
            
            // Save to database
            window.AgriDB.saveRecommendation({
                type: 'farmer',
                landType,
                soilQuality,
                recommendation: response,
                timestamp: new Date().toISOString()
            });
        }, 800);
    });
    const conversationFlow = [
        {
          question: "Hi! Tell me about your land and financial goals.",
          handler: (answer) => {
            addMessage(answer, 'user');
            setTimeout(() => {
              addMessage("Great! What type of soil do you have? (Clay, Sandy, Loamy)", 'agent');
            }, 800);
          }
        },
        {
          question: "Great! What type of soil do you have?",
          handler: (answer) => {
            addMessage(answer, 'user');
            setTimeout(() => {
              // Generate recommendation based on answers
              const recommendation = generateRecommendation();
              addMessage(recommendation, 'agent');
              addMessage("Would you like me to save this recommendation?", 'agent');
            }, 1000);
          }
        }
      ];
      
      let currentStep = 0;
      
      sendButton.addEventListener('click', sendMessage);
      chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
      });
      
      function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
          conversationFlow[currentStep].handler(message);
          chatInput.value = '';
          currentStep = Math.min(currentStep + 1, conversationFlow.length - 1);
        }
      }
      
      function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message`;
        
        if (sender === 'agent') {
          messageDiv.innerHTML = `
            <img src="assets/icons/farmer.svg" class="message-icon">
            <div class="message-content">${text}</div>
          `;
        } else {
          messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
          `;
        }
        
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
      
      function generateRecommendation() {
        // Generate recommendation based on conversation
        return `Based on your inputs, I recommend focusing on organic tomatoes and leafy greens. 
                These crops have good market demand and suit your land conditions. 
                Estimated profit potential: $5,000 per acre.`;
      }
});