document.addEventListener('DOMContentLoaded', function(event) {
  
  const body = document.querySelector("#monster-container")
  let pageNumber = 0
  let pageData = []
  function add_or_subPgNum(fwdOrRev){
    if (fwdOrRev === "fwd") {
      return ++pageNumber
    } else if (fwdOrRev === "rev" ) {
      return --pageNumber
    } else {
      alert("fwd or rev only")
    }
  }


function loadSubsequentPages(fwdOrRev) {
  pageNumber = add_or_subPgNum(fwdOrRev)
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
  .then( function(results) {
    return results.json()
  }) // ends first THEN, parsing JSON into pageData variable
  .then ( function(results) {
    pageData = results 
    pageData.forEach( function(dude) { 
      body.insertAdjacentHTML("beforeend", `
        <h4>Name:  ${dude.name}</h4>
        <h5>Age:  ${dude.age}</h5>
        <h5>Description:  ${dude.description}</h5>
        </br>
        `)
     })//end of ForEach loop
  })// Ends loadSubseuentPages function
} // Ends loadPageOfMonsterFetch(

  document.addEventListener("click", function(e){ 
    console.dir(e.target)
    switch (true) { 
      case (e.target.id == "back"):

        loadSubsequentPages("rev")
        break
      case (e.target.id == "forward"):
        loadSubsequentPages("fwd")
        break
    // }// Ends Switch Statement
    }
  })// Ends Event Listener Statement
  

    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${++pageNumber}`)
    .then( function(results) {
      return results.json()
    }) // ends first THEN, parsing JSON into pageData variable
    .then ( function(results) {
      pageData = results 
      pageData.forEach( function(dude) {
        body.insertAdjacentHTML("beforeend", `
        <h4>Name:  ${dude.name}</h4>
        <h5>Age:  ${dude.age}</h5>
        <h5>Description:  ${dude.description}</h5>
        </br>
        `)
      })
    })// Ends Then statement that loads initial pag
});   //  Ends page load event listener