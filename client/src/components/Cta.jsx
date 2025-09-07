import React from "react";
const Cta = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-800 dark:to-blue-700 text-white py-12 px-6 text-center rounded-2xl shadow-lg mx-4 md:mx-12 mt-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Ready to join the Edge of Innovation?
      </h2>
      <p className="text-base md:text-lg mb-6 text-gray-100">
        Become part of a vibrant community where ideas flourish and innovation thrives.
      </p>
      <button className="bg-white text-indigo-600 dark:text-indigo-800 px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:bg-gray-100 transition">
        Join NextEdge Today
      </button>
    </section>
  );
};
export default Cta;