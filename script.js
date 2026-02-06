const form = document.getElementById('contactForm');
const responseDiv = document.getElementById('formResponse');
// PASTE YOUR PRODUCTION URL HERE
const N8N_URL = "https://william-projects.app.n8n.cloud/webhook/eb2dc26d-24f0-4283-bc5d-878ef7ea1826";

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // This is the "magic" line that stops the black screen!
    
    responseDiv.textContent = "Sending...";
    responseDiv.className = ""; 
    responseDiv.classList.remove('hidden');

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch(N8N_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            // Shows your "email sent" message inside your own UI
            responseDiv.textContent = result.message || "Message sent successfully!";
            responseDiv.classList.add('success');
            form.reset(); 
        } else {
            throw new Error("Server error");
        }
    } catch (err) {
        responseDiv.textContent = "Failed to send message.";
        responseDiv.classList.add('error');
    }
});
