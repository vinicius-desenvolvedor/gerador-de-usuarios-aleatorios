// Autor: Vinícius Lopes
// Site: https://viniciusdesenvolvedor.com.br


function getUsuarios() {
    // verificamos se já existe uma div com a id="usuario", para gerar uma de cada vez
    if (document.getElementById('usuario')) {
      // se já existir a div, este trecho vai removê-la
      document.getElementById('usuario').remove()

    }
    // verificamos se já existe uma div com a id="erro", para gerar uma de cada vez
    if (document.getElementById('erro')) {
      // se já existir a div, este trecho vai removê-la
      document.getElementById('erro').remove()
    }
    // aqui criamos uma requisição XML Http
    let xmlHttp = new XMLHttpRequest();
    // abrimos a consulta à API Random User por meio de um GET
    xmlHttp.open("GET", "https://randomuser.me/api/?nat=br");

    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) { //se o código retornar 4 quer dizer que terminou a requisição, mas tem que o código http ser 200
        // aqui pegamos a resposta da requisiçao em formato de texto
        let JSONUsuarios = xmlHttp.responseText
        
        // aqui organizamos a requisição em um objeto JSON
        let objJSON = JSON.parse(JSONUsuarios)

        for (let i in objJSON.results) { 
          let item = objJSON.results[i] // percorremos os resultados do objeto JSON

            
          // Aqui cria a div que vai receber o resultado formatado
          let divRow = document.createElement('div')
          
          divRow.className = 'flex-row justify-content-center'
          divRow.id = 'usuario'

          let divCol = document.createElement('div')
          divCol.className = 'd-flex flex-column justify-content-center'

          let nome = ''
          let p1 = document.createElement('p')
          p1.innerHTML = 'Olá, meu nome é'
          p1.className = 'text-center'
          
          let p2 = document.createElement('p')
          p2.innerHTML = '<strong>' + item.name.first + ' ' + item.name.last + '</strong>'
          p2.className = 'text-center'


          let img = document.createElement('img')
          img.src = item.picture.large
          img.className = 'img-fluid mx-auto rounded-circle'
          img.width = '200'
          
          let hr = document.createElement('hr')
          // após criarmos todos os elementos, colocamos um dentro do outro...
          divRow.appendChild(divCol)
          divCol.appendChild(p1)
          divCol.appendChild(p2)
          divCol.appendChild(img)
          divCol.appendChild(hr)
          // ... e todos dentro da row, que leva a id="usuarios", para testarmos se ela existe lá em cima, no começo
          document.getElementById('lista').appendChild(divRow) 
        } // aqui termina o laço for
      } // aqui termina o if
      
      if (xmlHttp.readyState == 4 && xmlHttp.status == 404) { // se der erro 404
        // se a consulta der erro, criamos uma div de alerta do Bootstrap
        let erro = document.createElement('div')
        erro.className = 'alert alert-danger'
        erro.id = 'erro'
        erro.role = 'alert'
        erro.innerHTML = 'Não foi possível criar o usuário aleatório.'
        // e colocamos essa div dentro da div com id="lista"
        document.getElementById('lista').appendChild(erro)
      }
    };
    xmlHttp.send(); // aqui é enviada a requisição XML Http
    
  }