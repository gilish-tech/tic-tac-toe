import { type } from 'os';
import * as readline from 'readline';


type Player = "X" | "O" | "-" 


const  board_lines: Player[]  =  ["-","-","-","-","-","-","-","-","-"]

const showBoard = ():void=>{
   console.log(board_lines[0] + " | "  +  board_lines[1] + " | " + board_lines[2])
   console.log(board_lines[3] + " | "  +  board_lines[4] + " | " + board_lines[5])
   console.log(board_lines[6] + " | "  +  board_lines[7] + " | " + board_lines[8])
}



function questionAsync(query: string): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    return new Promise((resolve) => {
      rl.question(query, (answer: string) => {
        resolve(answer);
        rl.close();
      });
    });
  }




const putVals = async(player:Player):Promise<boolean>=>{
   let answer = await questionAsync('pick a number')
   if (board_lines[Number(answer)- 1] === "-"){

     board_lines[Number(answer)-1] = player

     return true
   }

   return false


    // console.log(answer)

    
    
} 

const flipPlayer= async(player:Player):Promise<Player>=>{
    if (player === "X"){
      return "O"

    }
    
    return "X"   


}

const checkHorinzontal = ():Player| boolean =>{

  if ( (board_lines[0] === board_lines[1]) &&  (board_lines[1] === board_lines[2]) &&(board_lines[1] !== "-"  ))  {
        return board_lines[0]
        
      }
      
      if ( (board_lines[3] === board_lines[4]) &&  (board_lines[4] === board_lines[5]) &&(board_lines[4] !== "-"  )) {
        return board_lines[3]
       

  }
 
  if ( (board_lines[6] === board_lines[7]) &&  (board_lines[7] === board_lines[8]) &&(board_lines[7] !== "-"  )) {
        return board_lines[6]

  }
 
  return false
}
const checkVertical = ():Player|boolean=>{

  if ( (board_lines[0] === board_lines[3]) &&  (board_lines[3] === board_lines[6]) &&  (board_lines[3] !== "-"  )) {
        return board_lines[0]

  }
 
  if ( (board_lines[1] === board_lines[4]) &&  (board_lines[4] === board_lines[7]) &&  (board_lines[4] !== "-"  )) {
        return board_lines[1]

  }
 
  if ( (board_lines[2] === board_lines[5]) &&  (board_lines[5] === board_lines[8]) &&  (board_lines[5] !== "-"  )) {
        return board_lines[2]

  }
 
  return false
}
const checkDiagonal = ():Player|boolean=>{

  if ( (board_lines[0] === board_lines[4]) &&  (board_lines[4] === board_lines[8]) &&(board_lines[4] !== "-"  )) {
       return  board_lines[4]

  }
 
  if ( (board_lines[2] === board_lines[4]) &&  (board_lines[4] === board_lines[6]) &&(board_lines[4] !== "-"  )) {
      return board_lines[4]

  }
 
 
 
  return false
}

const checkWinner = ():Player| boolean =>{

  if  (checkVertical()){
    return checkVertical()
  }
  if  (checkHorinzontal()){
    return checkHorinzontal()
  }
  if  (checkDiagonal()){
    return checkDiagonal()
  }


  return false



}

const checkDraw=():boolean=>{

 return !(board_lines.includes("-"))

}



const playGame = async()=>{
    let x_score:number = 0
    let y_score:number = 0
    await showBoard()
    let player:Player = "X"
    const thereIsAwin = checkWinner()
    console.log(thereIsAwin)

    while(true){
        
            while(!checkWinner()  && !checkDraw() ){
        
              const played = await putVals(player)
              await showBoard()
              if (played){
                player = await flipPlayer(player)
        
              }else{
                console.log("you cant play there")
              }
              
            }
        
            const winner = checkWinner()
            if (winner){
              if(winner === "X"){
                  x_score++
                }
                else if(winner==="O"){
                  y_score++
                }
                
                
              }
              
              const draw = checkDraw()
            
              if (draw){
                console.log("draw")
              }
              
              
              console.log(`X :${x_score} Y:${y_score}`)
              for(const boardLinesIndex in board_lines){
                board_lines[boardLinesIndex] = "-"
              }
              

    }
      
}

playGame()
