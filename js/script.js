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
let cont_id = parseInt(localStorage.getItem('cont_id')) || 0;
let turnosList = JSON.parse(localStorage.getItem('turnos')) || [];

const saveTurno = ()=>{
    localStorage.setItem('turnos', JSON.stringify(turnosList));
    localStorage.setItem('cont_id', cont_id.toString());
}

const createTurno = (date, entrance, exit)=>{
    if(emptyString(date) && emptyString(entrance) && emptyString(exit)){
        alert('Porfavor ingrese todos los datos requeridos.');
    }else{
        let id = cont_id.toString();
        turnosList.push(new Turno(id, date, entrance, exit));
        cont_id++;
        showTurnos(turnosList);
        saveTurno();
    }
}

const deleteTurno = (id)=>{
    if(confirm('¿Deseas eliminar este turno?')){
        let i = 0;
        while (i < turnosList.length) {
            if (turnosList[i].id === id) {
                turnosList.splice(i, 1);
            } else {
                i++;
            }
        }
        showTurnos(turnosList);
        saveTurno();
    }
}

const colorStatus = (status)=>{
    return status === 'Pendiente' ? 'pendiente' : 'realizado';
}

const checkTurno = (statusElement, checkBtn, cond)=>{
    let id = checkBtn.getAttribute('data-id');
    let turno = turnosList.find( (item)=> item.id === id );

    turno.checked = cond ? true : false;
    turno.status = cond ? 'Pago realizado' : 'Pendiente';

    statusElement.innerHTML = cond ? 'Pago realizado' : 'Pendiente';
    statusElement.className = colorStatus(turno.status);
    
    saveTurno();
}

const putCheck = (checkBtn, statusElement)=>{
    let id = checkBtn.getAttribute('data-id');
    let turno = turnosList.find( task => task.id === id);
    checkBtn.checked = turno.checked ? true : false;
    statusElement.innerHTML = checkBtn.checked ? 'Pago realizado' : 'Pendiente';
}

const addTurnoButtons = ()=>{
    let turnos = document.querySelectorAll('.turno');
    turnos.forEach( turno => {
        let statusElement = turno.firstElementChild.firstElementChild;
        let deleteBtn = turno.querySelector(':nth-child(4)').lastElementChild;
        let checkBtn = turno.querySelector(':nth-child(4)').firstElementChild;

        //Add Delete Btn
        deleteBtn.addEventListener('click', ()=>{
            let id = deleteBtn.getAttribute('data-id');
            deleteTurno(id);
        })

        //Add Checkbox
        putCheck(checkBtn, statusElement);
        checkBtn.addEventListener('change', (event)=>{
            if(event.target.checked){
                checkTurno(statusElement, checkBtn, true);
            }else{
                checkTurno(statusElement, checkBtn, false);
            }
        })
    })
}

const showTurnos = (list)=>{
    let turnosContent = '';
    const turnosSection = document.querySelector('.turnos');
    if(emptyList(list)){
        turnosContent = '<p font-size: 14px; style="text-align: center; margin: 1rem;">No hay turnos</p>';
        turnosSection.innerHTML = turnosContent;
    }else{
        let turnosInverse = [...turnosList].reverse()
        turnosInverse.forEach((turno)=>{
            turnosContent += `
            <div class="turno">
                <div class="status-container">
                    <p class="status ${colorStatus(turno.status)}"></p>
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

showTurnos(turnosList);