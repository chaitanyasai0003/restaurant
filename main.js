class MenuItem {
    constructor(id, name, category, price) {
        this.id = id
        this.name = name
        this.category = category
        this.price = price
    }
}
function createMenuItem(id, name, category, rate) {
    let menuItem = document.createElement('div')
    menuItem.setAttribute('draggable', 'true')
    menuItem.setAttribute('id', id)
    let menuName = document.createElement('h2')
    menuName.innerText = name
    menuItem.appendChild(menuName)
    let container = document.createElement('div')
    let price = document.createElement('span')
    price.innerText = "Price : " + rate
    container.appendChild(price)
    let cat = document.createElement('span')
    cat.setAttribute('name', 'category')
    cat.innerText = 'Category : ' + category
    container.appendChild(cat)
    menuItem.appendChild(container)
    menuItem.setAttribute('class', 'menuItem')
    return menuItem
}

function populateMenuSection(container, list) {
    for(let m of list) {
        container.appendChild(createMenuItem(m.id, m.name, m.category, m.price))
    }
}

let menuList = new Map()

menuList.set('menu-1', new MenuItem('menu-1', 'pulka', 'Breads', 40))
menuList.set('menu-2', new MenuItem('menu-2', 'Tangidi Biryani', 'main course', 40))
menuList.set('menu-3', new MenuItem('menu-3', 'Orange Juice', 'Beverages', 60))
menuList.set('menu-4', new MenuItem('menu-4', 'Pineapple Juice',  'Beverages', 60))
menuList.set('menu-5', new MenuItem('menu-5', 'Gulab Jamun', 'Dessert', 90))
menuList.set('menu-6', new MenuItem('menu-6', 'Apricot Delight', 'Dessert', 90))
menuList.set('menu-7', new MenuItem('menu-7', 'Monster', 'Beverages', 110))
menuList.set('menu-8', new MenuItem('menu-8', 'Veg fried rice', 'chineese', 170))
menuList.set('menu-9', new MenuItem('menu-9', 'Aloo masala', 'main course', 190))
menuList.set('menu-10', new MenuItem('menu-10', 'Gobi 65', 'staters', 200))

let menuContainer = document.querySelector('#menu')
populateMenuSection(menuContainer, menuList.values())


class Table {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.nItems = 0
        this.itemsList = new Map()
        this.bill = 0
    }
}

let tableList = new Map()
tableList.set('table-1', new Table('table-1', 'Table-1'))
tableList.set('table-2', new Table('table-2', 'Table-2'))
tableList.set('table-3', new Table('table-3', 'Table-3'))
tableList.set('table-4', new Table('table-4', 'Table-4'))
tableList.set('table-5', new Table('table-5', 'Table-5'))
tableList.set('table-6', new Table('table-6', 'Table-6'))
tableList.set('table-7', new Table('table-7', 'Table-7'))
tableList.set('table-8', new Table('table-8', 'Table-8'))
tableList.set('table-9', new Table('table-9', 'Table-9'))
tableList.set('table-10', new Table('table-10', 'Table-10'))
tableList.set('table-11', new Table('table-11', 'Table-11'))
tableList.set('table-12', new Table('table-12', 'Table-12'))

function createTable(id, name, items, bill) {
    let table = document.createElement('div')
    table.classList.add('table')
    table.setAttribute('id', id)
    let tableNum = document.createElement('h2')
    tableNum.innerText = name
    table.appendChild(tableNum)
    let container = document.createElement('div')
    let numItems = document.createElement('span')
    numItems.innerText = 'No. Items : ' + items
    container.appendChild(numItems)
    let totalBill = document.createElement('span')
    totalBill.innerText = "Total : " + bill
    container.appendChild(totalBill)
    table.appendChild(container)
    return table
}

function populateTableSection(container, list) {
    for(let t of list) {
        container.appendChild(createTable(t.id, t.name, t.nItems, t.bill))
    }
}
let tablesContainer = document.querySelector('#tables')
populateTableSection(tablesContainer, tableList.values())


function search(items, value) {
    for(let item of items) {
        if(item?.firstChild.innerText.toLowerCase().includes(value) 
            || item?.querySelector("span[name='category']")?.innerText.toLowerCase().includes(value)) {
                item.classList.remove('hidden')
        }
        else {
            item.classList.add('hidden')
        }
    }
}

function removeHidden(children) {
    for(let child of children) {
        child.classList.remove('hidden')
    }
}


function filterSection(value, container) {
    if(value !== "") {
        search(container.children, value)
    } 
    else {
        removeHidden(container.children)
    }
}

