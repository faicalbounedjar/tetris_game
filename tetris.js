function TETRISGAME(){
const cvs=document.getElementById('canvas')
const ctx=cvs.getContext("2d")
const Q=30
const row=20
const col=10
let GameOver=false;
const vacant="black"
const scoreElement = document.getElementById("score");


// ctx.fillStyle="blue"
// ctx.fillrect(X,Y,WIDTH,HEIGHT)
// var Q =20;
// ctx.fillStyle="blue"
// ctx.fillRect(2*Q,3*Q,Q,Q)


// --------------Draw Square-----------------


function DrawSquare(x,y,color){
    ctx.fillStyle=color
    ctx.fillRect(x*Q,y*Q,Q,Q)
    ctx.strokeStyle="black"
    ctx.strokeRect(x*Q,y*Q,Q,Q)
}


// ----------Creat Board ----------------



let Board=[]
for (let r = 0; r< row; r++) {
    Board[r]=[]
    for (let c = 0; c < col; c++) {
        Board[r][c]=vacant
    }
    
}




//--------------- draw board-----------------


function DrawBoard(){
    for (let r = 0; r< row; r++) {
        for (let c = 0; c < col; c++) {
            DrawSquare(c,r,Board[r][c])
        }  
    }
}

DrawBoard()




// --------------Z-----------------


const Z=[[
[1,1,0],
[0,1,1],
[0,0,0]
],
[
[0,0,1],
[0,1,1],
[0,1,0]
],[
[0,0,0],
[1,1,0],
[0,1,1]
],[
[0,1,0],
[1,1,0],
[1,0,0]
]]


// --------------S-----------------


const S=[[
    [0,1,1],
    [1,1,0],
    [0,0,0]
    ],
    [
    [0,1,0],
    [0,1,1],
    [0,0,1]
    ],[
    [0,0,0],
    [0,1,1],
    [1,1,0]
    ],[
    [1,0,0],
    [1,1,0],
    [0,1,0]
    ]]
    
    
// --------------J-----------------


const J=[[
    [0,1,0],
    [0,1,0],
    [1,1,0]
    ],
    [
    [1,0,0],
    [1,1,1],
    [0,0,0]
    ],[
    [0,1,1],
    [0,1,0],
    [0,1,0]
    ],[
    [0,0,0],
    [1,1,1],
    [0,0,1]
    ]]
    
    
// --------------L-----------------


const L=[[
    [0,1,0],
    [0,1,0],
    [0,1,1]
    ],
    [
    [0,0,0],
    [1,1,1],
    [1,0,0]
    ],[
    [1,1,0],
    [0,1,0],
    [0,1,0]
    ],[
    [0,0,1],
    [1,1,1],
    [0,0,0]
    ]]
    
    
// --------------T-----------------


const T=[[
    [0,0,0],
    [1,1,1],
    [0,1,0]
    ],
    [
    [0,1,0],
    [1,1,0],
    [0,1,0]
    ],[
    [0,1,0],
    [1,1,1],
    [0,0,0]
    ],[
    [0,1,0],
    [0,1,1],
    [0,1,0]
    ]]
    
    

// --------------I-----------------



const I=[[
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0]
    ],[
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]
    ],[
    [0,0,1,0],
    [0,0,1,0],
    [0,0,1,0],
    [0,0,1,0]
    ],[
    [0,0,0,0],
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0]
    ]

]


// --------------O-----------------



const O=[[
    [0,0,0,0],
    [0,1,1,0],
    [0,1,1,0],
    [0,0,0,0]
    ],[
    [0,0,0,0],
    [0,1,1,0],
    [0,1,1,0],
    [0,0,0,0]
    ],[
    [0,0,0,0],
    [0,1,1,0],
    [0,1,1,0],
    [0,0,0,0]
    ],[
    [0,0,0,0],
    [0,1,1,0],
    [0,1,1,0],
    [0,0,0,0]
    ]]




// -----------------Piece------------------





const pieces=[[Z,"blue"],[S,"purple"],[T,"indigo"],[O,"cyan"],[I,"yellow"],[L,"red"],[J,"orange"]    ]


// random piece

function randomPiece(){
    let randomN =Math.floor(Math.random()*pieces.length)
    return new Piece(pieces[randomN][0],pieces[randomN][1])
}

var p= randomPiece();


function Piece(Tetromino,color){
    this.Tetromino=Tetromino
    this.Tetrominonb=0
    this.activeTetromino=this.Tetromino[this.Tetrominonb]
    this.color=color
    // cordenee ta3 lbedya
    this.x=3
    this.y=-2
}

