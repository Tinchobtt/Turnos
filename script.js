class Turno{
    constructor(id, date, entrance, exit){
        this.id = id;
        let allDate = date.split('-');
        this.date = allDate[2] + ' - ' + allDate[1];
        this.entrance = entrance;
        this.exit = exit;
        this.checked = false;
        this.status = 'Pendiente';
    }
}

let turnos = JSON.parse(localStorage.getItem('turnos')) || [];

const saveTurno = ()=>{
    localStorage.setItem('turnos', JSON.stringify(turnos));
}

const createTurno = (date, entrance, exit)=>{
    if(emptyString(date) && emptyString(entrance) && emptyString(exit)){
        alert('Porfavor ingrese todos los datos requeridos.');
    }else{
        let id = turnos.length.toString();
        turnos.push(new Turno(id, date, entrance, exit));
        showTurnos(turnos);
        saveTurno();
    }
}

const deleteTurno = (id)=>{
    if(confirm('¿Deseas eliminar este turno?')){
        let i = 0;
        while (i < turnos.length) {
            if (turnos[i].id === id) {
                turnos.splice(i, 1);
            } else {
                i++;
            }
        }
        showTurnos(turnos);
        saveTurno();
    }
}

const checkTurno = (id, cond)=>{
    let turno = turnos.find( (item)=> item.id === id );
    turno.checked = cond ? true : false;
    turno.status = turno.checked ? 'Pago realizado' : 'Pendiente';
    saveTurno();
    showTurnos(turnos);
}

const putCheck = (btn)=>{
    let id = btn.getAttribute('data-id');
    let turno = turnos.find( task => task.id === id);
    btn.checked = turno.checked ? true : false;
}

const addTurnoButtons = ()=>{
    /*Delete button*/
    let deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', ()=>{
            let id = btn.getAttribute('data-id');
            deleteTurno(id);
        })
    });
    /*Check button*/
    let checkBtns = document.querySelectorAll('.check-input');
    checkBtns.forEach(btn => {
        putCheck(btn);
        btn.addEventListener('change', (event)=>{
            if(event.target.checked){
                checkTurno(btn.getAttribute('data-id'), true);
            }else{
                checkTurno(btn.getAttribute('data-id'), false);
            }
        })
    });
}

const colorStatus = (status)=>{
    return status === 'Pendiente' ? 'pendiente' : 'realizado';
}

const showTurnos = (list)=>{
    let turnosContent = '';
    const turnosSection = document.querySelector('.turnos');
    if(emptyList(list)){
        turnosContent = '<p font-size: 14px; style="text-align: center; margin: 1rem;">No hay turnos</p>';
        turnosSection.innerHTML = turnosContent;
    }else{
        let turnosInverse = [...turnos].reverse()
        turnosInverse.forEach((turno)=>{
            turnosContent += `
            <div class="turno">
                <div class="status-container">
                    <p class="status ${colorStatus(turno.status)}">${turno.status}</p>
                </div>
                <div class="fecha-container">
                    <p class="fecha">${turno.date}</p>
                </div>
                <div class="horario-container">
                    <p class="horario">${turno.entrance} - ${turno.exit}</p>
                </div>
                <div class="turno-btns">
                    <input type="checkbox" class="check-input" data-id="${turno.id}">
                    <button class="delete-btn" data-id="${turno.id}">x</button>
                </div>
            </div>`;
        })
        turnosSection.innerHTML = turnosContent;
        addTurnoButtons();
    }
}

//VERIFICADORES
const emptyString = (str)=>{
    return !str || str.trim().length === 0;
}
const emptyList = (list)=>{
    return !list || list.length === 0;
}

const addTurnoBtn = document.querySelector('.add-turno-btn');
const panelContainer = document.querySelector('.panel');
const cancelBtn = document.querySelector('#cancel-btn');

addTurnoBtn.addEventListener('click', ()=>{
    panelContainer.style.display = 'grid';
})
cancelBtn.addEventListener('click', ()=>{
    panelContainer.style.display = 'none';
})

const formPanel = document.querySelector('#form-panel');

formPanel.addEventListener('submit', (event)=>{
    event.preventDefault();
    let date = document.querySelector('#fecha').value;
    let entrance = document.querySelector('#ingreso').value;
    let exit = document.querySelector('#salida').value;
    createTurno(date, entrance, exit);
    panelContainer.style.display = 'none';
    formPanel.reset();
})

showTurnos(turnos);