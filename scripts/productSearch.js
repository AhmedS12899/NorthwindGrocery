"use strict";

window.onload = () => {
    let pSearchDrop = document.getElementById('pSearchDrop');
    let catSelect = document.getElementById('catSelect');
    let table = document.getElementById('table');
    let url = 'http://localhost:8081/api/';

    catSelect.style.display = 'none';
    pSearchDrop.onchange = () => {
        catSelect.style.display = 'none';
        table.innerHTML = '';
        if (pSearchDrop.value == 'cat') {
            catSelect.length = 0;
            createCatDrop(url, pSearchDrop.value, catSelect);
            catSelect.style.display = 'inline-block';
        }
        else if (pSearchDrop.value == 'viewAll') {
            fetchData(url, 'viewAll').then(p => {
                viewAllTable(p, catSelect.value);
            })
        }
    }

    catSelect.onchange = () => {
        fetchData(url, 'viewAll').then(p => {
            categoryTable(p, catSelect.value)
        })
    }
}

function fetchData(url, type) {
    let endpoint = '';
    if (type == 'cat') {
        endpoint = 'categories';
    }
    else if (type == 'viewAll') {
        endpoint = 'products';
    }

    return fetch(`${url}${endpoint}`)
        .then(res => res.json())
        .then(data => {
            if (endpoint == 'products'){
                data.sort((a, b) => {
                    let fa = a.productName.toLowerCase(),
                        fb = b.productName.toLowerCase();

                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;

                });
                return data;
            }
            return data;
        })
}
function createCatDrop(url, type, select) {
    fetchData(url, type).then(d => {
        for (let c of d) {
            select.innerHTML += `
            <option value=${c.categoryId}>${c.name}</option>
            `
        }
    })
}
function categoryTable(p, selected) {
    let catTable = document.getElementById('table');
    catTable.innerHTML = `
    <tr>
        <th>categoryId</th>
        <th>productId</th>
        <th>productName</th>
        <th>unitPrice</th>
    </tr>
    `

    for (let g of p) {
        if (g.categoryId == selected) {
            catTable.innerHTML += `
    <tr>
        <th>${g.categoryId}</th>
        <th>${g.productId}</th>
        <th><a href='file:///C:/Users/flash/YearUp/desktop/YearUp%20Software/Pluralsight/LearnToCode/Workshops/NorthWind/NorthwindGrocery/${g.productId}'>${g.productName}</a></th>
        <th>${Number(g.unitPrice).toFixed(2)}</th>
    </tr>
        `
        }
    }
}
function viewAllTable(p, selected) {
    let catTable = document.getElementById('table');
    catTable.innerHTML = `
    <tr>
        <th>categoryId</th>
        <th>productId</th>
        <th>productName</th>
        <th>unitPrice</th>
    </tr>
    `

    for (let g of p) {
        catTable.innerHTML += `
    <tr>
        <th>${g.categoryId}</th>
        <th>${g.productId}</th>
        <th><a href='file:///C:/Users/flash/YearUp/desktop/YearUp%20Software/Pluralsight/LearnToCode/Workshops/NorthWind/NorthwindGrocery/${g.productId}'>${g.productName}</a></th>
        <th>${Number(g.unitPrice).toFixed(2)}</th>
    </tr>
        `
    }
}
