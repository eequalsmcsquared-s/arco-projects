# Enquiry demonstration and email branding

The consultation form is enabled for the customer demonstration through the Sanity `enquiryForm.demoMode` field. Its notice, consent, button and completion text are editable in that document.

Visitors can try all three steps. Required fields and email format are checked. Completing a demo clears the temporary form values and shows a demo-complete notice on the same page. It does not POST the form data, send email, save browser storage, or navigate to the real sent-enquiry thank-you page. The normal server endpoint also rejects requests when the CMS demo flag is on.

The future delivery template includes the company's original wordmark in a dark green header, a readable enquiry summary, all configured field labels, and the visitor's reply-to address. A PNG logo is hosted at `/email/arco-logo.png` for email-client compatibility. Site settings can override it with an approved HTTPS email logo URL. The HTML uses inline styles and tables and includes a plain-text alternative. User-entered text is HTML-escaped. No demonstration email has been sent.

To launch real sending, first configure and verify the email provider, sender, recipient and anti-abuse settings described in `deployment.md`. Turn demo mode off only after a delivery test has been approved and completed. Rebuild the site after changing the flag until the publishing webhook is connected. No enquiry database is required.