document.querySelector('#searchTable').onkeyup = (e) => {
    let value = e.target.value.trim().toLowerCase()
    filterSection(value, tablesContainer)
}

document.querySelector('#searchMenu').onkeyup = (e) => {
    let value = e.target.value.trim().toLowerCase()
    filterSection(value, menuContainer)
}

let draggedMenuId

let allMenuItems = document.querySelectorAll('.menuItem')
allMenuItems.forEach((m) => {
    m.addEventListener('dragstart', (e) => {
        draggedMenuId = e.target.id
    })
})

let allTables = document.querySelectorAll('.table')
allTables.forEach((t) => {
    t.ondragover = e => e.preventDefault()

    t.ondrop = e => {
        e.preventDefault()
        
        let table = tableList.get(e.currentTarget.id)
        let itemCount = table.itemsList.get(draggedMenuId) ?? 0
        table.itemsList.set(draggedMenuId, itemCount + 1)
        table.nItems += 1
        table.bill += menuList.get(draggedMenuId).price
        
        let tb = e.currentTarget
        tb.lastChild.firstChild.innerText = "No of Items : " + table.nItems
        tb.lastChild.lastChild.innerText= "Total : " + table.bill
    }
})
// pop up Box


let modal = document.querySelector('.modal')
let overlay = document.querySelector('.overlay')
let closeBtn = document.querySelector('.btn-close')
let closeSessionBtn = document.querySelector('#close-session')
let bill, currTable, total, tableName;


function removeItems(container) {
    while(container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

let closeModal = async () => {
    removeItems(bill)
    let tb = tablesContainer.querySelector(`#${currTable.id}`)    
    tb.lastChild.firstChild.textContent = "No. Items : " + currTable.nItems
    tb.lastChild.lastChild.textContent = "Total : " + currTable.bill
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

let openModal = async () => {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

let deleteItem = (item) => {
    currTable.itemsList.delete(item)
}

let closeSession = () => {
    currTable.nItems = 0
    currTable.itemsList.clear()
    currTable.bill = 0
    closeModal()
}

let alterItem = async (item, value) => {
    if(!value) {
        value = 0
    }
    let prev = currTable.itemsList.get(item.id)
    currTable.bill += (value - prev) * item.price
    currTable.nItems += value - prev
    currTable.itemsList.set(item.id, value)
}

let updateTotal = () => {
    total.textContent = 'Total : ' + currTable.bill
}

function createBill(id, qty) {
    let item = menuList.get(id)
    let row = document.createElement('tr')
    let itemtd = document.createElement('td')
    itemtd.textContent = item.name
    row.appendChild(itemtd)
    let pricetd = document.createElement('td')
    pricetd.textContent = item.price
    row.appendChild(pricetd)
    let quantitytd = document.createElement('td')
    let qtyinput = document.createElement('input')
    qtyinput.setAttribute('min', '1')
    qtyinput.onchange = async (e) => {
        await alterItem(item, parseInt(e.currentTarget.value))
        updateTotal()
    }
    qtyinput.setAttribute('type', 'number')
    qtyinput.value = qty
    quantitytd.appendChild(qtyinput)
    row.appendChild(quantitytd)
    let del = document.createElement('td')
    qtyinput.setAttribute('class', 'qbox');
    let deleteIcon = document.createElement('i')
    deleteIcon.setAttribute('class', 'fa fa-trash delete')
    deleteIcon.onclick = (e) => {
        currTable.bill -= currTable.itemsList.get(item.id) * item.price
        currTable.nItems -= currTable.itemsList.get(item.id)
        updateTotal()
        deleteItem(item.id)
        bill.removeChild(row)
    }
    del.appendChild(deleteIcon)
    row.appendChild(del)
    return row
}

function displayItems() {
    for(let [key,val] of currTable.itemsList) {
        bill.appendChild(createBill(key, val))
    }
}

closeBtn.onclick = closeModal
overlay.onclick = closeModal
closeSessionBtn.onclick = closeSession

for(let t of allTables) {
    t.addEventListener('click', async (e) => {
        e.stopPropagation()
        if(e.currentTarget.id.startsWith('table')) {
            await openModal()
            currTable = tableList.get(e.currentTarget.id)
            tableName = document.querySelector('.table-name')
            bill = document.querySelector('.bill')
            total = document.querySelector('#total')
            tableName.firstChild.textContent = `${currTable.name} | Order Details`
            updateTotal()
            displayItems()
        }
    })
}
