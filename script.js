const form = document.querySelector("#form");

const nameInput = document.querySelector("#name");
const cpfInput = document.querySelector("#cpf");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const photoInput = document.querySelector("#photo");
const descriptionInput = document.querySelector("#description");
const preview = document.getElementById('preview');

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!validateMinLength(nameInput.value, 5)) {
    alert("O nome completo deve ter pelo menos 5 caracteres.");
    return;
  }

  if (!validateCPF(cpfInput.value)) {
    alert("CPF inválido. Use o formato 000.000.000-00.");
    return;
  }

  if (!validateEmail(emailInput.value)) {
    alert("Email inválido.");
    return;
  }

  if (!validatePhone(phoneInput.value)) {
    alert("Telefone inválido. Use o formato (DDD) 90000-0000.");
    return;
  }

  if (!validateFile(photoInput.files[0])) {
    alert("Por favor, selecione uma imagem válida (JPEG, PNG, GIF).");
    return;
  }

  if (!validateMinLength(descriptionInput.value, 10)) {
    alert("A descrição/função deve ter pelo menos 10 caracteres.");
    return;
  }

  alert("Sócio cadastrado com sucesso!");
  form.reset();
  preview.innerHTML = '';
});

function validateMinLength(value, min) {
  return value.trim().length >= min;
}

function validateCPF(value) {
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value.trim());
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validatePhone(value) {
  return /^\(\d{2}\)\s?9\d{4}-\d{4}$/.test(value.trim());
}


function validateFile(file) {
  if (!file) return false;
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  return validTypes.includes(file.type);
}

photoInput.addEventListener('change', function() {
  const file = this.files[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.innerHTML = `<img src="${e.target.result}" alt="Preview da Imagem">`;
    }
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = '';
  }
});
