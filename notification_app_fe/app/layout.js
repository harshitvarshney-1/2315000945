import Navbar from "../components/Navbar";
import MuiProviders from "../components/MuiProviders";

export const metadata = { title: "Campus Notifications" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MuiProviders>
          <Navbar />
          {children}
        </MuiProviders>
      </body>
    </html>
  );
}
