const knight = {
    name: "knight",
    w: "\u2658",
    b: "\u265E"
};

let Arr_obj = [];

function Implementation(N) {
    let board;
    let size = N;
    let totalSpace = size * size;
    let _init = function () {
        board = new Array(size);
        for (let i = 0; i < board.length; ++i) {
            board[i] = new Array(size);
            board[i].fill(0);
        }
    };
    let printBoard = () => {
        for (let j = 0; j < size; j++) {
            for (let i = 0; i < size; i++) {
                let obj_ = {
                    nuocdi: 0,
                    _x: 0,
                    _y: 0
                };
                obj_.nuocdi = board[j][i];
                obj_._y = i;
                obj_._x = j;

                Arr_obj.push(obj_);
            }
        }
        console.log(Arr_obj.sort(function (a, b) {
                return a.nuocdi - b.nuocdi;
            }))    
    };
//----------------------------------------
    let drawBoard = () => {
        const boxSize = 80,
            boardDimension = N,
            boardSize = boardDimension * boxSize

        const div = d3.select("#svg-container");

        // create <svg>
        const svg = div.append("svg")
            .attr("width", boardSize + "px")
            .attr("height", boardSize + "px");
//-----------ve ban co-----------------------
        for (let i = 0; i < boardDimension; i++) {
            for (let j = 0; j < boardDimension; j++) {
                // draw each chess field
                const box = svg.append("rect")
                    .attr("x", i * boxSize)
                    .attr("y", j * boxSize)
                    .attr("width", boxSize + "px")
                    .attr("height", boxSize + "px")
                if ((i + j) % 2 === 0) {
                    box.attr("fill", "beige");
                } else {
                    box.attr("fill", "gray");
                }
            }
        }
 //--------- draw chess pieces-------------------------
        for (let i = 0; i < Arr_obj.length; i++) {
            const chess = svg.append("text")
                .style("font-size", boxSize / 6)
                .attr("text-anchor", "middle")
                .attr("x", Arr_obj[i]._x * boxSize + boxSize/2)
                .attr("y", Arr_obj[i]._y * boxSize + boxSize/2)
                .style("text-shadow", "2px 2px 4px #757575")
                .classed('team1', true)
            if ((i === 0)) {
                chess.style("font-size", boxSize * 2 / 4)
                chess.text(knight.b)
                chess.attr("id", "ma")
            }
            else {
                chess.text(i)
            }
        }
// ---------ve hanh trinh--------------------------
        let lineData = d3.line()
            .x(function (d) {
                return d._x * boxSize + boxSize/2;
            })
            .y(function (d) {
                return d._y * boxSize + boxSize/2;
            })
            .curve(d3.curveLinear);

            svg.append('path')
            .attr("d", lineData(Arr_obj))
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .transition()
            .duration(function () {
                for (let i = 1; i < Arr_obj.length; i++) {
                    return i * 20000;
                }
            })
            .attrTween(
                "stroke-dasharray",
                function () {
                    var len = this.getTotalLength();
                    return function (t) {
                        return (d3.interpolateString("0," + len, len + "," + 10 * len))(t)
                    };
                });
    }
    //-------------------------------------------------------------
    let canMove = (x, y) => {
        return x >= 0 && x < size && y >= 0 && y < size && board[x][y] === 0;
    };
    let tour = (x, y, step) => {
        
        if (step === totalSpace) {
            board[x][y] = step;
            return true;
        }
        board[x][y] = step;

        if (canMove(x - 1, y - 2) && tour(x - 1, y - 2, step + 1)) {
            return true;
        }

        if (canMove(x - 2, y - 1) && tour(x - 2, y - 1, step + 1)) {
            return true;
        }
        if (canMove(x - 2, y + 1) && tour(x - 2, y + 1, step + 1)) {
            return true;
        }

        if (canMove(x - 1, y + 2) && tour(x - 1, y + 2, step + 1)) {
            return true;
        }

        if (canMove(x + 1, y + 2) && tour(x + 1, y + 2, step + 1)) {
            return true;
        }

        if (canMove(x + 2, y + 1) && tour(x + 2, y + 1, step + 1)) {
            return true;
        }

        if (canMove(x + 2, y - 1) && tour(x + 2, y - 1, step + 1)) {
            return true;
        }

        if (canMove(x + 1, y - 2) && tour(x + 1, y - 2, step + 1)) {
            return true;
        }
        board[x][y] = 0;
        
        //return false;
    };

    const inputX = document.getElementById("inputNum1");
    const inputY = document.getElementById("inputNum2");
    let solve = () => {
        let a = parseInt(inputX.value);
        let b = parseInt(inputY.value);
        return tour(a, b, 1);
    };
    let clear = () => {
        document.getElementById("svg-container").innerHTML = "";
        this.board = "";
        Arr_obj = [];

    };
    _init();
    return {
        v1: solve,
        print: printBoard,
        draw: drawBoard,
        clearr: clear,
    };
}

main = () => {
    const inputNum = document.getElementById("inputNum");
    const inputX = parseInt(document.getElementById("inputNum1").value);
    const inputY = parseInt(document.getElementById("inputNum2").value);
    var N = parseInt(inputNum.value);

    let answer = new Implementation(N);
    if(inputX ===null || inputY ===null){
        console.log("ban phai nhap vao toa do x y");
    }

    answer.clearr();
    answer.v1();
    answer.print();
    answer.draw();  
};