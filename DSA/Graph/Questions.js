 // 1. Rotting Oranges  
// [[2,1,1],[1,1,0],[0,1,1]]  . You are given 2d matrix where 1-> fresh orange , 2-> rotten orange and 0 -> empty cell . Rotten orange can rotten its adjacent fresh orange
// in 1 unit time . You have to find minimum number of time required to rotten all fresh oranges . 
// Leetcode link : https://leetcode.com/problems/rotting-oranges/

const isValidPosition = (x, y, row, column, grid) => {
    return x >= 0 && x < row && y >= 0 && y < column && grid[x][y] === 1;
}

var orangesRotting = function(grid) {
    
    let q = [] ;
    const row = grid.length ; 
    const column = grid[0].length ;
    let fresh = 0 ;

    grid.forEach((r , ri)=>{
        r.forEach((c , ci)=>{
            if(c == 2){
                q.push([ri , ci])
            }
            else if(c == 1){
                fresh++ ;
            }
        })
    })
   
    if(fresh == 0){
        return 0 ;
    }

    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];
    
    let time = 0 ;
    while(q.length != 0){
        let temp = 0 ;
        const q_size = q.length;
        
        for(let i=0 ; i<q_size ; i++){
           
            const [x , y] = q[0];
           
            q.shift();

            // checking all its neghbours
            for(let j=0 ; j<4 ; j++){
                const neighbourRow = x + dx[j];
                const neighbourCol = y + dy[j] ;
                
                if(isValidPosition(neighbourRow , neighbourCol, row , column , grid)){
                    
                    grid[neighbourRow][neighbourCol] = 2 ;
                    q.push([neighbourRow,neighbourCol])
                    temp++ ;
                }
            }
        }
        if(temp > 0){
            time = time + 1 ;
        }
    }
    
    grid.forEach((r , ri)=>{
        r.forEach((c , ci)=>{
            if(c == 1){
                time = 0 ;
            }
        })
    })
    
    return time ? time : -1 ;

};
