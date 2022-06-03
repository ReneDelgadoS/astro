const getForm={
    in_filter:document.getElementById('in_filter'),
    in_newest:document.getElementById('in_newest'),
    in_oldest:document.getElementById('in_oldest'),
    in_search:document.getElementById('in_search'),
    url:"http://35.185.252.75:3000/pictures",
}
getForm.data= ()=>{
    let out ={count:25}
    if(getForm.in_filter.value!="")out.filter=getForm.in_filter.value
    if(getForm.in_newest.value.length!=0)out.newest_date=getForm.in_newest.value
    if(getForm.in_oldest.value.length!=0)out.oldest_date=getForm.in_oldest.value
    return out
}
const dom_menu = document.getElementById('menu')
const dom_entry = {
    e_img:document.getElementById('e_img'),
    e_tittle:document.getElementById('e_tittle'),
    e_explanation:document.getElementById('e_explanation'),
    e_date:document.getElementById('e_date')
}
const dom_content_notice = document.getElementById('content_notice')


let loadedpages = []
let maxloadedpages = 5
let activepage = 0

async function search(){
    dom_menu.innerHTML=''
    dom_content_notice.style.display = "none";
    let queryParams={}
    loadedpages = [0,1,2,3,4]
    activepage = 0
    queryParams=getForm.data()
    let url =  new URL(getForm.url)
    for(let k in queryParams){
        url.searchParams.append(k,queryParams[k])
    }
    for(i of loadedpages){
        getpage(url,i).then(data=>{
            loadpage(data,i?0:1)
        })
    }
}
function changepage(){

}
async function getpage(ourl,pagei){
    let url = ourl
    url.searchParams.append('offset',1+pagei*25)
    let req =new Request(url,{
        method: 'GET',
        headers: new Headers(),
        mode: 'cors',
        cache: 'default',
        

    })
    let res = await fetch(req)
    let  data = await res.json()
    return data
}
function loadpage(data,active){
    let div_page = document.createElement('div')
    div_page.className='menupage'+active?' active':""
    for(entry of data.entries){
        let div_entry = document.createElement('img')
        div_entry.src = entry['url']
        div_entry.className='menuop'
        div_entry.addEventListener('click',
            (event)=>{
                dom_entry.e_date.innerHTML=entry['additiondate']
                dom_entry.e_explanation.innerHTML=entry['explanation']
                dom_entry.e_img.src = entry['hdurl']
                dom_entry.e_tittle.innerHTML=entry['title']
            }
        )
        div_page.appendChild(div_entry)
    }
    dom_menu.appendChild(div_page)
}

getForm.in_search.addEventListener('click',search)