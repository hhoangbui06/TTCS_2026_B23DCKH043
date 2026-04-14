let alertSuccess = document.querySelector('[show-alert]')
if (alertSuccess) {
    const showTime = Number(alertSuccess.dataset.time);
    const closeAlert = alertSuccess.querySelector('[close-alert]')
    closeAlert.addEventListener("click", () => {
        alertSuccess.classList.add('alert-hidden')
    })
    setTimeout(() => {
        alertSuccess.classList.add("alert-hidden")
    }, showTime);
}