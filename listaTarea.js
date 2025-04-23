let tareas = [];

function guardarTarea(){
    const titulo = document.getElementById('titulo').value; 
    const descripcion = document.getElementById('descripcion').value;
    const categoria = document.getElementById('categoria').value;
    const prioridad = document.getElementById('prioridad').value;

    tareas.push({titulo, descripcion, categoria, prioridad});
    console.log(tareas)
}
function crearTarea(titulo,desc,cat,prio){
    const tarea = `<div class="tarea">
                <button class="eliminarTarea" onclick="eliminar()">×</button>
                <span class="tituloTareas">${titulo}</span>
                <span class="descripcion">${desc}</span>
                <div class="caracteristicas">
                    <div>
                        <p>cat: ${cat} </p>
                        <p>prio: ${prio} </p>
                    </div>
                  <div class="estados">
                    <select name="estados" id="estado">
                            <option value="pendiente" selected>🟡</option>
                            <option value="en proceso">🟠</option>
                            <option value="finalizado">🔴</option>
                            </select>
                   </div>
                   </div>
                </div>`
    return tarea;
}
function mostrarTarea(){
    
}