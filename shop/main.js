let email_login = document.getElementById('email_login')
let password_login = document.getElementById('password_login')
let password_sgin = document.getElementById('password_sgin')
let email_sgin = document.getElementById('email_sgin')
let btncreat = document.getElementById('btncreat')
let btn = document.getElementById('btn')
let sgin = document.getElementById('sgin')
let login = document.getElementById('login')
let btnlogin = document.getElementById('btnlogin')
let btnsgin = document.getElementById('btnsgin')
let body = document.querySelector('body')
let moodlogin = "login"
// !  crud
let crud = document.getElementById('crud')
let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let category = document.getElementById('category')
let count = document.getElementById('count')
let total = document.getElementById('total')
let creat = document.getElementById('creat')
let continer = document.getElementById('continer')
let mood = 'creat'
let tmb;


let datapro_login = [];
if(localStorage.login != null)
{
    datapro_login = JSON.parse(localStorage.login)
}else{
    datapro_login = [];
}

if(moodlogin === "login")
{
    sgin.style.display = 'none'
    crud.style.display = 'none'
}else{
    login.style.display = 'none'
    crud.style.display = 'none'

}
btnlogin.onclick = function()
{
    moodlogin = 'login'
    sgin.style.display = 'none'
    login.style.display = 'block'
    crud.style.display = 'none'
}
btnsgin.onclick = function()
{
    moodlogin = "sgin"
    login.style.display = 'none'
    sgin.style.display = 'block'
    crud.style.display = 'none'
}
function cleardataloginpage()
{
    email_login.value = '';
    email_sgin.value = '';
    password_login.value = '';
    password_sgin.value = '';
}
btncreat.onclick = function()
{
    let newpro_login = {
        password:password_sgin.value,
        email:email_sgin.value,
    }
    datapro_login.push(newpro_login)
    localStorage.setItem('login' , JSON.stringify(datapro_login))
    cleardataloginpage()
    console.log(datapro_login)
}
btn.onclick = function()
{
    for(let i =0 ; i<datapro_login.length ; i++ )
    {
        if(datapro_login[i].email == email_login.value && datapro_login[i].password == password_login.value)
        {
            login.style.display = 'none'
            sgin.style.display = 'none'
            sgin.style.display = 'none'
            btnlogin.style.display = 'none'
            btnsgin.style.display = 'none'
            body.style.background = '#222'
            crud.style.display = 'block'
        }
    }
    cleardataloginpage()
}







function getTotal()
{
    if(price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value ) 
        - discount.value
        total.innerHTML = result
        total.style.background = ('green')
    }else{
        total.style.background = ('#990000')
        total.innerHTML = ('')
    }
}
let dataPro = []; // قم بتعيينه بشكل افتراضي كمصفوفة فارغة
if(localStorage.product != null ){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}
creat.onclick = function(){
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        category:category.value.toLowerCase(),
        count:count.value,
        total:total.innerHTML,
    }
    if(newpro.title != '' 
    && newpro.price != ''
    && newpro.category !='' 
    && newpro.count <101){
        if(mood === 'creat')
        {
            if(newpro.count > 1)
            {
                for(let i = 0 ; i < newpro.count ; i++)
                {
                    dataPro.push(newpro);
                }
            }else{
                dataPro.push(newpro);
            }
        }else{
            dataPro[tmb] = newpro
            count.style.display = ('block')
            creat.innerHTML = ('creat')
        }
        clearData()
    }
    localStorage.setItem('product' , JSON.stringify(dataPro))
    showdata()
}
function clearData(){
    title.value = '';
    price.value= '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    category.value = '';
    count.value = '';
    total.innerHTML = '';
}
function showdata()
{
    getTotal()
    let table = '';
    for(let i = 0 ; i < dataPro.length ; i++)
    {
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
            <td><button onclick="updateDate(${i})">update</button></td>
            <td><button onclick="deletedata(${i})">delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let deletebtn = document.getElementById('deleteAll')
    if(dataPro.length > 0)
    {
        deletebtn.innerHTML = `
        <button onclick="deleteAll()">delete All(${dataPro.length})</button>
        `
    }else{
        deletebtn.innerHTML = '';
    }
}
showdata()
function deletedata(i)
{
    dataPro.splice(i , 1)
    localStorage.product = JSON.stringify(dataPro)
    showdata()
}
function deleteAll()
{
    localStorage.clear()
    dataPro.splice(0)
    showdata()
}
function updateDate(i)
{
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    category.value = dataPro[i].category
    getTotal()
    creat.innerHTML = ('update')
    count.style.display = ('none')
    tmb = i;
    mood = 'update'
    scroll ({
        top:0 , behavior:"smooth"
    })
}
let searchmood = ('title')
function searchdata(id)
{
    let search = document.getElementById('search')
    if(id == 'search_title'){
        searchmood = ('title')
        search.focus()
        search.placeholder = 'Search By Title'
    }else{
        searchmood = ('category')
        search.focus()
        search.placeholder = 'Search By Category'
    }
    search.value = '';
    showdata()
}
function searchData(value)
{
    let table = '';
    if(searchmood == 'title'){
        for(let i = 0 ; i < dataPro.length ; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
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
                    <td><button onclick="updateDate(${i})">update</button></td>
                    <td><button onclick="deletedata(${i})">delete</button></td>
                    </tr>
                `
            }
        }
    }else{
        for(let i = 0 ; i < dataPro.length ; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
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
                    <td><button onclick="updateDate(${i})">update</button></td>
                    <td><button onclick="deletedata(${i})">delete</button></td>
                    </tr>
                `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}



