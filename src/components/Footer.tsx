import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-16 px-6 md:px-12 bg-[#2d2d2d] text-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="font-serif text-2xl">Bamboo Valley</div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="#about" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
              About
            </Link>
            <Link href="#programs" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
              Programs
            </Link>
            <Link href="/contact" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
              Contact
            </Link>
            <a
              href="https://www.instagram.com/bamboovalleyphuket/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm opacity-70">
            <div>
              <strong className="block opacity-100 mb-1">Address</strong>
              3/74 Moo 4, Cherngtalay, Thalang, Phuket 83110, Thailand
            </div>
            <div>
              <strong className="block opacity-100 mb-1">Phone / WhatsApp</strong>
              <a href="tel:+66989124218" className="hover:opacity-100">+66 98 912 4218</a>
            </div>
            <div>
              <strong className="block opacity-100 mb-1">Email</strong>
              <a href="mailto:info@bamboovalleyphuket.com" className="hover:opacity-100">info@bamboovalleyphuket.com</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm opacity-50">
          © {new Date().getFullYear()} Bamboo Valley. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
