const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");
const search = document.getElementById("search");



let mode = "create";
let temp;

function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green"
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "rgb(107, 0, 0)"
    }
}
// this is the section is response to the check if there are area or no in the  localStorage
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
}
else {
    dataPro = [];
}
// this function is the create new element
submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        total: total.innerHTML,
        category: category.value.toLowerCase()
    };
    if (mode === "create") {
        if (newPro.count > 1) {
            if (title.value != '' && price.value != '' && count.value != '' && category.value != '') {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                alert("enter your data");
            }
        } else {
            if (title.value != '' && price.value != '' && count.value != '' && category.value != '') {
                dataPro.push(newPro);
            } else {
                alert("enter your data");
            }
        }
    } else {
        dataPro[temp] = newPro;
        mode = "create";
        submit.innerHTML = "Create";
        count.style.display = "block";
    }
    saveData();
    clearData();
    showData();
    getTotal()

}

// this function is the save data in the localStorage
function saveData() {
    localStorage.setItem("product", JSON.stringify(dataPro))
}
// this function is the clear data from the input
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    total.innerHTML = "";
    category.value = "";
}
// this function is the read the data 
function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick = "updateData(${i})"  id="update">update</button></td>
            <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
    }
    document.getElementById("tbody").innerHTML = table;

    let deleteAll = document.getElementById("deleteAll");
    if (dataPro.length != "") {
        deleteAll.style.display = "block";
        let number = document.getElementById("number");
        number.innerHTML = dataPro.length;
    } else {
        deleteAll.style.display = "none"
    }
}
showData();
//  this function is response to delete  the data 
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}
// this function is response to delete all the data in one click
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData()
}
// this function is response to update the data 
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal()
    count.style.display = "none";
    submit.innerHTML = "Update";
    mode = "Update";
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })

}
// create the function to search
let searchMood = 'title';
function getSearchMood(id) {
    if (id == "search_btn_title") {
        searchMood = "title";
        search.placeholder = "search By title";
    } else {
        searchMood = 'category';
        search.placeholder = "search By category";
    }
    search.focus();
    search.value = "";
    showData()
}

function searchValue(value) {
    let table = '';
    if (searchMood == 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value)) {
                table += `
                        <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick = "updateData(${i})"  id="update">update</button></td>
                            <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
                        </tr>
                        `;
            }
        }
    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value)) {
                table += `
                        <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick = "updateData(${i})"  id="update">update</button></td>
                            <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
                        </tr>
                        `;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}