export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center p-4 mt-auto">
      {/* Footer */}
      <footer className=" text-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                Courier Service
              </h3>
              <p className="text-gray-400">
                Providing reliable courier and parcel
                management solutions for businesses of all
                sizes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-gray-400 hover:text-white"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-white"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Resources
              </h3>
              <ul className="space-y-2">
              
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white"
                  >
                    Admin
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white"
                  >
                    Agents
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Contact Us
              </h3>
              <address className="not-italic text-gray-400 space-y-2">
                <p>123 uttar badda, Dhaka</p>
                <p>Bangladesh</p>
                <p>Email: md.asifiqbal2008@gmail.com</p>
                <p>Phone: +880 1715779924</p>
              </address>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Courier
              Service. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </footer>
  );
}
