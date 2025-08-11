// Site functionality script for PlanifAI
// This script handles the navigation toggle, reveal-on-scroll animation,
// updating the footer year, and local demo generators for WebBuilder and CRM agents.

window.addEventListener('DOMContentLoaded', function() {
  // Navigation toggle for mobile
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Reveal elements on scroll using IntersectionObserver
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Update footer year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Demo: WebBuilder skeleton generator
  const briefInput  = document.getElementById('wb-brief');
  const wbButton    = document.getElementById('wb-generate');
  const wbOutput    = document.getElementById('wb-output');
  if (briefInput && wbButton && wbOutput) {
    wbButton.addEventListener('click', () => {
      const txt  = (briefInput.value || '').trim();
      const nameMatch = txt.match(/([A-Za-zÀ-ÿ' -]{3,})/);
      const cityMatch = txt.match(/à ([A-Za-zÀ-ÿ-]+)/i);
      const name = nameMatch ? nameMatch[1] : 'Votre activité';
      const city = cityMatch ? cityMatch[1] : 'Votre ville';
      wbOutput.textContent = `<section class="hero-min">
  <h1>${name}</h1>
  <p>Services, tarifs, prise de rendez\u2011vous.</p>
</section>
<section>
  <h2>Prestations</h2>
  <ul><li>Prestation 1</li><li>Prestation 2</li><li>Prestation 3</li></ul>
</section>
<section>
  <h2>Contact</h2>
  <p>Ville : ${city} \u00b7 Téléphone : 06 xx xx xx xx</p>
</section>`;
    });
  }

  // Demo: CRM follow-up email generator
  const crmInput  = document.getElementById('crm-ctx');
  const crmButton = document.getElementById('crm-generate');
  const crmOutput = document.getElementById('crm-output');
  if (crmInput && crmButton && crmOutput) {
    crmButton.addEventListener('click', () => {
      const context = (crmInput.value || '').trim() || 'Devis envoyé le 2 mai, client : Mme Dupont, chantier 2 300 €';
      crmOutput.textContent = `Objet : Suite à notre devis — petit rappel\nBonjour,\nJe me permets un court message à propos de ${context}.\nSi vous avez des questions ou un ajustement à prévoir, je peux vous proposer un créneau cette semaine.\nBien à vous,\n— Votre entreprise`;
    });
  }
});
