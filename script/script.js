// реализовать процесс, который при отправке формы выводит данные нового продукта 
// в консоль
const formNode = document.querySelector("#add_product");
let products = [];

formNode.addEventListener("submit", event => {
    event.preventDefault();
    const title = event.target.title.value;
    const price = +event.target.price.value;
    const count = +event.target.count.value;
    
    const product = {title, price, count};
        
    products.push(product);
    rerender();
    event.target.reset();
    
})

const product = {
    title: "bike",
    price: 2300,
    count: 12
};

function createProductCart(title, price, count){
    const container = document.createElement("div");
    const titleNode = document.createElement("p");
    const priceNode = document.createElement("p");
    const countNode = document.createElement("p");
    const deleteNode = document.createElement("button");
    const countPlusNode = document.createElement("button");
    const countMinusNode = document.createElement("button");
    container.classList.add("product_cart");
    container.style.borderColor = count === 0? "#c0392b" : "#6ab04c";
    titleNode.innerText = title;
    priceNode.innerText = price;
    countNode.innerText = count;
    // countNode.innerText = count === 0? "Товар закончился" : count;
    deleteNode.innerText = "Delete";
    deleteNode.id = "deleteBtn";
    countPlusNode.innerText = "+";
    countMinusNode.innerText = "-";
    
    deleteNode.addEventListener("click", () => remove(title));
    countPlusNode.addEventListener("click", () => {
        count++;
        countNode.innerText = count;
        container.style.borderColor = count === 0? "#c0392b" : "#6ab04c";
    });
    countMinusNode.addEventListener("click", () => {
        if(count > 0){
        count--;
        countNode.innerText = count;
        container.style.borderColor = count === 0? "#c0392b" : "#6ab04c";
        }
    });
    container.append(titleNode, priceNode,  countNode, countPlusNode, countMinusNode, deleteNode);
    return container;
}

function rerender(){
    const productsNode = document.querySelector(".products");
    productsNode.innerText = '';
    if(products.length === 0){
        const noProducts = document.createElement("p");
        noProducts.innerText = "Товаров нет";
        productsNode.style.color = "#c0392b";
        productsNode.style.fontSize = "24px";
        productsNode.append(noProducts);
    }else{
        products.forEach(({title, price, count}) => productsNode.append(createProductCart(title, price, count)));
    }
}

function remove(title){
    const newProductsArray = products.filter(product => product.title !== title);
    products = newProductsArray;
    rerender();
}