import "./globals.css";
import DemoBootstrap from "../components/demo/DemoBootstrap";

export const metadata = {
  title: "StreamFlix - Demo Streaming Platform",
  description: "Portfolio demo: a Netflix-style streaming platform with dummy content",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DemoBootstrap />
        {children}
      </body>
    </html>
  );
}
