# Analytics event specification

Analytics is disabled until approved identifiers are supplied. Any future integration should load only after the applicable consent choice and should avoid personal information entirely.

| Event | Trigger | Safe parameters |
| --- | --- | --- |
| consultation_start | First interaction with an enabled form | landing_path, source, campaign |
| consultation_step | Valid form step change | step_number, landing_path |
| consultation_complete | Server confirms email delivery | landing_path, project_type |
| consultation_error | Validation or delivery failure | error_category, step_number |
| phone_click | Telephone link activation | page_path, link_position |
| email_click | Mail link activation | page_path, link_position |
| project_view | Genuine case-study page view | project_slug |
| service_enquiry | Consultation link on a service page | service_slug |

Do not emit completion on an unavailable form, a click alone, or an email-provider error. Never collect field text, names, email addresses, phone numbers, investment values or project descriptions. GA4 measurement ID and Search Console verification belong in secure deployment configuration, not editable business content. Validate event delivery in a non-production property before enabling it for the business.
