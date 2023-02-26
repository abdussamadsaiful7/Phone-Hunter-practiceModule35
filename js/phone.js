const loadPhones =async(searchText) =>{
    const url =` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
    console.log(data)
}

const displayPhones = phones =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';

    // display 20 phones only,
    phones = phones.slice(0,20);

    //No phones found condition
    const noPhone = document.getElementById('no-found');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }

    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card w-full h-60 p-4 mt-4 border border-0 bg-primary-subtle shadow bg-body-tertiary rounded">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
    // stop toggle spinner,
    toggleSpinner(false);
}

document.getElementById('btn-search').addEventListener('click', function(){
    //start loader
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);

})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

loadPhones('phone');