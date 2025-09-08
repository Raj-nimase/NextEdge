import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
          <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            NextEdge Society
          </h3>
          <p className="text-sm mt-2">Edge of Innovation. Core of Learning.</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-indigo-500">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-indigo-500">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-indigo-500">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-indigo-500">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">QUICK LINKS</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-500">Home</a></li>
            <li><a href="#" className="hover:text-indigo-500">About</a></li>
            <li><Link to={'/clubs'} className="hover:text-indigo-500">Clubs</Link></li>
            <li><a href="#" className="hover:text-indigo-500">Events</a></li>
            <li><a href="#" className="hover:text-indigo-500">Gallery</a></li>
            <li><a href="#" className="hover:text-indigo-500">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-3">RESOURCES</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-500">Join Us</a></li>
            <li><a href="#" className="hover:text-indigo-500">Volunteer</a></li>
            <li><a href="#" className="hover:text-indigo-500">Event Proposal</a></li>
            <li><a href="#" className="hover:text-indigo-500">Club Leaders</a></li>
            <li><a href="#" className="hover:text-indigo-500">Faculty Resources</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">CONTACT US</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:info@nextedgesociety.org" className="hover:text-indigo-500">info@nextedgesociety.org</a></li>
            <li>Student Center</li>
            <li>Business School</li>
            <li>University Campus</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center border-t border-gray-300 dark:border-gray-700 py-4 text-sm">
        © 2025 NextEdge Society. All rights reserved.
      </div>
    </footer>
  );
}; 

export default Footer;