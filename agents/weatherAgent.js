document.addEventListener('DOMContentLoaded', function() {
    const weatherSubmit = document.getElementById('weather-submit');
    const weatherResponse = document.getElementById('weather-response');
    
    weatherSubmit.addEventListener('click', function() {
        const season = document.getElementById('season').value;
        const weatherPattern = document.getElementById('weather-pattern').value;
        
        if (!season || !weatherPattern) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate AI processing
        setTimeout(() => {
            const weatherAdvice = {
                spring: {
                    dry: "Early planting recommended. Drought-resistant varieties: chickpeas, millet.",
                    moderate: "Ideal planting conditions. Succession planting possible.",
                    wet: "Delay planting in poorly drained areas. Consider raised beds."
                },
                summer: {
                    dry: "Mulch heavily. Drip irrigation recommended. Heat-tolerant varieties.",
                    moderate: "Good growing conditions. Monitor for pests in warm weather.",
                    wet: "Watch for fungal diseases. Improve air circulation around plants."
                },
                autumn: {
                    dry: "Plant winter cover crops early. Consider dry farming techniques.",
                    moderate: "Excellent for fall crops. Extend season with row covers.",
                    wet: "Prepare for early frost. Harvest crops before heavy rains."
                },
                winter: {
                    dry: "Good for soil preparation. Plan irrigation improvements.",
                    moderate: "Opportunity for winter gardening with protection.",
                    wet: "Focus on indoor starts. Prepare drainage for spring."
                }
            };
            
            const response = weatherAdvice[season][weatherPattern];
            const responseHTML = `
                <p><strong>${season} weather advice (${weatherPattern} conditions):</strong></p>
                <p>${response}</p>
                <div class="weather-alert">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>Always monitor local forecasts for updates</span>
                </div>
            `;
            
            weatherResponse.innerHTML = responseHTML;
            weatherResponse.style.display = 'block';
            
            // Save to database
            window.AgriDB.saveRecommendation({
                type: 'weather',
                season,
                weatherPattern,
                advice: response,
                timestamp: new Date().toISOString()
            });
        }, 800);
    });
});