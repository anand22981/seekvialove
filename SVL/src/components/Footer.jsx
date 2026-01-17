import { Fragment } from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <Fragment>
      <footer className="bg-black text-yellow-400 pt-12 mt-10">

        {/* <div className="flex items-center space-x-3">
          <img src={logo} alt="image" className="w-50 h-20 object-contain" />
        </div> */}

        <div className="grid grid-cols-3 gap-16 sm:grid-cols-3 md:grid-cols-4 max-w-4xl mx-auto text-gray-400 mt-4 text-sm">

          <div>
            <h3 className="mb-3 text-white font-bold">Company</h3>
            <ul className="space-y-2">
              <li className="hover:text-yellow-300">Company</li>
              <li className="hover:text-yellow-300">About us</li>
              <li className="hover:text-yellow-300">Careers</li>
              <li className="hover:text-yellow-300">Contacts</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-white font-semibold">Support</h3>
            <ul className="space-y-2">
              <li className="hover:text-yellow-300">Help center</li>
              <li className="hover:text-yellow-300">FAQ</li>
              <li className="hover:text-yellow-300">Community</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-white font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li className="hover:text-yellow-300">Terms and Conditions</li>
              <li className="hover:text-yellow-300">Privacy Policy</li>
              <li className="hover:text-yellow-300">License Agreement</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-white font-semibold">Connect</h3>
            <ul className="space-y-2">
              <li className="hover:text-yellow-300">Instagram</li>
              <li className="hover:text-yellow-300">Twitter</li>
              <li className="hover:text-yellow-300">YouTube</li>
            </ul>
          </div>

        </div>

        {/* <div>
          <h1 className="text-center text-l mt-6">Made with love in Bihar ❤️</h1>
        </div> */}

        <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} Seekvialove. All rights reserved.
        </div>

      </footer>
    </Fragment>
  );
}
