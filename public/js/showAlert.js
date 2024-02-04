
const hideAlert = () => {
    const element = document.querySelector('.alert');
    if(element)
    element.parentElement.removeChild(element);
}

exports.showAlert = (type, message)=>{
    hideAlert();
    const markup = `<div class="alert alert--${type.toUpperCase()}">${message}</div>`;
    document.querySelector('.alert-con').insertAdjacentHTML('afterbegin',markup);
    window.setTimeout(hideAlert, 2000);
}

