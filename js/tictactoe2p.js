var canvas=document.getElementById("myCanvas");
var message=document.getElementById("message");
var ctx=canvas.getContext("2d");
var cellSize=100;
var map=[0,0,0,
         0,0,0,
        0,0,0];
var winPatterns=[0b111000000,0b000111000,0b000000111,//rows
                 0b100100100,0b010010010,0b001001001,//columns
                 0b100010001,0b001010100,
];
var gameOver=false;
var BLANK=0,X=1,O=-1;
var mouse={
    x:-1,
    y:-1,
};
var currentPlayer=X;

canvas.width=canvas.height=cellSize*3;
function getCellByCoords(x,y){
    return (Math.floor(x/cellSize)%3+Math.floor(y/cellSize)*3);

}
window.onload=
canvas.addEventListener('mousemove',function(event){
    var x=event.clientX-canvas.offsetLeft,
    y=event.clientY-canvas.offsetTop;
    mouse.x=x;
    mouse.y=y;
   document.getElementById("status").innerHTML=x+"|"+y;
   // console.log(x, y);
    //console.log(getCellByCoords(x,y));
    function getCellByCoords(x,y){
        return (Math.floor(x/cellSize)%3+Math.floor(y/cellSize)*3);
    
    }
});
canvas.addEventListener('mouseout',function(event){
    mouse.x=-1;mouse.y=-1;
});
canvas.addEventListener('click',function(event){
    
    play(getCellByCoords(mouse.x,mouse.y));
    //playComp();
    
});


displayTurn();
function displayTurn(){
    message.textContent=((currentPlayer==X)?"X":"O")+"\'s Turn";
}
function play(cell){
    if(gameOver)return;
    if(map[cell]!=BLANK){
        message.textContent="Position Taken";
        return;
    }
    map[cell]=currentPlayer;
    var win=checkWin(currentPlayer);
    if(win!=0)
    {
    gameOver=true;
    message.textContent=((currentPlayer==X)?"X":"O")+"wins";
    return;
    }
    else if(map.indexOf(BLANK)==-1)
    {
        gameOver=true;
        message.textContent="Tie";
        return;
    }
    currentPlayer*=-1;
    displayTurn();
    //console.log("success");
}
function checkWin(player){
    var currentBitMask=0;
    for(var i=0;i<map.length;i++)
    {
        currentBitMask<<=1;
        if(map[i]==player)
        {
            currentBitMask+=1;
        }
        
    }
    //console.log(currentBitMask);
    for(var i=0;i<winPatterns.length;i++)
    {
        if((currentBitMask & winPatterns[i])== winPatterns[i])
        {
            return winPatterns[i];
        }
         
    }
    return 0;
}
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBoard();
    fillBoard();
    function drawBoard(){
        ctx.strokeStyle='white';
        ctx.lineWidth=10;
        ctx.beginPath();
        ctx.moveTo(cellSize,0);
        ctx.lineTo(cellSize,canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cellSize*2,0);
        ctx.lineTo(cellSize*2,canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0,cellSize);
        ctx.lineTo(canvas.width,cellSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0,cellSize*2);
        ctx.lineTo(canvas.width,cellSize*2);
        ctx.stroke();
    }
    function fillBoard(){
        for(var i=0;i<map.length;i++)
        {
            var Coords=getCoords(i);
            ctx.save();
            ctx.translate(Coords.x+cellSize/2,Coords.y+cellSize/2);
            if(map[i]==X)
            {
            drawX();
            }
            if(map[i]==O)
            {
            drawO();
            }
            ctx.restore();
        }
    function drawX(){
       
        ctx.beginPath();
        ctx.moveTo(-cellSize/3,-cellSize/3);
        ctx.lineTo(cellSize/3,cellSize/3);
        ctx.moveTo(cellSize/3,-cellSize/3);
        ctx.lineTo(-cellSize/3,cellSize/3);
        ctx.stroke();
    }
    function drawO(){
        ctx.beginPath();
        ctx.arc(0,0,cellSize/3,0,2*Math.PI);
        ctx.stroke();
    }
    requestAnimationFrame(draw);
}
    function getCoords(cell){
        var x=(cell%3)*cellSize;
        var y=Math.floor(cell/3)*cellSize;
        return{
            'x':x,
            'y':y
        };
    }
      
    
}
draw();