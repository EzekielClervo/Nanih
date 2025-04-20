let currentTab = 'cookie';

function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => {
        t.classList.remove('active');
        document.getElementById(t.textContent.toLowerCase()).style.display = 'none';
    });
    document.getElementById(tab).classList.add('active');
    document.getElementById(tab).style.display = 'block';
    currentTab = tab;
}

async function submit(tab) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    try {
        const cookie = document.getElementById('cookie').value;
        const post = document.getElementById('post').value;
        const count = parseInt(document.getElementById('count').value);
        const delay = parseInt(document.getElementById('delay').value);

        if (!cookie || !post || !count) {
            throw new Error('Missing inputs');
        }

        const response = await fetch(`/api/execute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cookie,
                post,
                shareCount: count,
                delay
            })
        });

        const result = await response.json();
        if (result.error) {
            resultsDiv.innerHTML = `<div class="error animate__animated animate__fadeIn">${result.error}</div>`;
        } else {
            resultsDiv.innerHTML = `<div class="success animate__animated animate__fadeIn">Successfully shared ${result.count}/${count}</div>`;
        }
    } catch (error) {
        resultsDiv.innerHTML = `<div class="error animate__animated animate__fadeIn">${error.message}</div>`;
    }
}
