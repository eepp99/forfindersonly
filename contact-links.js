// Add the brand's actual destinations here. Empty entries stay inactive.
const contactLinks = {
  instagram: 'https://www.instagram.com/forfindersonly/',
  email: 'forfindersonly@gmail.com',
  shop: 'https://paystack.shop/forfindersonly',
  tiktok: 'https://www.tiktok.com/@for.findersonly'
};
document.querySelectorAll('[data-contact]').forEach(link => {
  const kind = link.dataset.contact;
  const destination = contactLinks[kind];
  if (!destination) return;
  link.href = kind === 'email' ? `mailto:${destination}` : destination;
  link.removeAttribute('aria-disabled');
  link.classList.remove('pending-link');
  if (kind !== 'email') {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
});

