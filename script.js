
const posicoesParaVencer = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

function venceu(posicaoAtual) {
  if (posicaoAtual.length < 3) return false;

  return posicoesParaVencer.some(combinacao =>
    combinacao.every(pos => posicaoAtual.includes(pos))
  );
}

let switchTurn = true;
let turn = "X";
let listaX = [];
let listaO = [];

document.getElementById("indicadorTurno").textContent = `Turno: ${turn}`, turn;

function defineIdQuadrado(buttonId) {  

    const botao = document.getElementById(buttonId);

    
    if(botao && botao.textContent === "" && !venceu(listaX) && !venceu(listaO)){

        botao.textContent = turn;

        const idNumber = Number(buttonId)

        if (turn === "X"){
            listaX.push(idNumber);
        } else {
            listaO.push(idNumber);
        }

        
        turn = switchTurn ? "O" : "X";
        switchTurn = !switchTurn;
        
        document.getElementById("indicadorTurno").textContent = `Turno: ${turn}`;
        
        if(venceu(listaX)){
            document.getElementById("indicadorTurno").textContent = "X Venceu!!!";

            const combinacao = posicoesParaVencer.find(linha =>
            linha.every(pos => listaX.includes(pos))
            );

            if (combinacao) {
                combinacao.forEach(id => {
                    document.getElementById(String(id)).style.backgroundColor = "#10962d";
                });
            } 
        } else if (venceu(listaO)){
            document.getElementById("indicadorTurno").textContent = "O Venceu!!!";
            const combinacao = posicoesParaVencer.find(linha =>
                linha.every(pos => listaO.includes(pos))
            );
            
            if (combinacao) {
                combinacao.forEach(id => {
                    document.getElementById(String(id)).style.backgroundColor = "#c21515";
                });
            } 
        } else if (!venceu(listaX) && !venceu(listaO) && (listaX.length + listaO.length >= 9)) {
            document.getElementById("indicadorTurno").textContent = "VELHA # !!!";

            for (let i = 1; i <= 9; i++) {
                document.getElementById(i).style.backgroundColor = "#e0e41e";
            }
        }
    }
        
}

document.querySelectorAll("button").forEach(botao => {
    botao.addEventListener("click", () => {
        defineIdQuadrado(botao.id);
    })
});