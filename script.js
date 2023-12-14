// Récupération des différents éléments
const notifications = document.querySelector(".notifications");
const buttons = document.querySelectorAll(".btn");

const toastDetails = {
  timer: 5000,
  success: {
    icon: "fa-check-circle",
    text: "Succès : Notification de succès.",
  },
  error: {
    icon: "fa-times-circle",
    text: "Erreur : Notification d'erreur.",
  },
  warning: {
    icon: "fa-exclamation-triangle",
    text: "Avertissement : Notification d'avertissement.",
  },
};

// Déclaration de la fonction removeToast ayant comme paramètre toast qui va permettre de retirer la notification
const removeToast = (toast) => {
  toast.classList.add("hide");
  if (toast.timeoutId) {
    // Effacer le délai d'attente pour le toast
    clearTimeout(toast.timeoutId);
  }
  setTimeout(() => toast.remove(), 500); // Suppression du toast après 500 ms
};

// Déclaration de la fonction createToast ayant comme paramètre l'Id du toast qui va permetttre de faire apparaitre une notification
const createToast = (id) => {
  // Récupérartion de l'icône et du texte du toast en fonction de l'identifiant transmis
  const { icon, text } = toastDetails[id];
  // Création d'un élément li et inseertion de cet élément dans le DOM
  const toast = document.createElement("li");
  toast.className = `toast ${id}`;
  toast.innerHTML = `<div class="column">
                        <i class="fas ${icon}"></i>
                        <span>${text}</span>
                    </div>
                    <i class="fas fa-times" onclick="removeToast(this.parentElement)"></i>`;
  notifications.appendChild(toast);
  // Définition d'un délai d'attente pour supprimer le toast (appel de la fonction removeToast ayant comme paramètre le toast à supprimer) après la durée spécifiée
  toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
};

buttons.forEach((btn) => {
  // Ecoute de l'événement "click" sur le bouton et appel de la fonction createToast ayant comme paramètre l'Id du bouton cliqué
  btn.addEventListener("click", () => createToast(btn.id));
});
