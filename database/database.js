// Simple database simulation using localStorage
const AgriDB = (function() {
    const DB_NAME = 'sustainable_agri_db';
    const RECOMMENDATIONS_KEY = 'recommendations';
    
    // Initialize database
    function init() {
        if (!localStorage.getItem(DB_NAME)) {
            localStorage.setItem(DB_NAME, JSON.stringify({
                [RECOMMENDATIONS_KEY]: []
            }));
        }
    }
    
    // Save a recommendation
    function saveRecommendation(data) {
        const db = JSON.parse(localStorage.getItem(DB_NAME));
        db[RECOMMENDATIONS_KEY].push(data);
        localStorage.setItem(DB_NAME, JSON.stringify(db));
        return true;
    }
    
    // Get all recommendations
    function getRecommendations() {
        const db = JSON.parse(localStorage.getItem(DB_NAME));
        return db[RECOMMENDATIONS_KEY];
    }
    
    // Clear all data (for testing)
    function clearDatabase() {
        localStorage.removeItem(DB_NAME);
        init();
    }
    
    // Initialize on load
    init();
    
    return {
        saveRecommendation,
        getRecommendations,
        clearDatabase
    };
})();

// Make available globally
window.AgriDB = AgriDB;