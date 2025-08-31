# Work Frontend Documentation

##  General Website Structure

Implement a responsive Navbar on every page with links:

- Home
- Events (dropdown → Survival Showdown, Hackathon, Data Alchemy)
- Registration
- Team
- Socials
- Contact Us

Ensure consistent navbar styling across all pages.

Implement responsive design (mobile, tablet, desktop).

##  Home Page

Add club introduction section (mission, activities, upcoming events).

Add overview cards/sections for the three events with:

- Event name
- Short description
- Date/highlights

Add a prominent "Register Now" button linking to Registration page.

Add Socials section with clickable icons (Instagram, LinkedIn, Twitter/X).

Add Contact Us section with:

- Club email, phone number
- A simple inquiry form (Name, Email, Message).

##  Events Pages (one for each: Survival Showdown, Hackathon, Data Alchemy)

Create dedicated event page layouts (linked from Navbar dropdown).

Each page should include:

- Event Details section (description, objectives, schedule, prizes, eligibility).
- Rules section (bullet-pointed list).
- Two Registration buttons:
  - One linking to custom club registration form.
  - One linking to VIT's Gravitas website page.

##  Registration Page

Create a central registration hub page with options for all three events.

Provide event selection interface (cards or buttons for Survival Showdown, Hackathon, Data Alchemy).

### For Survival Showdown & Hackathon (team-based):

UI flow for Team Leader vs Team Member selection.

**Team Leader Form UI:**
- Inputs: Name, Registration Number, Mail-ID, Contact Number, Team Name, Number of Members.
- Display auto-generated 4-digit Team ID (frontend placeholder – backend to handle generation).

**Team Member Form UI:**
- Inputs: Name, Registration Number, Mail-ID, Contact Number, Existing Team ID, Team Name.

### For Data Alchemy (individual):

Form with inputs: Name, Registration Number, Mail-ID, Contact Number.

After form completion, show two buttons:

- One → Club Website form submission.
- One → Gravitas link.

##  Team Section

Design a grid/card layout showcasing developers.

Each card should have:

- Photo
- Name
- Role (e.g., Web Developer, Event Coordinator)
- Short bio
- Contact/social links

##  Other Frontend Enhancements

- Ensure uniform theme, typography, and colors across all pages.
- Add hover effects, animations, or transitions for buttons, links, and cards.
- Add form validation (frontend side) for required fields.
- Ensure accessibility (alt text, ARIA roles where necessary).