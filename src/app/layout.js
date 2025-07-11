import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
//import { createTheme } from "geist-ui-react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Auction Management",
  description: "Generated by create next app",
};


// In your theme configuration
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#2196F3',
//       light: '#64B5F6',
//       lighter: '#E3F2FD',
//     },
//     success: {
//       main: '#4CAF50',
//       light: '#81C784',
//       lighter: '#E8F5E9',
//     },
//     info: {
//       main: '#00BCD4',
//       light: '#4DD0E1',
//       lighter: '#E0F7FA',
//     },
//     warning: {
//       main: '#FFC107',
//       light: '#FFD54F',
//       lighter: '#FFF8E1',
//     },
//     error: {
//       main: '#F44336',
//       light: '#E57373',
//       lighter: '#FFEBEE',
//     },
//   },
// });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
