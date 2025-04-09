document.addEventListener('DOMContentLoaded', function() {
    const marketSubmit = document.getElementById('market-submit');
    const marketResponse = document.getElementById('market-response');
    
    marketSubmit.addEventListener('click', function() {
        const region = document.getElementById('region').value;
        const cropType = document.getElementById('crop-type').value;
        
        if (!region || !cropType) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate AI processing
        setTimeout(() => {
            const marketData = {
                north: {
                    vegetables: "High demand for potatoes and cabbage. Prices stable at $0.45/lb.",
                    fruits: "Apple market strong ($1.10/lb). New interest in cold-hardy berries.",
                    grains: "Wheat prices rising ($6.20/bushel). Organic premiums available."
                },
                south: {
                    vegetables: "Tomatoes in high demand ($1.25/lb). Consider early varieties.",
                    fruits: "Citrus prices steady. New opportunities in tropical fruits.",
                    grains: "Corn market volatile. Consider contract farming for stability."
                },
                east: {
                    vegetables: "Leafy greens command premium ($2.10/lb for organic).",
                    fruits: "Berry prices up 15% YoY. Consider u-pick operations.",
                    grains: "Soybean market expanding. New processing plants opening."
                },
                west: {
                    vegetables: "Specialty veggies (artichokes, asparagus) have 20% premium.",
                    fruits: "Avocado demand growing. Consider value-added products.",
                    grains: "Ancient grains (quinoa, amaranth) have premium markets."
                }
            };
            
            const response = marketData[region][cropType];
            const responseHTML = `
                <p><strong>Market Analysis for ${region} region:</strong></p>
                <p>${response}</p>
                <div class="market-tip">
                    <p><strong>Pro Tip:</strong> Connect with local co-ops for better pricing.</p>
                </div>
            `;
            
            marketResponse.innerHTML = responseHTML;
            marketResponse.style.display = 'block';
            
            // Save to database
            window.AgriDB.saveRecommendation({
                type: 'market',
                region,
                cropType,
                analysis: response,
                timestamp: new Date().toISOString()
            });
        }, 800);
    });
});