# 🐾 DOG'S OWN PLACE (DOP)

> India's #1 Premium Dog Services Platform

## Features
- 🔐 User Registration & Login (multi-step with localStorage)
- 🐕 Dog Profile Management (add, view, edit, delete)
- 💉 Vaccination Records & Health Tracking
- 📅 Appointment Booking (3-step wizard with service/date/time selection)
- 💳 Online Payment (UPI, Card, Net Banking, Wallets)
- 🏥 8 Services: Training, Walking, Health Checkup, Vaccination, Grooming, Daycare, Emergency, Nutrition
- 📱 Fully Responsive (mobile-first design)
- ✨ Beautiful animations & micro-interactions

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom design system
- **Fonts**: Playfair Display + Nunito
- **Icons**: Lucide React
- **State**: React Context + localStorage (no backend required)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser at http://localhost:3000
```

## Project Structure
```
src/
  app/           - All pages (Next.js App Router)
    page.js      - Landing page
    auth/        - Login & Register
    services/    - Services listing
    about/       - About us
    contact/     - Contact form
    dashboard/   - User dashboard
      dogs/      - Dog profile management
      appointments/ - Book appointments
    payment/     - Payment gateway
  components/    - Reusable components
    layout/      - Navbar, Footer
    ui/          - ServiceCard, etc.
  lib/           - Constants & shared data
  context/       - Auth & Dogs context providers
```

## Demo Account
On the login page, click **"Try Demo Account"** to explore all features.

## Pages
| Page | URL |
|------|-----|
| Home | `/` |
| Services | `/services` |
| About | `/about` |
| Contact | `/contact` |
| Login | `/auth/login` |
| Register | `/auth/register` |
| Dashboard | `/dashboard` |
| My Dogs | `/dashboard/dogs` |
| Add Dog | `/dashboard/dogs/add` |
| Dog Profile | `/dashboard/dogs/[id]` |
| Appointments | `/dashboard/appointments` |
| Payment | `/payment` |

---
Made with ❤️ for dog lovers everywhere 🐾
