const checkData = () => {
    let parseJson = localStorage.getItem('products')
    try {
        return parseJson !== null ? JSON.parse(parseJson) : []
    } catch (error) {
        return []
    }
}

const saveProduct = (products) => {
    localStorage.setItem('products', JSON.stringify(products))
}

const removeProduct = (id) => {
    const indexProduct = products.findIndex(item => item.id === id)
    if (indexProduct > -1) {
        products.splice(indexProduct, 1)
    }
}

const toggleExist = (id) => {
    const productIndex = products.find(item => item.id === id)
    if (productIndex !== undefined) {
        productIndex.exist = !productIndex.exist
    }
}

const sortProducts = (products, sortBy) => {
    if (sortBy === 'byEdit') {
        products.sort((a, b) => {
            if (a.updated > b.updated) {
                return -1
            } else if (a.updated < b.updated) {
                return 1
            } else{
                return 0
            }
        })
    } else if (sortBy === 'byCreate') {
        products.sort((a, b) => {
            if (a.created > b.created) {
                return -1
            } else if (a.created < b.created) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return products
    }
}

const renderProducts = (products, searchTitle) => {
    product = sortProducts(products, searchItems.sortBy)
    let filtering = products.filter((item) => {
        return item.title.toLowerCase().includes(searchTitle.title.toLowerCase())
    })

    filtering = filtering.filter((item) => {
        if (searchTitle.exist) {
            return item.exist
        }
        else{
            return true
        }
    })

    document.querySelector('#products').innerHTML = ''

    filtering.forEach((item) => {
        document.querySelector('#products').appendChild(productDiv(item))
    })
}

const productDiv = (product) => {
    product.created = moment().valueOf()
    const productEl = document.createElement('div')
    const productCheck = document.createElement('input')
    const productName = document.createElement('a')
    const productPrice = document.createElement('p')
    const deleteButton = document.createElement('button')

    productCheck.setAttribute('type', 'checkbox')
    productCheck.checked = !product.exist
    productEl.appendChild(productCheck)
    productCheck.addEventListener('change', () => {
        toggleExist(product.id)
        saveProduct(products)
        renderProducts(products, searchItems)
    })

    productName.textContent = product.title
    productName.setAttribute('href', `./edit-product.html#${product.id}`)
    productEl.appendChild(productName)

    productPrice.textContent = product.price
    productEl.appendChild(productPrice)

    deleteButton.textContent = 'حذف'
    productEl.appendChild(deleteButton)
    deleteButton.addEventListener('click', () => {
        removeProduct(product.id)
        saveProduct(products)
        renderProducts(products, searchItems)
    })

    return productEl
}

const lastEditMessage = (timeStamp) => {
    return `آخرین ویرایش : ${moment(timeStamp).locale('fa').fromNow()}`
}