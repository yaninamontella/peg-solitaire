var board=[
  [, ,{value:1},{value:1}, {value:1}, , ],
  [, ,{value:1},{value:1}, {value:1}, , ],
  [{value:1}, {value:1}, {value:1}, {value:1}, {value:1}, {value:1},{value:1}],
  [{value:1}, {value:1}, {value:1}, {value:0}, {value:1}, {value:1},{value:1}],
  [{value:1}, {value:1}, {value:1}, {value:1}, {value:1}, {value:1},{value:1}],
  [, ,{value:1},{value:1}, {value:1}, , ],
  [, ,{value:1},{value:1}, {value:1}, , ]
];

var selectedPeg={x:undefined, y:undefined}
var createId= function(rowN, colN) {
  return 'peg-'+rowN+'-'+colN
}


var generateCell= function (cell, rowN, colN){
  var html= '<button id="'+ createId(rowN, colN)+'" class="'
  //evalua si existe y despues mira su valor si es 1 = true
  if(cell && cell.value){
    html+= 'peg';
  }
  else if (cell && cell.value==0){
    html+= 'hole';
  }
  else {
        html+= 'hidden';
  }
    html+= '"></button>';
    return html;
};


var generateRow= function(row, rowN){
  var html='<div class="row">'
  for (var j=0;j < row.length; j++)
  {
    html +=generateCell(row[j],rowN, j);
  }
  html+= '</div>';
  return html
};


var generateBoard=function(){
  var html= '<div class="mainrow">'
  for (var i=0;i < board.length; i++)
  {
    html+=generateRow(board[i],i)
  }
  html +='</div>';
  return html
};

var unselectPeg=function(){
  if (selectedPeg.x!=undefined && selectedPeg.y!=undefined){
    var prevSelectId=createId(selectedPeg.x, selectedPeg.y)
    document.getElementById(prevSelectId).className='peg'
    var suggestion= document.getElementsByClassName('suggestion')
    for (var i=0;i < suggestion.length; i++)
    {
      suggestion[i].className='hole'
    }
  }
}

var getElement= function(id){
  var element=document.getElementById(id)
  return element || {}
}

var showSuggestions=function(){
  var near={
    above:getElement(createId(selectedPeg.x -1, selectedPeg.y)),
    left:getElement(createId(selectedPeg.x, selectedPeg.y-1)),
    right:getElement(createId(selectedPeg.x , selectedPeg.y+1)),
    bellow:getElement(createId(selectedPeg.x +1, selectedPeg.y)),
  }
  var possible={
    above:getElement(createId(selectedPeg.x -2, selectedPeg.y)),
    left:getElement(createId(selectedPeg.x, selectedPeg.y-2)),
    right:getElement(createId(selectedPeg.x , selectedPeg.y+2)),
    bellow:getElement(createId(selectedPeg.x +2, selectedPeg.y)),
  }

  if(near.above.className=='peg'&& possible.above.className=='hole')
  {
    possible.above.className='suggestion'
  }
  if(near.left.className=='peg'&& possible.left.className=='hole')
  {
    possible.left.className='suggestion'
  }
  if(near.right.className=='peg'&& possible.right.className=='hole')
  {
    possible.right.className='suggestion'
  }
  if(near.bellow.className=='peg'&& possible.bellow.className=='hole')
  {
    possible.bellow.className='suggestion'
  }
}

var selectPeg=function(evt){
  var peg=evt.target
  //split pone las palabras separdas por guien en un array
  var idParts=peg.id&&peg.id.length ? peg.id.split('-'):[]
  if(idParts.length===3){
    if(selectedPeg.x=== parseInt(idParts[1])&&selectedPeg.y=== parseInt(idParts[2])){
      unselectPeg()
      selectedPeg.x=undefined
      selectedPeg.y=undefined
    }
    else {
      unselectPeg()
      selectedPeg.x=parseInt(idParts[1])
      selectedPeg.y=parseInt(idParts[2])
      peg.className='selected'
      showSuggestions()
    }

  }
}

var addPegsEventHandlers=function(pegs){

  for (var i=0;i < pegs.length; i++)
  {
    pegs[i].onclick=selectPeg
  }

}

var addResetEventHandlers=function(evt){
  var opcion = confirm("¿Esta seguro que desea reiniciar el juego?");
    if (opcion == true) {
          init();
    }

}

var init= function(){
  var boardElement=document.getElementById('board');
  boardElement.innerHTML=generateBoard()
  var pegs=boardElement.getElementsByClassName('peg')
  addPegsEventHandlers(pegs)
  var reset=document.getElementById('reset')
  reset.onclick= addResetEventHandlers

};
window.onload=init;
