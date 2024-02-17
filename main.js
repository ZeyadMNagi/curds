let price = document.getElementById('price');
let title = document.getElementById('title');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;


//get total
function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) 
        -+discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else{
        total.innerHTML = '';
        total.style.background = 'rgb(168, 8, 8)';
    }
}
// create product

if(localStorage.product != null){
    data = JSON.parse(localStorage.product)
}
else{
    data = [] ;
}





submit.onclick = function(){
    let newdata = {
        title : title.value,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value
    }

if(mood === 'create'){

    if(newdata.count>1){
        for(let i=0 ;   i <newdata.count ; i++){
            data.push(newdata);
        }
    }else{
        data.push(newdata);
    }


}else{
    data[ tmp ] = newdata;
    mood = 'create';
    count.style.display = 'block';
    submit.innerHTML = 'create' ; 
}

    



    localStorage.setItem('product' , JSON.stringify(data))
    cleardata()
    showdata()
}

// save in local storge
// clear input

function cleardata(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    discount.value = '';
    ads.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//read



function showdata(){
    let table = '';
    for(let i = 0; i <data.length ; i++){
        table +=`
        <tr>
        <td>${i}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].category}</td>
        <td><button onclick = "updatedata(${i})" id="update">update</button></td>
        <td><button id="delete" onclick ="deletedata(${i})">delete</button>
        </td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table
    let deletebtn = document.getElementById('deleteall')
    if(data.length >0){
        deletebtn.innerHTML = `
        <button onclick =deleteall() >delete all (${data.length})</button>
        `
    }
    else{
        deletebtn.innerHTML = ``
    }


}
showdata()











//count



// delete

function deletedata(i){
    data.splice(i,1)
    localStorage.product = JSON.stringify(data)
    showdata()
}
function deleteall(){
    localStorage.clear()
    data.splice(0)
    showdata()
}

// update

    function updatedata(i){
       title.value = data[i].title;
       price.value = data[i].price;
       taxes.value = data[i].taxes;
       ads.value = data[i].ads;
       discount.value = data[i].discount;
       category.value = data[i].category;
       getTotal()
       count.style.display = 'none';
       submit.innerHTML = 'update';
       mood = 'update'
       tmp = i ;
       scroll({
        top : 0 ,
        behavior : 'smooth'
       })
    }

// search


    let searchmood = 'title';

    function getsearchmood(id){
        let search = document.getElementById('search');
        if(id == 'searchtitle'){
            searchmood = 'title';
            search.placeholder = 'search by title';
        }else{
            searchmood = 'category';
            search.placeholder = 'search by category';
        }
    search.focus()
    
    }

    


// clean data