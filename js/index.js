document.addEventListener('DOMContentLoaded', (event) => {

    const container = document.querySelector("#monster-container");
    const createMonster = document.querySelector("#create-monster");
    const buttonContainer = document.querySelector("#button-container");
    let currentPage = 1

    loadPage();

    function loadPage() { 
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${currentPage}`)
        .then(response => response.json())
        .then(json => listMonsters(json))
    };

    createMonster.addEventListener("click", function(e) {
        if (e.target.className === "create") {
            makeMonster();
        }
    });

    buttonContainer.addEventListener("click", function(e) {
        if (e.target.id === "forward") {
            currentPage += 1;
            loadPage();
        }
        else if (e.target.id === "back" && currentPage > 1) {
            currentPage -= 1;
            loadPage();
        }
    })



    function listMonsters(monsters) {
        container.innerHTML = ""
        for(let i = 0; i < monsters.length; i++) {
            const name = document.createElement("ul")
            container.appendChild(name)
            name.innerHTML = `${monsters[i].id}. ${monsters[i].name} <br><br> Age: ${monsters[i].age} <br><br> Description: ${monsters[i].description}`;
        }
    };

    function makeMonster() {
        const name = createMonster.querySelector('input[name="name"]').value;
        const age = createMonster.querySelector('input[name="age"]').value;
        const desc = createMonster.querySelector('input[name="desc"]').value;
        obj = {
            name: name,
            age: age,
            description: desc
        }
        
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(obj)
        });
    };

});