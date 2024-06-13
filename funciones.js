import { getData, save, remove, getDocumento, update } from "./firestore.js"

let id = 0

document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const AserraderoJyC = {
            run: document.getElementById('run').value,
            nom: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('Edad').value,
            fono: document.getElementById('fono').value,
            email: document.getElementById('email').value,
            sexo: document.getElementById('sexo').value,
            fechaNa: document.getElementById('fechaNa').value,
            areaT: document.getElementById('areaT').value
        }
        if (document.getElementById('btnGuardar').value == 'Guardar') {
        save(AserraderoJyC)
        Swal.fire({
            title: "Correcto",
            text: "Datos guardados con éxito",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
        });   
        }
        else {
            update(id, AserraderoJyC)
            id = 0
            Swal.fire({
                title: "Correcto",
                text: "Datos guardados con éxito",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
        }
        limpiar()
    }
})

window.addEventListener('DOMContentLoaded', () => {
    getData((datos) => {
        let tabla = ''
        datos.forEach((doc) => {
            const item = doc.data()
            tabla += `<tr>
            <td>${item.run}</td>
            <td>${item.nom}</td>
            <td>${item.apellido}</td>
            <td>${item.edad}</td>
            <td>${item.fono}</td>
            <td>${item.email}</td>
            <td>${item.sexo}</td>
            <td>${item.fechaNa}</td>
            <td>${item.areaT}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro que desea eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const AserraderoJyC = await getDocumento(btn.id)
                const e = AserraderoJyC.data()
                document.getElementById('run').value = e.run
                document.getElementById('nombre').value = e.nom
                document.getElementById('apellido').value = e.apellido
                document.getElementById('Edad').value = e.edad
                document.getElementById('fono').value = e.fono
                document.getElementById('email').value = e.email
                document.getElementById('sexo').value = e.sexo
                document.getElementById('fechaNa').value = e.fechaNa
                document.getElementById('areaT').value = e.areaT
                document.getElementById('btnGuardar').value = 'Editar'
                document.getElementById('run').readOnly = true
                id = AserraderoJyC.id
            })
        })
    })
})