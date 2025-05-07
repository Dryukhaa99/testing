let tareas = [];
let nextId = 1;

function guardarTarea(){
    const titulo = document.getElementById('titulo').value; 
    const descripcion = document.getElementById('descripcion').value;
    const categoria = document.getElementById('categoria').value;
    const prioridad = document.getElementById('prioridad').value;
    const id = nextId++;

    tareas.push({id,titulo, descripcion, categoria, prioridad, estado:'pendiente'});
    console.log(tareas)
    mostrarTarea();
}
function crearTarea(id,titulo,descripcion,categoria,prioridad,estado){
    let prioridadTexto = '';

    if (prioridad == '1') {
        prioridadTexto = 'alta';
    } else if (prioridad == '2') {
        prioridadTexto = 'media';
    } else if (prioridad == '3') {
        prioridadTexto = 'baja';
    }

    const tarea = `<div class="tarea">
                <button class="eliminarTarea" onclick="eliminar('${id}')">×</button>
                <span class="tituloTareas">${titulo}</span>
                <span class="descripcion">${descripcion}</span>
                <div class="caracteristicas">
                    <div>
                        <p>cat: ${categoria} </p>
                        <p>prio: ${prioridadTexto} </p> 
                    </div>
                  <div class="estados">
                     <select name="estados" data-tarea-id="${id}" onchange="actualizarEstado(this)">
                        <option value="pendiente" ${estado === 'pendiente' ? 'selected' : ''}>🟡</option>
                        <option value="en proceso" ${estado === 'en proceso' ? 'selected' : ''}>🟠</option>
                        <option value="finalizado" ${estado === 'finalizado' ? 'selected' : ''}>🟢</option>
                        </select>
                   </div>
                   </div>
                </div>`
    return tarea;
}
function mostrarTarea(categoriaFiltro = ''){
    const contenedor = document.querySelector('.tarjetas');
    contenedor.innerHTML = '';
    const tareasOrdenadas = [];

    const tareasFiltradas = tareas.filter(tarea =>{
        return categoriaFiltro == '' || tarea.categoria == categoriaFiltro;
    })
//tareasFilt.sort((a,b)=>)
    tareasFiltradas.sort((a,b)=>{
        const prioridadA = parseInt(a.prioridad);
        const prioridadB = parseInt(b.prioridad);
        
        if (prioridadA < prioridadB) return -1;
        if (prioridadA > prioridadB) return 1;
        return 0;
    })
    tareasOrdenadas.push(...tareasFiltradas);

    contenedor.innerHTML = '';
    tareasOrdenadas.forEach(tarea => {
        const nuevaTarea = crearTarea(
            tarea .id,
            tarea.titulo,
            tarea.descripcion,
            tarea.categoria,
            tarea.prioridad,
            tarea.estado
        );

        contenedor.innerHTML += nuevaTarea;
    });
}
function actualizarEstado(selectElement){
    const idTarea = selectElement.dataset.tareaId;
    const nuevoEstado = selectElement.value;
    const tareaEncontrada = tareas.find(tarea => tarea.id == parseInt(idTarea));
    if(tareaEncontrada){
        tareaEncontrada.estado = nuevoEstado;
        console.log(tareas);
        mostrarTarea(document.getElementById('filtroCategoria').value);
    }
}
function eliminar(idTarea){
    const indice = tareas.findIndex(tarea => tarea.id == (idTarea));
    if (indice !== -1){
        tareas.splice(indice, 1);
        mostrarTarea(document.getElementById('filtroCategoria').value);
    }
}
function filtrar(){
    const categoriaSeleccionada = document.getElementById('filtroCategoria').value;
    mostrarTarea(categoriaSeleccionada);
}
mostrarTarea();