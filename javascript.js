let dynamicSearch = document.getElementById('search-button').addEventListener('click',()=>{  
    const text = document.getElementById('search-input').value
    console.log(text)
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${text}`)
    .then(res=>res.json())
    .then(data=>{
        //   console.log(data)
          show_the_players(data)
        })

})





let number = 0; 

const show_the_players = (data) => {
    console.log(data)
    let array_of_players = data.player;
    console.log(array_of_players)
    let grab = document.getElementById('cards-container');
    array_of_players.map(player => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '16rem';
        card.id = 'cards-container';
        card.innerHTML = `
            <img src="${player.strRender}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name: ${player.strPlayer}</h5>
                <h5 class="card-title">ID: ${player.idPlayer}</h5>
                <p class="card-text">Nationality: ${player.strNationality}</p>
                <p class="card-text">Gender: ${player.strGender}</p>
                <p class="card-text">Social Media 1: ${player.strFacebook}</p>
                <p class="card-text">Social Media 2: ${player.strInstagram}</p>
                <p class="card-text text-center p-2 fw-bold bg-info" onclick="add()">ADD PLAYER</p>
                <p class="text-center bg-success p-2 fw-bold" onclick=details(${player.idPlayer}) >DETAILS</p>
            </div>
        `;
        grab.appendChild(card); 
    });
}



const add = () => {
    if (number >= 11) {
        alert('You cannot add more than 11 players.');
        document.getElementById('alert').textContent = `YOU HAVE CROSSED THE LIMIT: ${number}`
        document.getElementById('notice').textContent = `YOU ARE NOT PERMIT TO CHOOSE MORE THAN: ${number}`
        return; 
    }
    number++; 
    document.getElementById('total-number').textContent = `TOTAL NUMBER: ${number}`
    
}


const details = (info) =>{
    console.log(info)
    const id = info
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        const players = data.players
        console.log(players)

        const playerDetails = document.getElementById('playerDetails');
        players.map(player=>{
            const div_again = document.createElement('div')
            playerDetails.innerHTML = `
            <p>Name: ${player.strPlayer}</p>
            <p>ID: ${player.idPlayer}</p>
            <p>Nationality: ${player.strNationality}</p>
            <p>Social Media 1: ${player.strFacebook}</p>
            <p>Social Media 2: ${player.strInstagram}</p>
        `;
        playerDetails.appendChild(div_again)
       
        const playerModal = new bootstrap.Modal(document.getElementById('playerModal'));
        playerModal.show();
        })
    })
}