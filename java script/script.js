document.addEventListener("DOMContentLoaded", () => 
  {
  const form = document.getElementById("ticket-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const githubInput = document.getElementById("github");
  const avatarInput = document.getElementById("avatar");
  const fileUploadArea = document.querySelector(".file-upload-area");
  const fileUploadInfo = document.querySelector(".file-upload-info");


  const mainSection = document.getElementById("main-section");
  const ticketSection = document.getElementById("ticket-section");

  const ticketName = document.getElementById("ticket-name");
  const ticketNameHighlight = document.getElementById("ticket-name-highlight");
  const ticketEmailText = document.getElementById("ticket-email-text");
  const ticketGithub = document.getElementById("ticket-github");
  const ticketAvatar = document.getElementById("ticket-avatar");
  const backButton = document.getElementById("back-button");
  

  if (!form || !mainSection || !ticketSection || !fileUploadArea) 
  {
    console.error("Elementos principais não encontrados no DOM.");
    return;
  }

  fileUploadArea.addEventListener('click', () => avatarInput.click());

  fileUploadArea.addEventListener('dragover', (event) => 
  {
    event.preventDefault();
    fileUploadArea.style.borderColor = '#f9657c';
  });

  fileUploadArea.addEventListener('dragleave', () => 
  {
    fileUploadArea.style.borderColor = '#4a4a68';
  });

  fileUploadArea.addEventListener('drop', (event) => 
  {
    event.preventDefault();
    fileUploadArea.style.borderColor = '#4a4a68';
    const files = event.dataTransfer.files;
    if (files.length > 0) 
    {
      avatarInput.files = files;
      const eventChange = new Event('change');
      avatarInput.dispatchEvent(eventChange);
    }
  });

  avatarInput.addEventListener('change', () => 
  {
    if (avatarInput.files.length > 0) 
    {
      const fileName = avatarInput.files[0].name;
      fileUploadArea.querySelector('span').textContent = fileName;
      fileUploadArea.querySelector('i').style.display = 'none';
    }
  });

  form.addEventListener("submit", (event) => 
  {
    event.preventDefault();

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const githubValue = githubInput.value.trim();
    const avatarFile = avatarInput.files[0];

    // validacao de email
    const emailPattern = /^[^\s@]+@[^\s@]+$/;
    if (!emailPattern.test(emailValue)) 
    {
      alert("Por favor, insira um e-mail válido (ex: nome@dominio).");
      return;
    }

    if (!nameValue || !emailValue || !githubValue || !avatarFile) 
    {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Preenche textos
    ticketName.textContent = nameValue;
    ticketNameHighlight.textContent = nameValue;
    ticketEmailText.textContent = emailValue;
    ticketGithub.textContent = `@${githubValue}`;

    // Leitura da imagem e troca de telas só depois de carregar
    const reader = new FileReader();
    reader.onload = (e) => 
    {
      ticketAvatar.src = e.target.result;
      // alterna visibilidade
      mainSection.classList.add("hidden");
      ticketSection.classList.remove("hidden");
      document.body.classList.add("ticket-page");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    reader.readAsDataURL(avatarFile);
  });

  backButton.addEventListener("click", () => 
  {
    // limpa e volta
    form.reset();
    ticketAvatar.src = "";
    fileUploadArea.querySelector('span').textContent = 'Drag and drop or click to upload';
    fileUploadArea.querySelector('i').style.display = 'block';
    ticketSection.classList.add("hidden");
    mainSection.classList.remove("hidden");
    document.body.classList.remove("ticket-page");
  });
});