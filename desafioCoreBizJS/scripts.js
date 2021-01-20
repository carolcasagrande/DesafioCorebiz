/* mudança de imagem no banner*/
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "flex";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 4000);
}

$(document).ready(function () {
  var urlAPI = "https://corebiz-test.herokuapp.com/api/v1/products";
  var contentHTML = "";

  $.get(urlAPI, function (res) {
    res.forEach(function (product) {
      contentHTML += `
         
         <div class="item">
             
             <img class="product-img" src="${product.imageUrl}">                  
             <h3 class="title">${product.productName}</h3>
             <p class="stars">`;
      //contagem de estrelas preenchidas
      for (cont = 1; cont <= product.stars; cont++) {
        contentHTML += `<img src="img/star-solid.png">`;
      }
      //contagem de estrelas vazias
      let qtdStarsEmpty = 5 - product.stars;
      for (cont = 1; cont <= qtdStarsEmpty; cont++) {
        contentHTML += `<img src="img/star-border.png">`;
      }
      contentHTML += `  </p>`;
      //se list-price diferente de vazio, trazer o valor da api
      if (product.listPrice != null) {
        contentHTML += `<p class="list-price">de ${product.listPrice.toLocaleString(
          "pt-BR",
          { style: "currency", currency: "BRL" }
        )}</p>
              <img class="img-off" src="img/polygon.png">
              <p class="text-off">OFF</p>`;
      } else {
        contentHTML += "<br>";
      }

      contentHTML += `<h3 class="price">por ${product.price.toLocaleString(
        "pt-BR",
        { style: "currency", currency: "BRL" }
      )} </h3>`;
      //se as parcelas são diferente de vazio, trazer o valor da api
      if (product.installments[0] != null) {
        contentHTML += `<p class="installments">ou em ${
          product.installments[0].quantity
        }x de ${product.installments[0].value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })} </p>`;
      } else {
        contentHTML += "<br>";
      }

      contentHTML += `<button>Comprar</button>              
     
         </div>
     `;
    });

    //copiar produtos
    contentHTML += contentHTML + contentHTML;

    $("#shelf-content").html(contentHTML);
  });
});

//prateleira de produtos
let qtdProduct = 9999;
let page = 0;
let allItens = document.getElementById("shelf-content");

//botao anterior
document.getElementById("btn-prev").addEventListener("click", function () {
  pause("btn-prev");

  if (qtdProduct != 9999 && qtdProduct > page) {
    allItens.style.left = 226 + allItens.offsetLeft + "px";
    page += 1;
  }
});

//botao proximo
document.getElementById("btn-next").addEventListener("click", function () {
  pause("btn-next");

  if (qtdProduct == 9999) {
//condicao de verificacao de tamanho de tela
    if (screen.width > 700) {
      qtdProduct = document.getElementsByClassName("item").length - 4;
    } else {
      qtdProduct = document.getElementsByClassName("item").length - 1;
    }
    page = qtdProduct;
  }

  if (page > 0) {
    allItens.style.left = -226 + allItens.offsetLeft + "px";
    page -= 1;
  }
});

//após o click o usuário deve aguardar 0,5seg para novo click
function pause(nameBtn) {
  document.getElementById(nameBtn).disabled = true;
  setTimeout(function () {
    document.getElementById(nameBtn).disabled = false;
  }, 500);
}
