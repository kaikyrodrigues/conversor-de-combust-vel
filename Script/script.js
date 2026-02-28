const gasolina = document.getElementById("gasolina")
const etanol = document.getElementById("etanol")
const preco = document.getElementById("preco")
const consumo = document.getElementById("consumo")
const qt_litros = document.getElementById("qt_litros")
const calcular = document.getElementById("btn_calcular")
const resultado = document.getElementById("resultado")
const limpar = document.getElementById("btn_limpar")

function precoGasolina(litros, preco, km){
    let valorGasto = preco * litros
    let autonomia = km * litros
    return{
        valor: valorGasto,
        km: autonomia
    }
}

function precoEtanol(litros, preco, km){
    let valorGasto = litros * preco
    let autonomia = km * litros
    return{
        valor: valorGasto,
        km: autonomia
    }
}

preco.addEventListener("focus", ()=>{
    if(preco.value.trim() === ""){
        preco.value = "0,00"
    }
})
preco.addEventListener("input", ()=>{
    let valor = preco.value.replace(/\D/g, "")
    while(valor.length <3){
        valor = "0" +valor
    }
    const centavos = valor.slice(-2)
    const reais = valor.slice(0, -2)
    preco.value = `${parseInt(reais, 10)},${centavos}`
})

calcular.addEventListener("click",(ev)=>{
    let tipoCombustivel = ""
    if(gasolina.checked){
        tipoCombustivel = "Gasolina"

    }else if(etanol.checked){
        tipoCombustivel= "Etanol"
    }else {
        resultado.textContent = "Selecione o tipo de combustível"
        return;
    }

    const valorPreco = parseFloat(preco.value.replace(",", ".").trim())
    const valorConsumo = parseFloat(consumo.value)
    const litros = parseFloat(qt_litros.value)

    if(isNaN(valorPreco) || isNaN(valorConsumo) || isNaN(litros) || valorPreco <= 0 
|| valorConsumo <= 0 || litros <=0){
    resultado.textContent = "Preencha todos os campos com valores válidos.";
    return;
}

    let resultadoFinal;
    if(tipoCombustivel === "Gasolina"){
        resultadoFinal = precoGasolina(litros, valorPreco, valorConsumo);
    }else{
        resultadoFinal = precoEtanol(litros, valorPreco, valorConsumo)
    }
    resultado.innerHTML = `<strong>* ${tipoCombustivel.toUpperCase()}*</strong><br>
    Você gastará <strong>R$ ${resultadoFinal.valor.toFixed(2)} </strong><br>
    Autonomia média: <strong> ${resultadoFinal.km.toFixed(1)}Km </strong>`

})

limpar.addEventListener("click", ()=>{
   preco.value = "";
  consumo.value = "";
  qt_litros.value = "";
  resultado.textContent = "";
  gasolina.checked = false;
  etanol.checked = false;
})