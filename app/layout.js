import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
// import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Demo",
  description: "Testing font issue",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Header visible on every page */}
        <Header />

        {/* Page content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer visible on every page */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
