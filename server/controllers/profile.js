
const profile = async (req, res) => {
    try {
    
        res.status(200).render("profile",{name, email, post, team});
        
    } catch (error) {
        res.status(503).json({error: error.message});
    }
}

module.exports = profile;