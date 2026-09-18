const shopUrl='https://paystack.shop/forfindersonly';
const drinks=[
{short:'Zoboquila',profile:'Hibiscus · pineapple · warm spice',copy:'Hibiscus tea with coconut water, pineapple, cinnamon, tequila, ginger liqueur and vanilla syrup. Tropical fruit meets floral tea and warming spice.',tea:'Hibiscus tea',spirit:'Tequila & ginger liqueur'},
{short:'Social Night',profile:'Green tea · kiwi · vanilla',copy:'Green tea, kiwi syrup, spiced rum, Sprite and vanilla syrup. A light, smooth blend with a tropical character.',tea:'Green tea',spirit:'Spiced rum'},
{short:'Yellow House',profile:'Mango · peach · black tea',copy:'Black tea, mango purée, mango juice, peach syrup and vodka. A juicy, fruit-led blend with a tropical finish.',tea:'Black tea',spirit:'Vodka'},
{short:'Old Boys',profile:'Rooibos · coffee · earthy spice',copy:'Rooibos tea with spiced rum, ehuru, uda, coffee liqueur and elderflower syrup. Earthy spice, smoky depth and delicate floral sweetness.',tea:'Rooibos tea',spirit:'Spiced rum & coffee liqueur'},
{short:'Lemon-cita',profile:'Lemon · green tea · citrus',copy:'Green tea, lemon juice, Sprite, gin and limoncello. Crisp citrus and a bright, refreshing finish.',tea:'Green tea',spirit:'Gin & limoncello'},
{short:'Senior Prefect',profile:'Orange · bourbon · almond',copy:'Black tea, bourbon whiskey, orange juice, orange apéritif, amaretto syrup and simple syrup. Rich citrus with a rounded, warming finish.',tea:'Black tea',spirit:'Bourbon whiskey & orange apéritif'}
];
const positions=[3.22,78.12,40.85,96.62,22.1,59.55];
const ingredients=[
 ['Hibiscus tea','Coconut water','Pineapple','Cinnamon','Tequila','Ginger liqueur','Vanilla syrup'],
 ['Green tea','Kiwi syrup','Spiced rum','Sprite','Vanilla syrup'],
 ['Black tea','Mango purée','Mango juice','Peach syrup','Vodka'],
 ['Rooibos tea','Spiced rum','Ehuru','Uda','Coffee liqueur','Elderflower syrup'],
 ['Green tea','Lemon juice','Sprite','Gin','Limoncello'],
 ['Black tea','Bourbon whiskey','Orange juice','Orange apéritif','Amaretto syrup','Simple syrup']
];
drinks.forEach(d=>{d.profile=d.profile.split(' · ').map(part=>part[0].toUpperCase()+part.slice(1)).join(' · ')});
const ingredientSection=document.createElement('section');
ingredientSection.className='ingredients';
ingredientSection.innerHTML='<h3>Ingredients</h3><ul id="detail-ingredients"></ul>';
document.querySelector('.facts').before(ingredientSection);
const iceLayer=document.createElement('div');
iceLayer.className='ice-scene';iceLayer.setAttribute('aria-hidden','true');
iceLayer.innerHTML=Array.from({length:4},(_,i)=>`<img class="ice ice-${i+1}" src="assets/ice.png" alt="" width="1024" height="1024">`).join('');
document.querySelector('.hero').prepend(iceLayer);
const cards=document.querySelector('#cards');
drinks.forEach((d,i)=>{
 const item=document.createElement('article');item.className='drink-item';
 const b=document.createElement('button');b.className='card';b.style.setProperty('--pos',positions[i]+'%');b.setAttribute('aria-label','View '+d.short+' details');
 b.innerHTML=`<div class="bottle" aria-hidden="true"></div><h3>${d.short}</h3><p>${d.profile}</p>`;b.addEventListener('click',()=>openDrink(i));
 const buy=document.createElement('a');buy.className='drink-shop';buy.href=shopUrl;buy.target='_blank';buy.rel='noopener noreferrer';buy.textContent='Shop now';buy.setAttribute('aria-label','Shop '+d.short+' on Paystack');
 item.append(b,buy);cards.append(item);
});
const dialog=document.querySelector('dialog');let current=0;
function openDrink(i){current=i;const d=drinks[i];document.querySelector('#detail-number').textContent='Spiked iced tea';document.querySelector('#detail-name').textContent=d.short;document.querySelector('#detail-copy').textContent=d.copy.split('. ').slice(1).join('. ');document.querySelector('#detail-ingredients').replaceChildren(...ingredients[i].map(name=>{const li=document.createElement('li');li.textContent=name;return li}));document.querySelector('#detail-profile').textContent=d.profile;document.querySelector('#detail-serve').textContent=d.tea+' · '+d.spirit;const art=document.querySelector('.dialog-art');art.style.setProperty('--pos',positions[i]+'%');art.setAttribute('aria-label',d.short+' square glass bottle');document.querySelector('#detail-shop').setAttribute('aria-label','Shop '+d.short+' on Paystack');if(!dialog.open)dialog.showModal();document.body.style.overflow='hidden'}
document.querySelector('.close').onclick=()=>dialog.close();dialog.addEventListener('close',()=>document.body.style.overflow='');dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});document.querySelector('.next-drink').onclick=()=>openDrink((current+1)%drinks.length);
document.querySelector('#year').textContent=new Date().getFullYear();

