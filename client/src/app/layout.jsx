import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outfit } from "next/font/google";
import Header from "../lib/components/Header/Header";
import Footer from "../lib/components/Footer/Footer";
import { ThemeProvider } from "../lib/components/Theme/ThemeProvider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Md. Mahadi Hasan",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Header />
          {children}
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="dark"
          />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
