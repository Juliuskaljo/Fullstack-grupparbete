const button = document.querySelector('.load-skins');
const ul = document.querySelector('.skins-list');  

button.addEventListener('click', async () => {
    try {
        const res = await fetch('http://localhost:1227/skins', {
            method: 'GET'
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error("Response is not JSON");
        }

        const data = await res.json();
        console.log(data);

        ul.innerHTML = '';

        data.forEach(skin => {
            const li = document.createElement('li');
        
            const img = document.createElement('img');
            img.src = skin.image;  
            img.alt = `${skin.weapon} skin image`; 
            img.style.width = '15em';  
        
       
            const skinDetails = document.createElement('div');
        
           
            const weapon = document.createElement('p');
            weapon.innerText = `Weapon: ${skin.weapon}`;
        
            const pattern = document.createElement('p');
            pattern.innerText = `Pattern: ${skin.pattern}`;
        
            const float = document.createElement('p');
            float.innerText = `Float: ${skin.float}`;
        
            const price = document.createElement('p');
            price.innerText = `Price: ${skin.price}`;
        
            const skinName = document.createElement('p');
            skinName.innerText = `Skin Name: ${skin.skinName}`;
        
            const amountInStock = document.createElement('p');
            amountInStock.innerText = `Amount in Stock: ${skin.amountInStock}`;
        
            skinDetails.appendChild(weapon);
            skinDetails.appendChild(pattern);
            skinDetails.appendChild(float);
            skinDetails.appendChild(price);
            skinDetails.appendChild(skinName);
            skinDetails.appendChild(amountInStock);
            li.appendChild(img);
            li.appendChild(skinDetails);
            ul.appendChild(li);
        });
        
        

    } catch (error) {
        console.error('Error fetching skins:', error);
    }
});
