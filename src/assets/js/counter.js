// Es solo un contador simple que aumenta el valor cada vez que se hace clic en el elemento dado.
export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}

//Nota : este archivo es solo un ejemplo de un módulo JS simple.
// Puedes eliminarlo si no lo necesitas.