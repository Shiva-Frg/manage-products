const productTitle = document.querySelector('#product-title')
const productPrice = document.querySelector('#product-price')
const remove = document.querySelector('#remove-product')
const dateElement = document.querySelector('#last-edit')

const productId = location.hash.substring(1)
let products = checkData()

let product = products.find(item => item.id === productId)

if (product === undefined) {
    location.assign('./index.html')
}

productTitle.value = product.title
productPrice.value = product.price
dateElement.textContent = lastEditMessage(product.updated)

productTitle.addEventListener('input', (e) => {
    product.title = e.target.value
    product.updated = moment().valueOf()
    dateElement.textContent = lastEditMessage(product.updated)
    saveProduct(products)
})

productPrice.addEventListener('input', (e) => {
    product.price = e.target.value
    product.updated = moment().valueOf()
    dateElement.textContent = lastEditMessage(product.updated)
    saveProduct(products)
})

remove.addEventListener('click', () => {
    removeProduct(product.id)
    saveProduct(products)
    location.assign('./index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'products') {
        products = JSON.parse(e.newValue)

        product = products.find((item) => {
            return item.id === productId
        })

        if (product === undefined) {
            location.assign('./index.html')
        }
        
        productTitle.value = product.title
        productPrice.value = product.price
        dateElement.textContent = lastEditMessage(product.updated)
    }
})