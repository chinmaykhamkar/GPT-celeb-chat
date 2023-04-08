const celebCards = document.querySelectorAll('.celeb-card');

celebCards.forEach(card => {
  card.addEventListener('click', () => {
    const celebName = card.getAttribute('data-name');
    localStorage.setItem('selectedCeleb', celebName);
    window.location.href = '../frontend/chat.html'
    
  });
});
