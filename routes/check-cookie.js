module.exports = (fetch) => async function checkCookie(req, res) {
    try {
        const { cookie } = req.body;
        const response = await fetch(`your-aso-endpoint${cookie}`);
        const data = await response.json();
        res.json({ isLive: data.status === 'Cookie Live' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
