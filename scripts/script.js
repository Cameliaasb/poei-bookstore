var ebooks = []

function showBooksList(){
    //Générer le nouveau code HTML à injecter : <tr> <td>..</td>...</tr>
    let newHTML = "";
    console.log(ebooks)
    if (ebooks.length > 0) {
      for(let i = 0; i < ebooks.length; i++){
          newHTML += "<tr>";
              newHTML += "<td>" + ebooks[i].id + "</td>";
              newHTML += "<td>" + ebooks[i].title + "</td>";
              newHTML += "<td>" + ebooks[i].author + "</td>";
              newHTML += "<td>" + ebooks[i].price + "</td>";
              newHTML += "<td><button class='btn btn-primary' onclick='toggleEditForm("+JSON.stringify(ebooks[i])+")'>Editer</button></td>";
              //newHTML += "<td><button class='btn btn-primary' onclick='toggleEditForm("+ebooks[i].id+")'>Editer</button></td>";
              newHTML += "<td><button class='btn btn-danger' onclick=(deleteEbook("+ ebooks[i].id +"))>Supprimer</button></td>";
          newHTML += "</tr>";
      }
    }

    //Récupérer l'élément tbody et y injecter le code HTML
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = newHTML;
}

/*function toggleEditForm(id){
    console.log(id);
    let editBlock = document.getElementById("divEditForm");
    if(id !== undefined){
        const ebook = ebooks.find(book => book.id === Number(id));
        console.log(ebook);
        document.getElementById("titleEd").value = ebook.title;
        document.getElementById("authorEd").value = ebook.author;
        document.getElementById("priceEd").value = ebook.price;
    }
    editBlock.classList.toggle('d-none');
}*/

function deleteEbook(id){
    if(confirm("Etes-vous sûre de vouloir supprimer le livre?")){
        ebooks = ebooks.filter(book=>book.id !== id);
        showBooksList();
    }

}

function toggleEditForm(ebook){
    console.log(typeof(ebook));
    let editBlock = document.getElementById("divEditForm");
    if(ebook !== undefined){
        //ebook = JSON.parse(ebook);
        document.getElementById("titleEd").value = ebook.title;
        document.getElementById("authorEd").value = ebook.author;
        document.getElementById("priceEd").value = ebook.price;
        document.getElementById("idEd").value = ebook.id;
        if(editBlock.classList.contains("d-none"))
            editBlock.classList.remove("d-none");

    }
    else{
       editBlock.classList.add("d-none");
    }

}

function toggleAddForm(){
    let addBlock = document.getElementById("divAddForm");
    addBlock.classList.toggle("d-none");
}

function getLastId(){
    return ebooks[ebooks.length-1].id;
}

function collectFormData(){
    return {
        id : getLastId() + 1,
        title : document.getElementById("title").value,
        author : document.getElementById("author").value,
        price : Number(document.getElementById("price").value)
    }
}

function collectFormDataEdit(){
    return {
        id : Number(document.getElementById("idEd").value),
        title : document.getElementById("titleEd").value,
        author : document.getElementById("authorEd").value,
        price : Number(document.getElementById("priceEd").value)
    }
}

function resetAddForm(){
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("price").value = "";
}

function addNewBook(event){
    event.preventDefault();
    console.log(event);

    //Récupérer les valeurs des champs et créer un nouvel objet ebook
    let newEbook = collectFormData();

    //Ajouter le nouvel objet au tableau ebooks
    ebooks.push(newEbook);

    //Rafraichir l'affichage de ma liste de ebooks
    showBooksList();

    //Réinitialiser les champs du formulaire
    resetAddForm();

    //Cacher le formulaire
    toggleAddForm();
}

function editBook(event){
    event.preventDefault();
    //console.log("Edit en cours");

    //Récupérer les données du livre modifié
    let editedBook = collectFormDataEdit();

    //Mettre à jour le tableau ebooks avec le livre modifié
    ebooks = ebooks.map(book=>(book.id===editedBook.id)?editedBook:book);

    //Rafraichir l'affichage de la liste
    showBooksList();


    //Réinitialiser les champs (optionnel)

    //Cacher le formulaire
    toggleEditForm();
}

function saveData(){
    window.localStorage.setItem("ebooks", JSON.stringify(ebooks));
}

function init(){
    if (ebooks.length > 0 ) {
      ebooks = JSON.parse(window.localStorage.getItem("ebooks"));
      showBooksList();
    }

    let btnAdd = document.getElementById("btnAdd");
    btnAdd.addEventListener("click", toggleAddForm);

    let btnAddForm = document.querySelector("#divAddForm form");
    btnAddForm.addEventListener("submit", addNewBook)

    let btnEditForm = document.querySelector("#divEditForm form");
    btnEditForm.addEventListener("submit", editBook)

    let btnSave = document.getElementById("btnSave");
    btnSave.addEventListener("click", saveData);
}

window.addEventListener("load", init);
