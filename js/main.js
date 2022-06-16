var ProductName=document.getElementById('ProductName');
var ProductPrice=document.getElementById('ProductPrice');
var ProductCtegory=document.getElementById('ProductCtegory')
var ProductDesc=document.getElementById('ProductDesc');
var addBtn=document.getElementById('addBtn');
nameAlert=document.getElementById('nameAlert');
priceAlert = document.getElementById('priceAlert')
var currentIndex=0;
addBtn.onclick=function()
{
if(addBtn.innerHTML=="Add Product")
{
    addProduct();
}
else{
    updateProduct();
}
displayProduct();
resetForm();
}
var products=[];
if(JSON.parse(localStorage.getItem('productList'))!=null)
{
    products=JSON.parse(localStorage.getItem('productList'));
    displayProduct()
}
function addProduct()
{
    var product=
    {
        name:ProductName.value,
        price:ProductPrice.value,
        category:ProductCtegory.value,
        description:ProductDesc.value,
    }
    products.push(product);
    console.log(products)
    localStorage.setItem('productList',JSON.stringify(products))
}

function displayProduct()
{
    var cartona="";
    for(var i=0;i<products.length;i++)
    {
        cartona+=
        `
          <tr>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].description}</td>
            <td><button onclick=getProductInfo(${i}) class=" btn btn-outline-warning border-2">Update</button></td>
            <td><button onclick=deleteForm(${i}) class=" btn btn-outline-danger border-2">Delete</button></td>
          </tr>
        `
    }
    document.getElementById('tBody').innerHTML=cartona;
}
function resetForm()
{
    ProductName.value="";
    ProductPrice.value="";
    ProductCtegory.value="";
    ProductDesc.value="";
}
function deleteForm(index)
{
     products.splice(index,1);
     displayProduct();
     localStorage.setItem('productList',JSON.stringify(products));
}
function getProductInfo(index)
{
    currentIndex=index;
    var currentProduct=products[index];
    ProductName.value=currentProduct.name;
    ProductPrice.value=currentProduct.price;
    ProductCtegory.value=currentProduct.category;
    ProductDesc.value=currentProduct.description;
    addBtn.innerHTML="Update Product";

}
function searc(searchTxt)
{
    
    var cartona="";
    for(var i=0;i<products.length;i++)
    {
        if(products[i].name.toLowerCase().includes(searchTxt.toLowerCase()))
        {
            cartona+=
        `
          <tr>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].description}</td>
            <td><button onclick=getProductInfo(${i}) class=" btn btn-outline-warning border-2">Update</button></td>
            <td><button onclick=deleteForm(${i}) class=" btn btn-outline-danger border-2">Delete</button></td>
          </tr>
        `
        }
    }
    document.getElementById('tBody').innerHTML=cartona;
}
function updateProduct()
{
    var product=
    {
        name:ProductName.value,
        price:ProductPrice.value,
        category:ProductCtegory.value,
        description:ProductDesc.value,
    }
    products[currentIndex]=product;
    localStorage.setItem('productList',JSON.stringify(products));
     addBtn.innerHTML="Add Product";
}
ProductName.onkeyup= function()
{
    var nameRejex= /^[A-Z][a-z]{2,8}$/;
    if(nameRejex.test(ProductName.value))
    {
        addBtn.removeAttribute('disabled');
        ProductName.classList.add('is-valid');
        ProductName.classList.remove('is-invalid');
        nameAlert.classList.add('d-none')

    }
    else
    {
        addBtn.disabled='true';
        ProductName.classList.remove('is-valid')
        ProductName.classList.add('is-invalid');
        nameAlert.classList.remove('d-none')
    }
}
ProductPrice.onkeyup = function()
{
    var priceRejex= /^[0-9]{2,6}$/g;
    if(priceRejex.test(ProductPrice.value))
    {
        addBtn.removeAttribute('disabled');
        ProductPrice.classList.add('is-valid');
        ProductPrice.classList.remove('is-invalid');
        priceAlert.classList.add('d-none')

    }
    else
    {
        addBtn.disabled='true';
        ProductPrice.classList.remove('is-valid')
        ProductPrice.classList.add('is-invalid');
        priceAlert.classList.remove('d-none')
    }
}