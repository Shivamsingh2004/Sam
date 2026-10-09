# Architecture rules
- Keep source portfolio content in a single structured data module and render it through the editorial portfolio components, so content stays consistent across sections and exports.
- Keep this static portfolio client-side; the contact form opens an email draft and must never claim server delivery without a real email service.
- Use imported CDN asset pointers for uploaded app media; standalone exports must bundle local copies so they work outside Lovable hosting.
- Proxy CDN asset paths to the hosted preview during local development so uploaded portraits can be verified in the local browser.