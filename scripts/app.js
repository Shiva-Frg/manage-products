let products = checkData()
const searchItems = {
    title: '', 
    exist: false,
    sortBy: 'byEdit'
}

renderProducts(products, searchItems)

document.querySelector('#search-products').addEventListener('input', (e) => {
    searchItems.title = e.target.value
    renderProducts(products, searchItems)
})

document.querySelector('#add-product-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const createId = uuidv4()
    const timeStamp = moment().valueOf()
    products.push({
        id: createId,
        title: e.target.elements.productTitle.value,
        price: e.target.elements.productPrice.value,
        exist: true,
        created: timeStamp,
        updated: timeStamp
    })

    saveProduct(products)

    renderProducts(products, searchItems)
    e.target.elements.productTitle.value = ''
    e.target.elements.productPrice.value = ''
})

document.querySelector('#available-products').addEventListener('change', (e) => {
    searchItems.exist = e.target.checked
    renderProducts(products, searchItems)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'products') {
        products = JSON.parse(e.newValue)
        renderProducts(products, searchItems)
    }
})

document.querySelector('#sort').addEventListener('change', (e) => {
    searchItems.sortBy = e.target.value
    renderProducts(products, searchItems)
})