Piece.prototype.movedown=function()
{
    if(!this.coll(0,1,this.activeTetromino)) {
        this.undraw();
        
        this.y++;
        this.draw();
     } else {
        p.lock()
        p=randomPiece()}
    
}

Piece.prototype.fill = function(color){
    for( r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            // we draw only occupied squares
            if( this.activeTetromino[r][c]){
                drawSquare(this.x + c,this.y + r, color);
            }
        }
    }
}
function drp(){
         p.movedown();
         requestAnimationFrame(drp);
        
    }
Piece.prototype.moveleft=function()
{
    if (!this.coll(-1,0,this.activeTetromino)) {
        this.undraw()
        this.x--
        this.draw()
    } else {
        // 
    }
}
Piece.prototype.moveright=function()
{
    if (!this.coll(1,0,this.activeTetromino)) {
        this.undraw()
        this.x++
        this.draw()
    } else {
        // 
    }
}
Piece.prototype.rotate=function()
{
    let nextPattern=this.Tetromino[(this.Tetrominonb+1)%this.Tetromino.length];
    let kick=0;
    if(this.coll(0,0,nextPattern)){
        if(this.x<col/2){kick=1;}
        else{kick=-1;}
    }
    
    
    if(!this.coll(kick,0,nextPattern)){
        this.undraw();
        this.x += kick;
        this.Tetrominonb=(this.Tetrominonb+1)%this.Tetromino.length;
        this.activeTetromino=this.Tetromino[this.Tetrominonb]
        this.draw()    
    }
}

Piece.prototype.draw=function()
{
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c< this.activeTetromino.length; c++) {
           if(this.activeTetromino[r][c]){
            DrawSquare(this.x+c,this.y+r,this.color)
           }
        }
        
    }
}
p.draw()
Piece.prototype.undraw=function()
{
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c< this.activeTetromino.length; c++) {
            DrawSquare(this.x+c,this.y+r,vacant)
        }
        
    }
}
let score = 0;

Piece.prototype.lock=function(){
    for( r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            // we skip the vacant squares
            if( !this.activeTetromino[r][c]){
                continue;
            }
            // pieces to lock on top = game over
            if(this.y + r < 0){
                alert("!!!Game Over brh!!!");
                // stop request animation frame
                gameOver = true;
                break;
            }
            // we lock the piece
            Board[this.y+r][this.x+c] = this.color;
        }
    }
for(r = 0; r < row; r++){
    let isRowFull = true;
    for( c = 0; c < col; c++){
        isRowFull = isRowFull && (Board[r][c] != vacant);
    }
    if(isRowFull){
        // if the row is full
        // we move down all the rows above it
        for( y = r; y > 1; y--){
            for( c = 0; c < col; c++){
                Board[y][c] = Board[y-1][c];
            }
        }
        // the top row board[0][..] has no row above it
        for( c = 0; c < col; c++){
            Board[0][c] = vacant;
        }
        // increment the score
        score += 10;
    }
}
// update the board
DrawBoard();

// update the score
scoreElement.innerHTML = score;
}




// -------------Control----------------





document.addEventListener("keydown",Control);

function Control(event){
    if(event.keyCode == 37){
        p.moveleft();
        dropStart = Date.now();
    }else if(event.keyCode == 38){
        p.rotate();
        dropStart = Date.now();
    }else if(event.keyCode == 39){
        p.moveright();
        dropStart = Date.now();
    }else if(event.keyCode == 40){
        p.movedown();
    }
}


Piece.prototype.coll = function(x,y,piece){
    for( r = 0; r < piece.length; r++){
        for(c = 0; c < piece.length; c++){
            // if the square is empty, we skip it
            if(!piece[r][c]){
                continue;
            }
            // coordinates of the piece after movement
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            
            // conditions
            if(newX < 0 || newX >= col || newY >= row){
                return true;
            }
            // skip newY < 0; board[-1] will crush our game
            if(newY < 0){
                continue;
            }
            // check if there is a locked piece alrady in place
            if( Board[newY][newX] != vacant){
                return true;
            }
        }
    }
    return false;
}

















// -----------------DrawTetromino------------------

function DrawTetrominoes(){
for (let r = 0; r < Piece.length; r++) {
    for (let c = 0; c <Peice.length; c++) {
      if(Piece[r][c]==1){
          DrawSquare(c,r,pieceColor)
      } 
        
    }   
}
}
let dropStart = Date.now();
let gameOver = false;
function drop(){
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > 500){
        p.movedown();
        dropStart = Date.now();
    }
    if( !gameOver){
        requestAnimationFrame(drop);
    }
}

drop();
}