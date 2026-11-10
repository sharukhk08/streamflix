import "./globals.css";
import DemoBootstrap from "../components/demo/DemoBootstrap";

export const metadata = {
  title: "StreamFlix - Demo Streaming Platform",
  description: "Portfolio demo: a Netflix-style streaming platform with dummy content",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://test-streams.mux.dev" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Jost:ital,wght@0,100..900;1,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" />
      </head>
      <body>
        <DemoBootstrap />
        {children}
      </body>
    </html>
  );
}
