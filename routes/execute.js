module.exports = (fetch) => async function execute(req, res) {
    try {
        const { cookie, post, shareCount, delay } = req.body;

        const headers = {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
            'cookie': cookie
        };

        const result = await sharePost(headers, post, shareCount, delay, fetch);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function sharePost(headers, post, shareCount, delay, fetch) {
    let count = 0;
    while (count < shareCount) {
        await new Promise(resolve => setTimeout(resolve, delay * 1000));
        try {
            const response = await fetch(`${post}&published=0`, {
                method: 'POST',
                headers: headers
            });
            const data = await response.json();
            if (data.id) {
                count++;
                return { success: true, count };
            }
        } catch (error) {
            return { success: false, error: 'Blocked' };
        }
    }
}
