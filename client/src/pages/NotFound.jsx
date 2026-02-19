import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <>
      <main className="min-h-screen flex flex-col">
        <section className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-2xl w-full text-center space-y-8">
            {/* 404 Number */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="w-32 h-32 md:w-40 md:h-40 text-gray-200 dark:text-gray-800 opacity-50" />
              </div>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                Page Not Found
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or the URL might be incorrect.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            >
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium border-2 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-8 border-t border-gray-200 dark:border-gray-800"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Or visit one of these pages:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/events"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                  Events
                </Link>
                <Link
                  to="/gallery"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                  Gallery
                </Link>
                <Link
                  to="/clubs"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                  Clubs
                </Link>
                <Link
                  to="/about"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
