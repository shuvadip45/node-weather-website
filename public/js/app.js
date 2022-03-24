const weatherForm = document.querySelector('form')
const searchText = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchText.value
    messageTwo.textContent = "Loading Weather..."
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                messageOne.textContent = ""
                messageTwo.textContent = data.error
            }
            else{
                console.log(data.location)
                console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent =  data.forecast
            }
        })
    })
})