
document.querySelector(".control-buttons span").onclick=function(){
   let user_name=prompt("Whats our name??");
   if(user_name==""||user_name==null)
   {
    document.querySelector(".info-container .name").innerHTML="Unknown";
   }
   else
   {
    document.querySelector(".info-container .name").innerHTML=`Hello: ${user_name}`;
   }
   document.querySelector(".control-buttons").remove();
}

 

let duration=1000;
let blocksContainer=document.querySelector(".memory-game-blocks");
let blocks=Array.from(blocksContainer.children);
// let range=[...Array(blocks.length).keys()];
let range=Array.from(Array(blocks.length).keys()); 

Random(range);

blocks.forEach(function(block,index){
   block.style.order=range[index];
   block.addEventListener("click",function(){
    flipBlock(block);
   })
})

// to get random numbers
function Random(array)
{
   let current=array.length,temp,random;
   while(current>0)
   {
     random=Math.floor(Math.random() * current);
     current--;

    //swapping
    temp=array[current];
    array[current]=array[random];
    array[random]=temp;
   }
}

function flipBlock(selectedElement)
{
    selectedElement.classList.add("is-flipped");
    let allflippedBlocks=blocks.filter(function(flipBlock){
       return flipBlock.classList.contains("is-flipped");
    })
    if(allflippedBlocks.length===2)
    {
        //stop clicking function using pointer event 
        stopClicking();
       //check matched blocks
       checkmatchedBlocks(allflippedBlocks[0],allflippedBlocks[1]); 
    }
}
function stopClicking()
{
    // add class no cliking on main container 
    document.querySelector(".memory-game-blocks").classList.add("no-clicking");

    setInterval(()=>{
    
        //remove is-flipped class
        document.querySelector(".memory-game-blocks").classList.remove("no-clicking");

    },duration);

    
}
function checkmatchedBlocks(block1,block2)
{
    let tries=document.querySelector(".info-container .tries span");
   if(block1.dataset.technology===block2.dataset.technology)
   {
     block1.classList.remove("is-flipped");
     block2.classList.remove("is-flipped");
     block1.classList.add("has-match");
     block2.classList.add("has-match");
   }
   else
   {
    tries.innerHTML=+tries.innerHTML+1;
    setTimeout(()=>{
      block1.classList.remove("is-flipped");
      block2.classList.remove("is-flipped");
    },duration);
    
   }
}