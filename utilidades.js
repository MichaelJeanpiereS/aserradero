const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)   
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    }
    else {
        input.classList.add('is-valid')
        div.innerHTML = ''
        if (id == 'fecha') {
            const dia = validarFecha(input.value)
            if (dia < 1) {
                input.classList.add('is-invalid')
                div.innerHTML =
                    '<span class="badge bg-danger">La fecha tope de contratación es hoy </span>'
            }
        }
        if (id == 'run') {
            const run = input.value.trim()
            if (!validarRun(run)) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El run ingresado no es válido </span>'
            }
        }
    }
}
const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        const errorElement = document.getElementById('e-' + item.name)
        if (errorElement) {
            errorElement.innerHTML = ''
        }
    })
    document.getElementById('run').readOnly = false;
    document.getElementById('btnGuardar').value = 'Guardar';
};
const soloNumeros = (evt) => {
    if (evt.keyCode >= 48 && evt.keyCode <= 57)
        return true
    return false
}
const validarFecha = (fecha) => {
    const hoy = new Date()
    fecha = new Date(fecha)
    const resta = hoy - fecha
    const dia = resta / (1000 * 60 * 60 * 24)
    return dia.toFixed(0)
}
const validarRun = (run) => {
    const Fn = {
        validaRut: function (rutCompleto) {
            rutCompleto = rutCompleto.replace("‐", "-")
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false
            const tmp = rutCompleto.split('-')
            const digv = tmp[1] 
            const rut = tmp[0] 
            if (digv == 'K') digv = 'k'

            return (Fn.dv(rut) == digv)
        },
        dv: function (T) {
            let M = 0, S = 1
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11
            return S ? S - 1 : 'k'
        }
    }
    return Fn.validaRut(run)
}

const valdiaEmail =(email) =>{
    const formato =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
    if(!formato.test(email))
        return false
    return true
}



