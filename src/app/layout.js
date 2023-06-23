import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-dark.css" integrity="sha512-nzbGungJDDiAbsuaYntXj24Mg5QnWAFRSOaOf3NRSrXiWKJZnj48Mlx4A2K93sOavBslpe3uod3yrDGUI/i3Xw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.js" integrity="sha512-aCQNEettKyH8SDQJruz2wZN44qnmyshACcptYnNs0cBU68fRbyZ/NMcTzSK2RbwnyYWqy4TQpjBE5s956Qcotg==" crossOrigin="anonymous" referrerPolicy="no-referrer" defer></script>
        <title>Web dev tools</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
