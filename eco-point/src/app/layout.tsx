import "./globals.css";

export const metadata = {
  title: "RECI - Plataforma de Reciclaje",
  description: "Plataforma inteligente de reciclaje de Cochabamba",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}