import './globals.css'

export const metadata = {
  title: "DOG'S OWN PLACE | Premium Dog Services",
  description: 'Professional dog training, walking, health checkups, vaccinations, grooming & more. Your dog\'s happiness is our mission.',
  keywords: 'dog training, dog walking, dog health, dog grooming, pet services, DOP, India',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐾</text></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Nunito:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-brand-cream min-h-screen">
        {children}
      </body>
    </html>
  )
}
