//Por padrão vão ficar como 0. 1 representará o 'X' e 2 representará 'O' 
	var tabuleiro = [[0,0,0],
					 [0,0,0],
					 [0,0,0]];
	var vez = "X";
	var i;
	var jogadas=0;

	function fimJogo(jogador)
	{
		switch(jogador)
		{
			case 1:
				$("#vez").css({"background-color":"#FF6347","border-radius":"5px","width":"40%"});
			break
			case 2:
				$("#vez").css({"background-color":"#87CEFA","border-radius":"5px","width":"40%"});
			break
			default: 
				$("#vez").css({"background-color":"#7B68EE"})
				$(".row0").css({"background-color":"#7B68EE"})
				$(".row1").css({"background-color":"#7B68EE"})
				$(".row2").css({"background-color":"#7B68EE"});
		}

		document.getElementById("vez").innerHTML = "Fim de Jogo!!!<br>Vencedor: Jogador "+ jogador;

		$(".row0").removeAttr("onclick");
		$(".row1").removeAttr("onclick");
		$(".row2").removeAttr("onclick");

		$(".row0").css({"cursor":"default"});
		$(".row1").css({"cursor":"default"});
		$(".row2").css({"cursor":"default"});
	}

	//Mexendo com as colunas
	function jogada(row, col)
	{
		if (tabuleiro[row][col] > 0)
		{
			alert("Essa parte ja foi escolhida");
			return;
		}

		// vez do jogador 1 'X'
		else if (vez == "X") 
		{
			//Colocando o X onde foi clicado
			setJogada(row,col,"#DC143C","&#10006;");

			//Marcando a posição do 1('X') na matriz
			tabuleiro[row][col] = 1;

			//Passando a vez para o proximo
			vez = "O";
			document.getElementById("vez").innerHTML = "Agora é a vez do: " + vez;
		}

		// vez do jogador 2
		else if(vez == "O")
		{
			setJogada(row,col,"#00BFFF","O");
			tabuleiro[row][col] = 2;
			vez = "X";
			document.getElementById("vez").innerHTML = "Agora é a vez do: " + vez;
		}

		if(checarVitoria(1,"#B22222"))
			fimJogo(1);
		else if(checarVitoria(2,"#87CEEB"))
			fimJogo(2);
		else
			jogadas++;

		//Caso todas as Jogadas foram feitas vai dar velha
		if(jogadas == 9)
		{
			//Tendo certeza de que nenhum dos dois jogadores venceram
			if(!checarVitoria(1,"#B22222") && !checarVitoria(2,"#B22222"))
				fimJogo("Velha");
		}		
	}

	//Colocando a jogada X ou O no tabuleiro e estilizando elas
	function setJogada(linha,col,cor,obj)
	{
		document.getElementById("linha" + linha + "_col" + col).innerHTML = obj;
		$("#linha" + linha + "_col" + col).css({"color":cor,"text-shadow": "3px 2px 3px black"});
	}

	//Fim do Jogo?
	function checarVitoria(jogador,cor)
	{
		//diagonal
		var diago = 2;
		for(i = 0;i < 3;i++)
		{
			//Condições de vencer jogadores 1 e 2 
			//Caso ele vença na Vertical | | |
			if(tabuleiro[0][i] == jogador && tabuleiro[1][i] == jogador && tabuleiro[2][i] == jogador)
			{
				/*Por questão de visual e localização esse i2 servirá para marcar aonde que o jogador venceu
				* no caso de ser na Vertical a linha(row) terá um valor variado entre 0,1 e 2
				* e a Coluna terá um valor fixo que será o i que cumprir uma das condições abaixo
				* no caso de ser horizontal será ao contrário sendo a linha um valor fixo e a coluna um valor variado
				*/
				for(var i2 = 0;i2 < 3;i2++)
				{
					$("#linha" + i2 + "_col" + i).css({"background-color":cor});
				}
				//fimJogo(jogador,"vertical");
				return true;
			}

			//Caso ele vença na Horizontal - - -
			else if(tabuleiro[i][0] == jogador && tabuleiro[i][1] == jogador && tabuleiro[i][2] == jogador)
			{
				for(var i2 = 0;i2 < 3;i2++)
				{
					$("#linha" + i + "_col" + i2).css({"background-color":cor});
				}
				//fimJogo(jogador,"Horizontal");
				return true;
			}

			//Caso ele vença na Diagonal (ambas direita e esquerda)
			else if(tabuleiro[0][0] == jogador && tabuleiro[1][1] == jogador && tabuleiro[2][2] == jogador ||
					tabuleiro[i][i+2] == jogador && tabuleiro[i+1][i+1] == jogador && tabuleiro[i+2][i] == jogador)
			{
				
				for(var i2 = 0;i2 < 3;i2++)
				{
					if (tabuleiro[i][i+2] == jogador && tabuleiro[i+1][i+1] == jogador && tabuleiro[i+2][i] == jogador)
					{
						$("#linha" + i2 + "_col" + diago--).css({"background-color":cor});
					}
					else
					{
						$("#linha" + i2 + "_col" + i2).css({"background-color":cor});
					}
				}
				//fimJogo(jogador,"Diagonal");
				return true;
			}
		}
		//Se o jogo não detectar nenhum jogada vitoriosa retorna falso
		return false;
	}