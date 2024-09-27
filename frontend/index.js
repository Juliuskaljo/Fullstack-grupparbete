const button = document.querySelector('.load-skins');
const ul = document.querySelector('.skins-list');  // Correct class name

button.addEventListener('click', async () => {
    try {
        const res = await fetch('http://localhost:1227/skins', {
            method: 'GET'
        });

        // Check if response is OK (status 200) and has JSON content-type
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error("Response is not JSON");
        }

        // Parse JSON response
        const data = await res.json();
        console.log(data);

        // Clear previous list items
        ul.innerHTML = '';

        // Iterate over each skin and append it to the list
        data.forEach(skin => {
            const li = document.createElement('li');
            li.innerText = `${skin.weapon}, ${skin.pattern}, ${skin.float}, ${skin.price}, ${skin.skinName}, ${skin.amountInStock}`;
            ul.appendChild(li);
        });

    } catch (error) {
        console.error('Error fetching skins:', error);
    }
});
