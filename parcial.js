document.querySelector("#formulario").addEventListener("submit",(e)=>{

    e.preventDefault()
    datos=Object.fromEntries(new FormData(e.target))
    console.log(datos)
    graficar(datos)
    punto2(datos)
    punto3(datos)
}
)   
    function dBm(Potencia){
        return  10*Math.log10(Potencia/0.001)

    }
    


    function graficar(datos){
        const ctx=document.getElementById("grafico")
        new Chart(ctx,{ type: 'line',
        data: {
            labels: [
              datos.fc - Number(datos.BW / 2) * 2,
              datos.fc - Number(datos.BW / 2),
              datos.fc,
              Number(datos.fc) + Number(datos.BW / 2),
              Number(datos.fc) + Number(datos.BW / 2) * 2,
            ],
            datasets: [
              {
                data: [
                  -100,
                  -100,
                  (Number(dBm(datos.Potencia)) + Number(datos.Tx)).toFixed(2),
                  -100,
                  -100,
                ],
                label: 'PIRE',
                fill: false,
              },
            ],
          },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Line Chart'
            }
          }
        },})
    }

    function punto2(datos){
     let PEL= -(32.4+20*Math.log10(Number(datos.Distancias))+20*Math.log10(Number(datos.fc)))
     let  alcance = -(-datos.Th-datos.MD+Number(datos.Rx))-(Number(dBm(datos.Potencia)) + Number(datos.Tx))
     console.log(alcance)
     console.log(PEL)
     if(PEL< alcance){
      let texto=document.getElementById("texto")
      texto.innerHTML=`   2) El valor del PEl ${PEL} es menor que el alcance ${alcance} por lo tanto No hay enlace `
     }else{
      let texto=document.getElementById("texto")
      texto.innerHTML=`   2) El valor del PEl ${PEL} es igual o mayor que el alcance ${alcance} por lo tanto SI hay enlace `
     }
    
     
    }    

    function punto3(datos){
      let PEL= -(32.4+20*Math.log10(Number(36000))+20*Math.log10(Number(datos.fc)))
      let  alcance = -(-datos.Th-datos.MD+Number(datos.Rx))-(Number(dBm(datos.Potencia)) + Number(datos.Tx))
      let falta= -(PEL- alcance)
      console.log(alcance)
      console.log(PEL)
      console.log(falta)


      let texto=document.getElementById("texto2")
      texto.innerHTML=`   3) falta ${falta} dB para que haya enlace `
     
    }